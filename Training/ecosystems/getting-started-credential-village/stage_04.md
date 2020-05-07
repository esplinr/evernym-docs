## Credential Village Location Overview

This section is not intended to be a tutorial on how to create a Village Location or persistent credential issuer, but a description of the Village Location Architecture. Building a VCX Web App, which is what the Village Locations are based upon, is covered in [this tutorial](/portal/training/vcx-web-app/).

The Credential Village is based upon an open-ended architecture, in which you can build your own location with simple tools. The purpose of this system is to provide a persistent Credential Sandbox, inside of which you can request, exchange, and re-use Credentials. This is a great opportunity to test out your Verifiable Credential platforms in a virtual environment! It's easy to build your own persistent VCX instance and exchange the Credentials and Data Requests as you see fit, inside of a virtual ecosystem.

## Credential Village Location Visual Blueprint

The diagrams below visually illustrate the flow of data between one entity and another in the Credential Exchange Web App.  

### Step 1 : Making a Connection

![village connection blueprint](https://static.pps.evernym.com/training/getting-started-credential-village/village-connection-blueprint.png){: width="600"}

### Step 2 : Proof Request

![village proof blueprint](https://static.pps.evernym.com/training/getting-started-credential-village/village-proof-blueprint.png){: width="600"}

![village proof blueprint](https://static.pps.evernym.com/training/getting-started-credential-village/village-proof-blueprint.png){: width="600"}

### Step 3 : Credential Offer

![village proof blueprint](https://static.pps.evernym.com/training/getting-started-credential-village/village-credential-blueprint.png){: width="600"}


## Credential Village Components

### VCX REST API Server

Although you may use any REST server setup you prefer, the Village is based upon Node Express Server, which allows you to generate your own endpoint for any GET or POST requests. Your main server will be running, waiting for an http or https request. When that request comes in, for instance when a customer clicks a button on your website, the VCX Flow can be initiated.

### Module Exports for VCX Functions

In the tutorial [VCX CLI Tools for NodeJS](/portal/training/vcx-cli-tools/nodejs/) you will find the instructions on how to build a set of VCX functions that can be called from your Server Script. If you need to fast-track the process, you can get the script and import the modules into your server.js script.

### Building a VCX Flow

A VCX "Flow" is a series of actions that require VCX to initialize and act in a specific sequence. This can be triggered by the server script. A typical flow is outlined below: 

1. Connect.Me Identity Owner visits a web site, clicks a button **This step must occur first before performing any other**
2. A QR code pops up and the Identity Owner scans it with Connect.Me
3. The Identity Owner accepts the Connection Offer and the mutually authenticated connection is established.
4. A Proof is Issued to the Identity Owner, for which they provide validation of a Credential.
5. IF the Proof returns valid, A Credential Offer is sent to the Connection.
6. If the Identity Owner accepts the Credential Offer, the Credential is Issued to the Connection

The preceding steps are not always in this sequence, but the sequential order of the flow *must* begin with establishing a Connection (or re-establishing a previous Connection), after which Credential Offers and Proof Requests can be made in any order you prefer. 

### Running a Service

Using Ubuntu Linux, you must have your server.js running as a background service. There is more detailed information about how to set this up and maintain it [here](/portal/training/vcx-web-app/).

### UX Interaction with Sockets

Because Libvcx and the reads and writes to the Test Net Ledger (or the Sovrin Ledger in full production) are asynchronous, operations will not be instantaeous and therefore must be handled in a way that provides user feedback both in the Connect.Me mobile app *and* inside of the client-side web site. The client.js and the server.js javascript should therefore have a method of interaction that is independent of the Express Server API. In the Credential Village sockets.io, a node package, is used to create and maintain a socket of data communication between the server and client, which emits messages from one to the other to trigger UI events in the client.js and client html code. This is a typical setup for an async process like this, which could take a small amount of time to execute Proof validations, Connection requests, Credential Issuance, and any other operation that requires the Ledger or the Agency Server to process the object or report the State of the request.

### NGINX Setup

Setting up a web server is imperative to have a hosted web presence from which your user can initiate the Credential Exchange process. The Credential Village uses NGINX to serve the web pages and client.js code. 

