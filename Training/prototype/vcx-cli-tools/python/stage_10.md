# Building VCX CLI Tools Python - Tutorial Resources


## Full scripts

1. [vcx-cli-tools.py](/portal/training/vcx-cli-tools/python/resources/vcx-cli-tools.py)

## Data Files

These are data files used in the CLI code and placed into the './data/' directory in your code root.

1. [employee-schema.json](/portal/training/vcx-cli-tools/python/resources/employee-schema.json)
2. [employee-proof-definition.json](/portal/training/vcx-cli-tools/python/resources/employee-proof-definition.json)
3. [alice-employee-data.json](/portal/training/vcx-cli-tools/python/resources/alice-employee-data.json)

## Generated Files

These files are *generated* by the code examples, and will be unique for every DID. The CLI code saves them to the 'data/' directory.

1. alice-connection.json - file generated when LittleCorp connects with Alice. It can be deserialized at any time and converted into a Connection in order to send Credentials and Data Share Requests with Alice at any time.

```bash
    node VCX-CLI.js makeConnection QR alice 9999999999
```

2. employee-credential-defintion.json - file generated from the Credential Definition creation after it is complete.

```bash
    node VCX-CLI.js createCredentialDef employee
```

3. alice-proof.json - file generated when the Proof offer has been Issued and Accepted, and the request returned valid or invalid.

```bash
    node VCX-CLI.js requestProof employee alice
```