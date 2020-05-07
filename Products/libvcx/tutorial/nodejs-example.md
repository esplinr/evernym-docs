### Faber

```nodejs
const sleep = require('sleep')
const vcx = require('node-vcx-wrapper')
const ffi = require('ffi')

const {
  Schema,
  CredentialDef,
  Connection,
  IssuerCredential,
  Logger,
  Proof,
  StateType,
  VCXMock
} = vcx

const provisionString = '{"agency_url":"https://eas-team1.pdev.evernym.com","agency_did":"CV65RFpeCtPu82hNF9i61G","agency_verkey":"7G3LhXFKXKTMv7XGx1Qc9wqkMbwcU2iLBHL8x1JXWWC2","wallet_name":"faber_wallet","wallet_key":"123","enterprise_seed":"000000000000000000000000Trustee1"}'

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

  // vcx.defaultLogger('trace')

  console.log('#2 Initialize LibVCX with new configuration')
  await vcx.initVcxWithConfig(JSON.stringify(configJson))

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

  console.log('#5 Create a connection to alice and print out the invite details')
  const connectionToAlice = await Connection.create({ id: 'connection' })
  await connectionToAlice.connect({ id: 'connection' })
  console.log('**invite details**')
  console.log(await connectionToAlice.inviteDetails(false))
  console.log('******************')
  await connectionToAlice.updateState()

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

  console.log('#12 Create an IssuerCredential object using the schema and credential definition')
  let credential = await IssuerCredential.create({ sourceId: 'alice_degree', credDefHandle: credentialDef.handle, attr: schemaAttrs, price: '0', credentialName: 'FREE'})

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

  console.log('#19 Create a Proof object')
  let proof = await Proof.create({sourceId: 'proof', name: 'proof', attrs: proofAttrs, revocationInterval: {}})

  console.log('#20 Request proof of degree from alice')
  await proof.requestProof(connectionToAlice)

  console.log('#21 Poll agency and wait for alice to provide proof')
  let proofState = await proof.getState()
  while (proofState !== StateType.Accepted) {
    sleep.sleep(2)
    await proof.updateState()
    proofState = await proof.getState()
  }

  console.log('#27 Process the proof provided by alice')
  let proofData = await proof.getProof(connectionToAlice)

  console.log('#28 Check if proof is valid')
  if (proofData.proofState === 1) {
    console.log('proof is verified!!')
  } else {
    console.log('could not verify proof :(')
  }
}

main()
```
### Alice

```javascript
const sleep = require('sleep')
const vcx = require('node-vcx-wrapper')
const fs = require('fs')
const ffi = require('ffi')

const {
  Connection,
  Credential,
  DisclosedProof,
  StateType,
  VCXMock
} = vcx

const provisionString = '{"agency_url":"https://agency-team1.pdev.evernym.com","agency_did":"TGLBMTcW9fHdkSqown9jD8","agency_verkey":"FKGV9jKvorzKPtPJPNLZkYPkLhiS1VbxdvBgd1RjcQHR","wallet_name":"alice_wallet","wallet_key":"123"}'

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

  // vcx.defaultLogger('trace')

  console.log('#8 Initialize LibVCX with new configuration')
  await vcx.initVcxWithConfig(JSON.stringify(configJson))

  console.log('#9 Input faber.js invitation details')
  console.log('Invite Details:')
  const stdinBuffer = fs.readFileSync(0)

  console.log('#10 Convert to valid json and string and create a connection to faber')
  let connectionToFaber = await Connection.createWithInvite({ id: 'faber', invite: stdinBuffer})
  await connectionToFaber.connect({ id: 'connection' })

  let connectionState = await connectionToFaber.getState()
  while (connectionState !== StateType.Accepted) {
    await connectionToFaber.updateState()
    connectionState = await connectionToFaber.getState()
  }

  console.log('#11 Wait for faber.js to issue a credential offer')
  sleep.sleep(10)
  // Create a credential object from the credential offer
  let offers = await Credential.getOffers(connectionToFaber)

  let credential = await Credential.create({ sourceId: 'credential', offer: JSON.stringify(offers[0]), connection: connectionToFaber})

  console.log('#15 After receiving credential offer, send credential request')
  await credential.sendRequest({ connection: connectionToFaber, payment: 0})

  console.log('#16 Poll agency and accept credential offer from faber')
  let credentialState = await credential.getState()
  while (credentialState !== StateType.Accepted) {
    sleep.sleep(2)
    await credential.updateState()
    credentialState = await credential.getState()
  }

  console.log('#22 Poll agency for a proof request')
  let requests = await DisclosedProof.getRequests(connectionToFaber)

  console.log('#23 Create a Disclosed proof object from proof request')
  let proof = await DisclosedProof.create({ sourceId: 'proof', request: JSON.stringify(requests[0])})

  console.log('#24 Query for credentials in the wallet that satisfy the proof request')
  let credentials = await proof.getCredentials()
  for (var attr in credentials['attrs']) {
    credentials['attrs'][attr] = { credential: credentials['attrs'][attr][0] }
  }

  console.log('#25 Generate the proof')
  await proof.generateProof({selectedCreds: credentials, selfAttestedAttrs: {}})
  console.log('#26 Send the proof to faber')
  await proof.sendProof(connectionToFaber)
}

main()
```
