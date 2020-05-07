#!/usr/bin/env node
var vcx = require('node-vcx-wrapper');
var qr = require('qr-image');
var fs = require('fs-extra');
var ffi = require('ffi');

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
}
run();

async function verifyPassport(name){
    // initialize VCX
    let config = "./config/vcx-config.json";
    await vcx.initVcx(config);
    // Generate QR code and wait for Connection to be accepted in Connect.Me
    let connection = await Connection.create({id:name});
    let connectionData =
      {
        "id":name,
        "connection_type":"QR",
        "use_public_did":true
      }
    connectionArgs = {data: JSON.stringify(connectionData)};
    await connection.connect(connectionArgs);
    let details = await connection.inviteDetails(true);
    let qrcode = qr.image(details, { type: 'png' });
    qrcode.pipe(fs.createWriteStream(`./data/${name}-connection.png`));
    let state = await connection.getState();
    while(state != StateType.Accepted) {
        console.log("The State of the Connection is "+ state);
        await connection.updateState();
        await connection.serialize();
        state = await connection.getState();
    }
    // generate Proof Request from JSON
    let proof_data = {
        "attrs":[
          {
            "name": "Username", "restrictions": [
              {
                "issuer_did":"WCMfgNfk81hFfZBr1iMeuj",
              }
            ]
          }
        ],
        "sourceId":"111111",
        "name": "Credential Village Passport Proof Request",
        "revocationInterval": {}
    }
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
    // Check for self-attested proof fields (these will give a false positive for validation in this version of libindy/Connect.Me)
    let serial_proof = await proof.serialize();
    let libindyproof =  serial_proof['data']['proof']['libindy_proof'];
    let json_lbp = JSON.parse(libindyproof);
    let self_attested_attrs = json_lbp['requested_proof']['self_attested_attrs'];
    if(proof_state == 1 && self_attested_attrs.length == 0){
        console.log(`Success! You have issued a Proof request to ${name} and validated it.`);
    }else{
        console.log(`You issued a Proof request to ${name} but it was not valid.`);
    }
}
module.exports={
    verifyPassport
}
//make script runnable in CLI
require('make-runnable/custom')({
    printOutputFrame: false
})