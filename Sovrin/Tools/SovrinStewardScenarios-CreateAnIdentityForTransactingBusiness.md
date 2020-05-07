## As a Steward, create an identity for transacting business (e.g., a bank, with employees).


**1. Start the CLI and generate a DID for the business that will be added to the ledger.**  Capture the DID that is generated for later use.
```
$ sovrin
sovrin> new key with seed BusinessSeedDesired32Characters0
```

A typical response would look as follows:
```
New wallet Default created
Active wallet set to "Default"
Active wallet set to "Default"
Key created in wallet Default
DID for key is 2RnsGdTjbfruXXsQmqoF5EcAJ5J5HykyL8QJCkTmePTx
Current DID 2RnsGdTjbfruXXsQmqoF5EcAJ5J5HykyL8QJCkTmePTx
```

**2.Connect to the pool.** Specify *live* or *test* depending on the environment.
```
sovrin> connect live
```

**3. Switch users to the steward identity that you will use to sign the transaction that creates the identity.** Note that the seed below is just an example. Yours will be different.
```
sovrin@live> new key with seed 000000000000000000000TestSteward
```

A typical response would look as follows:
```
DID for key is 76dkYNr9J1RRSVMhSRGy8AcQvW5CupDsR9YZgrcA29EY
```

**4. Next, put the DID that you created for the business in step one onto the ledger.**
```
sovrin@live> send NYM dest=2RnsGdTjbfruXXsQmqoF5EcAJ5J5HykyL8QJCkTmePTx role=TRUST_ANCHOR
```

A typical response would look as follows: 
```
Adding nym 2RnsGdTjbfruXXsQmqoF5EcAJ5J5HykyL8QJCkTmePTx
Nym 2RnsGdTjbfruXXsQmqoF5EcAJ5J5HykyL8QJCkTmePTx added
```

The entity with this id will be able to add individual user keys onto the ledger so that messages to and from them can be authenticated.
