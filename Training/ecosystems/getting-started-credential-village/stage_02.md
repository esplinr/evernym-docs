## Credential Village for Developers

The Credential Village is more than just a simple walk-through of a typical
Credential Exchange. It's also a valuable resource for Developers working on
demos and prototypes. There are many valuable assets included in the Village
that you can use to speed up the rapid prototyping for your projects.

### DIDs

The Credential Village has several persistent DID's that have been registered
on the Sovrin Staging Net. These DID values will come in handy when you create
your Proof Request Templates.

1. Village Passport DID : BrjE2TQthg4Xa6TfRNujYv

![Village CM](https://static.pps.evernym.com/training/getting-started-credential-village/VILLAGE_CM_04.png){: width="300"}



2. Village Electric DID : Wip1SWFGTTt3DFUU5JSiej

![Village CM](https://static.pps.evernym.com/training/getting-started-credential-village/VILLAGE_CM_05.png){: width="300"}


3. Village Bank DID : U8vd5tGo6PNjz9xzMwFBuA 

![Village CM](https://static.pps.evernym.com/training/getting-started-credential-village/VILLAGE_CM_06.png){: width="300"}


### Schema Definitions

These Village locations all have Schema Definitions that you can use as
templates for your own, or incorporate outright (Schema definitions are always
open for all to use). These Schema are on the Staging Net Ledger and available
for your use! Feel free to use the schemaId to create your own Credential
Definitions with them.

Credential Definition Creation with established schema ID (also can be accessed from the createCredentialDefinition.js). The function takes the arguments 'schema-name' and 'schema_id':

```javascript

async function createCredentialDef(schema_name,schema_ID){
  await vcx.initVcx(config);
  console.log('creating credential definition');
  const data = {
      name: schema_name,
      paymentHandle: 0,
      revocation: false,
      revocationDetails: {
          tailsFile: 'tails.txt',
      },
      schemaId: schema_ID,
      sourceId: '<INSERT CRED DEF SOURCE ID>'
  };
  let credentialDef = await CredentialDef.create(data);
  let ser_CredDef = await credentialDef.serialize();
  console.log(ser_CredDef);
  let credDefId = await credentialDef.getCredDefId();
  await fs.writeJson(`./data/${schema_name}-credential-definition.json`,ser_CredDef);
  console.log(`Congratulations! Your Credential Definition was written to the Ledger and the id is : ${credDefId}`);
}

```

#### Village Passport Schema

The schema ID and respective data structures are shown below :

```json
  {
    "schemaId": "BrjE2TQthg4Xa6TfRNujYv:2:Accelerator Village Passport:564.20",
    "name": "Accelerator Village Passport"
  }
```

Schema Definition structure (version numbers may be different if iterations are
updated):

```json
{
  "data":
  {
    "attrNames": [
      "Name","Country Of Origin",
      "Date Of Birth","Date Of Issue",
      "Passport Expiration"
    ],
    "name": "Village Passport",
    "version": "111.20"
  },
  "paymentHandle": 0,
  "sourceId": "village_passport"
}
```

#### Village Electric Schema

Ledger ID : 

```json
{
  "schemaId": "Wip1SWFGTTt3DFUU5JSiej:2:Village Electric:126.24",
  "name": "Village Electric"
}
```

Schema Definition structure (version numbers may be different if iterations are
updated):

```json
{
  "data":
  {
    "attrNames": [
      "Address",
      "Issue Date"
    ],
    "name": "Village Electric",
    "version": "123.24"
  },
  "paymentHandle": 0,
  "sourceId": "village_electric"
}
```

#### Village Bank Schema 

Ledger ID :

```json
{
  "schemaId": "U8vd5tGo6PNjz9xzMwFBuA:2:Village Bank:124.24",
  "name": "Village Bank"
}
``` 

Schema Definition structure (version numbers may be different if iterations are
updated):

```json
{
  "data":
  {
    "attrNames": [
      "Name",
      "Account Number",
      "Account Type"
    ],
    "name": "Village Bank",
    "version": "123.24"
  },
  "paymentHandle": 0,
  "sourceId": "accelerator_financial"
}
```

### Proof Request Templates

The Proof Request Request Templates are incredibly useful for you to use in all of
your demos and prototypes, since the DID's and attribute fields are persistent
you can speed up your testing process by using them to generate the Proof Request
Requests immediately, or use them as a template to structure your own. Feel
free to ask proof of any Credential fields from the Village Locations, or any
combination you prefer! Incorporate them into your workflow as you desire.


#### Village Passport Proof Request Template

This Data Request simply asks for the 'Username' attribute to exist for a
Credential from the issuer DID of the Village Access Server, which you should
have received from Evernym after onboarding. Copy the following text and save 
it as "passport-proof-definition.json". You can use it later when writing code
samples against your Village Credentials.


Proof Request structure for 'passport-proof-definition.json':

```json
{
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
```

#### Village Utility Proof Request Template

This Data Request simply asks for the Passport Credential data field 'Passport
Expiration' , which you receive from the Village Passport Office after
successfully proving your membership with the Access Credential. For future
reference, this can be programmatically checked against the expiration date
value to determine whether it is expired or not.

Proof Request structure for 'utility-proof-definition.json':

```json
{
  "attrs":[
    {
      "name": "Passport Expiration", "restrictions": [
        {
          "issuer_did":"Fi9WtfRNBF2jC9aV3brSQV"
        }
      ]
    }
  ],
  "sourceId":"222222",
  "name": "Credential Village Utility Proof Request",
  "revocationInterval": {}
}
```

#### Village Bank Proof Request Request Template

This Data Request is a complex Request, in which 2 field from 2 separate DIDs
are requested. The Village Bank wants your Credentials from your Passport *and*
your Utility company before it will start an account for you! Without meeting
all of these requirements, your Validation of Credentials will not succeeed.

Data structure for 'bank-proof-definition.json':

```json
{
  "attrs":[
    {
      "name": "Date Of Birth", "restrictions": [
        {
          "issuer_did":"BrjE2TQthg4Xa6TfRNujYv"
        }
      ]
    },
    {
      "name":"Country Of Origin", "restrictions": [
        {
          "issuer_did":"BrjE2TQthg4Xa6TfRNujYv"
        }  
      ]
    },
    {
      "name":"Address", "restrictions": [
        {
          "issuer_did":"Wip1SWFGTTt3DFUU5JSiej"
        }  
      ]
    },
    {
      "name":"Issue Date", "restrictions": [
        {
          "issuer_did":"Wip1SWFGTTt3DFUU5JSiej"
        }  
      ]
    }
  ],
  "sourceId":"333333",
  "name": "Credential Village Bank Proof Request",
  "revocationInterval": {}
}
```
