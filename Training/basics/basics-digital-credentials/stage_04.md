## Credential Creation

Once a Credential has been Defined, and the Credential Definition has been written to the Ledger, an actual Credential can be created. It's important to know the difference between a *Credential* and a *Credential Definition*. A Credential is a data object that is based upon a Credential Definition, which in turn has attributes with name values that are derived from a Schema. A Credential is built from the following:

1. A Credential Definition (containing a Schema)
2. Data for the Issuee of the Credential in each of the Attribute Fields (this can be derived from a database, randomly generated, retrieved from the Identity Owner, or even retrieved from another Credential through a Proof Request).
3. Revocation Information (if applicable)

## Credential Offer

A Credential gets created programmatically from these 3 things, and then it is bundled up as a data object, which then gets *Offered* to an Identity Owner through a Connection. This offer comes through to the Wallet App (in this case Connect.Me), and the Identity Owner has the choice whether to accept or reject the Offer. An Offer does not mean that the Credential is *issued* to the Identity Owner, even if they accept that Offer. It simply means that they have accepted that Offer and are willing to receive said Credential.

## Credential Issuance

As stated above, the Credential, upon being accepted by the Identity Owner, can then be Issued to that Identity Owner. This is an important separation in the event that the Credential Issuer wants to have some condition met before issuing the Credential. Payment for said Credential (as in the case of a college transcript) is one such case, but any case in which an Offer is made but certain requirements must be met before the Credential is Issued will be common. Automatically issuing the Credential after acceptance is also very common. 

## Credential Signature

What is in a signature? What do we do with these Credentials? Digital Credentials are, like physical Credentials, built for consumption. Just like you have to pull out a Credit Card and swipe it (and possibly show your Identification) in order to pay for an item, a Digital Credential must be built with a method of validation and verification. The Signature on a Credential is the thumbprint of the DID Issuer, which can be checked and validated through the Sovrin Ledger, and without contacting the Issuer in any way.

## Credential Validation

Credential Validation is done through Proof Requests, which are covered in the [Proof and Predicates](../../basics-proofs-and-predicates/) content. Proofs *consume* a Credential by validating each Attribute with a series of restrictions attached to that Attribute which describe what the consumer of the Credential wants to know about it; either the full value or some amount of information about that value.