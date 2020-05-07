# Building VCX CLI Tools - Python Setup

## Step 1 : Installation of wrappers

Make sure that your global node path has been set to import the wrappers from vcx. The node wrapper folder "vcx" should be in a location that is referenced from either your global or script-based local path. In the case of these examples, the node wrappers have been saved to a local directory inside a Vagrant VM, for quick editing on the host machine. You can set up the path to the vcx folder any way you like, as long as your VM or instance of Ubuntu can see the code you are importing.

1. Unpack the python3-vcx-wrapper_0.1.27328536.tar.gz with python wrappers in a directory above your config/ directory, which should contain your vcx-config.json and genesis.txn created when provisioning your instance
2. **Rename the extracted folder from 'python3-vcx-wrapper-0.1.27328536' to 'modules'**
4. Create 'data' directory for storing json files and config data.
5. Create a VCX-CLI.py file, where we will begin coding in Node.

```bash
tar xvf python3-vcx-wrapper_0.1.27328536.tar.gz
mv python3-vcx-wrapper-0.1.27328536 modules
mkdir data
touch vcx-cli-tools.py
```

## Step 2 : Install pip and qr code

Install the pip3 Python 3 package manager first. Afterwards you will install qrcode[pil] with pip3, which is called in creating the QR code for the Connection requests.

```bash
sudo apt install python3-pip
pip3 install qrcode[pil]
```