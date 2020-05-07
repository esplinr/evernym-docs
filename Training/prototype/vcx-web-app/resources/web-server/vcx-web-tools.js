#!/usr/bin/env node
var vcx = require('node-vcx-wrapper');
var qr = require('qr-image');
var fs = require('fs-extra');
var ffi = require('ffi');
const base64url = require('base64url')
const crypto = require('crypto');

//vcx imports
const {
  Schema,
  CredentialDef,
  Connection,
  IssuerCredential,
  Proof,
  StateType,
  Error,
  rustAPI
} = vcx;

// load up libsovtoken
async function run(){
    const myffi = ffi.Library('/usr/lib/libsovtoken.so', {sovtoken_init: ['void', []]});
    await myffi.sovtoken_init();
    await vcx.initVcx(config);
}
run();

// global vars
let config = "./config/vcx-config.json";

async function makeConnection(type,name,phonenumber){
  let connectionData ={};
  let connectionArgs={};
  let connection = await Connection.create({"id":name});
  connectionData =
  {
    "id":name,
    "connection_type":"QR",
    "use_public_did":true
  }
  connectionArgs = {data: JSON.stringify(connectionData)};
  await connection.connect(connectionArgs);
  return connection;
}

async function askProvableQuestion (connection_name) {
      serialized_connection = await fs.readJson(`./data/${connection_name}-connection.json`);
    deserialized_connection = await Connection.deserialize(serialized_connection);
    const pairwiseDid = serialized_connection.data.pw_did;
    const expiration = getExpirationDate({ seconds: 60 });
    const question = {
      '@type': 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/committedanswer/1.0/question',
      '@id': '518be002-de8e-456e-b3d5-8fe472477a86',
      'question_text': 'Test Question',
      'question_detail': 'Are you There?',
      'valid_responses': [
        { 'text': "ACCEPT", 'nonce': 'YES' },
        { 'text': "REJECT", 'nonce': 'NO' }
      ],
      '@timing': {
        'expires_time': expiration
      }
    }
    await deserialized_connection.sendMessage({
      msg: JSON.stringify(question),
      type: 'Question',
      title: 'Asking login question'
    })
    let answer;
    while (!isExpired(expiration)) {
      let messages = await vcx.downloadMessages({ status: 'MS-103', pairwiseDids: pairwiseDid });
      messages = JSON.parse(messages);
      for (const message of messages[0]['msgs']) {
        if (message.type === 'Answer') {
          if (answer) {
            console.log('More then one "Answer" message')
          } else {
            answer = JSON.parse(JSON.parse(message['decryptedPayload'])['@msg'])
          }
          await vcx.updateMessages({ msgJson: JSON.stringify([{ 'pairwiseDID': pairwiseDid, 'uids': [message.uid] }]) });
        }
      }
      if (answer) {
        break
      }
    }
    if (isExpired(expiration)) {
      console.log("expired");
      throw Error('Timeout');
    } else {
      console.log(answer);
      const signature = Buffer.from(answer['response.@sig']['signature'], 'base64')
      const data = answer['response.@sig']['sig_data']
      console.log('validating signature');
      const valid = await deserialized_connection.verifySignature({ data: Buffer.from(data), signature });
      if (valid) {
        console.log('Signature is valid!')
        return base64decode(data)
      } else {
        console.log('Signature validation failed')
        return false
      }
    }
}

async function createSchema(schema_name){
      let schema_data = await fs.readJson(`./data/${schema_name}-schema.json`);
    //set up incremental version float in order to avoid schema version conflicts
    let currentVersion = parseFloat (schema_data.data.version);
    newVersion = currentVersion +.01;
    schema_data.data.version = String(newVersion.toFixed(2));
    console.log(schema_data);
    let schema = await Schema.create(schema_data);
    //retrieve schema ID on Ledger
    let schemaId = await schema.getSchemaId();
    //write the Ledger ID to the schema json file for future use
    schema_data['schemaId'] = schemaId;
    await fs.writeJson(`./data/${schema_name}-schema.json`,schema_data);
    console.log(`Congratulations! Your schema was written to the Ledger and the id is : ${schemaId}`);
    return schema;
}

