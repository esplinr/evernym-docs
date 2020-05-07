# Building VCX CLI Tools - Creating Connections

Connections are mutually authenticated channels of communication in VCX. Creating a connection first involves generating a connection object using LibVCX. This creates a data structure which will generate a name ID and attributes, generated as cryptographic elements that can communicate with another DID. The connection object is a JSON-like data structure, which is generated and offered to another DID through an Agent, which can be a user-oriented wallet app such as Connect.Me, or an enterprise. 

To successfully fulfill a connection between two Identity Owners, there are three key steps.

## Step 1 : Creating a Connection

This function generates a new connection object, as outlined above. This connection object can then be *offered* to any other DID Identity Owner. The connection can be currently accepted by an Identity Owner in one of fourt ways:

1. **QR Code** -- A QR Code is generated with the `invite_details`, as listed above in the data structure. The QR code can be scanned with Connect.Me.
2. **SMS Text** -- An SMS text message is sent to a mobile device with a link that opens the Connect.Me app with the connection request.
3. **Deep Link** -- A web link for mobile browsers can be generated from the `invite_url`, as seen above.
4. **Agent Offer** -- Connection offers can be accepted automatically by a cloud agent when offered through programmatic means.

## Step 2 : Connecting to a User Agent

`connection.connect()` will send the connection request to the SMS number (if this is the method) or enable this DID to be connected by the connection offer, whether through QR, deep web link, or SMS link. The connection offer is extended to the Identity Owner, waiting for their response.

## Step 3 : Polling for Connection State

Connection state is an extension of the VCX state, in which an offer is extended, and reports back the status of that offer (for credentials, proofs, and connections). To determine the state at any point, you must "poll" the Agency server to update the state of the object. IF the state never changes (i.e., the Identity Owner never responds or refuses the connection), the state will not change. For that reason, we highly suggest putting your own expiration code in any connection offer (see coding examples).

## `makeConnection` function

Below is the `makeConnection()` function, which will perform the creation, connection, and polling for state of a connection using Node.js. It has been formatted for insertion into the CLI Module Exports.

```javascript
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
          "use_public_did":false //set to true if you want the connection to be recognized, false if you want to make a new connection each time
        }
        connectionArgs = {data: JSON.stringify(connectionData)};
        await connection.connect(connectionArgs);
        let details = await connection.inviteDetails(true);//true will abbreviate value key names, false will use long names
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
```
## Important Connection Functions

1. This function uses a JSON object to contain the connection `id`, which is a name for the intended connection.

```javascript
    let connection = await Connection.create({id:"alice"})
```

2. The function `connection.connect()` issues the actual request to Connect to Connection. This creates invite details that are then converted into a QR image for Connect.Me to scan, or sent as a deep web link (which will open the Connect.Me app) from an SMS text message.

  * `id` -- The name of the connection (for external databaser use)
  * `connection_type` -- The type of connection (QR or SMS)
  * `use_public_did` -- A Boolean value, which determines if the requester has a public DID and would like it to be recognized by the wallet (Connect.Me) app instead of creating a new connection. 

```javascript
    // create the JSON data for the connection
    connectionData=
    {
        "id":"alice",
        "connection_type":"QR",
        "use_public_did":true
    }
    // formulate the data object for the node wrapper (stringify and use public did)
    // execute the connection offer
    connectionArgs = {data: JSON.stringify(connectionData)};
    await connection.connect(connectionArgs);

```

The following code is the same as above, with the addition of the phone number for an SMS-based connection offer:

```javascript
    // create the JSON data for the connection
    connectionData=
    {
        "id":"alice",
        "connection_type":"SMS",
        "phone":"<insert (US only) mobile phone number here>",
        "use_public_did":true
    }
    // formulate the data object for the node wrapper (stringify and use public did)
    connectionArgs = {data: JSON.stringify(connectionData)};
    // execute the connection offer
    await connection.connect(connectionArgs);
```

3. This  <!--what does "this" refer to?--> will convert the connection data object into a JSON-like data structure for insertion into a database. With this you can read a previously created connection from a local database and re-establish the connection at any time. Connections can be persistent or *ephemeral*, only existing in local memory as long as they are needed to transfer a Credential Offer or a data-share request.

```javascript
    await connection.serialize();
```

4. This <!--what does "this" refer to?-->will convert a serialized connection object into a usable VCX connection for sending data across. This is usually accomplished by reading the serialized connection from a data file.

```javascript
    await connection.deserialize();
```

5. This <!--what does "this" refer to?-->updates the VCX state of the connection object.

```javascript
    await connection.updateState();
```
6. This <!--what does "this" refer to?-->gets the VCX State of the Connection. 

```javascript
    await connection.getState();
```

The possible States are as follows:

* `StateNone` = 0
* `StateInitialized` = 1
* `StateOfferSent` = 2
* `StateRequestReceived` = 3
* `StateAccepted` = 4
* `StateUnfulfilled` = 5 - **Set by Issuer and not by Agency**
* `StateExpired` = 6 - **Set by Issuer and not by Agency**
* `StateRevoked` = 7
* `StateRedirected` = 8

