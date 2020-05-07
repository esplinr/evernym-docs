## Digital Credentials

What is a Digital Credential? Digital Credentials are a way of transferring, owning, and sharing information about a person or thing. We get Credentials in many forms, many of which are in your wallet or purse right now. Some Credentials you carry with you, and some Credentials are stored by other people, like a login or password on a web site. Until now, there has never really been a universal system for storing and proving Digital Credentials between parties.

## Issuing a Digital Credential

1. Sign the Transaction Author Agreement. [see TAA description](01/)
1. Create a Schema Definition (in some cases an existing Schema may be used without creating a new one).
2. Create a Credential Definition from a Schema ID.
3. Create a Credential with data for the Schema Attributes.
4. Offer the Credential to an Identity Owner through a Connection [(see Connections)](../basics-connections/).
5. *If* the Connection accepts the Credential Offer, Issue the Identity Owner the Credential (at which point they will have it in their digital wallet).

Notice, at no point does the Credential itself, with potentially trackable personal information, get written to the Ledger. Only the Schema Definition and the Credential Definition are written to the Ledger. The Issuer has the choice to maintain all records of the Credential Issued, but *it is not necessary to retain the data after issuance because it now resides with the Identity Owner*.

