The following tutorial will guide you through a real-life scenario using the SDK to better illustrate how it can be used using `nodejs`. The following example will illustrate a complete end-to-end flow, touching on all of the currently available functionalities.

In this examples, there are two main actors: Alice and Faber. Alice is acting as an individual using the consumer app and Faber is the institution she's interacting with. <!--How would someone use this page? To see what to program or to watch something happening in real time?-->

> **NOTE:** the (`#N....`) items within the code sections are comments with each numbered section leading you through the next step. If you want to follow along, switch back and forth between the upper portion of the code block and the lower portion of the code block. This has been done in the code explanations that follow.

## Code Block

If you'd like to see the final resultant code, you can do so here: [Node.js Code Example](example/)

## Code Explanations

Faber is initialized. At the same time, an agent and a wallet are configured: 

```javascript
var main = async function () {
  console.log('#1 Provision an agent and wallet, get back configuration details')
  let config = await vcx.provisionAgent(provisionString)
  let configJson = JSON.parse(config)
  // Set some additional configuration options specific to faber
  configJson['institution_name'] = 'Faber'
  configJson['institution_logo_url'] = 'http://robohash.org/234'
  configJson['genesis_path'] = 'genesis.txn'
  configJson['payment_method'] = 'sov'

  var libn = ffi.Library('libsovtoken', {
    'sovtoken_init': ['int', []]
  })
  libn.sovtoken_init()
```

LibVCX is then initialized with the new configuration:

```javascript
  console.log('#2 Initialize LibVCX with new configuration')
  await vcx.initVcxWithConfig(JSON.stringify(configJson))
```

Before credentials can be offered or proofs can be accepted, schemas have to be built and placed onto the ledger. Faber does this below:

```javascript
  console.log('#3 Create a new schema on the ledger')
  const SCHEMA = {
    sourceId: 'schema_uuid',
    data: {
      name: 'degree',
      version: Math.floor((Math.random() * 100) + 1) + '.' + Math.floor((Math.random() * 100) + 1) + '.' + Math.floor((Math.random() * 100) + 1),
      attrNames: ['name', 'date', 'degree']
    },
    paymentHandle: 0
  }

  let schema = await Schema.create(SCHEMA)
  const mySchemaId = await schema.getSchemaId()
```

Only after a schema has been created can credential definitions be created. Faber continues to do this below:

```javascript
  console.log('#4 Create a new credential definition on the ledger')
  const CREDENTIAL_DEF = {
    name: 'degree',
    revocationDetails: {},
    schemaId: mySchemaId,
    sourceId: 'cred_def_uuid',
    payment_handle: 0
  }

  let credentialDef = await CredentialDef.create(CREDENTIAL_DEF)
  const myCredDefId = await credentialDef.getCredDefId()
```

This <!--This what? Refers to the code below or to the previous action? Same question for all other paragraphs starting with "This".-->creates the necessary connection to Alice and prints out the invite details.

```javascript
  console.log('#5 Create a connection to alice and print out the invite details')
  const connectionToAlice = await Connection.create({ id: 'connection' })
  await connectionToAlice.connect({ id: 'connection' })
  console.log('**invite details**')
  console.log(await connectionToAlice.inviteDetails(false))
  console.log('******************')
  await connectionToAlice.updateState()
```

This sends the connection information to Alice and waits for Alice to accept the invitation. This is where you'll start the `alice.js` now.

```javascript
  console.log('#6 Poll agency and wait for alice to accept the invitation (start alice.js now)')
   let connectionState = await connectionToAlice.getState()
   while (connectionState !== StateType.Accepted) {
     sleep.sleep(2)
     await connectionToAlice.updateState()
     connectionState = await connectionToAlice.getState()
   }

   const schemaAttrs = {
     name: 'alice',
     date: '05-2018',
     degree: 'maths'
   }
```

After Alice installs the consumer app, it provisions an agent and a wallet, just like the program did for Faber. It also brings in the configuration details for Alice.

```javascript
  var main = async function () {
    console.log('#7 Provision an agent and wallet, get back configuration details')
    let config = await vcx.provisionAgent(provisionString)
    let configJson = JSON.parse(config)
    // Set some additional configuration options specific to alice
    configJson['institution_name'] = 'alice'
    configJson['institution_logo_url'] = 'http://robohash.org/456'
    configJson['genesis_path'] = 'genesis.txn'
    configJson['payment_method'] = 'sov'

    var libn = ffi.Library('libsovtoken', {
      'sovtoken_init': ['int', []]
    })
    libn.sovtoken_init()


    console.log('#8 Initialize LibVCX with new configuration')
      await vcx.initVcxWithConfig(JSON.stringify(configJson))
      console.log('#9 Input faber.js invitation details')
      console.log('Invite Details:')
      const stdinBuffer = fs.readFileSync(0)
```

This connects Alice and Faber while updating the state of the connection for Faber: 

