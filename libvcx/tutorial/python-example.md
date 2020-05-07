### Faber

```python
import asyncio
import json
import os
import sys
import random
import logging

from ctypes import cdll
from vcx.api.vcx_init import vcx_init_with_config
from vcx.api.connection import Connection
from vcx.api.issuer_credential import IssuerCredential
from vcx.api.proof import Proof
from vcx.api.schema import Schema
from vcx.api.credential_def import CredentialDef
from vcx.api.wallet import Wallet
from vcx.state import State, ProofState
from time import sleep
from vcx.api.utils import vcx_agent_provision

# logging.basicConfig(level=logging.DEBUG)

provisionConfig = {
  'agency_url':'https://eas-team1.pdev.evernym.com',
  'agency_did':'CV65RFpeCtPu82hNF9i61G',
  'agency_verkey':'7G3LhXFKXKTMv7XGx1Qc9wqkMbwcU2iLBHL8x1JXWWC2',
  'wallet_name':'faber_wallet',
  'wallet_key':'123',
  'enterprise_seed':'000000000000000000000000Trustee1'
}

async def main():
    lib = cdll.LoadLibrary('/usr/lib/libsovtoken.so')
    lib.sovtoken_init()
    print("#1 Provision an agent and wallet, get back configuration details")
    config = await vcx_agent_provision(json.dumps(provisionConfig))
    config = json.loads(config)
    # Set some additional configuration options specific to faber
    config['institution_name'] = 'Faber'
    config['institution_logo_url'] = 'http://robohash.org/234'
    config['genesis_path'] = 'genesis.txn'
    config['payment_method'] = 'sov'

    print("#2 Initialize LibVCX with new configuration")
    await vcx_init_with_config(json.dumps(config))

    print("#3 Create a new schema on the ledger")
    version = format("%d.%d.%d" % (random.randint(1,101),random.randint(1,101),random.randint(1,101)))
    schema = await Schema.create('schema_uuid','degree schema',version,['name','date','degree'],0)
    schema_id = await schema.get_schema_id()

    print("#4 Create a new credential definition on the ledger")
    cred_def = await CredentialDef.create('credef_uuid','degree',schema_id,0)

    print("#5 Create a connection to alice and print out the invite details")
    connection_to_alice = await Connection.create('alice')
    await connection_to_alice.connect('{"connection_type":"QR"}')
    await connection_to_alice.update_state()
    details = await connection_to_alice.invite_details(False)
    print("**invite details**")
    print(json.dumps(details))
    print("******************")

    print("#6 Poll agency and wait for alice to accept the invitation (start alice.py now)")
    connection_state = await connection_to_alice.get_state()
    while connection_state != State.Accepted:
        sleep(2)
        await connection_to_alice.update_state()
        connection_state = await connection_to_alice.get_state()

    schema_attrs = {
        'name': 'alice',
        'date': '05-2018',
        'degree': 'maths',
    }

    print("#12 Create an IssuerCredential object using the schema and credential definition")
    credential = await IssuerCredential.create('alice_degree',schema_attrs,cred_def.handle,'cred','0')

    print("#13 Issue credential offer to alice")
    await credential.send_offer(connection_to_alice)
    await credential.update_state()

    print("#14 Poll agency and wait for alice to send a credential request")
    credential_state = await credential.get_state()
    while credential_state != State.RequestReceived:
        sleep(2)
        await credential.update_state()
        credential_state = await credential.get_state()

    print("#17 Issue credential to alice")
    await credential.send_credential(connection_to_alice)

    print("#18 Wait for alice to accept credential")
    await credential.update_state()
    credential_state = await credential.get_state()
    while credential_state != State.Accepted:
        sleep(2)
        await credential.update_state()
        credential_state = await credential.get_state()

    proof_attrs = [
        {'name': 'name', 'restrictions': [{'issuer_did': config['institution_did']}]},
        {'name': 'date', 'restrictions': [{'issuer_did': config['institution_did']}]},
        {'name': 'degree', 'restrictions': [{'issuer_did': config['institution_did']}]}
    ]

    print("#19 Create a Proof object")
    proof = await Proof.create('proof_uuid','proof_from_alice', proof_attrs, {})

    print("#20 Request proof of degree from alice")
    await proof.request_proof(connection_to_alice)

    print("#21 Poll agency and wait for alice to provide proof")
    proof_state = await proof.get_state()
    while proof_state != State.Accepted:
        sleep(2)
        await proof.update_state()
        proof_state = await proof.get_state()

    print("#27 Process the proof provided by alice")
    await proof.get_proof(connection_to_alice)

    print("#28 Check if proof is valid")
    if proof.proof_state == ProofState.Verified:
        print("proof is verified!!")
    else:
        print("could not verify proof :(")


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
```