Certain states are not set by the Agency but by the user. If an Identity Owner chooses to ignore the request, or never sees it at all, it is not reported back by design, to provide the maximum level of privacy and security for the Identity Owner.

## Polling the Agency for State

VCX often has asynchronous actions that require waiting for a state to change before moving to the next step. Because an Agency server could be processing multiple requests at once, this request will get put in to a queue and processed when the server reaches that point in the queue. For this reason, there is an unknown quantity of time that will transpire before the status of a Connection Request will change from one state to another.

0. You have not created a connection object : **State = 0 (None)**
1. You create a connection  : **State = 1 (Initialized)**
2. You issue the Connection Request to the Identity Owner : **State = 2**
3. The Identity Owner receives the Connection Request : **State = 3**
4. The Identity Owner accepts the Connection Request : **State = 4**
5. The Identity Owner ignores the request : if a timer is set to expire, the polling will stop and you can set **State = 5 or 6**. Otherwise the polling will continue in perpetuity. This is important, as the state will not change of its own accord until the Issuer changes it manually.

```javascript
    while(state != StateType.Accepted) {
        console.log("The State of the Connection is "+ state);
        await sleep(2000);
        await connection.updateState();
        state = await connection.getState();
    }
```
## Serialized Connection Example

This is the full structure of a serialized connection, as created, connected, and saved through LibVCX:

```json
{
    "version": "1.0",
    "data": {
        "source_id": "connection_1",
        "pw_did": "SnDwvw7QoMJusLJi93mYfZ",
        "pw_verkey": "F3wxKdePpYq4aqGVL5H3NrtuTWH52DNiUYn2LHxqM5xw",
        "state": 4,
        "uuid": "",
        "endpoint": "",
        "invite_detail": {
            "statusCode": "MS-101",
            "connReqId": "YzcyYTQ",
            "senderDetail": {
                "name": "MY_VCX_KIOSK",
                "agentKeyDlgProof": {
                    "agentDID": "Dch9XGZ23wQSc3CaeWQuch",
                    "agentDelegatedKey": "7soEVDHMdsJiWv6VHXHKbgf42HZsTAAyeA16MKY9yp4Q",
                    "signature": "djOaWF3xyn8q2rmftTQjZX6v7d9W2QBqcqhpdTZ5VkdPOddPPURLfU/GIxw8VslGkEbIOSOuQINTt+CVgBcNBw=="
                },
                "DID": "SnDwvw7QoMJusLJi93mYfZ",
                "logoUrl": "https://s3.us-east-2.amazonaws.com/static.evernym.com/images/icons/cropped-Evernym_favicon-trans-192x192.png",
                "verKey": "F3wxKdePpYq4aqGVL5H3NrtuTWH52DNiUYn2LHxqM5xw",
                "publicDID": "M9tg47pCMgisfNwSRzRtAv"
            },
            "senderAgencyDetail": {
                "DID": "UNM2cmvMVoWpk6r3pG5FAq",
                "verKey": "FvA7e4DuD2f9kYHq6B3n7hE7NQvmpgeFRrox3ELKv9vX",
                "endpoint": "52.26.236.159:80/agency/msg"
            },
            "targetName": "there",
            "statusMsg": "message created",
            "threadId": null
        },
        "invite_url": "https://eas01.pps.evernym.com/agency/invite/Dch9XGZ23wQSc3CaeWQuch?uid=YzcyYTQ",
        "agent_did": "Dch9XGZ23wQSc3CaeWQuch",
        "agent_vk": "7soEVDHMdsJiWv6VHXHKbgf42HZsTAAyeA16MKY9yp4Q",
        "their_pw_did": "3XoSVzteCyB5yUez4imh9W",
        "their_pw_verkey": "2P1fDvH9JpBuJo6EbobWJoFUZeuUy2ij1HfMWpp3nejk",
        "public_did": "V5ipGZhPeQ5B86nQUMWiUV",
        "their_public_did": null
    }
}
```
## Connection Redirects

If a Connection Invitation is extended to the Connect.Me user, and that user already has a connection with this particular enterprise, what happens? As with a traditional login situation, the user will take one of two paths when establishing a relationship with a service provider; register or log in. The initial connection invitation is like “registration,” whereas the connection redirect is like “logging in.” The first time a user connects with an enterprise, they will scan a QR code or use a deep link and accept the invitation, after which the connection is created and they have a unique channel through which to send information. 

If the Connect.Me user returns to the service provider web site, how can they log in and receive access or credentials? Any time a Connect.Me user accepts a Connection Invitation for a connection DID that already exists in their wallet (provided the original connection data has `use_public_did` set to `true`), a new state of `Redirected`, or integer value 8 will be returned. The connection data will then have `redirect details` added to the data object, within which will contain a key named `theirDid`, which can be matched to the saved connection data on the enterprise server in a key named `their_pw_did`. Once these values are matched, the connection can be deserialized and used to transmit Credential Offers, Proof Requests, or Structured Messages.

