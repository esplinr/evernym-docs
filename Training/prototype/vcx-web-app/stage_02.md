# Building the VCX-Server

The vcx-server.js is the server engine that runs on your Ubuntu instance, establishing a REST endpoint for your GET and POST requests, within which you can execute any VCX-based Credential exchange code you please.

## Setting Up NodeJS Express Server

NodeJS Express is a set of tools that allow you to run a REST-based server at a specific endpoint, which will listen for GET and POST requests from any requesting agent, and send back a response to the requester. You can also use this server to initiate a sequence, or "flow" of VCX actions in order to exchange a set of Credentials between a Connect.Me user (or any other Sovrin-enabled Wallet App) and the server, without any manual confirmation. This is a client/server Credential Exchange relationship, which is a common use-case for demos and prototypes. 

Template vcx-server.js script:

```javascript

#!/usr/bin/env node

// imports
var cors = require('cors');
var qr = require('qr-image');
var fs = require('fs-extra');
var express = require('express');
var session = require('express-session');
const bodyParser = require('body-parser');
var vcxwebtools = require('./vcx-web-tools.js');// vcx web tools module

// set up app express server
const PORT = 5000;
const app = express();
app.use(session({secret: "SecretKey"}));
app.use(bodyParser.urlencoded({ extended: false }));
const server = require('http').Server(app);

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

// API endpoint
app.post('/api/v1/proof_credential', async function(req,res){
  
  // insert VCX flow below

    // make connection

    // proof request to Connect.Me user (is proof valid?) yes ->

    // credential offer to Connect.Me user (did they accept?) yes ->

    // issue credential

    // send response to requester
    let response = {
      "reponse text" : "response",
      "time" : new Date.now()
    }
    res.send(response);

})


```

### VCX-Server notes

1. **app.post('/api/v1/proof_credential', async function(req,res){})** - You will need to put all of the VCX-based code inside this function, which will execute when a POST request is sent from a client.
2. **const PORT = 5000** - each express app will run on a specific port, which can be set as a constant.

Any request to this REST endpoint will initiate the code in the Express server script, and if so desired will send back a response to the requester. This will be of utmost importance when we create a Connection with a Connect.Me user through a QR code or a Deep Link for mobile browsers. The response from the request will be an inviteDetails object, which includes the QR code or link data to make the Connection with the Identity Owner or Connect.Me user.
