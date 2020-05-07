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

```json
[
  {
    "restrictions":[{"issuer_did": "CCTmyMYVyqGaYyopJWfxe6"}],
    "name": "major"
  },
  {
    "restrictions":[{"issuer_did": "CCTmyMYVyqGaYyopJWfxe6"}],
    "name": "gpa"
  },
  {
    "restrictions":[{"issuer_did": "EdaZBLKu5yi19cg8m5Vr5u"}],
    "name": "ssn"
  },
  {
    "restrictions":[{"issuer_did": "CCTmyMYVyqGaYyopJWfxe6"}, {"issuer_did": "EdaZBLKu5yi19cg8m5Vr5u"}],
    "name": "name"
  }
]
```

In this expanded example the attributes returned in a proof must be signed by specified entities with well-known, public DIDs which are published on the Sovrin ledger. In addition to the issuer's DID, other restrictions can be imposed on returned attributes, such as which schema the credential containing the attribute is based upon.

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
