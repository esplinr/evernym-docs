## Rotating the Key of a DID

<span style="color:orange">**CAUTION!**</span> **You should always include a seed while rotating your DID's verification key. Failure to do so will make it difficult to restore your wallet if you move to a new device or if your wallet is lost or damaged. Save the seed in a secure location.**

In the following steps, parameters such as _testnet_, _mySecretKey_, and _BADDuwNZhGNFeF3CR8oz7G_ are given. You should replace such parameters with the appropriate ones on your system.

### Steps

1. **Obtain by whatever means a 32-bit seed for your new key. For example, using pwgen:**
```bash
$ pwgen -s 32 1
wpNUd0IkCm77DSAfr5tb3LKKAcZiwlKq
```
1. **Enter the indy-cli command line.**
```bash
$ indy-cli
```
1. **Follow the 'preliminary' steps in [Using the Indy CLI]({% link _pages/sovrin/tools/use-indy-cli.md %}) to connect to the pool and open the wallet.**
```
indy> pool connect testnet
Pool "testnet" has been connected
pool(testnet):indy> wallet open testnet_wallet key=mySecretKey
Wallet "testnet_wallet" has been opened
```
1. **Select the DID on which you want to rotate the key.**
```
pool(testnet):wallet(testnet_wallet):indy> did use BADDuwNZhGNFeF3CR8oz7G
Did "BADDuwNZhGNFeF3CR8oz7G" has been set as active
```
1. **Write a new key on the ledger for this DID, using the seed.**
```
pool(testnet):wallet(testnet_wallet):did(BAD...z7G):indy> did rotate-key seed=wpNUd0IkCm77DSAfr5tb3LKKAcZiwlKq
Verkey for did "BADDuwNZhGNFeF3CR8oz7G" has been updated
New verkey is "G1tYWT3vjuFMFjTtG9P6cV76eVoerAKZi41QPbxwibbk"
```
If an error such as a timeout occurs, your key may be left in an inconsistent state, where the key has been changed on the ledger, but was not changed in the local wallet. This is very undesirable, since in this state you will not be able to post transactions to the ledger. If this occurs, you should re-run the rotate keys command.
1. **If necessary, re-run the rotate-keys command with the resume flag.**
```
pool(testnet):wallet(testnet_wallet):did(BAD...z7G):indy> did rotate-key resume=true
```

Your key is now rotated.
