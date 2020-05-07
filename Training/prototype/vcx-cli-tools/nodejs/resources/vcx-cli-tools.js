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

_run();

// global vars
let config = "./config/vcx-config.json";

//libsovtoken loading
async function run(){
  const myffi = ffi.Library('/usr/lib/libsovtoken.so', {sovtoken_init: ['void', []]});
  await myffi.sovtoken_init();
  await vcx.initVcx(config);
}
run();

async function testVCX(){
  try{
      await vcx.initVcx(config);
      return("VCX has been successfully initiated");
  }catch(err){
      console.log("VCX has not been successfully initiated, see error below...");
      return(err.message);
  }
}
async function makeConnection(type,name,phonenumber){
  await vcx.initVcx(config);
  let connectionData = {};
  let connectionArgs = {};
  let connection = await Connection.create({"id":name});
  console.log(`vcx will attempt Connection through ${type}`);
  if(type=="QR"){
    connectionData=
      {
        "id":name,
        "connection_type":"QR",
        "use_public_did":false
      }
      connectionArgs = {data: JSON.stringify(connectionData)};
      await connection.connect(connectionArgs);
      let details = await connection.inviteDetails(true);
      console.log(details);
      let qrcode = qr.image(details, { type: 'png' });
      qrcode.pipe(fs.createWriteStream(`./data/${name}-connection.png`));
      let state = await connection.getState();
      while(state != StateType.Accepted) {
          console.log("The State of the Connection is "+ state);
          await sleep(2000);
          await connection.updateState();
          state = await connection.getState();
      }
      //function complete
      let serialized_connection = await connection.serialize();
      let connection_file_path = `./data/${name}-connection.json`;
      await fs.writeJson(connection_file_path,serialized_connection);
      console.log("Success!! Connection Complete. The State of the Connection is "+ state);
  }else if(type=="SMS"){
      connectionData=
      {
        "id":name,
        "connection_type":"SMS",
        "phone":String(phonenumber),
        "use_public_did":false
      }
      connectionArgs = {data: JSON.stringify(connectionData)};
      await connection.connect(connectionArgs);
      let details = await connection.inviteDetails(true);
      let state = await connection.getState();
      while(state != StateType.Accepted) {
          console.log("The State of the Connection is "+ state);
          await sleep(2000);
          await connection.updateState();
          state = await connection.getState();
      }
      let serialized_connection = await connection.serialize();
      let connection_file_path = `./data/${name}-connection.json`;
      await fs.writeJson(connection_file_path,serialized_connection);
      console.log("Success!! Connection Complete. The State of the Connection is "+ state);
  }
}

async function askProvableQuestion (connection_name, question_prompt, button1, button2) {
    await vcx.initVcx(config);
    serialized_connection = await fs.readJson(`./data/${connection_name}-connection.json`);
    deserialized_connection = await Connection.deserialize(serialized_connection);
    const pairwiseDid = serialized_connection.data.pw_did;
    const expiration = _getExpirationDate({ seconds: 60 });
    const msg_uuid = require('uuid/v4');
    const question = {
      '@type': 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/committedanswer/1.0/question',
      '@id': msg_uuid,
      'question_text': question_prompt,
      'valid_responses': [
        { 'text': button1, 'nonce': button1 },
        { 'text': button2, 'nonce': button2 }
      ],
      '@timing': {
        'expires_time': expiration
      }
    }
    const msg_id = await deserialized_connection.sendMessage({
      msg: JSON.stringify(question),
      type: 'Question',
      title: 'Asking test question'
    })
    let answer = null;
    while (!_isExpired(expiration)) {
      let messages = await vcx.downloadMessages({ status: 'MS-104', uids: msg_id, pairwiseDids: pairwiseDid });
      messages = JSON.parse(messages);
      if (messages[0]['msgs'].length == 0) {
        console.log('No response yet');
        await vcx.updateMessages({ msgJson: JSON.stringify([{ 'pairwiseDID': pairwiseDid, 'uids': [msg_id] }]) });
        await sleep(2000);
        continue;
      }
      else {
        const response_id = messages[0]['msgs'][0]['refMsgId'];

        await vcx.updateMessages({ msgJson: JSON.stringify([{ 'pairwiseDID': pairwiseDid, 'uids': [response_id] }]) });
        console.log('Downloading response')
        messages = await vcx.downloadMessages({ uids: response_id, pairwiseDids: pairwiseDid });
        messages = JSON.parse(messages);
        for (const message of messages[0]['msgs']) {
          if (message.type === 'Answer' && message.uid === response_id) {
            answer = JSON.parse(JSON.parse(message['decryptedPayload'])['@msg']);
            break;
          }
        }
        if (answer == null) {
          console.log('There should have been an answer received...');
          break;
        }
        else {
          // We got a response, determine the answer
          const signature = Buffer.from(answer['response.@sig']['signature'], 'base64');
          const data = answer['response.@sig']['sig_data'];
          const valid = await deserialized_connection.verifySignature({ data: Buffer.from(data), signature });
          if (valid) {
            console.log("-- The verified response: " + Buffer.from(data, 'base64'));
          }
          else {
            console.log("-- The signature was not valid.");
          }
          break;
        }
      }
    }
    if (answer == null) {
      console.log("Timeout occurred before a response was received");
    }
}

async function createSchema(schema_name){
    await vcx.initVcx(config);
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
}

async function createCredentialDef(schema_name){
    await vcx.initVcx(config);
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
    let ser_CredDef = await credentialDef.serialize();
    console.log(ser_CredDef);
    let credDefId = await credentialDef.getCredDefId();
    await fs.writeJson(`./data/${schema_name}-credential-definition.json`,ser_CredDef);
    console.log(`Congratulations! Your Credential Definition was written to the Ledger and the id is : ${credDefId}`);

}

