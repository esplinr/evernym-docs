## Credential Village Platform Sample Code (NodeJS)

Once you have gone through the Credential Village workflow and received your credentials, it will be much easier to build your demos or prototypes to code against the credentials in your wallet through Connect.me.

### Sample 1 : Simple Proof Request

In this example, we will Connect to your Connect.me Identity and request verification of your passport. The stages of this code are as follows:

1. VXC initialize
2. Connection Request created through QR code
3. Connect.me user (with Passport Credential) scans the QR code.
4. Server polls agency for Connection Request acceptance (including timeout to prevent endless polling in the event of a denial)
5. If Connection Request is accepted, issue Proof Request for Passport Credential
6. If you do NOT have a Village Passport, Connect.Me will give you the opportunity to "self-attest" the requested data and send it to the Proof Requester. The code in the script will consider this invalid, and report this to the console.
6. If Passport Proof Request is validated, the validation will print to the console.
7. IF Proof request is invalid (i.e., they do not have this Credential from this Issuer DID or self-attest an item) the request will print to the console as invalid.

You should have Libvcx installed (See the 'Install and Provision' Tutorial) into a directory in your Vagrant VM with a 'config' directory and a 'data' directory in the root dirtectory where you plan to run your scripts. The following code will work as is if you run it in the root directory of your VCX installation and have gone through the Credential Village workflow and received your Village Passport Credential. When you run this script, it will generate a QR code and save it to 'data/name-connection.png'. In order to move the process to the Proof, you must scan the QR code with Connect.Me and accept the Connection Request.

```javascript
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
```
## Using the verify.js script for The Credential Village

Save the above script code as "verify.js" in your root code directory (with your config and data directories in the same folder/dir). Then you will run the script, scan the resulting QR code, and after acccepting the Connection Request, you'll receive a Proof Request for you Village Passport. If you have it, the Proof will return valid and if you do not, Connect.Me will offer you the chance to "self-attest" this value. If you self-attest the value and return the Proof Request, it will report a Not Valid status. If you do have the Passport, issued from the correct Issuer DID, you will receive a report of Proof Valid.

## Example Use

```bash

node verify.js verifyPassport joe

The State of the Connection is 2
The State of the Connection is 2
The State of the Connection is 2
The State of the Connection is 2

The state of the proof is 2
The state of the proof is 2
The state of the proof is 2
The state of the proof is 2
The state of the proof is 2

You issued a Proof request to joe but it was not valid.

```