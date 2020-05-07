# Building VCX CLI Tools -- Tutorial Resources

## Full scripts

* [vcx-cli-tools.js](/portal/training/vcx-cli-tools/nodejs/resources/vcx-cli-tools.js)

## Data Files

These are data files used in the CLI code and placed into the `./data/` directory in your code root.

* [employee-schema.json](/portal/training/vcx-cli-tools/nodejs/resources/employee-schema.json)
* [employee-proof-definition.json](/portal/training/vcx-cli-tools/nodejs/resources/employee-proof-definition.json)
* [alice-employee-data.json](/portal/training/vcx-cli-tools/nodejs/resources/alice-employee-data.json)

## Generated Files

These files are *generated* by the code examples and so are unique for every DID. The CLI code saves them to the `data/` directory.

* `<connection_name>-connection.json` -- Generated when the enterprise connects with the user. It can be deserialized at any time and converted into a connection to send credentials and data-share requests with that same user at any time.

```bash
    node VCX-CLI.js makeConnection QR <connection_name> 9999999999
```

* `employee-credential-defintion.json` -- Generated from the Credential Definition creation after it is complete.

```bash
    node VCX-CLI.js createCredentialDef employee
```

* `<connection_name>-proof.json` -- Generated when the proof offer has been issued and accepted and the request returned valid or invalid.

```bash
    node VCX-CLI.js requestProof employee <connection_name>
```