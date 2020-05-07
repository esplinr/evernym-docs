# Building VCX CLI Tools - Credential Definitions

This section will show you how to build a Credential Definition from a schema.

## Credential Definitions

Credential Definitions define a credential from a specific Institutional DID. A Credential Definition is a definition for a signed digital document that gets transferred from an Issuer to an Identity Owner. It defines the parameters of a credential for several keys. There is often some confusion between a *schema*, which was covered in the previous module, and a *credential definition*. A Credential Definition, unlike a Schema, is written to the Ledger from a *specific* DID and can only be issued from that DID. So while a Credential Definition uses a Credential Schema to define the attributes that will be included in it, the Credential Defintion is a separate object with its own address on the Ledger, and must be created and written separately from the Schema. This process must be completed in the proper order.

## Wallet Records

Credential Definitions create records in the local wallet of the Institution defining them. Therefore one Institution with a unique DID could not issue a Credential from another DID. This is most likely to happen in testing, when you re-provision an instance of VCX and it randomly generates a new DID (if you did not re-use an enterprise seed to re-provision the wallet). If you try to recreate and issue a Credential, your libvcx code will generate an error because it will not find a match between the Credential Issuer and the Credential Definition. If this happens to you during your code development, you can fix this problem by re-creating the Credential Definition. 

1. Install and Provision your VCX instance.
2. Create the data for the Credential Schema (as a .json file)
3. Write the Schema to the Ledger (recording or otherwise taking note of the Schema ID)
4. Create the Credential Definition Data as a JSON or other data format
5. Write the Credential Definition to the Ledger
6. Serialize and save the Credential Definition to ./data/ in order to retrieve it for later use.

## Credential Definition Data Structure

```json
{
    "data":{
        "id":"PqRvtQGvgMQVKBqoTbG9BH:3:CL:62268:tag1",
        "name":"LittleCorp Employee Credential",
        "payment_txn":null,
        "source_id":"55555",
        "tag":"tag1"
    },
    "version":"1.0"
}
```
    
## Credential Definition
    
The Credential Definition is created based upon the Credential Schema, which you should have already created. The important item from the Schema file, which has been saved as "./data/name-schema.json", is the Schema ID. The schema_data.schemaId is a keypair value added in the createSchema function to the schema.json file. 

## Revocation

As of versiom 1.6.8, revocation is not yet implemented. Future versions will have the ability to revoke credentials. But the revocation value must be set to "false".

## Sample Credential Definition Function 

```python
async def createCredentialDef(schema_name):
    print("You called {} with parameters {}".format(inspect.stack()[0][3], ', '.join(['{}={}'.format(k,v) for k,v in locals().items()])))
    await _initialize()
    with open('./data/{}-schema.json'.format(schema_name),'r') as fh:
        schema_data = json.load(fh)
    print('Creating credential definition for schema {}'.format(schema_data['schemaId']))
    cred_def = await CredentialDef.create(schema_data['sourceId'], schema_name, schema_data['schemaId'], schema_data['paymentHandle'])
    serialized_cred_def = await cred_def.serialize()
    with open('./data/{}-credential-definition.json'.format(schema_name), 'w') as fh:
        json.dump(serialized_cred_def, fh)
    print('credential definition data: {}'.format(serialized_cred_def)) 
    cred_def_id = await cred_def.get_cred_def_id()
    print('Success! The credential definition with ID {} was written to the ledger'.format(cred_def_id))
    return
```

## Explanations of individual wrapper functions

1. Initialize vcx
    ```python
    await _initialize()
    ```
2. Read schema ID data
    ```python
    with open('./data/{}-schema.json'.format(schema_name),'r') as fh:
        schema_data = json.load(fh)
    print('Creating credential definition for schema {}'.format(schema_data['schemaId']))
    ```
3. Create Credential Definition
    ```python
    let credentialDef = await CredentialDef.create({"name":schema_data.name,"paymentHandle": 0,"revocation":false,"schemaId":schemaFile.schema_id,"sourceId":"55555"})
    ```
4. Once the Credential Definition is written to the Ledger, you will serialize and write it to a separate file (for retrieval when building a Credential Offer).
    ```python
    ser_CredDef = await credentialDef.serialize()
    with open(credentialFileName,'w') as fh:
        fh.write(json.dumps(ser_CredDef))
    ```

## Common Execution Errors
{: style="color: red"}

Commonly experienced errors when writing a Credential Definition to the Ledger.

### Duplicate Credential Definition
{: style="color: red"}

You cannot currently write more than 1 Credential Definition from a single DID with the same Schema ID. This means that if you try to re-write a Credential Definition with the same Schema ID from the same DID, you will get an error message.

```bash
    { Error: Cannot create, Credential Def already on ledger
        at Function.<anonymous> (/vagrant/node_modules/node-vcx-wrapper/dist/api/credential-def.js:71:23)
        at Generator.throw (<anonymous>)
        at rejected (/vagrant/node_modules/node-vcx-wrapper/dist/api/credential-def.js:5:65)
     at <anonymous> inheritedStackTraces: [], vcxCode: 1039 }
```

### DID not registered on Staging Net
{: style="color: red"}

If you have forgotten to request your DID be registered on the Staging Net for writing, or for some reason it was not done, you will get an error when attempting a schema write or credential definition write. Unfortunately, this error message is not specific, but it will look as follows:

```bash
    { Error: Invalid JSON string
        at Function.<anonymous> (/vagrant/node_modules/node-vcx-wrapper/dist/api/schema.js:64:23)
        at Generator.throw (<anonymous>)
        at rejected (/vagrant/node_modules/node-vcx-wrapper/dist/api/schema.js:5:65)
        at <anonymous> inheritedStackTraces: [], vcxCode: 1016 }
```

If you receive this error, attempt to re-register your DID on the Staging Net by following the instructions [here](/portal/training/install-and-provision-libvcx/05/)