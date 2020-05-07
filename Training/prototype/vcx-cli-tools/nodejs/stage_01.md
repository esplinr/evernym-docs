
# Node.js Setup for LibVCX

Node.js setup for VCX command-line tools.

## Installation of Node 8.x

Node 8.x is the correct version for the Node VCX wrappers. You can install it for Ubuntu using a cURL download and `apt-get` installation, as illustrated below. If the console reads version 8.x, then you have installed the correct version.

```bash
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get update
sudo apt-get install nodejs
node --version
```
If you see any version higher than 8.0, but not 9.0 or above, your setup is correct.

## Installation of tools, wrappers, and dependencies

1. Follow the [Install and Provision LibVCX Tutorial](/portal/training/install-and-provision-libvcx/) and set up a LibVCX instance on a VM.
2. Create a `data` directory for storing JSON files in the root code directory for your project.
3. Create a file in the root code directory and name it `vcx-tools.js`. This file is where we will put all of our code to run VCX functions from the command line.
4. Run `npm init` to create the `package.json` file and prepare for installation.

```bash
  mkdir data
  touch vcx-tools.js
  npm init
```

## NPM Installation

1. First, install some important packages with Node Package Manager (`npm`). By running `npm install` you should get `npm` and all dependencies listed in `package.json`. Open `package.json` (generated with `npm init`) and edit the file (or paste the following text into it), including the `dependencies` values:

  ```json
  {
    "name": "VCX CLI Tools NodeJS",
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
  }
  ```

2. Next run `npm install` to install all needed dependencies and the VCX package, which is a local set of files that is not accessible through the web-based `npm` installation process, such as other packages like `qr-image` and `make-runnable`. **If** you get some errors during this installation, please check your **version of Node, which should be 8.x**. Any other version will give you errors with the installation. The version of Node used for this training content, `libindy` version 1.6.8 and `libvcx` version 0.1.27328536-fb7b7b6 is Node version 8.12. **Make sure that you are in the root of your directory containing `package.json`, created previously**

  ```bash
    npm install
  ```
3. If all goes well with the module installation, you should see a message in the console indicating that this was successful.

## NPM Installation Failure
{: style="color: red"}

If there is an error in the `npm install` process (usually based upon an environment configuration issue), you can attempt the following steps and attempt again.

1. Reinstall the build essential tools.

```bash
    sudo apt-get install build-essential
```

2. Install `apt-get install libkrb5-dev`.

```bash
    apt-get install libkrb5-dev
```

3. Clear the previous attempt and re-try the installation.

```bash
    rm -r node_modules
    npm install
```