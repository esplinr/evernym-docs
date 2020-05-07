# Building VCX CLI Tools - Credential Definitions

Build your Credential Definition and write it to StagingNet.

## Credential Definitions

Credential Definitions define a credential from a specific institutional DID. A Credential Definition is a definition for a signed digital document that gets transferred from an Issuer to an Identity Owner. It defines the parameters of a credential for several keys. There is often some confusion between a *schema*, which was covered in the previous module, and a *credential definition*. A Credential Definition, unlike a schema, is written to the ledger from a *specific* DID and can only be issued from that DID. So while a Credential Definition uses a credential schema to define the attributes that will be included in it, the Credential Defintion is a separate object with its own address on the ledger, and must be created and written separately from the schema. This process must be completed in the proper order.

## Wallet Records

Credential Definitions create records in the local wallet of the institution defining them. Therefore one institution with a unique DID could not issue a credential from another DID. This is most likely to happen in testing, when you re-provision an instance of VCX and it randomly generates a new DID (if you did not re-use an enterprise seed to re-provision the wallet). If you try to recreate and issue a credential, your LibVCX code will generate an error because it will not find a match between the Credential Issuer and the Credential Definition. If this happens to you during your code development, you can fix this problem by re-creating the Credential Definition. 

1. Install and provision your VCX instance.
2. Create the data for the Credential Schema (as a JSON file)
3. Write the schema to the ledger (the schema ID will be written to `schema.json`)
4. Create the Credential Definition data as a JSON or other data format
5. Write the Credential Definition to the Ledger.
6. Serialize and save the Credential Definition to `./data/` to retrieve it for later use.

## Credential Definition Data Structure

In this example the Credential Definition structure is hard coded, but it could be imported from a file or database of your choice.

```json
{
    "name": schema_name,
    "paymentHandle": 0,
    "revocation": false,
    "revocationDetails": {
        "tailsFile": "tails.txt",
    },
    "schemaId": "<schema ID from Ledger>",
    "sourceId": "<use your own internal source ID for Cred Def>"
}
```
    
## Credential Definition
    
The Credential Definition is created based upon the credential schema, which you should have already created. The important item from the schema file, which has been saved as `./data/name-schema.json`, is the Schema ID. The `schema_data.schemaId` is a keypair value added in the `createSchema` function to the `schema.json` file. 

## Revocation

As of versiom 1.8.2, revocation is not yet implemented. Future versions will provide the ability to revoke credentials, so for now the revocation value must be set to `false`.

## Sample Credential Definition Function

This function is formatted for insertion into the Module Exports for CLI use. It has a single argument, which will be the name of the credential definition, based upon the name of the schema, from which it builds the Credential Definition.

```javascript
    async function createCredentialDef(schema_name){
        await vcx.initVcx(config);
        let schema_data = await fs.readJson(`./data/${schema_name}-schema.json`);
        console.log(schema_data.schemaId);
        console.log('creating credential definition');
        const data = {
            name: schema_name,
            paymentHandle: 0,
            revocation: false,
            revocationDetails: {
                tailsFile: 'tails.txt',
            },
            schemaId: schema_data.schemaId,
            sourceId: schema_data.sourceId
        };
        let credentialDef = await CredentialDef.create(data);
        let ser_CredDef = await credentialDef.serialize();
        console.log(ser_CredDef);
        let credDefId = await credentialDef.getCredDefId();
        await fs.writeJson(`./data/${schema_name}-credential-definition.json`,ser_CredDef);
        console.log(`Congratulations! Your Credential Definition was written to the Ledger and the id is : ${credDefId}`);

    }
```
## Explanations of Individual Wrapper Functions

1. Initialize VCX:

```javascript
    await vcx.initVcx(config);
```

2. Read schema ID data:

```javascript
    let schema_data = await fs.readJson(`./data/${schema_name}-schema.json`);
    let schemaId = schema_data.schemaId;
```

3. Create a Credential Definition from a data object:

```javascript
    let credentialDef = await CredentialDef.create(data);
```

4. After the Credential Definition is written to the ledger, you will serialize and write it to a separate file for retrieval when building a Credential Offer:

```javascript
    let ser_CredDef = await credentialDef.serialize();
    let credDefId = await credentialDef.getCredDefId();
    await fs.writeJson(`./data/${schema_name}-credential-definition.json`,ser_CredDef);
```

## Common Execution Errors
{: style="color: red"}

### Invalid Data Structure
{: style="color: red"}

1. Incorrect Data structure -- If any of the data structure of the Credential Definition are missing or incorrect, an error will occur. Below is an example of a correct data structure:
        
```javascript
const data = 
{
    name: schema_data.name,// derived from the ./data/name-schema.json file
    paymentHandle: 0,
    revocation: false,
    revocationDetails: {
        tailsFile: 'tails.txt',
    },
    schemaId: schema_data.schemaId,// derived from the ./data/name-schema.json file (after the schema has been successfully written to the ledger)
    sourceId: schema_data.sourceId// derived from the ./data/name-schema.json file
};
```

### Duplicate Credential Definition
{: style="color: red"}

You cannot currently write more than one Credential Definition from a single DID with the same Schema ID. This means that if you try to rewrite a Credential Definition with the same Schema ID from the same DID, you will get an error message.

```bash
    { Error: Cannot create, Credential Def already on ledger
        at Function.<anonymous> (/vagrant/node_modules/node-vcx-wrapper/dist/api/credential-def.js:71:23)
        at Generator.throw (<anonymous>)
        at rejected (/vagrant/node_modules/node-vcx-wrapper/dist/api/credential-def.js:5:65)
     at <anonymous> inheritedStackTraces: [], vcxCode: 1039 }
```

### DID not registered on Staging Net
{: style="color: red"}

If you have forgotten to request that your DID be registered on StagingNet for write permissions, or for some reason it was not done, you will get an error when attempting a schema write or Credential Definition write. Unfortunately, this error message is not specific, but it will look as follows:

```bash
    { Error: Invalid JSON string
        at Function.<anonymous> (/vagrant/node_modules/node-vcx-wrapper/dist/api/schema.js:64:23)
        at Generator.throw (<anonymous>)
        at rejected (/vagrant/node_modules/node-vcx-wrapper/dist/api/schema.js:5:65)
        at <anonymous> inheritedStackTraces: [], vcxCode: 1016 }
```

If you receive this error, attempt to re-register your DID on StagingNet by following the instructions [here](/portal/training/install-and-provision-libvcx/05/)