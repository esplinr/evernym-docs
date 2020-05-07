# Building a Prototype

So you want to build a prototype with your own GUI and code? We have a comprehensive path to installing, building, and testing your own Credential Exchange application using the NodeJS or Python wrappers for Libvcx. The tutorials below are listed in the correct sequence, although the only important tutorial you will need to do first before anything else is to Install and Provision an instance of Libvcx on a Vagrant VM (or cloud-based Ubuntu VM).

## [*Install and Provision Libvcx](/portal/training/install-and-provision-libvcx/)

This tutorial will show you the steps to install, provision, and configure an instance of libvcx and libindy on a Vagrant VM, running with VirtualBox. Instructions are convertible to cloud-based VM services such as Microsoft Azure and Amazon Web Services as well. This *must* be completed before any of the following tutorials can be started. 

## [VCX CLI Tools](/portal/training/vcx-cli-tools/)

This code tutorial will run you through all of the vital functions of Verifiable Credential Exchange using libvcx with NodeJS and Python wrappers, including Structured Messaging with Provable Questions. You will build a command-line interface to Connect, Issue Credentials, and Request Proofs from a consumer-based user with Connect.Me using only a command-line interface.

## [VCX Web App](/portal/training/vcx-web-app/)

The VCX Web App tutorial trains you to set up an automated VCX Server using NodeJS Express and a REST-based API to Connect, issue Credentials, and Issue Proof Requests with a simple request/response architecture. Using this architecture, you can build any web-based verifiable credential exchange prototype you desire.

## [Structured Messaging](/portal/training/structured-messaging/)

Structured Messaging and Provable Question are verifiable exchanges between an Enterprise and an end-user, in which a set of responses can be requested from a Connect.Me user and the response cyrptographically verified from the Enterprise. This tutorial addresses this feature specifically, with code samples in NodeJS and Python.

## Quick-Start : Instant VCX Web App with Vagrant VM

This tool uses Vagrant VM and VirtualBox, along with an editable VCX Web App server, to set up a REST API for automated Credential Exchange using the Sovrin Staging Net. Every bit of code and working piece has been documented and explained in the VCX Web App tutorial, but the Instant Web App will install itself and be instantly editable for all of your demo or prototype needs. You can request access to this project from your Evernym EAP representative.

## Docker Images

Docker-centric developers can request Docker images that are installed and provisioned for testing use. Request these from your EAP representative.