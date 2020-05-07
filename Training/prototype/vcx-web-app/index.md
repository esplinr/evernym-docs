# Building a VCX Web Application

Building a VCX Web App requires multiple moving parts. In order to properly
build a functioning end-to-end web site that can implement Connections,
Credentials, and Data Share Requests you must be able to properly build the
front end client web site, the server, and the interactions between the two. 

1. Client Web site with js files 
2. Nginx or Apache Web Server host
3. Remote Server with VCX and Nodejs wrappers installed 
4. Node express server running
5. REST-like API to create "flows" with VCX functions
6. Sockets.io or Websockets to establish real-time connections between the VCX codebase and the client app

With all of these components working together, you should be able to easily put together a working prototype of a VCX Web app with automated REST-like API endpoints to send requests and initiate VCX code sequences that will allow you to do the following:

* Establish a Connection (with QR, SMS, or mobile Deep Link)
* Validate a Proof Request
* Issue A Credential Offer

## [Step 1 : Setting up your Environment](01/)

Setting up the proper Environment for your client/server interaction.

## [Step 2 : Setting up your VCX Server](02/)

Setting up for the Node Express Server

## [Step 3 : VCX Web Tools](03/)

Importing VCX Web Tools 

## [Step 4 : Designing the VCX Flow](04/)

Designing a Credential Exchange Flow, establishing Connections, Proof Requests, Credential Issuance

## [Step 5 : Setting up a Service](05/)

Creating a Service file and running your vcx-server as a service

## [Step 6 : Setting up the VCX Client](06/)

HTML and vcx-client script

## [Assembly](07/)

Full Assembly instructions for Libvcx Web App

## [Resources](08/)

File resources for VCX Web App Construction
