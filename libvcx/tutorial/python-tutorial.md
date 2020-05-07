The following tutorial will guide you through a real-life scenario using the SDK to better illustrate how it can be used with Python. The following example will illustrate a complete end-to-end flow, touching on all of the currently available functionalities.

In this examples, there are two main actors: Alice and Faber. Alice is acting as an individual using the consumer app and Faber is the institution she's interacting with.

You'll also notice the (`#N......`) items within the code sections. These are comments with each numbered section leading you through the next step. If you want to follow along, you'll do this by switching back and forth between the upper portion of the code block and the lower portion of the code block. This has been done in the code explanations that follow.

## Code Block

If you'd like to see the final resultant code, you can do so here: [Python Code Example](example/1/)

## Code Explanations

Faber is initialized. At the same time, an agent and a wallet are configured:

```python
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
```

LibVCX is then initialized with the new configuration:

```python
print("#2 Initialize LibVCX with new configuration")
await vcx_init_with_config(json.dumps(config))
```

Before credentials can be offered or proofs can be accepted, schemas have to be built and placed onto the ledger. Faber does this below:

```python
print("#3 Create a new schema on the ledger")
version = format("%d.%d.%d" % (random.randint(1,101),random.randint(1,101),random.randint(1,101)))
schema = await Schema.create('schema_uuid','degree schema',version,['name','date','degree'],0)
schema_id = await schema.get_schema_id()
```

Only after a schema has been created can credential definition be created. Faber continues to do below:

```python
print("#4 Create a new credential definition on the ledger")
cred_def = await CredentialDef.create('credef_uuid','degree',schema_id,0)
```

This <!--This code below or this action previously performed?-->creates the necessary connection to Alice and prints out the invite details.

```python
print("#5 Create a connection to alice and print out the invite details")
connection_to_alice = await Connection.create('alice')
await connection_to_alice.connect('{"connection_type":"QR"}')
await connection_to_alice.update_state()
details = await connection_to_alice.invite_details(False)
print("**invite details**")
print(json.dumps(details))
print("******************")
```

This sends the connection information to Alice and waits for Alice to accept
the invitation. This is where you'll start the `alice.py` now.

```python
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
```

Once Alice installs the consumer app, it will provision an agent and a wallet, just like the program did for Faber. It will also bring in the configuration details for Alice.

```python
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
  ```

This connects Alice and Faber, while updating the state of the connection for Faber: 

```python
print("#10 Convert to valid json and string and create a connection to faber")
jdetails = json.loads(details)
connection_to_faber = await Connection.create_with_details('faber', json.dumps(jdetails))
await connection_to_faber.connect('{"connection_type":"QR"}')
state = await connection_to_faber.get_state()
messages = await vcx_messages_download()
await connection_to_faber.update_state()
state = await connection_to_faber.get_state()
messages = await vcx_messages_download()
```

This waits for Faber to issue the credential offer and creates a credential object:

```python
print("#11 Wait for faber.py to issue a credential offer")
sleep(10)
offers = await Credential.get_offers(connection_to_faber)

# Create a credential object from the credential offer
credential = await Credential.create('credential', offers[0])
```

The `IssuerCredential` object is then created using the schema and credential definition that was previously created:

```python
print("#12 Create an IssuerCredential object using the schema and credential definition")
credential = await IssuerCredential.create('alice_degree',schema_attrs,cred_def.handle,'cred','0')
```

The causes it to wait until Alice requests the credential:

```python
print("#13 Issue credential offer to alice")
await credential.send_offer(connection_to_alice)
await credential.update_state()

print("#14 Poll agency and wait for alice to send a credential request")
credential_state = await credential.get_state()
while credential_state != State.RequestReceived:
    sleep(2)
    await credential.update_state()
    credential_state = await credential.get_state()
```

This allows Alice to send the request for the credential to Faber:

```python
print("#15 After receiving credential offer, send credential request")
await credential.send_request(connection_to_faber,0)

print("#16 Poll agency and accept credential offer from faber")
credential_state = await credential.get_state()
while credential_state != State.Accepted:
   sleep(2)
   await credential.update_state()
   credential_state = await credential.get_state()
```

Faber then issues the credential to Alice and waits for Alice to accept it:

```python
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
```

Next, Faber will request a piece of proof from Alice.  This creates the proof object that will be used to request the information from Alice: 

```python
print("#19 Create a Proof object")
proof = await Proof.create('proof_uuid','proof_from_alice', proof_attrs, {})

print("#20 Request proof of degree from alice")
await proof.request_proof(connection_to_alice)
```

This lets it wait for Alice to provide the requested proof:

```python
print("#21 Poll agency and wait for alice to provide proof")
proof_state = await proof.get_state()
while proof_state != State.Accepted:
    sleep(2)
    await proof.update_state()
    proof_state = await proof.get_state()
```

Alice sees the request for proof in her consumer app. On the back end, a disclosed proof object is created.

```python
print("#22 Poll agency for a proof request")
requests = await DisclosedProof.get_requests(connection_to_faber)

print("#23 Create a Disclosed proof object from proof request")
proof = await DisclosedProof.create('proof', requests[0])
```

When Alice agrees to send the proof, the agent in her device will check the other credentials she holds to see if any fields can be satisfied without Alice having to reenter the information.

```python
print("#24 Query for credentials in the wallet that satisfy the proof request")
credentials = await proof.get_creds()

# Use the first available credentials to satisfy the proof request
for attr in credentials['attrs']:
    credentials['attrs'][attr] = {
        'credential': credentials['attrs'][attr][0]
    }
```

Once the fields are satisfied either through the use of previously stored credentials or through Alice entering new information, the proof is generated and sent back to Faber.

```python
print("#25 Generate the proof")
await proof.generate_proof(credentials,{})

print("#26 Send the proof to faber")
await proof.send_proof(connection_to_faber)
```

The proof information is received by Faber, processed and verified that it's valid.

```python
print("#27 Process the proof provided by alice")
await proof.get_proof(connection_to_alice)

print("#28 Check if proof is valid")
if proof.proof_state == ProofState.Verified:
    print("proof is verified!!")
else:
    print("could not verify proof :(")
```
