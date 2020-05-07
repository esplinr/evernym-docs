# Building VCX CLI Tools - Proof Request Templates

A Proof Request Template is simply a json data file with the specific data field(s) desired, with the Issuer public DID. It will allow you to request Proof of as many fields from as many Credentials as you prefer, with various restrictions specified. Below is the standard data format for the alice-employee_id-proof-definition.json file. You can see that you will place your fields in an array, which contains objects defining the requested attributes, as well as the restrictions that each attribute has placed upon it. Bear in mind that you can choose to accept an attribute from more than one Issuer DID, with varying restrictions. For simplicity and brevity, this first example has been made as very easy to read. 

## Proof Request Example

Create and edit a file named 'employee-proof-definition.json' in your data/ directory from your code root directory.

```bash
    vim data/employee-proof-definition.json
```

```json
{
  "attrs": [
    {
       "name": "FirstName",
       "restrictions":[{"issuer_did": "6XFh8yBzrpJQmNyZzgoTqB"}]
    },
    {
      "name": "LastName",
      "restrictions":[{"issuer_did": "6XFh8yBzrpJQmNyZzgoTqB"}]
    }
  ],
  "sourceId":"999999",
  "name": "Proof",
  "revocationInterval": {}
}
```

## Complex Proof Request

Note that very specific parameters can be used for complex Proof request definitions by using "restrictions", which allow you to point to specifics for each attribute you are requesting for the part to share. Since there may be more than one attribute with that keypair value name (and most likely there will be hundreds of attributes with the name "age"), you can create specific restrictions to validate the Issuer and the issued parties, as well as version of the schema and revocation. So in the example below, you will see that we are requesting an attribute named "age" with the following restrictions:

1. schema_id - the exact ID of the schema associated with the Credential Definition
2. schema_name - the exact name of the schema associated with the Credential Definition
3. schema_version - the exact version number of the schema associated with the Credential Definition
3. schema_issuer_did - the exact DID of the Schema creator (which may be different than the Credential Definition DID)
4. issuer_did - The DID of the Credential Issuer, from which the Credential with the attribute was issued
5. cred_def_id - The ID number of the Credential Definition, from which the Credential was created and Issued

You do not *need* all of these restrictions in a complex Proof Request, and indeed may not even know the schema issuer DID or the schema ID, however you can get as specific as you want with your Proof Request in order to avoid any conflicting credential data issued by the same or multiple DID Institutions.

```json
{
  "attrs": [
    {
       "name": "FirstName",
       "restrictions":[
          {"issuer_did": "6XFh8yBzrpJQmNyZzgoTqB"},
          {"schema_id": "6XFh8yBzrpJQmNyZzgoTqB:2:schema_name:0.0.11"},
          {"schema_name":"Faber Student"},
          {"schema_version":"1.0"},
          {"schema_issuer_did":"6XFh8yBzrpJQmNyZzgoTqB"},
          {"issuer_did":"YRU8nAGQgaCv3y7z8RSmp4"},
          {"cred_def_id": "8XFh8yBzrpJQmNyZzgoTqB:3:CL:1766"}
       ]
    },
    {
      "name": "LastName",
      "restrictions":[{"issuer_did": "6XFh8yBzrpJQmNyZzgoTqB"}]
    }
  ],
  "sourceId":"999999",
  "name": "Proof",
  "revocationInterval": {}
}
```