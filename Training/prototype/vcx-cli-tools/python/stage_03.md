# Write a Schema

In this section you'll learn all the essential tools for schema data objects and how to write them. In order to do this, you *must* have registered your DID on the staging net.

## Credential Schema 

A schema is a data object that gets written to the Ledger, in which the definition of the fields and data types are defined for a Credential. Schema are written to the ledger, and can then be used to create a Credential Definition. Anyone can look up a schema on the Ledger and use it for their Credential Definition. A Schema has the following values, that can all be contained in a single JSON object (Dictionary data type in Python):

1. "attrNames":[] - this is an array of the names of the data fields that are used to contain values for a Credential.
2. "name" - This is the name, or title of the Schema as it appears on the Ledger. The name and version create the unique identifier of a Schema before it is written to the Ledger. *see below*
3. "version" - The version number is what defines a version number for a Schema. This is important in creating updated versions of the same Schema, which will maintain the same name but add new values. The same schema with the same name and version number cannot be written to the Ledger twice by the same DID.
4. "paymentHandle" - this is a token handle, for future payment to the Sovrin Foundation when writing Schema, Credential Definitions, or Revocation. **this feature will be handled in a future update**
5. "sourceId" - This is a local-based ID string value, for local use in a database if needed.


## Schema.json object

Create a file named 'employee-schema.json' in your data directory and edit it (here I am using vim to create and edit the file simultaneously).

```bash
    vim data/employee-schema.json
```

Enter the json data exactly as you see below:

```json
{
    "attrNames":["FirstName", "LastName","ID","Phone","Department"],
    "name":"Employee Personal Information",
    "version":"111.11",
    "paymentHandle":0,
    "sourceId":"LittleCorp Employee ID"
}
```

## Schema creation

When writing a schema to the Ledger, there are 3 requirements.

1. An operating instance of libindy/libvcx installed on Ubuntu 16.04/18.04.
2. Properly provisioned wallet for the installation.
3. The DID registered and saved to the Staging Net [Instructions for Installation and Provisioning here](/portal/training/install-and-provision-libvcx/)
4. *Correctly* formulated schema data object or json file.

## The Schema object

Since we are using python in this demonstration to write the schema, we will be saving the schema as a JSON file, name "name-schema.json" in the ./data directory. Although you could easily create an interface for generating a schema file for VCX, it is easier for the sake of instruction in this tutorial to simply create it as a separate object. One of the most important rules of writing a Schema to the Ledger is that fact that *the same schema with the same name and the same version number cannot be written twice to the Ledger from the same DID*. For this reason, version incrementing is the only way to re-write the same schema to the ledger more than once, or to make updates and changes to it.

Below is a function that will write a schema to the ledger.

```python
async def createSchema(schema_name):
    print("You called {} with parameters {}".format(inspect.stack()[0][3], ', '.join(['{}={}'.format(k,v) for k,v in locals().items()])))
    await _initialize()
    with open('./data/{}-schema.json'.format(schema_name),'r') as fh:
        schema_data = json.load(fh)
    # Increment the version to avoid collisions on the ledger
    new_version = float(schema_data['data']['version']) + 0.01
    schema_data['data']['version'] = '{:.2f}'.format(new_version)
    print('schema data: {}'.format(schema_data))
    schema = await Schema.create(schema_data['sourceId'], schema_data['data']['name'], schema_data['data']['version'], schema_data['data']['attrNames'], schema_data['paymentHandle'])
    schema_id = await schema.get_schema_id()
    # Write the resulting transaction ID from the ledger out to the json file for later reference
    schema_data['schemaId'] = schema_id
    with open('./data/{}-schema.json'.format(schema_name),'w') as fh:
        json.dump(schema_data, fh)
    print("Your schema with ID {} was written to the ledger".format(schema_id))
    return
```

## Schema write functions

In the above function the schema is loaded in from a json file, and then written to the Ledger. Once confirmation has returned for writing the Schema, the Ledger Schema ID is recorded and saved back to the schema.json file (allowing you to access this data later). The order of events (as you can see from the code above) is as follows:

1. Initialize VCX
    ```python 
    await _initialize()
    ```
2. Load the schema data from "./data/name-schema.json" as schema_data (I am using a string literal to load in the file name from the schema_name arg).
    ```python
    with open('./data/{}-schema.json'.format(schema_name),'r') as fh:
        schema_data = json.load(fh)
    ```
3. Increment the schema version to avoid conflicts (this prevents a schema with an identical version and name from being rejected due to duplication).
    ```python
    # Increment the version to avoid collisions on the ledger
    new_version = float(schema_data['data']['version']) + 0.01
    schema_data['data']['version'] = '{:.2f}'.format(new_version)
    print('schema data: {}'.format(schema_data))
    ```
4. Create the schema object with an async call (this varies in time needed, but usually completes in 30 seconds or less).
    ```python
    schema = await Schema.create(schema_data['sourceId'], schema_data['data']['name'], schema_data['data']['version'], schema_data['data']['attrNames'], schema_data['paymentHandle'])
    schema_id = await schema.get_schema_id()
    ```
5. If schema writes to Ledger successfully, get the SchemaID and write it to the schema_data object.
    ```python
    schema_id = await schema.get_schema_id()
    schemaFile.schema_id = schema_id
    ```
6. Write the new data to the schema data json file with the updated version number and Schema Ledger ID as an added key value.
    ```python
    with open('./data/{}-schema.json'.format(schema_name),'w') as fh:
        json.dump(schema_data, fh)
    print("Your schema with ID {} was written to the ledger".format(schema_id))
    ```

## Calling this from the command line

In your code root directory, you can call this function from your CLI script.

```bash
python3 vcx-cli-tools.py createSchema employee
```

## Schema data options

It may be helpful to note here that the schema data can be written to the Ledger in many different ways. The schema.json file used in this documentation is a very commonly used method, and a convenient way of storing the Schema Ledger ID for future use, but there are a plethora of other methods with which you can store the data, including multiple popular databases such as SQL and Mongo. It may be also helpful to note here that many of the extant code examples in the libindy and libvcx open-source documentation (which are not part of the Early Access Program) hard-code the schema data object for the sake of expediency.

## The Schema Ledger ID

Once a schema has been written to the Ledger successfully, it will be assigned a unique ID number. This number is very important, as it will be used in the creation of a Credential Definition later. This ID number needs to be recorded when writing the Schema to the Ledger, because this is the only time you will have it in memory and available for the schema.getSchemaId() function (which will return the ID value). While there are plans for a "Schema Book" in the future, where the Schema residing on the Ledger can be viewed and used in an open context, at the moment this is the only time you will be able to access the Schema ID.

## Common Execution Errors
{: style="color: red"}

### Schema Version Conflicts
{: style="color: red"}

You are unable, by design, to write the same Schema to the ledger from the same DID with the same name and version number. *If* you don't increment the schema version number (as shown in the sample code) or change the name, you will get an error as seen below. If this happens, try to manually increment the version number in the name-schema.json file and try again.

```bash
{ Error: Duplicate Schema: Ledger Already Contains Schema For Given DID, Version, and Name Combination
    at Function.<anonymous> (/vagrant/node_modules/node-vcx-wrapper/dist/api/schema.js:64:23)
    at Generator.throw (<anonymous>)
    at rejected (/vagrant/node_modules/node-vcx-wrapper/dist/api/schema.js:5:65)
    at <anonymous> inheritedStackTraces: [], vcxCode: 1088 }
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