### Alice

```python
import asyncio
import json
import logging

from ctypes import cdll
from vcx.api.vcx_init import vcx_init_with_config
from vcx.api.connection import Connection
from vcx.api.credential import Credential
from vcx.api.disclosed_proof import DisclosedProof
from vcx.api.utils import vcx_agent_provision, vcx_messages_download
from vcx.api.wallet import Wallet
from vcx.state import State
from time import sleep

#logging.basicConfig(level=logging.DEBUG)

provisionConfig = {
 'agency_url':'https://agency-team1.pdev.evernym.com',
 'agency_did':'TGLBMTcW9fHdkSqown9jD8',
 'agency_verkey':'FKGV9jKvorzKPtPJPNLZkYPkLhiS1VbxdvBgd1RjcQHR',
 'wallet_name':'alice_wallet',
 'wallet_key':'123',
 'enterprise_seed':'000000000000000000000000Trustee1'
}

async def main():
  lib = cdll.LoadLibrary('/usr/lib/libnullpay.so')
  lib.nullpay_init()
  print("#7 Provision an agent and wallet, get back configuration details")
  config = await vcx_agent_provision(json.dumps(provisionConfig))
  config = json.loads(config)
  # Set some additional configuration options specific to alice
  config['institution_name'] = 'alice'
  config['institution_logo_url'] = 'http://robohash.org/456'
  config['genesis_path'] = 'genesis.txn'
  config['payment_method'] = 'sov'

  print("#8 Initialize LibVCX with new configuration")
  await vcx_init_with_config(json.dumps(config))

  print("#9 Input faber.py invitation details")
  details = input('invite details: ')

  print("#10 Convert to valid json and string and create a connection to faber")
  jdetails = json.loads(details)
  connection_to_faber = await Connection.create_with_details('faber', json.dumps(jdetails))
  await connection_to_faber.connect('{"connection_type":"QR"}')
  state = await connection_to_faber.get_state()
  messages = await vcx_messages_download()
  await connection_to_faber.update_state()
  state = await connection_to_faber.get_state()
  messages = await vcx_messages_download()

  print("#11 Wait for faber.py to issue a credential offer")
  sleep(10)
  offers = await Credential.get_offers(connection_to_faber)

  # Create a credential object from the credential offer
  credential = await Credential.create('credential', offers[0])

  print("#15 After receiving credential offer, send credential request")
  await credential.send_request(connection_to_faber,0)

  print("#16 Poll agency and accept credential offer from faber")
  credential_state = await credential.get_state()
  while credential_state != State.Accepted:
    sleep(2)
    await credential.update_state()
    credential_state = await credential.get_state()

  print("#22 Poll agency for a proof request")
  requests = await DisclosedProof.get_requests(connection_to_faber)

  print("#23 Create a Disclosed proof object from proof request")
  proof = await DisclosedProof.create('proof', requests[0])

  print("#24 Query for credentials in the wallet that satisfy the proof request")
  credentials = await proof.get_creds()

  # Use the first available credentials to satisfy the proof request
  for attr in credentials['attrs']:
    credentials['attrs'][attr] = {
      'credential': credentials['attrs'][attr][0]
    }

  print("#25 Generate the proof")
  await proof.generate_proof(credentials,{})

  print("#26 Send the proof to faber")
  await proof.send_proof(connection_to_faber)

if __name__ == '__main__':
  loop = asyncio.get_event_loop()
  loop.run_until_complete(main())
```
