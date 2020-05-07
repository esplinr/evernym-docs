# Python Wrapper code for Libvcx

In the following tutorial, we'll be building one python script to cover all important functions of Libvcx that will be needed for a credential exchange with a Connect.Me user.

* Schema Creation
* Credential Definition Creation
* Connection Request and Authentication
* 

## System Imports

These are system imports, along with the qr code module you will be using to generate a QR code image.

```python
import asyncio
import json
import os
import sys
import random
import argparse
import qrcode
from time import sleep
import datetime
import inspect
import uuid
import base64

```

## Import VCX Modules

We will be importing our modules from the needed dependencies, and all 'vcx' modules from the wrappers.

```python
sys.path.append('.')# this adds 'modules' to your path
# Import vital vcx modules
from vcx.api.vcx_init import vcx_init
from vcx.api.connection import Connection
from vcx.api.issuer_credential import IssuerCredential
from vcx.api.proof import Proof
from vcx.api.schema import Schema
from vcx.api.credential_def import CredentialDef
from vcx.api.wallet import Wallet
from vcx.state import State, ProofState
from vcx.api.utils import vcx_agent_provision, vcx_messages_download, vcx_messages_update_status
from vcx.common import mint_tokens
from ctypes import cdll
from vcx.error import VcxError
```

## Configuration path variable

This code will set up the path to initialize VCX when a function is called.

1. Create a path to the vcx-config file
```python
    # set your config path to your VM path containing your vcx-config.json file
    configPath = "./config/vcx-config.json"
```

## Initialize VCX

This initializes libsovtoken and libvcx, which will occur each time you call a function from the a vcx module. You will need to call this function each time that you run a function from the vcx python wrapper.

```python
    async def _initialize():
        lib = cdll.LoadLibrary('/usr/lib/libsovtoken.so')
        lib.sovtoken_init()
        await vcx_init(configPath)
        return
```

## Python VCX command shell template script

```python
import asyncio
import json
import os
import sys
import random
import argparse
import qrcode
from time import sleep
import datetime
import inspect
import uuid
import base64

from vcx.api.vcx_init import vcx_init
from vcx.api.connection import Connection
from vcx.api.issuer_credential import IssuerCredential
from vcx.api.proof import Proof
from vcx.api.schema import Schema
from vcx.api.credential_def import CredentialDef
from vcx.api.wallet import Wallet
from vcx.state import State, ProofState
from vcx.api.utils import vcx_agent_provision, vcx_messages_download, vcx_messages_update_status
from vcx.common import mint_tokens
from ctypes import cdll
from vcx.error import VcxError

# Global variables
configPath = "./config/vcx-config.json"
sys.path.append('./modules')

# sample function

async def VCXFunction(arg1,arg2):
    # initialize vcx
    await _initialize()
    # do some thing
    return

# Utility functions
# Initialize libsovtoken and lilbvcx

async def _initialize():
    lib = cdll.LoadLibrary('/usr/lib/libsovtoken.so')
    lib.sovtoken_init()
    await vcx_init(configPath)
    return

# main script  loop
if __name__ == '__main__':
    function = getattr(sys.modules[__name__], sys.argv[1])
    loop = asyncio.get_event_loop()
    loop.run_until_complete(function(*sys.argv[2:]))
    loop.stop()
    loop.close()
    print("Exiting...")
    sleep(1)
    exit()
```

## Command-Line Execution

Execute the script and call the function with the args you desire.

```bash
python3 vcx-cli-tools.py someVCXFunction arg1 arg2 
```

## Common Problems and error codes with vcxInit():
{: style="color: red"}

### Unknown Libindy error 1035
{: style="color: red"}

This is often thrown when the path to the genesis file is not absolute, or is incorrect, or the genesis.txn file is not correct in some way. If you get this error while running vcx init() double-check the placement, integrity, and path to your genesis.txn file.

### 1004 VCX Configuration Error
{: style="color: red"}

This error is returned when the config.json file is corrupt, unreadable, doesn't contain all proper fields, or is similarly compromised. If you receive this error, check the integrity of the vcx-config.json file and make sure it contains the proper values. Also make sure your config variable in your NodeJS script is aiming to the correct location.