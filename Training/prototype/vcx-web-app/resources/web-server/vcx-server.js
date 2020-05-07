#!/usr/bin/env node

// imports
var cors = require('cors');
var qr = require('qr-image');
var fs = require('fs-extra');
var express = require('express');
var session = require('express-session');
const bodyParser = require('body-parser');
var vcxwebtools = require('./vcx-web-tools.js');
let complete = false;
// set up app express server
const INSTALL_DIR = '/opt/village';
const SCHEMA_DIR = `${INSTALL_DIR}/schema`;
const PORT = 5000;
const app = express();
app.use(session({secret: "Secret Key"}));
app.use(bodyParser.urlencoded({ extended: false }));
const server = require('http').Server(app);
const io = require('socket.io')(server);
// sockets.io listen
io.on('connection',socket=>{
    console.log("a user connected");
    socket.on('disconnect',()=>{
        console.log("user disconnected");
    })
    socket.on('message',function(data){
        console.log(data);
    })
})
// express server listen
server.listen(PORT,function(){
    console.log(`Listening on Port ${PORT}`);
});
// app settings for json, url, cors, and a public folder for shared use
app.use(express.json());
// express use url encoded for post messages
app.use(express.urlencoded());
// express set up Cross Origin
app.use(cors());

// API endpoint generates schema and credential definition based upon json file in ./data/cred_name-schema.json
app.post('/api/v1/build_credential', async function(req,res){
  let cred_name = req.body['build_cred'];
  io.emit('credential building');
  io.emit("credential built");

  let schema = await vcxwebtools.createSchema(cred_name);
  let credDef = await vcxwebtools.createCredentialDef(cred_name);
  let schema_ID = await schema.getSchemaId();
  let credDef_ID = await credDef.getCredDefId();

  res.setHeader('Content-type', 'application/json');
  res.end(JSON.stringify({
  "message":"completed",
   "Schema ID":schema_ID,
   "Cred ID": credDef_ID 
  }))  
  
})

// API endpoint for credential exchange
app.post('/api/v1/proof_credential', async function(req,res){
  console.log(req.body);
   let proof_cred = req.body['proof_cred'];
   let give_cred = req.body['give_cred'];
   let connection = await vcxwebtools.makeConnection('QR','connection_1',req.body['phonenumber']);
       // create qr code
    let qrcode = qr.image(await connection.inviteDetails(true), { type: 'png' });
    res.setHeader('Content-type', 'image/png');
    res.writeHead(200, {'Content-Type': 'image/png'});
    qrcode.pipe(res);
    io.emit("connection waiting");
   // poll for accepted state of Connection Request
   let state = await connection.getState();
   let timer = 0;
   // set up loop to poll for a response or a timeout if there is no response
   while(state != 4 && timer < 1250) {
       console.log("The State of the Connection is "+ state + " "+timer);
       await connection.updateState();
       state = await connection.getState();
       timer+=1;
   }
   // check for expiration or acceptance
   if(state == 4){
       timer = 0;
       console.log("Connection Accepted!");
       io.emit('connection ready');
      // the proof template below is structured from Village Passport for testing - feel free to create your own.
      // reset global timeout
      timer = 0;
      //offer Proof request for ID
      io.emit('proof requested');
      let proof_state = await vcxwebtools.requestProof(proof_cred,connection);
      console.log("Proof has processed");
      io.emit('proof processing');
      console.log(`state of y proof is ${proof_state}`);
      if (proof_state == 1){
            io.emit('proof valid');
            io.emit('credential offered');
            complete=true;
            vcxwebtools.offerCredential(give_cred,connection);
            io.emit('credential issued');
      }else{
        console.log(`Proof is Invalid`);
        io.emit('proof invalid');
        complete=true;
      }
    }
  })

// expiration global
function ExpireAll(){
  if(complete){
      io.emit('timer expired');
      console.log('global timer expired');
  }
}
setTimeout(ExpireAll,500000);

// polling killer
let killTime = 300000;
let killPolling = false;
let timeUp = function(x){
    if(x){
        io.emit("times up");
        console.log("times up");
        killPolling = true;
    }else{
        killPolling = false;
    }
}

//sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
