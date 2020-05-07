## Schema and Data Structures

What is a schema? A schema, in terms of the Sovrin Ledger and the SSI model, is a data object containing a set of attribute key names and some identifiers that get written to the Ledger. This data object is part of what defines a Credential, and gives it the specific data value names. A schema is written to the Ledger by a Verifier, who has had their DID validated and registered on the Sovrin Ledger with permissions to write data onto it. In order to create a Credential Definition and issue it to an Identity Owner, you must first either write your own Schema or use an existing Schema. When working with testing and the Sovrin Staging Net, it's most likely that you will be creating and writing your own Schema Definition as you test out your code.

## Sample Schema Object

Below you will find a sample Schema data object - This is what gets written to the Ledger when you create a Schema Definition.

```json
{
  "data":{
    "attrNames":[
      "FirstName",
      "LastName",
      "ID",
      "Phone",
      "Department"
    ],
    "version":"115.40",
    "name":"EmpID"
  },
    "sourceId":"Employee ID",
    "paymentHandle":0,
}
```

## Attributes and Data Types

Each Attribute of a Credential is defined in the schema, as a Dictionary style object with a string value key name. The actual values of these keys get set later on in the Credential. The data attributes are currently retricted to string and integers, but support for images and other data types are in the pipeline for implementation very soon. Each Attribute is defined by it's string key value, as well as it's belonging to the specific Schema ID and the Credential ID in which it's value is set (see Credential Definition and Credential Issuance).

Currently supported data types are :

* string values
* integers

Future support is being developed for :

* binary image files
* nested or complex data (arrays and collections)

### Name

The Schema name is a data field left open with an arbitrary text string value for your enterprise use.

### Version

The Schema version is intended to be used for incrementing newer versions of a schema. Since a schema cannot be overwritten on a Ledger (which is the nature of a Distributed Ledger) it must have a version that can be updated in the case of a need for an alteration. If you need to make a new version of a schema you have written to the Ledger, an increment to the float value of the "xxx.xx" format must be added. Many code examples will automatically upgrade the schema version by .01 every time the schema write occurs, ensuring that there is never an overlap.

### Schema ID

A Schema is assigned an ID on the Ledger when it has been successfully written. It is in a format as follows:

"7FTVKubHJGo6oHK3BH59yM:2:passport:113.55"

This is how it is uniquely identified on the Ledger.

## Schema Rules

1. Your Institution DID must be registered on the Ledger you intend to write the schema to. Currently we are using 2 Networks; the Staging Net and the Production Net. EAP Customers and non-production Enterprises will always be using the Staging Net to run their demonstrations and their prototypes. Production-ready products will use the Production Ledger.
2. Your Institution must have accepted the [Transaction Author Agreement](#)(see below), which is essential to receive write permissions to the Sovrin Ledger. 
3. The same Schema with the same version from the same DID *cannot* be written to the Ledger twice. In order to write another Schema to the Ledger, you must increment the version value.

## Transaction Author Agreement 

When a Transaction Author Agreement (TAA) is enforced on a Sovrin ledger such as StagingNet or MainNet, your libvcx configuration must be changed to accommodate it. Without that update a failure will occur when attempting to write any transaction, such as a schema or a credential definition, to the ledger. Fortunately, in most cases, changing the configuration to accommodate this is easy!

There are various ways that your organization can show that it agrees to the terms of a TAA. These are the acceptance means available, as currently written:

1. at_submission - The agreement was reviewed by the user and accepted at the time of submission of this transaction. 
2. click_agreement - The agreement was displayed and then agreed to by typing or clicking acceptance.
3. for_session - The agreement was reviewed by the user and accepted at some point in the user’s session prior to submission.
4. on_file - An authorized person accepted the agreement, and such acceptance is on file with the user’s organization.
5. product_eula - The agreement was included in the software product’s terms and conditions as part of a license to the end user.
6. service_agreement - The agreement was included in the terms and conditions the user accepted as part of contracting a service.
7. wallet_agreement - The agreement was reviewed by the user and this affirmation was persisted in the user’s wallet for use during submission.

For most of you, the acceptance means that you will want to use is "on_file", meaning that:

1. Your management and/or legal team have read the TAA.
2. Your organization accepts it.
3. You have a record of your acceptance in your files.
4. This is the acceptance means that will be described here.

### TAA Agreement Steps

Please do the following steps to signify that you have accepted the TAA.

1. Read and review it. You can get it directly from the ledger using the indy-cli, with this command:
	indy> pool show-taa
2. Put a signed and dated copy of it in a safe place, or record your acceptance in another appropriate manner.
3. Complete the following steps on your agent
4. If needed, upgrade your agent libvcx and libindy packages to a version that supports the TAA. This would be libvcx=0.4.59278406 and libindy=1.12.0 or newer. 
Insert the following string into your vcx config JSON file (on a single line):
"author_agreement": "{\"taaDigest\": \"8cee5d7a573e4893b08ff53a0761a22a1607df3b3fcd7e75b98696c92879641f\",\"acceptanceMechanismType\":\"on_file\",\"timeOfAcceptance\": 1580939969}"
5. Restart your agent

This string contains the TAA digest, which is simply a sha256 hash of the version number and the text of the TAA, concatenated together. It also indicates that you accept the TAA, and have your acceptance on file. Finally, it has an epoch time representation of the time (date) that you accepted it. Replace 1580939969 with the actual date of your acceptance. There are a number of online converters, such as [https://www.epochconverter.com/](https://www.epochconverter.com/) for determining the current epoch time.


## Good Schema Design

What is the best Schema definition? Designing a Schema requires the Designer to use some good principles and thought process. While every schema definition will ultimately be tailored to the needs of the Credential Designer, there are some good guidelines that Evernym suggests considering.

### Use good strings values for Attribute names

In an SSI-centric world, it's very possible that any one individual will have hundreds of Credentials in their wallet. If all of those Credentials contain Schema Attribute values with similar names, and the Proof Definitions are poorly written (see Proofs and Predicates), it is possible that the Attribute names may be harder to identify.

### Use proper versioning and incrementation

You want to increment the version number by a small degree each time you write a schema. The correct format for a schema is "xxx.xx" if x= any integer between 1 and 9. Converting the string to a float value will allow you to make .01 increments to the version number. Also be aware of not using 0 values in the initial version number you choose before a number with a value of 1 or higher (like 012.00 or 001.01). Follow good programming principles with float values.