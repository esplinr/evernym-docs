# Building VCX CLI Tools -- Credential Issuance

## The Credential Exchange Process

The Credential Exchange Process must be occur in a specific order.

1. Write Credential Definition to ledger [(see previous module)](/portal/training/vcx-cli-tools/nodejs/04/)
2. Establish connection to Identity Owner [(see previous module)](/portal/training/vcx-cli-tools/nodejs/05/)
2. Create/Access data for credential schema fields (this can be hard-coded or from a database/datafile)
3. Create credential object 
4. Issue Credential Offer to user
5. Poll for Credential Offer state to become `Acccepted` (which occurs when the Identity Holder accepts the Credential Offer)
6. Issue the credential to the user

## Credential Data

To create a credential object, you must generate a data file with the keypair values *named exactly as they are in the schema* and associated with data values. Create a new file named `alice-employee-data.json` in `data/` in your root code directory.

```bash
    vim data/alice-employee-data.json
```

Enter the data structure (or paste it) from the following JSON:

```javascript
{
    "attrs":{
        "FirstName":"Alice",
        "LastName":"Ford",
        "ID":"20202020",
        "Phone":"999-999-9999"
    }
}
```

> **NOTE:** *Make sure* the names of the data fields are *exactly* like the schema data fields; otherwise, you will still be able to build the credential but issuing it will fail. As of this writing (Apr 2020), only string values are allowed for these fields. 

## Creating a Credential

The first step in issuing a credential is to create the credential object, as shown below:

```javascript
    // open credential definition file, deserialize it, and then derive the cred_def_handle from the deserialized data
    let cred_def_serialized = await fs.readJSON(`.data/${credName}-credential-definition.json`);
    let cred_def_deserialized = await cred_def_serialized.deserialize();// converts serialized data back into Credential Definition Object
    let cred_def_handle = await cred_def_deserialzed.handle;
    let credential = await IssuerCredential.create(
    {
        "sourceId":"1",
        "credDefHandle": cred_def_handle,
        "attr": credential_data.attrs,
        "credentialName":cred_def_serialized.data.name,
        "price": "0"
    }
    );
```
The arguments for this are explained as follows:

* `attr` -- Contains the attributes from `alice-employee-data.json` key names `attrs`
* `sourceId` -- Derived from the Credential Definition key `data.source_id` in `employee-credential-definition.json`.
* `credDefHandle` -- Derived from the Credential Definition key `data.handle` in the *deserialized* `employee-credential-definition.json` file.
* `credentialName` -- Derived from the Credential Definition key `data.name` in `employee-credential-definition.json`.
* `price` -- A placeholder for the price of the credential, should there be one. It is set to 0 for this version. <!--Which version?-->

## Issuing a Credential Offer

Once the credential object has been properly created, you will issue the offer to the user through the connection. In this case, you will be creating the connection first from the serialized file created during the original credential creation [in connection creation](/portal/training/vcx-cli-tools/nodejs/05/). You should have a file named `name-connection.json`, which you will use to deserialize and create the connection object.

Load the connection from data: 

```javascript
    let connection_data = await fs.readJson(`./data/${connection_name}-connection.json`);
    let connection = await Connection.deserialize(connection_data);
```

Credential Offer:

```javascript
    await credential.sendOffer(connection);
```

## Polling for State

Once the credential is created, you will need to poll the Agency for the state of the Credential Offer (just as you did with the Connection Request). The Agency server puts each request and response into a queue, which updates the state of each request as it resolves them. Just like the Connection request, the state of the action will be updated and changed by the Agency when it occurs.

`updateState` updates the state of the Credential Offer from the Agency server. (It does not return a value, however.)

```javascript
    await credential.updateState();
```
`getState` gets the state of the Credential Offer, returning the value of the updated state.

```javascript
    let state = await credential.getState();
```
The possible states are as follows:

* `StateNone` = 0
* `StateInitialized` = 1
* `StateOfferSent` = 2
* `StateRequestReceived` = 3
* `StateAccepted` = 4
* `StateUnfulfilled`= 5 - **Set by Issuer and not by Agency**
* `StateExpired` = 6 - **Set by Issuer and not by Agency**
* `StateRevoked` = 7

