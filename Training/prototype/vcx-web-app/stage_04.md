# Creating a VCX Credential Exchange Flow

In order to create a successful VCX Web App, you must first outline the sequence of events that will take place when the User or Identity Holder reaches the web site and clicks on a button with the intent to enact a process. That process will begin with the Connection (which will be in QR, SMS or Deep Link form), in which the mutually authentiucated encrypted connection channel is created between the 2 entities (Enterprise Agent and Consumer Agent). Once the Connection is complete, several options are avaulable.

1. Connection - initial process, wherein the Connection is generated between 2 parties
2. Credential Offer - an Offer and Issuance of Credential to Identity Holder
3. Proof Request - a request for specific data from specific credentials and specific DID Issuers (can be valid or invalid)
4. Structured Message/Question - a specific question, eliciting a specific response from a consumer Agent using Connect.Me.

The order in which you perform these processes, with the exception of the Connection (which must always be first), is up to you and your personal use-case. A typical use case would be:

1. Connection *(always happens first)*
2. Proof request
3. If the proof is validated, offer Credential (from previously created Credential Definition)


## Creating Connections

As previously mentioned, a Connection can be made between an Enterprise Agent and a Consumer Agent (using Connect.Me) in one of 3 ways:

1. **QR** code - a QR code will be generated from a JSON object with invitaion details
2. **SMS** (US phone numbers only) - an SMS text will be sent to the user mobile number, with a Deep Link embedded into it which will open Connect.Me and generate the Connection request.
3. **Deep Link** - If the Identity Holder is using a mobile web browser (such as Safari on an iPhone), a Deep Link will be displayed which will open the Connect.Me app and generate the Connection Request.

For the sake of simplicity, the QR code will be the only available option in the vcx-server.js and vcx-web-tools.js code. 

1. 'type' : 'QR', 'SMS' (Deep link will be auto-detected based upon a mobile browser detection variable)
2. 'name' : string value
3. 'phonenumber' : string value (if this is a US area code number the 7-digit string should be used in the format '999-9999'. If you are not using SMS as your type of Connection this can be any length or value)


The following code is written to create and configure the Connection request, which is returned as an object from vcxwebtools.makeConnection(). The invitation details from this request are then piped through the REST API as a response body, which will be converted into a QR code on the other end (see client content later in this tutorial). The connection request is the only place in this code structure where you will have to poll the Agency Service for the state of the Connection, which will indicate whether the Connect.Me user has accepted the Connection. No Credential Exchanges or Structured Messages can be exchanged without first establishing that Connection. The Connection is a unique case for the VCX Server because it is the only data you will be sending back through the http response to the client. All other Credential Exchanges between the Connect.Me user and your VCX Server will be sent through the direct Connection.

```javascript
#!/usr/bin/env node
// imports
var cors = require('cors');
var qr = require('qr-image');
var fs = require('fs-extra');
var express = require('express');
var session = require('express-session');
const bodyParser = require('body-parser');
var vcxwebtools = require('./vcx-web-tools.js');// import vcx-web-tools.js

// set up app express server
const PORT = 5000;
const app = express();
app.use(session({secret: "Secret Key"}));
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
app.post('/api/v1/QRConnection', async function(req,res){
  let connection_name = req.body['name']; // assuming the request contains the name of the prospective connection
  let connection_phonenumber = req.body['phonenumber']; // assuming the request contains the phonenumber of the prospective connection
  let connection = await vcxwebtools.makeConnection('QR', name, connection_phonenumber);
  let qrcode = qr.image(await connection.inviteDetails(true), { type: 'png' });
  res.setHeader('Content-type', 'image/png');
  res.writeHead(200, {'Content-Type': 'image/png'});
  qrcode.pipe(res);
  console.log("completed qr export, waiting for approval from target");
  let state = await connection.getState();
  while(state != StateType.Accepted) {
    console.log("The State of the Connection is "+ state);
    await connection.updateState();
    state = await connection.getState();
  }
  console.log('connection request accepted and complete'); // once the Connection has been accepted and the state updated, the code below should use this connection object to send credential offers and proof requests offers

  // send a proof request

  // issue a credential offer

})
```

## Proof Requests

