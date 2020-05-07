## As a steward, create a public identity and share it with multiple entities.

**1. Start the CLI and connect to the pool. Specify *live* or *test* depending on the environment.**
```
$ sovrin
sovrin> connect live
```

**2. If necessary, switch users to the steward identity that you will use to sign the transaction that creates the identity.** Note that the value for the seed below is just an example. Yours will be different.
```
sovrin@live> new key with seed 000000000000000000000TestSteward
```

A typical response would look as follows: 
```
DID for key is 76dkYNr9J1RRSVMhSRGy8AcQvW5CupDsR9YZgrcA29EY
```

**3. Next, you’ll need a verkey that was provided to you by the person whose identity you are putting on the ledger.** Insert the verkey they have provided to you in place of `<verkey>`.
```
sovrin@live> send NYM dest=<verkey>
```

This creates a new identity. To share it with multiple entities, you would simply use this new output where requested with more than one entity.
