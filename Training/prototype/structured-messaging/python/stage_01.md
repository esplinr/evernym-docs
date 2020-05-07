# Setting up your scripting environment

This will help you set up your VM environment to create a command-line script for issuing structured messages to your Connections.


## Coding directory and dependencies

1. As instructed in the [tutorial here](/portal/training/install-and-provision-libvcx/), set up a working version of LibVcx, using libindy version 1.8.2, with correct dependencies using a Vagrant VM. SSH into the VM and navigate to the /vagrant directory. In this directory you should see the 'config' and 'data' directories, as well as the python wrapper archive. 


## Creating the scripting shell

Create a new script called 'messenger.js' in your /vagrant/ directory. This is the CLI script that will be sending messages to your Connections, once they are established. Enter the following 'shell code', or structure for running Libvcx, and save the file. This file will be the basis of all future code edits.

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

# Utility functions

async def _initialize():
    lib = cdll.LoadLibrary('/usr/lib/libsovtoken.so')
    lib.sovtoken_init()
    await vcx_init(configPath)
    return

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
