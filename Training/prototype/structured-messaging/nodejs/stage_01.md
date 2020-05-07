# Setting up your scripting environment

This will help you set up your VM environment to create a command-line script for issuing structured messages to your Connections.


## Coding directory and dependencies

1. As instructed in the [tutorial here](/portal/training/install-and-provision-libvcx/), set up a working version of LibVcx, using libindy version 1.8.2, with correct dependencies using a Vagrant VM. SSH into the VM and navigate to the /vagrant directory. In this directory you should see the 'config' and 'data' directories, as well as the node-vcx-wrapper_0.2.41140129-e0d1c6e_amd64.tgz wrapper archive. 

2. In the root scripting directory, which should be inside of /vagrant on your host machine, create a package.json file and edit to match the following:

```json
{
  "name": "messenger",
  "version": "0.0.0",
  "description": "VCX Structured Message",
  "scripts": {
    "messenger.js
  },
  "dependencies": {
    "base64url": "^3.0.1",
    "ffi": "^2.3.0",
    "ffu": "0.0.1",
    "fs-extra": "^7.0.0",
    "http": "0.0.0",
    "logger": "0.0.1",
    "make-runnable": "^1.3.6",
    "node-vcx-wrapper": "node-vcx-wrapper_0.2.41140129-e0d1c6e_amd64.tgz",
    "qr-image": "^3.2.0"
  }
}
```

Make sure that the node-vcx-wrapper_0.2.41140129-e0d1c6e_amd64.tgz is in the root coding directory, then run 'npm install'. If you have issues with the install, see TroubleShooting Guide for how to fix npm install.


## Creating the scripting shell

Create a new script called 'messenger.js' in your /vagrant/ directory. This is the CLI script that will be sending messages to your Connections, once they are established. Enter the following 'shell code', or structure for running Libvcx, and save the file. This file will be the basis of all future code edits.

```javascript

#!/usr/bin/env node
var vcx = require('node-vcx-wrapper');
var qr = require('qr-image');
var fs = require('fs-extra');
var ffi = require('ffi');

//vcx imports
const {
  Schema,
  CredentialDef,
  Connection,
  IssuerCredential,
  Proof,
  StateType,
  Error,
  rustAPI
} = vcx;

let config = "./config/vcx-config.json";
// load up libsovtoken
async function run(){
    const myffi = ffi.Library('/usr/lib/libsovtoken.so', {sovtoken_init: ['void', []]});
    await myffi.sovtoken_init();
}
run();


module.exports={
  // this is where you put your exports
}

//make script runnable in CLI
require('make-runnable/custom')({
    printOutputFrame: false
})

```
