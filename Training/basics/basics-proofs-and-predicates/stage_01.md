## Proof Data Structure

A Proof defines exactly what attributes and what information about those attributes that the Requester is seeking to validate. A Proof *consumes* a Credential or a set of Credentials, asking questions about the data value associated with any Attribute. 

### Proper Proof Design 

In a world that values privacy and security, writing a Proof Definition with the most flexibility and the least personal information requested is going to be very important. There are several things we can ask about a data attribute in a Credential. There are many things to take into consideration. The general policy is to make the Proof as non-invasive as possible; asking the *minimum* amount of information about a Credential Attribute I need for my verification process. Sometimes, in fact, you can simple ask if a Credential Attribute *exists* from a specific Issuer and that's all you'll need to validate the identity of the individual in question. Also, you want the *maximum* amount of information about the Credential Attribute you can validate not related to the actual value of the Credential Attribute. Specifying the Issuer DID, the Credential ID, the Schema ID, and the Schema Version can give you a higher level of accuracy while still keeping the Identity Owner's private information private.

1. What is the value of the attribute?
2. Do we *need* the full value of this Credential Attribute, or just some information about it (the less information needed, the greater the level of privacy).
3. What is the minimum amount of information I need about this Credential Attribute? (do I really need your birth date or do I only need to know if you're over 18 years of age?)
3. Will we accept multiple sources for this Credential Attribute? (I can accept your name from your Driver's License *or* your Passport)
4. Is there any *repeating* information I don't really need? (Why would I need to verify more than your identity?)
5. Do I need Credential Attributes from more than one Credential? (Sometimes you need multiple Credential Attributes from multiple sources)
6. What restrictions will I need to implement for each Credential Attribute? (The more restrictions, the more accurate the validation process)

The minimum private data with the maximum amount of information about where that data came from can provide you with the highest level of privacy for the Identity Owner and the highest level of validity for your Enterprise.

## Proof Definition Structure

A Proof Template looks like the data object below (in JSON format):

```json
{
  "attrs": [
    {
       "name": "Passport Expiration",
       "restrictions":[
        {"issuer_did": ""},
        {"schema_id": ""},
        {"schema_name":""},
        {"schema_version":""},
        {"schema_issuer_did":""},
        {"issuer_did":""},
        {"cred_def_id": ""}
      ]
    },
    {
      "name": "Country of Origin",
      "restrictions":[
        {"issuer_did": ""},
        {"schema_id": ""},
        {"schema_name":""},
        {"schema_version":""},
        {"schema_issuer_did":""},
        {"issuer_did":""},
        {"cred_def_id": ""}
      ]
    }
  ],
  "sourceId":"333333",
  "name": "Proof",
  "revocationInterval": {}
}
```