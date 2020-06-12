**Q. What Are the Parts of a Proof Request?**

**A.** A verifier sends a _proof request_ to a prover, requesting that credential data be provided. At its most simple, a proof request is just a list of attribute names:

```json
[
  {
    "name": "major"
  },
  {
    "name": "gpa"
  },
  {
    "name": "ssn"
  },
  {
    "name": "name"
  }
]
```

These undecorated names may have any origin. They can even be self-attested by the prover, and they will be deemed to satisfy the proof request. In many cases, a prover may have many credentials already in his wallet that could satisfy such a request, and he will be allowed to select any of them to satisfy the request.

Such general, unrestricted proof requests may satisfy unimportant queries such as "What is your favorite color?", but would not be acceptable for more exacting needs. In the above example, `major` and `gpa` may only be acceptable if provided by an accredited educational institution, and a social security number (in the U.S.) may only be acceptable if it is attested to by the Social Security Administration. To accomodate this, _restrictions_ are imposed within the proof request.

The following restrictions are possible:
* issuer_did
* schema_id
* schema_issuer_did
* schema_name
* schema_version
* cred_def_id

For a given attribute, restrictions may be enforced by including them in the `restrictions` array. See example below:

```json
[
  { "name":"name",
    "restrictions":[{"issuer_did": "QHxGTDnBDTvcATTXAPgpDT"}]
  },
  {
    "name":"date of birth",
    "restrictions":[{"issuer_did": "QHxGTDnBDTvcATTXAPgpDT"}, {"issuer_did": "EdaZBLKu5yi19cg8m5Vr5u"}]
  },
  {
    "name":"ssn",
    "restrictions":[{"issuer_did":"QHxGTDnBDTvcATTXAPgpDT"}]
  },
  {
    "name": "major",
    "restrictions":[{"schema_id": "2hoqvcwupRTUNkXn6ArYzs:2:standardized-transcript:4.4.4"}]
  },
  {
    "name": "gpa",
    "restrictions":[{"schema_id": "2hoqvcwupRTUNkXn6ArYzs:2:standardized-transcript:4.4.4"}]
  },
  {
    "name": "graduation date",
    "restrictions":[{"schema_id": "2hoqvcwupRTUNkXn6ArYzs:2:standardized-transcript:4.4.4"}]
  }
]
```

In this expanded example the `name`, `date of birth`, and `ssn` attributes returned in a proof must be signed by specified entities with well-known, public DIDs which are published on the Sovrin ledger. Furthermore the `date of birth` attribute can come from either of two well-known, public DIDs. Additionally, the `major`, `gpa`, and `graduation date` attributes must come from credentials compliant with version 4.4.4 of a schema called 'standardized-transcript', written to the Sovrin ledger by a specified entity with the indicated DID.

The general format for a proof request attribute list is:

```json
[
  {
    "name": "",
    "restrictions": [],
    "non_revoked": {},
    "self_attest_allowed": false
  },
  {
    "name": "",
    "restrictions": [],
    "non_revoked": {},
    "self_attest_allowed": false
  },
  {
    names: ["","",""]
  }
]
```

So a fully expanded example of attributes in a proof might look like this:

```json
[
  { "name":"name",
    "restrictions":[{"issuer_did": "QHxGTDnBDTvcATTXAPgpDT"}]
  },
  {
    "name":"date of birth",
    "self_attest_allowed": false,
    "restrictions":[{"issuer_did": "QHxGTDnBDTvcATTXAPgpDT"}, {"issuer_did": "EdaZBLKu5yi19cg8m5Vr5u"}]
  },
  {
    "name":"ssn",
    "restrictions":[{"issuer_did":"QHxGTDnBDTvcATTXAPgpDT"}]
  },
  {
    "name": "major",
    "restrictions":[{"schema_id": "2hoqvcwupRTUNkXn6ArYzs:2:standardized-transcript:4.4.4"}]
  },
  {
    "name": "gpa",
    "restrictions":[{"schema_id": "2hoqvcwupRTUNkXn6ArYzs:2:standardized-transcript:4.4.4"}]
  },
  {
    "name": "graduation date",
    "restrictions":[{"schema_id": "2hoqvcwupRTUNkXn6ArYzs:2:standardized-transcript:4.4.4"}]
  },
  {
    "names": ["major", "gpa", "graduation date"]
  }
]
```

Here it has been further stipulated that the `date of birth` attribute may not be self-attested and that the `major`, `gpa`, and `graduation date` attributes must all come from the same credential (i.e. one, single transcript that complies with the standardized schema indicated in the `restrictions`).

If a proof is needed that can be derived from information that is in an attribute in a prover's wallet, without disclosing the actual attribute, this is done with a _predicate_ proof request. For example, a GPA of greater than or equal to 3 can be proven without disclosing the actual GPA:

```json
[
  {
    "name":"gpa",
    "p_type":">=",
    "p_value":3
  }
]
```
