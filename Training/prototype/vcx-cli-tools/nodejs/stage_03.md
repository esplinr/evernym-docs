# Building VCX CLI Tools - Write a Schema

This will show you how to write a schema definition to the StagingNet ledger.

## Credential Schema 

A schema is a data object that is written to the ledger, in which the definition of the fields and data types are defined for a credential. Schemas are written to the ledger and can then be used to create a Credential Definition. Anyone can look up a schema on the ledger and use it for their Credential Definitions. A schema has the following values, that can all be contained in a single JSON object (or a dictionary data type in Python):

1. `attrNames:[]` -- An array of the names of the data fields that are used to contain values for a credential.
2. `name` -- The name or title of the schema as it appears on the ledger. The name and version create the unique identifier of a schema before it is written to the ledger. *see below*
3. `version` -- The version number defines a version number <!--redundant?-->for a schema. This is important in creating updated versions of the same schema, which will maintain the same name but add new values. The same schema with the same name and version number cannot be written to the ledger twice by the same DID.
4. `paymentHandle` -- A token handle for future payment to the Sovrin Foundation when writing schemas, Credential Definitions, or revocations. **This feature will be handled in a future update.**
5. `sourceId` -- A local-based ID string value, for local use in a database as needed.


## `schema.json` Object

Create a file named `employee-schema.json` in your data directory and edit it. (This example uses vim to create and edit the file simultaneously).

```bash
    vim data/employee-schema.json
```

Enter the JSON data exactly as you see below:

```json
{
  "data":
  {
    "attrNames":["FirstName", "LastName","ID","Phone","Department"],
    "name":"Employee Personal Information",
    "version":"111.11"
  },
    "paymentHandle":0,
    "sourceId":"LittleCorp Employee ID"
  }
}
```

## Schema Creation

When writing a schema to the ledger, observe these requirements:

* An operating instance of `libindy`/`libvcx `installed on Ubuntu 16.04/18.04.
* A properly provisioned wallet for the installation.
* Your DID registered and saved to StagingNet [Instructions for Installation and Provisioning here](/portal/training/install-and-provision-libvcx/)
* *Correctly* formulated schema data object or JSON file.

## The Schema Object

Because we are using Node.js in this demonstration to write the schema, we will be saving the schema as a JSON file called `name-schema.json` in the `./data` directory. Although you could easily create an interface for generating a schema file for VCX, it is easier for the sake of instruction to simply create it as a separate object. One of the most important rules of writing a schema to the ledger is the fact that *the same schema with the same name and the same version number cannot be written twice to the ledger from the same DID*. For this reason, version incrementing is the only way to rewrite the same schema to the ledger more than once from the same DID, or to make updates and changes to it.

Below is a function that will write the schema to the ledger. This function is formatted for insertion into our `vcx-cli-tools.js` Module Exports script [(see previous module)](/portal/training/vcx-cli-tools/nodejs/02/). It will be reading `employee-schema.json` from the data directory.

```javascript

    async function createSchema(schema_name){
        await vcx.initVcx(config);
        let schema_data = await fs.readJson(`./data/${schema_name}-schema.json`);
        //set up incremental version float in order to avoid schema version conflicts
        let currentVersion = parseFloat (schema_data.data.version);
        newVersion = currentVersion +.01;
        schema_data.data.version = String(newVersion.toFixed(2));
        console.log(schema_data);
        let schema = await Schema.create(schema_data);
        //retrieve schema ID on Ledger
        let schemaId = await schema.getSchemaId();
        //write the Ledger ID to the schema json file for future use
        schema_data['schemaId'] = schemaId;
        await fs.writeJson(`./data/${schema_name}-schema.json`,schema_data);
        console.log(`Congratulations! Your schema was written to the Ledger and the id is : ${schemaId}`);
    }

```

## Schema Write Functions

In the above function the schema is loaded in from a JSON file and then written to the ledger. Once confirmation has returned for writing the schema, the ledger Schema ID is recorded and saved back to `schema.json` (allowing you to access this data later). The order of events (as shown in the code above) is as follows:

1. Initialize VCX

    ```javascript 
        await vcx.initVcx(config);
    ```

2. Load the schema data from `./data/name-schema.json` as `schema_data` (This example uses a string literal to load in the file name from the `schema_name` arg).