Note that the states `VcxStateUnfulfilled` and `VcxStateExpired` aren't actually set by the Agency (and will never be returned as such). These states are left up to the Credential Issuer to alter as they see fit, based upon expiration times or as unfulfilled if there was no response to the offer. The Identity Owner, either as a Connect.Me user or another enterprise Agent, must accept the offer. If they choose *not* to accept this offer, it is up to the Issuer Agent to set the state to Unfulfilled, to keep a record of it for their database for any internal purpose necessary. (This data is saved in the Credential Offer object if you choose to serialize it.)

Loop for poll:

```javascript
    while(state != StateType.StateAccepted) {
        console.log("Offer Sent, The State of the Credential Offer is "+ state);
        await sleep(2000);
        await credential.updateState();
        state = await credential.getState();
    }
```

The loop for the poll keeps checking the Agency service until the state is accepted. If you want to kill the polling after a certain time limit (and you should) a global timeout variable can be created.

## Sending Credentials

Once you confirm that the user has accepted the credential, you will issue the it to them. This is a separate process from the offer, because you may want to make the issuance contingent upon some circumstance or payment, such as withholding a college transcript from a student who owes the university unpaid fines or tuition fees. In this case, a credential of Good Financial Standing can be issued to the former or current student and thusl veified in the same transaction as offering and issuing them a transcript credential. If the credential for Good Financial Standing is not proved or held, the transcript credential will not be issued to them.

Send the credential to the connection:

```javascript
    await credential.sendCredential(connection);
```

## Serializing and writing Credential

You may want to keep records of each credential issued to a user. In this case, you will serialize the credential object and save it to a data format of some kind. At any point you can deserialize this credential and re-offer it to an Identity Owner in case it is lost at some point. This example shows how to serialize the credential data and write it in JSON format.

```javascript
    let serialized_offer = await credential.serialize();
    await fs.writeJson(`./data/${connection_name}-${credential_name}-credential.json`);
```

## offerCredential function

This function is formatted for Module Export, as part of your `vcx-cli-tools.js` code. You can copy it and insert it into your script.

```javascript
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

```

## CLI Use Example

With the following files in your data directory, you can use the CLI client to send the Credential Offer to your Connect.Me mobile app.

* `alice-connect.json`
* `alice-employee-data.json`
* `employee-credential-definition.json`

```bash
    node VCXTools.js offerCredential employee alice
```

## Common Execution Errors
{: style="color: red"}

### Invalid Option
{: style="color: red"}

```bash
{ Error: Invalid Option
    at Function.<anonymous> (/vagrant/node_modules/node-vcx-wrapper/dist/api/issuer-credential.js:61:23)
    at Generator.throw (<anonymous>)
    at rejected (/vagrant/node_modules/node-vcx-wrapper/dist/api/issuer-credential.js:5:65)
    at <anonymous> inheritedStackTraces: [], vcxCode: 1007 }
```

This error often occurs when you have some form of data in your credential creation that is incorrect or invalid. For instance, if your `alice-employee-data.json` file is not correct and the `attrs` data is not loaded properly, it will throw this error.

### Invalid Structure after accepting in Connect.Me
{: style="color: red"}

```bash
{ Error: Object (json, config, key, credential and etc...) passed to libindy has invalid structure
    at IssuerCredential.<anonymous> (/vagrant/node_modules/node-vcx-wrapper/dist/api/issuer-credential.js:162:23)
    at Generator.throw (<anonymous>)
    at rejected (/vagrant/node_modules/node-vcx-wrapper/dist/api/issuer-credential.js:5:65)
    at <anonymous> inheritedStackTraces: [], vcxCode: 1080 }

```

The attribute fields in the schema, Credential Definition, *and* credential data must all match *exactly* or there will be an error thrown when attempting to issue the credential. This is confusing because the error is not specific, and it only occurs *after* the credential has been built, offered, and accepted in Connect.Me. The Credential Offer goes to the user, is accepted by the user, but the credential cannot be issued because the field names are incorrect and not matching the credential object.