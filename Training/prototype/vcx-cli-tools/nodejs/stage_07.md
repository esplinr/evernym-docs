#  Building VCX CLI Tools -- Proof Request Templates

A Proof Request template is a simple JSON data file with the specific data field(s) desired, with the Issuer public DID. It will allow you to request proof for as many fields from as many credentials as you prefer, with the Issuer specified. Below is the standard data format for the `alice-employee_id-proof-definition.json` file. You can see that you will place your fields in an array, which contains objects defining both the Issuer and the data field. This file will then be loaded and used as the Proof Request.

## Proof Request Example

Create and edit a file named `employee-proof-definition.json` in your `data/` directory from your code root directory.

```bash
    vim data/employee-proof-definition.json
```

The structure of the proof can be highly specific about restrictions. Complex restrictions are in the section after this one.

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

Highly specific parameters can be used for complex Proof Request definitions by using "restrictions," which allow you to point to specifics for each attribute you are requesting for the part to share. Because there may be more than one attribute with that keypair value name (and most likely there will be hundreds of attributes with the name `age`), you can create specific restrictions to validate the Issuer and the issued parties, as well as the version of the schema and revocation. In the example below, you can see that it is requesting an attribute named `age` with the following restrictions:

* `schema_id` -- The exact ID of the schema associated with the Credential Definition
* `schema_name` -- The exact name of the schema associated with the Credential Definition
* `schema_version` -- The exact version number of the schema associated with the Credential Definition
* `schema_issuer_did` -- The exact DID of the schema creator (which may be different from the Credential Definition DID)
* `issuer_did` -- The DID of the credential Issuer, from which the credential with the attribute was issued
* `cred_def_id` -- The ID number of the Credential Definition, from which the credential was created and issued

You do not *need* all of these restrictions in a complex Proof Request, and indeed may not even know the schema issuer DID or the schema ID; however you can get as specific as you want with your Proof Request to avoid any conflicting credential data issued by the same or multiple DID institutions.

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