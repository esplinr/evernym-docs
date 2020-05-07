## Proof Restrictions

What can we learn about a Credential Attribute, *other than the data*? We can tell a lot about data without ever looking at it. We know where it came from, who defined the Credential, who wrote the Schema, and which version of the Schema was used. Using these "restrictions" in our Proof Request Definitions can offer a high level of validity without ever touch the Identity Owner's private information. 

### Schema ID

The ID of the Schema on the Sovrin Ledger. This value is returned when the schema is successfully written to the Ledger.

### Schema Name

The Name value of the Schema, as it was written to the Sovrin Ledger.

### Schema Version

The version value of the Schema, as it was written to the Sovrin Ledger. Note that there can be several Schema with the same "Name" value, but with different version values on the Ledger.

### Schema Issuer DID

The Issuer public DID value of the Verifier which has written the Schema in question (from the Schema ID value) to the Ledger. 

### Credential Definition ID

The Ledger ID of the Credential Definition, as written to the Ledger by the Issuer DID.

### Issuer DID

Probably the most important restriction value, this is the DID of the Credential Issuer. In many cases this is all you will actually need to define any Credential Attribute and validate the signature of the Issuer.
