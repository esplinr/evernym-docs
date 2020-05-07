# Building VCX CLI Tools - Outlining Your CLI Script

The first step in developing your CLI client for VCX is to create the template script for the functions to reside inside of, with proper dependencies, and structured for being runnable in the CLI of your Ubuntu instance. You will need the following items before creating the shell script:

* Libindy and LibVCX installed and provisioned, as shown [here](/portal/training/install-and-provision-libvcx/)
* A root code directory with directories named `data` and `config`. `/yourdir/config` must contain a correct `vcx-config.json` and `genesis.txn` files. You will be putting your data files in `data/` and directing your code to read and write from that directory.
* The `libvcx` node wrappers extracted into a directory named `vcx` in the root code directory

### Dependencies

Import your modules from the needed dependencies and all `vcx` modules from the wrappers.

```javascript
    // all module imports
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

```

### Configuration Path Variable

This code will set up the path to initialize VCX when a function is called.

Create a path to the `vcx-config` file:

```javascript
    // set your config path to your VM path containing your vcx-config.json file
    const config = "/home/user/config/vcx-config.json";
```

### Initialize VCX

This initializes the VCX libraries with the configuration file, as previously set as the constant `config` (see above). It must be called in an async function in order to use the `await for asynchronous` action (allowing Node to wait for the function to complete before running the next line).

```javascript
    await vcx.initVcx(config);
```

### Libsovtoken

To properly run the 1.8.2 version of LibVCX, you must set up and initialize `libsovtoken` first. This will require `ffi` to be imported (see above) and `libsovtoken` to be installed [see Install and Provision](/portal/training/install-and-provision-libvcx/)

```javascript
async function run(){
    const myffi = ffi.Library('/usr/lib/libsovtoken.so', {sovtoken_init: ['void', []]});
    await myffi.sovtoken_init();
}
run();
```

### Module Export setup

Use the Module Export setup to structure your VCX functions, which allows them to be called from `make-runnable`. Each VCX function will be async, and each time you call a VCX function you must also initialize VCX. The following is a template for building the async functions with arguments, and then exporting them as modules that can be imported into another script or run directly from the command-line prompt.

```javascript

async function vcx_function1(ar1,arg2){
    // init vcx
    await vcx.initVcx(config);
    // do some vcx function...
}
async function vcx_function2(ar1,arg2){
    // init vcx
    await vcx.initVcx(config);
    // do some vcx function...
}
async function vcx_function3(ar1,arg2){
    // init vcx
    await vcx.initVcx(config);
    // do some vcx function...
}
module.exports ={
    vcx_function1,
    vcx_function2,
    vcx_function3
}

```
### Make-Runnable

With `make-runnable` you can call your functions from the Module Exports (see above). It goes at the end of the script. It will always print the *returned value of a function* to the console, so *if* there's no return value from a function you call, it will print `undefined` to the console. You can ignore this or return a value from all of your functions.

```javascript
//make script runnable in CLI
require('make-runnable/custom')({
    printOutputFrame: false
})

```

### Sleep function

Sleep is a simple async function that allows you to call a pause before executing the next action - this will become important in actions that require "polling", or issuing query responses to the Agency Service to return the status of a Connection Request, Credential Offer, or Proof Request. If the polling happens too fast, it can result in an overload on the Agency Service, so it is best to place a small pause in between the polling requests to reduce the amount of time before a response is received.

```javascript
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
```

### VCX-CLI shell template script

Copy the code below and save it as `vcx-tools.js`, in your root code directory where the `data` and `config` directories reside. 

> **NOTE:** Aim your config path variable to the specific location of your `vcx-config.json` file. This will vary depending on your method of VM or setup environment.

When you build a VCX function, you will be inserting it into the Module Exports in order to run it from the command line.

```javascript

    // all module imports
    var vcx = require('node-vcx-wrapper');
    var qr = require('qr-image');
    var fs = require('fs-extra');
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
    
    // this function initializes libsovtoken and runs once when the script is run
    async function run(){
        const myffi = ffi.Library('/usr/lib/libsovtoken.so', {sovtoken_init: ['void', []]});
        await myffi.sovtoken_init();
    }
    run();

    async function testVCX(){
    try{
        await vcx.initVcx(config);
        return ("VCX has been successfully initiated");// return value will be displayed by make-runnable
    }catch(err){
        console.log("VCX has not been successfully initiated, see error below...");
        return(err.message);// return value will be displayed by make-runnable
    }
    }
    module.exports={
        testVCX
    }
    // make script runnable in CLI
        require('make-runnable/custom')({printOutputFrame: false})
```

### Example of Use in CLI

Using the command-line interface inside of your Ubuntu VM, you can now call the `testVCX` function from the `VCX-CLI.js` script.

```bash
    node vcx-tools.js testVCX
```

If your VCX instance has been properly provisioned and installed, you should see the following:

```bash
    VCX has been successfully initiated
```

If you have one or more issues with the installation, provisioning, or the path to the `vcx-config.json` file in your code (a common error), you will see the following:

```
    VCX has not been successfully initiated, see error below...
    <error message>
```

### Common Execution Errors
{: style="color: red"}

#### Unknown Libindy error 1035
{: style="color: red"}

This is often thrown when the path to the genesis file is not absolute, or is incorrect, or the `genesis.txn` file is not correct in some way. If you get this error while running `vcx init()` double-check the placement, integrity, and path to your `genesis.txn` file.

#### 1004 VCX Configuration Error
{: style="color: red"}

This error is returned when the `config.json` file is corrupt, unreadable, doesn't contain all proper fields, or is similarly compromised. If you receive this error, check the integrity of the `vcx-config.json` file and make sure it contains the proper values. Also make sure your config variable in your Node.js script is aiming at the correct location.