```javascript
    let schema_data = await fs.readJson(`./data/${schema_name}-schema.json`);
```

3. Increment the schema version to avoid conflicts. (This prevents a schema with an identical version and name from being rejected due to duplication).

```javascript
    let currentVersion = parseFloat (schema_data.version);
    newVersion = currentVersion +.01;
    schema_data.version = String(newVersion.toFixed(2));
```

4. Create the schema object with an async call (this varies in time needed, but usually completes in 30 seconds or less).

```javascript
    let schema = await Schema.create({"paymentHandle":0,"data":schema_data,"sourceId":schema_data.sourceId});
```

5. If schema writes to Ledger successfully, get the `SchemaId` and write it to the `schema_data` object.

```javascript
    let schemaId = await schema.getSchemaId();
    schema_data['schemaId'] = schemaId;
```

6. Write the new data to the schema data JSON file with the updated version number and Schema Ledger ID as an added key value.

```javascript
    await fs.writeJson(`./data/${schema_name}-schema.json`,schema_data);
```

## Calling This <!--What does "this" refer to?--> from `vcx-cli-tools`

In your code root directory, you can call this function from your CLI script.

```bash
    node vcx-cli-tools.js createSchema employee
    { attrNames: [ 'Lender Rating', 'Issue Date', 'Expiration' ],
    name: 'Village Bank Lender Rating',
    version: '111.13',
    paymentHandle: 0,
    sourceId: 'Village Bank'}
    Congratulations! Your schema was written to the Ledger and the id is : SsjVP9fL1FaWj7vVsmS2nj:2:Schema1:11.14
```

## Schema Data Options

It may be helpful to note here that the schema data can be written to the ledger in many different ways. The `schema.json` file used in this documentation is a very commonly used method, and a convenient way of storing the Schema Ledger ID for future use, but there are a plethora of other methods with which you can store the data, including multiple popular databases such as SQL and Mongo. It may be also helpful to note here that many of the extant code examples in the Libindy and LibVCX open-source documentation (which are not part of the Early Access Program) hard-code the schema data object for the sake of expediency.

## The Schema Ledger ID

Once a schema has been written to the ledger successfully, it will be assigned a unique ID number. This number is very important, as it will be used in the creation of a Credential Definition later. This ID number needs to be recorded when writing the schema to the ledger, because this is the only time you will have it in memory and available for the `schema.getSchemaId()` function (which will return the ID value). While there are plans for a "Schema Book" in the future, where the schema residing on the ledger can be viewed and used in an open context, at the moment this is the only time you will be able to access the Schema ID.

## Common Execution Errors
{: style="color: red"}
### Schema Version Conflicts
{: style="color: red"}

You are unable, by design, to write the same schema to the ledger from the same DID with the same name and version number. *If* you don't increment the schema version number (as shown in the sample code) or change the name, you will get an error as seen below. If this happens, try to manually increment the version number in the `name-schema.json` file and try again.

```bash
    { Error: Duplicate Schema: Ledger Already Contains Schema For Given DID, Version, and Name Combination
        at Function.<anonymous> (/vagrant/node_modules/node-vcx-wrapper/dist/api/schema.js:64:23)
        at Generator.throw (<anonymous>)
        at rejected (/vagrant/node_modules/node-vcx-wrapper/dist/api/schema.js:5:65)
        at <anonymous> inheritedStackTraces: [], vcxCode: 1088 }
```

### DID Not Registered on StagingNet
{: style="color: red"}

If you have forgotten to request your DID be registered on StagingNet for writing, or for some reason it was not done, you will get an error when attempting a schema write or Credential Definition write. Unfortunately, this error message is not specific, but it will look as follows:

```bash
    { Error: Invalid JSON string
        at Function.<anonymous> (/vagrant/node_modules/node-vcx-wrapper/dist/api/schema.js:64:23)
        at Generator.throw (<anonymous>)
        at rejected (/vagrant/node_modules/node-vcx-wrapper/dist/api/schema.js:5:65)
        at <anonymous> inheritedStackTraces: [], vcxCode: 1016 }
```

If you receive this error, attempt to re-register your DID on the Staging Net by following the instructions [here](/portal/training/install-and-provision-libvcx/05/)