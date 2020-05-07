#!/usr/bin/env node
var vcx = require('node-vcx-wrapper');
var qr = require('qr-image');
var fs = require('fs-extra');
var ffi = require('ffi');
var msg_uuid = require('uuid/v4');


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

async function run(){
  const myffi = ffi.Library('/usr/lib/libsovtoken.so', {sovtoken_init: ['void', []]});
  await myffi.sovtoken_init();
}
run();

// load config file
let config ='./config/vcx-config.json';

// new connection
async function makeNewConnection(connectionName){
  await vcx.initVcx(config);
  console.log('vcx will attempt Connection through QR code');
  let connection = await Connection.create({id:connectionName});
  let connectionData=
  {
    "id":name,
    "connection_type":"QR",
    "use_public_did":true
  }
  connectionArgs = {data: JSON.stringify(connectionData)};
  await connection.connect(connectionArgs);
  let details = await connection.inviteDetails(true);
  console.log(details);
  let qrcode = qr.image(details, { type: 'png' });
  qrcode.pipe(fs.createWriteStream(`./data/${connectionName}-connection.png`));
  let state = await connection.getState();
  let counter = 0;
  while(state != StateType.Accepted && counter < 1000) {
      console.log("The State of the Connection is "+ state);
      await connection.updateState();
      await connection.serialize();
      state = await connection.getState();
      counter+=1;
  }
  //function complete
  let serialized_connection = await connection.serialize();
  let connection_file_path = `./data/${connectionName}-connection.json`;
  await fs.writeJson(connection_file_path,serialized_connection);
  console.log("Success!! Connection Complete");
  return connection;
}

// load new connection
async function loadConnection(connectionName){
  await vcx.initVcx(config);
  let connection_data = await fs.readJson(`./data/${connectionName}-connection.json`);
  console.log(connection_data);
  let connection = await Connection.deserialize(connection_data);
  return connection;
}

// send message without requesting answer
async function sendMessage(connectionName, newConnection, msgName){
  var connection = {};
  //await the creation of the connection from the previously save
  if (newConnection == "true"){
    console.log('new connection');
    connection = await makeNewConnection(connectionName);
  }else if(newConnection == "false"){
    console.log('load connection');
    connection = await loadConnection(connectionName);
  }
  //construct the message/question
  let msgFile = await fs.readJson(`data/${msgName}-message.json`);
  let msg ={
    'msg':JSON.stringify(msgFile),
    'type':'Question',
    'title':msgFile.question_text 
  };
  //send the message/question
  await connection.sendMessage(msg);
  console.log('message sent');
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


module.exports={
    askProvableQuestion,
    sendMessage,
    makeNewConnection,
    loadConnection
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
//make script runnable in CLI
require('make-runnable/custom')({
    printOutputFrame: false
})