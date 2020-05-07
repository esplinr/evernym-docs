## Install Libvcx and dependencies

If you are using a Vagrant VM, make sure you are in the shell and ssh logged into that instance.

### Add apt-key and repository

This will add your apt-get key to obtain access to the Sovrin repository and update with the packages.

```bash
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 68DB5E88 
sudo add-apt-repository "deb https://repo.sovrin.org/sdk/deb xenial stable"
sudo apt-get update
```

### Install latest versions of Libindy, Libnullpay, Libsovtoken and Libvcx

This will install the libindy package. Version 1.8.2 is the most current EAP version supported. Please note that this is not the *newest* version and that any version other than this is not yet supported by the Accelerator training. The Libindy and Libnullpay packages can be installed through apt-get and the libvcx 0.2.411x should be provided to you through the onboard package *OR* downloaded from the Evernym portal (please request download credentials from the EAP representative). If you are a current EAP customer, you should find the libsovtoken, libvcx, and correct version nodejs/python wrappers at https://customer.evernym.com/portal/software-downloads/.

```bash
sudo apt-get update
sudo apt install libindy=1.8.2
sudo dpkg -i libsovtoken_0.9.7_amd64.deb
sudo dpkg -i libvcx=0.2.41140129-e0d1c6e
```