Once you have established a Connection with a Connect.Me user, what is the next step?  The VCX flow architecture most commonly used in this process is connection -> proof request -> credential offer. This means that your sequence of events is to establish the Connection, validate Proof of a Credential from a specific Issuer, and if that Proof is validated, you will then issue a Credential offer. If the offer is accepted by the user, you will then *issue* the Credential.

The Proof Request data structure is formed below in the proof_template variable (which previsouly was saved in a json format from the VCX-CLI-Tools) which is fed into the vcxwebtools.requestProof() function.

The Proof Request is formed and sent to the Connection, using Connect.Me. If there are any values that are missing in the Identity Holder's Wallet, the User will be given the opportunity to "self-attest" a credential or claim. Currently any self-attested claims that are sent as a Proof Response will be accepted as valid *unless* you specify otherwise. 

```javascript
#!/usr/bin/env node
// imports
var cors = require('cors');
var qr = require('qr-image');
var fs = require('fs-extra');
var express = require('express');
var session = require('express-session');
const bodyParser = require('body-parser');
var vcxwebtools = require('vcx-web-tools.js');

// set up app express server
const PORT = 5000;
const app = express();
app.use(session({secret: "Secret Key"}));
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
  console.log(req.body);
   let proof_cred = req.body['proof_cred'];// retrieves the name of the provable credential
   let give_cred = req.body['give_cred'];// retrieves the name of the credential to issue based upone valid proof
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
      let proof_state = await vcxwebtools.requestProof(proof_cred,connection);// returns a proof state value
      console.log("Proof has processed");
      io.emit('proof processing');
      console.log(`state of this proof is ${proof_state}`);
      if (proof_state == 1){
            io.emit('proof valid');
            io.emit('credential offered');
            complete=true;
            vcxwebtools.offerCredential(give_cred,connection);// offer and issue the givable credential
      }
    }
  })
```

## Checking for Self-Attested Claims

In Connect.Me, when attributes from Credentials are specified in the Proof Request as only being acceptable from a single Credential Issuer DID, the mobile app will still let you attempt to "self-attest" a data field. Currently the Proof will read as valid, *even if the proof request specifies an issuer DID*. This is a current limitation and bug which is in the process of being fixed, however there is a work-around for weeding out self-attested claims by peering into the returned serialized proof data structure (more on this in later tutorials on complex proofs). The code below is in the vcx-web-tools.js provided, but it would be possible to alter it in order to weed out specific self-attested claims but allow others! For instance, you can accept a self-attested claim for *some* attributes but not for others. For instance, you may want to accept the field "home address" from the Identity Holder as a self-attested claim but the field "business address" only coming from a Credential issued by a specific Issuer DID (such as the Chamber of Commerce). In the following case the code is simplistic, in that it checks for *any* self-attested claims that exist, and if it finds even one it will invalidate the entire proof. This isn't necessary, and you can feel free to alter the code as you wish in order to search the JSON object for more specific terms.

```javascript
let pdata = await proof.serialize();
console.log("Checking for self-attested claims");
let libindyproof =  pdata['data']['proof']['libindy_proof'];
let json_lbp = JSON.parse(libindyproof);
let self_attested_attrs = json_lbp['requested_proof']['self_attested_attrs'];
console.log(self_attested_attrs);
if(Object.keys(self_attested_attrs).length > 0){
    console.log("Proof is NOT Valid or contains self-attested values");
    proof_state = 2;
    return proof_state;
}else{
    proof_state = 1;
    return proof_state;
}
```

## Credential Offer and Issuance

Once the Proof has been validated, you can choose at that point what you want to do. *If* the Proof is a predicate for a Credential Issuance, the next step would be to issue a Credential Offer. But the result of a successful Proof validation can be anything; access to a web portal, access to a vehicle or automated door, or some other action on the individual's behalf, such as a financial transaction.

```javascript

 if (proof_state == 1){
            io.emit('proof valid');
            io.emit('credential offered');
            complete=true;
            vcxwebtools.offerCredential(give_cred,connection);// offer and issue the givable credential
      }

```

The code above will offer a Credential to a user, built upon the following data:

1. Credential Definition - Based upon the file data system of this Toolkit, the credential-definition.json file will be based upon the give_cred variable, which is the name of the credential to issue. For instance, if you send the request with a body including "give_cred":"employee", the Credential Issuer function will load the file "employee-credential-definition.json"