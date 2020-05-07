# Building VCX CLI Tools -- Completed CLI Code

Now that you have achieved the primary functions of your CLI client, you can put it all together in a single script, which will allow you to manually perform verifiable credential exchange with an Identity Owner using Connect.Me. 


## JSON-Based Data 

`vcx-cli-tools.js` is a **JSON file-based** data system, which reads and writes data files from a `data` directory in your root code directory. The `data` directory contains files for the creation of schemas, proof templates, and user data, along with generated files that are saved from serialized data objects. Generated files are created from connections, credentials, and proofs in the credential exchange process and written to JSON objects in the `data` directory.

## Making It Executable

First you must make it executable in the VM.

```bash
    chmod +x vcx-cli-tools.js
```

Add the following line to the head of the script:

```javascript
    #!/usr/bin/env node
    //follow with nodejs code
```

Now you can execute the script with the command `./vcx-cli-tools.js function <args>`


## Full CLI Script

`vcx-cli-tools.js`

## Usage Examples

```bash
    ./vcx-cli-tools.js makeConnection QR alice 9999999999
```

```bash
    ./vcx-cli-tools.js createSchema employee
```

```bash
    ./vcx-cli-tools.js createCredentialDef employee
```

```bash
    ./vcx-cli-tools.js offerCredential employee alice
```
```bash
    ./vcx-cli-tools.js requestProof employee alice
```
