### Prerequisites

* Supported development environments:
  * Node.js
  * Python

* Ubuntu 18.04 VM. You may use the following option:

  * [Vagrant](vagrant/)

* Required files for the installation. For compatibility, download files from a single row of the [Software Downloads page](/portal/software-downloads). Transfer them to your Ubuntu VM.

  * `libindy deb`
  * `libvcx deb`
  * `libnullpay deb`
  * `libsovtoken deb`
  * `node.js` wrapper (if coding in JavaScript)
  * `python` wrapper (if coding in Python)

### New Installation
libVCX should be installed on Ubuntu 18.04.

To install the binaries, run the following commands. As necessary, replace the version numbers with those of the files you downloaded.

```bash
sudo dpkg -i libindy_1.12.0_amd64.deb
```
An error likely occurred here. Fix it with `install -f` and continue installing. <!--Why show a bad command?-->

```bash
sudo apt-get install -f
sudo dpkg -i libsovtoken_1.0.3_amd64.deb
sudo dpkg -i libvcx_0.4.59278406-4632843_amd64.deb
sudo apt-get install -f
```
The base installation of libvcx is complete. You will also need to install a wrapper depending on your language: 
* [Python](#Python-Wrapper) 
* [Node.js](#Node.js-Wrapper)

#### Python Wrapper
The libvcx Python wrapper works with the default Python 3 version (3.6.9) that comes with Ubuntu 18.04. From the libvcx libraries you will need to use only the wrapper, an environment variable, and optionally a QR code library. 

**1. Unpack the wrapper where you want it on your VM.**

```bash
tar xzf python3-vcx-wrapper_0.2.41140129.tar.gz
```

**2. Set up the `PYTHONPATH` environment variable.**

In the following example, the path should be modified to point to the location where the wrapper was unpacked.

```bash
export PYTHONPATH=$HOME/python/python3-vcx-wrapper-0.4.59280674 >> ~/.bashrc
source ~/.bashrc
```
**3. Optional -- Install a QR code library.**

It is common to use QR codes to be scanned with a smartphone to transmit connection invitations to your users. If you plan to use QR codes to pass connection data, install a library to generate the code images:

```bash
sudo apt install python3-pip
pip3 install qrcode[pil]
```

#### Node.js Wrapper

The Node.js wrappers are written for Node.js version 8.x.

**1. Install Node.js**

```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get update
sudo apt-get install nodejs
```
Check the installed version using `node --version`. If it shows any 8.x version, your setup is correct.

**2. Copy the wrapper tarball (e.g., `node-vcx-wrapper_..._amd64.tgz`) into the directory you will be using for your Node.js development.**

**3. Prepare the configuration file for NPM**

Your wrapper should be placed in a directory on your VM where it can be referenced from the agent script you will write. A good place is in your project directory. In that directory, create and open `package.json` with your text editor and paste this into it:

```json
{
  "name": "VCX-CLI-Tools-Node.js",
  "version": "1.0.0",
  "description": "VCX CLI Tools",
  "scripts": {
    "nodeVCXTools": "node vcx-cli-tools.js"
  },
  "dependencies": {
    "base64url": "^3.0.1",
    "ffi": "^2.3.0",
    "ffu": "0.0.1",
    "fs-extra": "^7.0.0",
    "make-runnable": "^1.3.6",
    "node-vcx-wrapper": "node-vcx-wrapper_0.2.41140129-e0d1c6e_amd64.tgz",
    "qr-image": "^3.2.0",
    "sleep": "^6.0.0",
    "uuid": "^3.3.3"
  }
}
```
Replace the wrapper file name with the correct one for the `tar` file that you have downloaded. As desired, you can also replace the script name. Save the file.

**4. Install Node.js wrapper and its dependencies**

In the directory containing your `package.json` file, run `npm install`. This will install the libvcx Node.js wrapper and all needed dependencies such as `qr-image` and `make-runnable` packages. If you get some errors during this installation, check your version of Node.js, which should be 8.x. Any other version will give you errors.

```bash
npm install
```
**_In case of installation error_**
If there is an error in the `npm install` process, you can attempt the following steps to run it again.

  1. Reinstall the build essential tools:
```
sudo apt-get install build-essential
```
  2. Install `apt-get install libkrb5-dev`:
```
apt-get install libkrb5-dev
```
  3. Clear the previous attempt and retry the install:
```
rm -r node_modules;
npm install
```

### Provisioning the Wallet and Other Configuration

After installation, you should provision the wallet for your new agent, and create a configuration file for it. Follow the instructions in "[Configuring and Provisioning](../configure-provision/)" to complete these steps.
