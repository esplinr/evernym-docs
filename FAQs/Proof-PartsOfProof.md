**Q. What is in the proof returned to the verifier?**

**A.** When the user gets a proof request, the values for attributes from credentials provided by the requested issuers will be presented to the user in ConnectMe. If there is more than one attribute in the user's wallet with the same name that satisfies all restrictions, the user can swipe left or right in ConnectMe to select which issuer's attribute to provide in the proof. The user then selects send in ConnectMe to transmit the proof back to the verifier. The verifier receives the proof, pulls the issuer public keys from the ledger, and verifies the data provided. If all goes well, this is what is returned by the verification process:

```json
{
    "identifiers": [
        {
            "cred_def_id": "EdaZBLKu5yi19cg8m5Vr5u:3:CL:48297:tag1",
            "rev_reg_id": null,
            "schema_id": "EdaZBLKu5yi19cg8m5Vr5u:2:ssid schema:47.95.76",
            "timestamp": null
        },
        {
            "cred_def_id": "CCTmyMYVyqGaYyopJWfxe6:3:CL:48292:tag1",
            "rev_reg_id": null,
            "schema_id": "CCTmyMYVyqGaYyopJWfxe6:2:transcript schema:46.100.19",
            "timestamp": null
        }
    ],
    "proof": {
        ...
    },
    "requested_proof": {
        "predicates": {},
        "revealed_attrs": {
            "gpa": {
                "encoded": "7067905012425508105459254709020212520221942648702641173659073215761754527023",
                "raw": "3.8",
                "sub_proof_index": 1
            },
            "major": {
                "encoded": "82587451670812115597556593320920693151471358372708713747904700340842027604498",
                "raw": "Finance",
                "sub_proof_index": 1
            },
            "name": {
                "encoded": "101331093832136381534868868869777232440371623569271840962499040121705429857418",
                "raw": "Alice Amy Anderson",
                "sub_proof_index": 0
            },
            "ssn": {
                "encoded": "744326867119662813058574151710572260086480987778735990385444735594385781152",
                "raw": "123-45-6789",
                "sub_proof_index": 0
            }
        },
        "self_attested_attrs": {},
        "unrevealed_attrs": {}
    }
}
```

In this example the `proof` section is omitted for brevity, since it is mainly of interest to cryptographers rather than to developers.

The section named `identifiers` gives the IDs of the credential definitions on the ledger that were used to sign the attributes. Note that the first part of these IDs are the DIDs of the entities that own the credential definitions.

At the bottom is the `requested_proof` section. Within this, is `evealed_attrs`.  Attributes that appear in this section have been verified to have been signed by the entities required by the proof request. To tell which entity actually signed the attribute, refer to the `sub_proof_index`. This is a pointer into the array at the top of the proof. In this example, `name`, `major` and `gpa` all came from index 1, or referring to the array at the top, from credential definition `CCTmyMYVyqGaYyopJWfxe6:3:CL:41316:tag1`, and `ssid` came from `EdaZBLKu5yi19cg8m5Vr5u:3:CL:40175:tag1`. These are owned by Faber and the Social Security Administration, respectively.
