```python
import asyncio
import json
from vcx.api.vcx_init import vcx_init
from vcx.api.schema import Schema
from vcx.api.connection import Connection
from vcx.state import State
from vcx.api.proof import Proof
from time import sleep

ALICE_INSTITUTION_DID = 'Niaxv2v4mPr1HdTeJkQxuU'
CINDY_INSTITUTION_DID = '8MRZyZHdHZ5ep8TwBfeVx4'
BOB_PHONE_NUMBER = '2055551212'

async def main():
  schema_filename_address = '/tmp/schema_address.dat'
  schema_filename_drivers_license = '/tmp/schema_drivers_license.dat'
  schema_data = {}
  with open(schema_filename_address, 'r') as in_file:
  schema_data['address'] = json.load(in_file)
  with open(schema_filename_drivers_license, 'r') as in_file:
  schema_data['drivers_license'] = json.load(in_file)

  source_id = 'bob'

  await vcx_init('/tmp/vcxconfig_cindy.json')

  bob_connection = await Connection.create(source_id)
  await bob_connection.connect(BOB_PHONE_NUMBER)
  await bob_connection.update_state()
  connection_state = await bob_connection.get_state()
  print('Connection State: %s' % connection_state)
  while connection_state != State.Accepted:
  print("waiting for Bob to accept connection...")
      sleep(2)
      await bob_connection.update_state()
      connection_state = await bob_connection.get_state()

  home_address_schema = await Schema.deserialize(schema_data['address'])
  home_address_schema_sequence_number = await home_address_schema.get_sequence_number()
  drivers_license_schema = await Schema.deserialize(schema_data['drivers_license'])
  drivers_license_schema_sequence_number = await drivers_license_schema.get_sequence_number()

  print("Home Address Schema Sequence Number: %s" % home_address_schema_sequence_number)
  print("Schema Attributes: ")
  print(home_address_schema.attrs)

  print("Driver's License Schema Sequence Number: %s" % drivers_license_schema_sequence_number)
  print("Schema Attributes: ")
  print(drivers_license_schema.attrs)

  proof_claims = [{'schema_seq_no': home_address_schema_sequence_number,
      'name': 'city',
      'issuer_did': 'Niaxv2v4mPr1HdTeJkQxuU'  # Alice's Publicly known Institution DID
      },
      {'schema_seq_no': drivers_license_schema_sequence_number,
      'name': 'age',
      'issuer_did': 'Niaxv2v4mPr1HdTeJkQxuU'  # Alice's Publicly known Institution DID
  }]
  proof = await Proof.create(source_id, 'Address Details', proof_claims)
  print(proof.source_id)

  await proof.request_proof(bob_connection)

  await proof.update_state()
  proof_state = await proof.get_state()
  print('Proof State: %s' % proof_state)
  while proof_state != State.Accepted:
      print("waiting for Bob to send proof...")
      sleep(2)
      await proof.update_state()
      proof_state = await proof.get_state()
  print('Proof from Bob Received and verified!')
  print(str(await proof.get_state()))
if __name__ == '__main__':
loop = asyncio.get_event_loop()
loop.run_until_complete(main())
```
