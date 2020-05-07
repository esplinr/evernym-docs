## Credential Definitions

Before we can issue a Credential Offer, we must first define the Credential we are offering! A Credential Definition has important attributes that must exist before it can be saved in the wallet of the Credential Offerer, and subsequently offered to an Identity Owner. A Credential Definition uses a Schema, which we can either write to the Ledger ourselves, or use a previously written Schema. Remember that a Schema is a public piece of data on the Ledger, available to anyone who wants to use it, but the Credential Defintion is tied to the Issuer DID, which means that it can only be signed and issued by one single entity or Identity Owner. When we create a Credential Definition, we are tying it to our registered DID on the Sovrin Ledger. No other party can issue this Credential.

## Designing a Credential

How do you design a Credential? Good Credential Design takes place in the planning stage, where the Schema Attributes and characteristics of a Credential are explored and investigated. When designing a Credential, the architect should ask themselves several questions about that Credential.

1. What attributes do I want to issue an Identity Owner?
2. Where is the data for this Credential? Is it stored in a database? Do we need to store the data?
3. Do we need to get any information from the Identity Owner and issue it to them?
4. Who will be consuming this Credential? Will I want to use it for verification?
5. Can this Credential Expire?
6. Can this Credential be Revoked?

## DID Registration

Any write to the Sovrin Ledger (as mentioned in the Schema content) requires an Enterprise to register their DID, generated during the provisioning step, with Sovrin in order to make writes to the Ledger. Instructions on how to do so are included with the Technical Training content and Installation Tutorials. DID Registration on the Sovrin Staging Net is currently *open*, which means that anyone can register a DID on this network and begin to write Schema and Credential Definitions. The Production Net, however, is *closed* by design, and only the Board of Trustees (see Trust Frameworks) can make an Enterprise DID a Verifier, or an entity with a DID that can make writes to the Ledger.

## Credential Definition Creation

Creating a Credential Definition means that you have created your own Schema for use, or are planning to use an existing Schema. Once the Schema has been decided, the Credential Definition is programmatically done through LibVCX or LibIndy (LibVCX is a wrapper for LibIndy) and associated scripting wrappers (currently NodeJS or Python). This Credential Definition only happens *once*, after which point in time it can be issued to multiple parties with accompanying data. Although during testing you will often be creating Schema and Credentials

## Credential Definition Data Structure

Below is an example of a Credential Definition data object, which gets written to the Ledger. As you can see, the data format is very light and not complex. 

```json
{
  "version":"1.0",
  "data":{
    "id":"RUWbS4XbFppeJsXoEkAFwx:3:CL:82948:tag1",
    "tag":"tag1",
    "name":"passport",
    "source_id":"Passport ID",
    "issuer_did":"RUWbS4XbFppeJsXoEkAFwx",
    "cred_def_payment_txn":null,
    "rev_reg_def_payment_txn":null,
    "rev_reg_delta_payment_txn":null,
    "rev_reg_id":null,
    "rev_reg_def":null,
    "rev_reg_entry":null,
    "tails_file":"tails.txt"
    }
  }
```