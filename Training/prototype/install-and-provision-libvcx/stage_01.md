## Setting Up VCX Environment

Libindy and Libvcx, including the wrappers for coding, can be set up and installed in one of several working environments. We suggest using Vagrant VM with VirtualBox to begin with, although cloud-based services such as Azure and AWS are possible. 

## Dependencies for local host machine (*see below for cloud-based instructions)

* VirtualBox
* Vagrant VM Manager
* VM with Ubuntu
* NodeJS 8.x/npm
* Python3/pip3


### VirtualBox 

VirtualBox 6.014 is the latest release as of this writing. VirtualBox is required to run Vagrant, which is a Virtual Machine management tool.

### Vagrant

Vagrant is a virtual machine management program that can be used in conjunction with VirtualBox in order to spin up, maintain, and work with a virtual Ubuntu server on a local host machine which you can [download here](https://www.vagrantup.com).

### Ubuntu Host

Spin up a Ubuntu 16.04 or 18.04 server using a Vagrantfile provided with this documentation.

### NodeJS 8.x with NPM

You will need NodeJS 8.x (higher versions are not yet compatible) and Node Package Manager installed on your Vagrant VM.

## Cloud-Based Hosts

Cloud-based VM hosts are perfectly compatible with Libvcx, and the instructions in this tutorial will work with them with a few modifications to paths (instead of /vagrant you will use /home/user/) for configuration and code path variables. The following have been tested using Ubuntu 16.04 and have not had issues:

* Microsoft Azure
* Amazon Web Services

## Docker

Although Docker images are possible to build and deploy using Libindy and Libvcx, this is not yet supported by Evernym's Early Access Program and Training content.
