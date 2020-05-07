# VCX Web App environment

In order to have a working VCX Web App you must set up a working instance of VCX on a Ubuntu instance either locally on a VM (if you only want to run this as a localized and non-public demo) or as a cloud-based instance (for public or permissioned access), such as AWS, Azure, or Kubernetes. Currently Docker is *possible* but not supported for the EAP program. You must also have the node wrappers for Libvcx installed and the correct directory structure set up. 

## Server Requirements

### 1. [Install and Provision Libindy/Libvcx](/portal/training/install-and-provision-libvcx/)

As instructed in the Tutorial "Install and Provision Libvcx", install and provision libvcx on a Ubuntu instance either locally with a VM, or on a cloud-hosted service. **Make sure you have a 'config' and 'data' directory in the directory you are running your code from**

### 2. [Install NodeJS, NodeJS Libvcx wrappers](/portal/training/vcx-cli-tools/nodejs/01/)

Your installed instance should be using NodeJS 8.x, with a package.json for appropriate dependencies. (covered in tutorial : "VCX CLI Tools").

### 3. [Import vcx-web-tools.js](../resources/web-server/vcx-web-tools.js)

A script has been provided, based on the tutorial "VCX CLI Tools", named "vcx-web-tools.js". If you previously went through the VCX CLI TOols Tutorial, you should understand all of the vcx functions you are importing. There are only a few minor differences in the 2 scripts, where each of the functions can return an object used in the vcx-server.js VCX API FLow, such as validating a Proof or returning a Credential readout to the REST API as an http response.

Example from "vcx-web-tools.js" (notice that the arguments are names which are used to locate json files in a 'data' directory):

```javascript
async function offerCredential(credential_name,connection_name){
    await vcx.initVcx(config);
    let credential_definition = await fs.readJson(`./data/${credential_name}-credential-definition.json`);
    let credential_data = await fs.readJson(`./data/${connection_name}-${credential_name}-data.json`);
    let connection_data = await fs.readJson(`./data/${connection_name}-connection.json`);
    let connection = await Connection.deserialize(connection_data);
    let serial_connection = await connection.serialize();
    var cred_def_deserialzed = await CredentialDef.deserialize(credential_definition);
    // get credential definition handle
    cred_def_handle = await cred_def_deserialzed.handle;
    console.log (`handle is _ ${cred_def_handle}`);
    let credential = await IssuerCredential.create({
        "sourceId":"1",
        "credDefHandle": cred_def_handle,
        "attr": credential_data.data.attrs,
        "credentialName":"Cred Name",
        "price": "0"
    });
    console.log(`Successfully created A Credential, now offering it to ${connection_name}...`);
    await credential.sendOffer(connection);
    await credential.updateState();
    let state = await credential.getState();
    while(state != 3) {
        console.log("Offer Sent, The State of the Credential Offer is "+ state);
        await credential.updateState();
        state = await credential.getState();
    }
    await credential.sendCredential(connection);
    while(state != 4) {
      console.log("Credential Sent, The State of the Credential is "+ state);
      await credential.updateState();
      state = await credential.getState();
    }
    console.log(`Congratulations! Your Credential was offered and accepted by ${connection_name}`);
}
```
