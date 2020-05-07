## As a trust anchor, create an identity for someone else with a public key provided by them.

**1. Start the CLI and connect to the pool. Specify *live* or *test* depending on the environment;** live will be the typical value during the Alpha phase.
```
$ sovrin
sovrin> connect live
```

**2. If necessary, switch users to the trust anchor identity that you will use to sign the transaction that creates the identity for someone else.** Note that the value for the seed below is just an example. Yours will be different, for example, what you used in step one of the above scenario.
```
sovrin@live> new key with seed 00000000000000000TestTRUSTANCHOR
```

A typical response would look as follows:
```
DID for key is 76dkYNr9J1RRSVMhSRGy8AcQvW5CupDsR9YZgrcA29EY
```

**3. Next, you’ll need the public verkey that was provided by the person or organization you’re creating an identity for.** Insert the verkey they have provided you with in place of `<verkey>`.
```
sovrin@live> send NYM dest=<verkey>
```