### Requirements for Connection Redirect

1. Libindy/LibVCX version stack (minimum): 1.12.0 / 0.4.64203032-b6f70b9
2. The original Connection Invitation must have the connection arguments parameter `use_public_did` set to `true`.
3. This `vcx-config.json` key value must exist: `"use_latest_protocols" : "true"`
4. The enterprise server must save connection serialized data into a searchable database.
5. Th server code from the connection inviter must be set up to check for the new `Redirected` state (8).
6. Upon detecting a redirection, `connection.getRedirectionDetails()` must be called and the value used to search existing connection data for a matching DID value. `TheirDid` from redirect details should be the same as `their_pw_did` from the serialized connection data.
 
### Sequence of Events
 
1. The Connect.Me user accepts a Connection Invitation from an enterprise that is using a public DID with the correct configuration values.
2. The Connect.Me user returns to site and accepts another invitation from the same DID. The Connect.Me app notifies the user that this connection already exists and return a state of 8 (Connection Redirected) from the Agency along with redirect details about the connection object.
3. The enterprise uses `connection.getRedirectedDetails()`, which returns the public DID information from the Connect.Me user
4. The enterprise searchs through their database for connections containing the unique DID matching the redirect details. Once that serialized data has been identified, it can be deserialized and converted into a connection object that can be used to send offers, requests, and messages through.

### Full Connection Redirect Process

Below is an example of the connection redirect process, with supporting functions:

```javascript
    async function make_connection_with_redirect(){
    ``    let connection = await makeConnection('QR','connection_1',req.body['phonenumber'],true);
        // create qr code
        let qrcode = qr.image(await connection.inviteDetails(true), { type: 'png' });
        qrcode.pipe(`qr-invite.png`);
        // poll for accepted state of Connection Request
        let state = await connection.getState();
        let timer = 0;
        // set up loop to poll for a response or a timeout if there is no response
        while(state != 4 && state != 8 && timer < 1250) {
            console.log("The State of the Connection is "+ state + " "+timer);
            await sleep(2000);
            await connection.updateState();
            state = await connection.getState();
            timer+=1;
        }
        timer=0;
        // check for expiration or acceptance
        if(state == 4){
            timer = 0;
            connection_id+=1;
            await storeConnection(connection, connection_id);
            // reset global timeout
            timer = 0;
            offerCredential(give_cred,connection);
            complete=true;
        }else if(state == 8){//check for redirected state
            timer = 0;
            await connection.updateState();
            state = await connection.getState();
            // reset global timeout
            timer = 0;
            // get the redirect details
            let redirected_details = await connection.getRedirectDetails();
            // search and return name of Connection data with matching public DID
            let redirected_connection = await searchConnectionsByTheirDid(redirected_details);
            // deserialize connection return
            // offer cred to old connection
            if(redirected_connection != false){
            offerCredential(give_cred,redirected_connection);
            }else{
            //no connection found
            }
            complete=true;
        }
    }
    async function makeConnection(type,name,phonenumber,public){
        let connectionData ={};
        let connectionArgs={};
        let connection = await Connection.create({"id":name});
        connectionData=
            {
            "id":name,
            "connection_type":"QR",
            "use_public_did":public
            }
            connectionArgs = {data: JSON.stringify(connectionData)};
            await connection.connect(connectionArgs);
            return connection;
    }
    async function storeConnection(connection,name){
        let serialized_connection = await connection.serialize();
        let n = 0;
        let file_list = readFilesSync('../data/');
        for(let f of file_list){
            if(f.name.includes('connection')){
            n+=1;
            }
        }
        await fs.writeJSON(`../data/${n+1}-connection.json`,serialized_connection);
        return serialized_connection;
    }
    async function searchConnectionsByTheirDid(redirected_connection){
        // search connection data for connection DID
        let info = JSON.parse(redirected_connection);
        let did = info['theirDID'];
        const directoryPath = `../data/`;
        let file_list = readFilesSync(directoryPath);
        for(let f of file_list){
            if(f.name.includes('connection')){
            let cFile = await fs.readJSON(`../data/${f.name}${f.ext}`);
            if(cFile['data']['their_pw_did']==did){
                connection_file_name=f;
                let redirected_connection = await getConnection(f.name.replace("-connection",""));
                return redirected_connection;
            }
            }
        }
    return false;
    }
    make_connection_with_redirect();
```

## CLI Tools Use

With `makeConnection()` you can choose SMS or QR code connections. QR code connections will save a PNG image file named `<connection_name>-connection.png`.

```bash
    node VCXTools.js makeConnection SMS alice 9999999999
```

## Common Execution Errors
{: style="color: red"}

### Invalid Wallet Handle
{: style="color: red"}

An Invalid Connection Handle Error when creating the connection object is generally a result of having a mismatched wallet and `vcx-config.json` file data. If for some reason you re-provision your wallet but fail to update your configuration file, this will report an error.

```python
    UnhandledPromiseRejectionWarning: Error: Invalid Wallet or Search Handle
        at Function
```