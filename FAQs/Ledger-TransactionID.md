**Q. How are the IDs of schemas and credential definitions derived?**

**A.** An example would be a schema on the ledger with an ID `74RUmWDRsbJQRSki713PYJ{2{Fan Club:0.02`, and an associated credential definition with ID `74RUmWDRsbJQRSki713PYJ{3{CL{48385:tag1`. For this example, the breakdown of the identifiers is:
- `74RUmWDRsbJQRSki713PYJ` is the DID of the entity that wrote the schema or credential definition to the ledger. In this example, the same entity wrote both the schema and credental defintion, but this is not always the case. Any entity can write a credential definition that uses any schema on the ledger.
- `2` and `3` are the ledger type IDs of schemas and cred defs, respectively. These values will be static.
- `Fan Club` is the name assigned to the schema by the application that wrote it to the ledger.
- `0.02` is the version of the schema assigned by the application that wrote it to the ledger.
- `CL` (Camenisch‑Lysyanskaya) is the signature method used by the keys in the cred def. It is the only method currently implemented.
- `48385` is the transaction sequence number (on the ledger) of the schema that corresponds to this cred def.
- `tag1` is the default, if the optional tag is not provided by the application when a credential definition is being created.
