# VCX Web Tools

In the tutorial "VCX CLI Tools", we created a script named "vcx-cli-tools.js", which contains the main Credential Exchange functions as actions, including the polling of State as it is reported back and updated by the Agency Service. If we import this script into the Express Server, we can perform any functions from VCX inside of the API endpoint we are listening for. 

In the vcx-cli-tools.js code, we used a *file*-based system to store and read data, and we executed each step of a Connection, Credential Offer, Proof Request, and Structured Message2 as individual actions. In the real world, this sequence would be executed in a series of automated actions from some type of messaging system (in this case a REST-like API) to iniate the sequence in conjunction with Connect.Me as the wallet application. [vcx-web-tools.js] is a very similar script as vcx-cli-tools, but there are some minor modifications that adapt it for use with a persistent, automated Credential Exchange toolset for use with Node Express server. 

1. Instead of drawing from file-based json data, credentials and proof requests are structured with hard-coded values through arguments to the vcx-web-tools.js functions. This allows you to draw the data from the VCX objects (like Credentials, Connections, and Proofs) as well as through any external database you choose. 
2. Each object type (connection, schema, credential definition, credential offer, proof request) is returned as a value by each function. This allows you to derive any information you want from the generated value.
3. Polling is handled in the vcx-web-tools.js functions, with the exception of the Connection request, which is a dependency for all other actions involving transfer of data between one party and another.

## List of VCX functions from vcx-web-tools.js

1. **makeConnection** - makes a connection to a wallet holder through Connect.Me (or othe Sovrin-enabled wallet app). This function can create the Connection through QR, SMS (US phone numbers only) or Deep Link (for mobile users accessing the client web site through a mobile browser)
2. **testVCX** - this tests the VCX installation and provisioning (useful for error handling in production code)
3. **createSchema** - writes a schema to the Ledger
4. **createCredentialDef** - writes a Credential Definition to the Ledger
5. **offerCredential** - offers a Credential to an Identity Holder and then issues it if accepted
6. **requestProof** - offers a Proof Request to an Identity Holder and returns a proof with a valid or invalid state
7. **askQuestion** - uses structured messaging (linbindy version must be 1.8.2 or greater) to ask a question and parse the response for that question

## Example API - Create Schema and Credential Definition.

In the example below, a schema is written to the Ledger for use in a credential definition, and subsequently the credential definition is written with that schema. If you want to pass the schema data from a web-based form (for use in a web GUI similar to Verity UI), the req.body can contain your schema attributes and data fields. This example illustrates how to execute a simple action from a REST endpoint. This is considered a simple action because while it writes to the Ledger and imports the vcxwebtools.js components, it operates without communication with another Agent (Connect.Me user), and thus doesn't require a "flow" architecture, in which one operation occurs dependent upon another in a sequence of events (more on this later).

```javascript
#!/usr/bin/env node
// imports
var cors = require('cors');
var qr = require('qr-image');
var fs = require('fs-extra');
var express = require('express');
var session = require('express-session');
const bodyParser = require('body-parser');
var vcxwebtools = require('vcx-web-tools.js');// import vcx-web-tools.js

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
app.post('/api/v1/defineCred', async function(req,res){

    let schema = await vcxwebtools.createSchema(schema_name); // returns a schema with the Ledger schema_id added to the json data file
    let credDef = await vcxwebtools.createCredentialDef(schema_name); // writes a credential definition to the Ledger using the data from the previously written schema
    
})

```

