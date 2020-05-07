## Registering your DID on the StagingNet

**If you are using an instance of Verity-UI that has been set up and provided via the Evernym Accelerator program, it has already been registered on the STN for you. You will not need to manually register it.**

These instructions will register your DID on the Sovrin Test Network for permissions to write to the Test Ledger and experimentation purposes. Without registering you will not be able to write schema or credential definitions to the Sovrin Test Network.

### Locate enterprise value in your config.json file

Below is the example of the config.json file, as it was created when you provisioned the vcx instance with the provision_agent_keys.py script. 

```json
{   
  "agency_did": "UNM2cmvMVoWpk6r3pG5FAq",
  "agency_endpoint": "https://eas01.pps.evernym.com",
  "agency_verkey": "FvA7e4DuD2f9kYHq6B3n7hE7NQvmpgeFRrox3ELKv9vX",
  "genesis_path": "genesis.txn",
  "institution_did": "BFBYCenin1YFe5CoNjS59k",
  "institution_logo_url": "https://robohash.org/pituitary",
  "institution_name": "Faber College",
  "institution_verkey": "6arFmHJyqhttd5hHDSbejq8wGtt8Rba1u6SM6U9h4eBG",
  "remote_to_sdk_did": "BPgrK8fKrsQDVrqrR3aWZL",
  "remote_to_sdk_verkey": "6fV8LYF1CMwwLh3gf9wrsvqxvrqxFoaGFmsezdNkp4rF",
  "sdk_to_remote_did": "9q2pwFqwwy6C4NbxzZR2qA",
  "sdk_to_remote_verkey": "5p5KqmAefZvEZos5vvFPCg15kJtzuwCCQdPaEvCw83c9",
  "wallet_key": "12345",
  "payment_method":"sov"
}
```

### Register your DID

The Trust Framework is an important part of the semi-permissioned Ledger. Without registering your DID on the Ledger, you will not be able to write Credential Schema, Credential Definitions, or Revocations to the Ledger. In the Production Ledger, you would have your onboarding and DID registration handled by a Steward, who would review and accept your application to be a Trust Anchor, which would then give you rights to write to the Ledger and Issue Credentials with a signature. 

[https://selfserve.sovrin.org/](https://selfserve.sovrin.org/)

```bash
"institution_did": "BFBYCenin1YFe5CoNjS59k",
"institution_verkey": "6arFmHJyqhttd5hHDSbejq8wGtt8Rba1u6SM6U9h4eBG"
```
1. Choose "Staging Net" (as opposed to "Building Net").
2. Enter the Institution DID and Verkey as provided in your provisioning configuration (vcx-config.json)
3. Ignore "Payment Address" and leave blank.
4. Submit and check the readout. It should say "Successfully wrote NYM identified by yourDID to the ledger with role ENDORSER