```javascript
  console.log('#10 Convert to valid json and string and create a connection to faber')
  let connectionToFaber = await Connection.createWithInvite({ id: 'faber', invite: stdinBuffer})
  await connectionToFaber.connect({ id: 'connection' })

  let connectionState = await connectionToFaber.getState()
  while (connectionState !== StateType.Accepted) {
    await connectionToFaber.updateState()
    connectionState = await connectionToFaber.getState()
  }
```

This waits for Faber to issue the credential offer and creates a credential object:

```javascript
  console.log('#11 Wait for faber.js to issue a credential offer')
  sleep.sleep(10)
  // Create a credential object from the credential offer
  let offers = await Credential.getOffers(connectionToFaber)

  let credential = await Credential.create({ sourceId: 'credential', offer: JSON.stringify(offers[0]), connection: connectionToFaber})
```

The `IssuerCredential` object is then created using the schema and credential definition that was previously created:

```javascript
  console.log('#12 Create an IssuerCredential object using the schema and credential definition')
  let credential = await IssuerCredential.create({ sourceId: 'alice_degree', credDefHandle: credentialDef.handle, attr: schemaAttrs, price: '0', credentialName: 'FREE'})
```

This causes it to wait until Alice requests the credential:

```javascript
  console.log('#13 Issue credential offer to alice')
  await credential.sendOffer(connectionToAlice)
  await credential.updateState()
  console.log('#14 Poll agency and wait for alice to send a credential request')
  let credentialState = await credential.getState()
  while (credentialState !== StateType.RequestReceived) {
    sleep.sleep(2)
    await credential.updateState()
    credentialState = await credential.getState()
  }
```

This allows Alice to send the request for the credential to Faber:

```javascript
  console.log('#15 After receiving credential offer, send credential request')
  await credential.sendRequest({ connection: connectionToFaber, payment: 0})

   console.log('#16 Poll agency and accept credential offer from faber')
   let credentialState = await credential.getState()
   while (credentialState !== StateType.Accepted) {
    sleep.sleep(2)
    await credential.updateState()
    credentialState = await credential.getState()
  }
```

Faber then issues the credential to Alice and waits for Alice to accept it:

```javascript
  console.log('#17 Issue credential to alice')
  await credential.sendCredential(connectionToAlice)
  console.log('#18 Wait for alice to accept credential')
  await credential.updateState()
  credentialState = await credential.getState()
  while (credentialState !== StateType.Accepted) {
    sleep.sleep(2)
    await credential.updateState()
    credentialState = await credential.getState()
  }

  const proofAttrs = [
    {name: 'name', restrictions: [{issuer_did: configJson['institution_did']}]},
    {name: 'date', restrictions: [{issuer_did: configJson['institution_did']}]},
    {name: 'degree', restrictions: [{issuer_did: configJson['institution_did']}]}
  ]
```

Next, Faber will request a piece of proof from Alice. This creates the proof object that will be used to request the information from Alice: 

```javascript
  console.log('#19 Create a Proof object')
  let proof = await Proof.create({sourceId: 'proof', name: 'proof', attrs: proofAttrs, revocationInterval: {}})

  console.log('#20 Request proof of degree from alice')
  await proof.requestProof(connectionToAlice)
```

This lets it wait for Alice to provide the requested proof:

```javascript
  console.log('#21 Poll agency and wait for alice to provide proof')
  let proofState = await proof.getState()
  while (proofState !== StateType.Accepted) {
    sleep.sleep(2)
    await proof.updateState()
    proofState = await proof.getState()
  }
```

Alice sees the request for proof in her consumer app. On the back end, a disclosed proof object is created.

```javascript
  console.log('#22 Poll agency for a proof request')
  let requests = await DisclosedProof.getRequests(connectionToFaber)

  console.log('#23 Create a Disclosed proof object from proof request')
  let proof = await DisclosedProof.create({ sourceId: 'proof', request: JSON.stringify(requests[0])})
```

When Alice agrees to send the proof, the agent in her device will check the other credentials she holds to see if any fields can be satisfied without Alice having to reenter the information.

```javascript
  console.log('#24 Query for credentials in the wallet that satisfy the proof request')
  let credentials = await proof.getCredentials()
  for (var attr in credentials['attrs']) {
    credentials['attrs'][attr] = { credential: credentials['attrs'][attr][0] }
  }
```

Once the fields are satisfied, either by using previously stored credentials or by Alice entering new information, the proof is generated and sent back to Faber.

```javascript
  console.log('#25 Generate the proof')
  await proof.generateProof({selectedCreds: credentials, selfAttestedAttrs: {}})
  console.log('#26 Send the proof to faber')
  await proof.sendProof(connectionToFaber)
}
```

The proof information is received by Faber, processed, and verified that its valid.

```javascript
  console.log('#27 Process the proof provided by alice')
  let proofData = await proof.getProof(connectionToAlice)

  console.log('#28 Check if proof is valid')
  if (proofData.proofState === 1) {
    console.log('proof is verified!!')
  } else {
    console.log('could not verify proof :(')
  }
}
```