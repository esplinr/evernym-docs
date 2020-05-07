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

async function createCredentialDef(schema_name,schema_ID){
  await vcx.initVcx(config);
  console.log('creating credential definition');
  const data = {
      name: schema_name,
      paymentHandle: 0,
      revocation: false,
      revocationDetails: {
          tailsFile: 'tails.txt',
      },
      schemaId: schema_ID,
      sourceId: schema_name
  };
  let credentialDef = await CredentialDef.create(data);
  let ser_CredDef = await credentialDef.serialize();
  console.log(ser_CredDef);
  let credDefId = await credentialDef.getCredDefId();
  await fs.writeJson(`./data/${schema_name}-credential-definition.json`,ser_CredDef);
  console.log(`Congratulations! Your Credential Definition was written to the Ledger and the id is : ${credDefId}`);
}
module.exports={
  createCredentialDef
}
//make script runnable in CLI
require('make-runnable/custom')({
    printOutputFrame: false
})