async function offerCredential(credential_name,connection_name){
    await vcx.initVcx(config);
    let credential_definition = await fs.readJson(`./data/${credential_name}-credential-definition.json`);
    let credential_data = await fs.readJson(`./data/${connection_name}-${credential_name}-data.json`);
    let connection_data = await fs.readJson(`./data/${connection_name}-connection.json`);
    let connection = await Connection.deserialize(connection_data);
    let serial_connection = await connection.serialize();
    var cred_def_deserialzed = await CredentialDef.deserialize(credential_definition);
    // get credential definition handle
    cred_def_handle = await cred_def_deserialzed.handle;
    console.log (`handle is _ ${cred_def_handle}`);
    let credential = await IssuerCredential.create({
        "sourceId":"1",
        "credDefHandle": cred_def_handle,
        "attr": credential_data.attrs,
        "credentialName":"Cred Name",
        "price": "0"
    });
    console.log(`Successfully created A Credential, now offering it to ${connection_name}...`);
    await credential.sendOffer(connection);
    await credential.updateState();
    let state = await credential.getState();
    while(state != 3) {
        console.log("Offer Sent, The State of the Credential Offer is "+ state);
        await sleep(2000);
        await credential.updateState();
        state = await credential.getState();
    }
    await credential.sendCredential(connection);
    while(state != 4) {
      console.log("Credential Sent, The State of the Credential is "+ state);
      await sleep(2000);
      await credential.updateState();
      state = await credential.getState();
    }
    console.log(`Congratulations! Your Credential was offered and accepted by ${connection_name}`);
}

async function requestProof(proof_name,connection_name){
    await vcx.initVcx(config);
    let proof_data = await fs.readJson(`./data/${proof_name}-proof-definition.json`);
    let connection_data = await fs.readJson(`./data/${connection_name}-connection.json`);
    let connection = await Connection.deserialize(connection_data);
    await connection.updateState();
    await connection.serialize();
    console.log(proof_data);
    let proof = await Proof.create(proof_data);
    await proof.requestProof(connection);
    await proof.updateState();
    state = await proof.getState();
    while(state != StateType.RequestReceived){
        console.log(`The state of the proof is ${state}`)
        await sleep(2000);
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
    if (_verifyClaims(proof_return, proof_data.attrs) == true) {
        console.log("Claims in the proof satisfy all restrictions. The proof is verified!");
    }
    else {
        console.log("Claims DO NOT meet all restrictions");
    }
    await fs.writeJson(`./data/${connection_name}-proof.json`, proof_return);
}

async function getProofAttribute(connection_name, attribute_name) {
  let the_proof = await fs.readJson(`./data/${connection_name}-proof.json`);
  var proof_obj = JSON.parse(the_proof['proof']);
  let found = false;
  if (attribute_name in proof_obj["requested_proof"]["revealed_attrs"]) {
    const issuer_index = proof_obj["requested_proof"]["revealed_attrs"][attribute_name]["sub_proof_index"];
    const cred_def_id = proof_obj["identifiers"][parseInt(issuer_index, 10)]["cred_def_id"];
    issuer_did = cred_def_id.split(':')[0];
    console.log('The attribute "' + attribute_name + '" is "' + proof_obj["requested_proof"]["revealed_attrs"][attribute_name]["raw"] + '". The validated issuer is: ' + issuer_did);
  }
  else if (attribute_name in proof_obj["requested_proof"]["predicates"]) {
    const issuer_index = proof_obj["requested_proof"]["predicates"][attribute_name]["sub_proof_index"];
    const cred_def_id = proof_obj["identifiers"][parseInt(issuer_index, 10)]["cred_def_id"];
    issuer_did = cred_def_id.split(':')[0];
    console.log('The attribute "' + attribute_name + '" predicate is "' + proof_obj["requested_proof"]["predicates"][attribute_name]["raw"] + '". The validated issuer is: ' + issuer_did);
  }
  else if (attribute_name in proof_obj["requested_proof"]["self_attested_attrs"]) {
    console.log('The self-attested attribute "' + attribute_name + '" is "' + proof_obj["requested_proof"]["self_attested_attrs"][attribute_name] + '"');
  }
  else {
    console.log(attribute_name + ' was not found in the returned proof');
  }
}


// helper functions

function _verifyClaims(the_proof, proof_template) {
    // determine which claims should have restrictions applied
    var restricted = [];
    var proof_obj = JSON.parse(the_proof['proof']);
    for (attribute in proof_template) {
        if ("restrictions" in proof_template[attribute]) {
            restricted.push(proof_template[attribute]["name"]);
        }
    }
    verified = true;
    for (claim in restricted) {
        if (!(restricted[claim] in proof_obj["requested_proof"]["revealed_attrs"])) {
            verified = false;
            console.log("Attribute " + restricted[claim] + " has unmet restrictions.");
        }
    }
    return verified;
}

function _getExpirationDate (config = {}) {
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

function _isExpired (expirationDate) {
    return (expirationDate < new Date().toISOString())
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function _run(){
    const myffi = ffi.Library('/usr/lib/libsovtoken.so', {sovtoken_init: ['void', []]});
    await myffi.sovtoken_init();
}

// ------- main -------
module.exports={
  testVCX,
  makeConnection,
  createSchema,
  createCredentialDef,
  offerCredential,
  requestProof,
  askProvableQuestion,
  getProofAttribute
}
//make script runnable in CLI
require('make-runnable/custom')({
    printOutputFrame: false
})

