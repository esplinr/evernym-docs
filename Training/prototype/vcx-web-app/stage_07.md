# Assembly of Toolkit

Along with the previous instructions on setting up your VCX Web App, we have provided a toolkit with a few files that will assist you in setting up the architecture for your own VCX Web App as rapidly as possible. There are 3 parts to this toolkit; Client, Server, and Data. This is set up to mimic any client-server relationship that would be set up in a production environment.

## Client Tools - Tools to set up and host as a web page or run locally on any Operating System

  * vcx-index.html - basic html code with interactive VCX elements
  * vcx-client.js - simple client script that send the http request, parses the QR code response, and uses socket.io to receive messages and update the UI
  * socket.io.js - sets up messaging sockets between the server and the UI

## Server Tools - Tools to set up and run in a Ubuntu 16.04 environment after installing and provisioning Libvcx as outlined in the Install and Provision Tutorial

  * vcx-server.js - runs the Express REST-like API and manages the sockets.io messaging, imports the vcx-web-tools.js script
  * vcx-web-tools.js - based upon the VCX CLI Tools Tutorial, this script imports and uses the vcx functions for creating Connections, Offering Proofs, and Issuing Credentials to the Connect.Me mobile App.
  * VCXWebApp.service - a service file for Ubuntu 16.04, in order to run vcx-server.js as a background service
  * package.json - imports the NodeJS Libvcx wrappers and dependencies

## Data Tools - Tools for creating and proving credentials that are already issued through the Credential Village. 

  * employee-schema.json - the schema data structure for writing schema
  * employee-data.json - the data for the employee credential to be issued
  * employee-proof-definition.json - the proof definition requesting the employee data
  * passport-schema.json - the passport schema for the credential to be written
  * passport-data.json - the data for the passport credential
  * passport-proof-definition.json - the proof definition requesting the passport data (using the Village DID restriction)


  All of this can be run from a single Vagrant VM environment as outlined in the Install and Provision Tutorial. You will need to configure the IP address and API endpoints in the vcx-client.js script accordingly.


  ## Step 1 : Install and Provision VCX instance

  As instructed in the Tutorial : Install and Provision, set up and provision a working instance of Libvcx on a Ubuntu 16.04 Virtual Machine with a 'data' and 'config' directory. Make sure you have installed NodeJS version 8.x.

  ## Step 2 : Install vcx-server and vcx-web-tools

  Using the package.json and the provided libvcx NodeJS wrappers, run npm install in your root code directory. Use the VCXWebApp.service file to begin the vcx-server.js background service running.

  ```bash
  npm install
  ```

  ## Step 3 : Write Schema and Credential Definition to the Ledger

  Using the REST endpoint "build_credentials" through Postman or any other REST-abled command from any language, prompt the VCX Server you set up to build Credential Definitions from the Schema in your ./data directory (available in your 'data' directory from the Toolkit resources). The options you have are 'employee' and 'passport'. You will need to create Credential Definitions from both of them in order for the Toolkit to work properly. There is a vcx-build_cred.html web page in the resources/web directory that can build the Credential Definition for you. Alternately you can simply use curl in the command line (as illustrated below).

  ```bash
    curl -X POST -H 'Content-Type: application/json' -d '{"build_cred":"passport"}' http://172.28.128.21:5000/api/v1/build_credential
  ```

  ## Step 4 : Access the vcx-index.html with a browser and run the app

  If you open the vcx-index.html page you will see a rudimentary example of the web app interface. Clicking the button will generate a QR code, which you can scan with Connect.Me to begin the process. There are two examples/configurations to try.

  1. Request Proof of a Passport Credential, then Issue an Employee Credential - this works because you should already have your Village Passport Credential, and Connect.Me should find it immediately.
  2. Request an Employee Credential and Issue a Passport Credential - this is designed to illustrate the use of self-attested claims, and then checking for their existence. In this case, since you don't already have the Credential from the correct Issuer, Connect.Me will prompt you to self-attest the claims. If you are using the self-attested claim filter code, the proof for that should fail and be reported as invalid.