async function createCredentialDef(schema_name){
      let schema_data = await fs.readJson(`./data/${schema_name}-schema.json`);
    console.log(schema_data.schemaId);
    console.log('creating credential definition');
    const data = {
        name: schema_name,
        paymentHandle: 0,
        revocation: false,
        revocationDetails: {
            tailsFile: 'tails.txt',
        },
        schemaId: schema_data.schemaId,
        sourceId: schema_data.sourceId
    };
    let credentialDef = await CredentialDef.create(data);
    // let credentialDef = await CredentialDef.create({"name":schema_data.name,"paymentHandle": 0,"revocation":false,"schemaId":schema_data.schemaId,"sourceId":"55555"});
    let ser_CredDef = await credentialDef.serialize();
    console.log(ser_CredDef);
    let credDefId = await credentialDef.getCredDefId();
    await fs.writeJson(`./data/${schema_name}-credential-definition.json`,ser_CredDef);
    console.log(`Congratulations! Your Credential Definition was written to the Ledger and the id is : ${credDefId}`);
    return credentialDef;

}
async function offerCredential(credential_name,connection){
    let credential_definition = await fs.readJson(`./data/${credential_name}-credential-definition.json`);
    let credential_data = await fs.readJson(`./data/${credential_name}-data.json`);
    var cred_def_deserialized = await CredentialDef.deserialize(credential_definition);
    // get credential definition handle
    cred_def_handle = await cred_def_deserialized.handle;
    console.log (`handle is _ ${cred_def_handle}`);
    let credential = await IssuerCredential.create({
        "sourceId":"1",
        "credDefHandle": cred_def_handle,
        "attr": credential_data.attrs,
        "credentialName":credential_name,
        "price": "0"
    });
    console.log(`Successfully created A Credential, now offering it to connection...`);
    await credential.sendOffer(connection);
    await credential.updateState();
    let state = await credential.getState();
    while(state != 3) {
        console.log("Offer Sent, The State of the Credential Offer is "+ state);
        await credential.updateState();
        state = await credential.getState();
    }
    await credential.sendCredential(connection);
    while(state != 4) {
      console.log("Credential Sent, The State of the Credential is "+ state);
      await credential.updateState();
      state = await credential.getState();
    }
    console.log(`Congratulations! Your Credential was offered and accepted by the Connection`);
    return credential;
}
async function requestProof(proof_name,connection){
    let proof_data = await fs.readJson(`./data/${proof_name}-proof-definition.json`);
    await connection.updateState();
    await connection.serialize();
    console.log(proof_data);
    let proof = await Proof.create(proof_data);
    await proof.requestProof(connection);
    await proof.updateState();
    state = await proof.getState();
    while(state != StateType.RequestReceived){
        console.log(`The state of the proof is ${state}`)
        await proof.updateState();
        state = await proof.getState();
        if(state == StateType.Accepted) {
            var proof_return = await proof.getProof(connection);
            console.log(`The get proof state is ${proof_return}`);
            break;
        }
    }
    await proof.updateState();
    state = await proof.getState();
    var proof_return = await proof.getProof(connection);
    var proof_state = await proof_return.proofState;
    console.log(proof_state);
    if(proof_state == 1){
        console.log(`Congratulations! You have Issued a Proof request to a Connection and validated it.`);
        // insert libindy proof check for self-attested claims here
        let pdata = await proof.serialize();
        console.log("Checking for self-attested claims");
         // Manual validation "for-reals" check
         let libindyproof =  pdata['data']['proof']['libindy_proof'];
         console.log("libindy saved Proof is: ");
         console.log (libindyproof);
         let json_lbp = JSON.parse(libindyproof);
         let self_attested_attrs = json_lbp['requested_proof']['self_attested_attrs'];
         console.log(self_attested_attrs);
         console.log("self attested truths length: " + Object.keys(self_attested_attrs).length);
         if(Object.keys(self_attested_attrs).length > 0){
              console.log("Proof is NOT Valid or contains self-attested values");
              proof_state = 2;
              return proof_state;
         }
         return proof_state;
    }else{
        console.log(`You issued a Proof request to a Connection but it was not valid. Try again`);
        proof_state = 2;
        return proof_state;
    }
}

module.exports={
  makeConnection,
  createSchema,
  createCredentialDef,
  offerCredential,
  requestProof,
  askProvableQuestion
}


// helper functions for structured messaging
function getToken (size) {
    return base64url(crypto.randomBytes(size))
  }
function getExpirationDate (config = {}) {
    let expiration = new Date()
    if (config.hours) {
        expiration = new Date(expiration.setHours(expiration.getHours() + config.hours))
    }
    if (config.minutes) {
        expiration = new Date(expiration.setMinutes(expiration.getMinutes() + config.minutes))
    }
    if (config.seconds) {
        expiration = new Date(expiration.setSeconds(expiration.getSeconds() + config.seconds))
    }
        return expiration.toISOString()
}
function isExpired (expirationDate) {
    // return (expirationDate < new Date().toISOString())
    return false;
}
function base64decode (data) {
    const buff = Buffer.from(data, 'base64')
    return buff.toString('ascii')
  }