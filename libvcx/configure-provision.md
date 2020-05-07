#### Configuration Steps

**1. Download the Genesis File.**

To connect to the Sovrin validator pool, your script will need access to a "genesis" file that contains information on a core group of validator servers. Assuming that you will be using Sovrin StagingNet, the genesis file can be downloaded as follows, putting the result into a text file called `pool_transactions_sandbox_genesis` in your local directory.

<!--Why is there a hash # in front of the code? To indicate a command prompt? It makes it format like a comment.-->

```bash
curl -O https://raw.githubusercontent.com/sovrin-foundation/sovrin/stable/sovrin/pool_transactions_sandbox_genesis
```
**2. Run Provisioning Script**

Scripts based on the LibVCX SDK require a configuration file as an input. In addition, a pairwise connection must be made with the agency server that will be used to pass messages to other agencies or agent endpoints like this one. Finally, a Sovrin wallet must be set up with the public and private keys that will be used for communications and signing within the Sovrin community. All of these steps are accomplished by executing a single script: `provision_agent_keys.py`

Because the parameters used with this command are still evolving, Evernym recommends that you check them before use by running:

```bash
/usr/share/libvcx/provision_agent_keys.py --help
```

As of this writing, an example of typical usage is:

```bash
/usr/share/libvcx/provision_agent_keys.py --wallet-name acme \
  --enterprise-seed wuuw3iuchai3Bou0fae3voh3Iequeuwu "https://eas01.pps.evernym.com" 12345
```

where:

* `acme` is the name of the wallet on the local device that will be used with this script(s). Replace this with a name that will be meaningful to you
* `wuuw3iuchai3Bou0fae3voh3Iequeuwu` is a 32-character seed that will be used to generate the public and private keys for your agent, including DIDs and verification keys. *You should generate and securely store your own unique seed*.
* `https://eas01.pps.evernym.com` is the agency server that the script will pass its communications through. Consider this to be static, unless you are instructed otherwise.
* `12345` is a key that is used to encrypt the local wallet. Use your own secret key.

The `provision_agent_keys.py` script will output text that should be put into a configuration file for your script to access. You will give the path to this configuration file in your script.

An example config file might look like this:

```javascript
{
  "agency_did": "UNM2cmvMVoWpk6r3pG5FAq",
  "agency_endpoint": "https://eas01.pps.evernym.com",
  "agency_verkey": "FvA7e4DuD2f9kYHq6B3n7hE7NQvmpgeFRrox3ELKv9vX",
  "institution_verkey": "BXtC4eJVpctLccpp87AwnCygPFwzdE4ugHBxMeAFR6oE",
  "genesis_path": "<CHANGE_ME>",
  "institution_did": "LKpJgj5zdXLwge3udVJXDD",
  "institution_logo_url": "<CHANGE_ME>",
  "institution_name": "<CHANGE_ME>",
  "protocol_type": "1.0",
  "remote_to_sdk_did": "DKNMBCookW3j4gn4yiV1hG",
  "remote_to_sdk_verkey": "7iMaooqA6naAE833WDZZTzVXutbkSYgfREAvsQcpEEaY",
  "sdk_to_remote_did": "7vxamnCvA1zCSND1NWe9Ct",
  "sdk_to_remote_verkey": "4n5hJAFvU5DJsWkE4XgR16C2p1GwJJEAyCQqYjwER2Sc",
  "wallet_key": "12345",
  "wallet_name": "acme",
  "payment_method":"sov"
}
```
The fields that read `<CHANGE_ME>` must be updated before this configuration file is valid for use with your libVCX-based script.

* `genesis_path` is the full path to the `genesis.txn` file that you downloaded to your system. This file will be used to bootstrap communication with the validator pool.

* `insititution_logo_url` is a URL to an image, typically a logo, that will be  shown to users to help identify you in your connections with them.

* `institution_name` is the name of your institution as it will appear on connections to your users.

Make note of the path name of the configuration file as you save it, as well as of the `institution_did` and `institution_verkey` values in the file, because you will need to add this DID and its associated Verkey to the ledger before you can write any transactions to the ledger from your script(s).

> **IMPORTANT:** If you will be using this agent to issue credentials and need to write the associated schemas or credential definitions to a Sovrin ledger, you must accept and virtually "sign" the Sovrin Transactions Author Agreement (TAA). To indicate acceptance, add an additional field, `author_agreement`, to the configuration file. For more information and instructions, see [Accepting the TAA](/portal/docs/libvcx/acceptTAA/)

**3. Register your VCX Instance on the Sovrin Test Network**

The Sovrin Foundation maintains a self-serve portal that you can use to write your new agent's DID and verkey to the Sovrin StagingNet ledger.

 1. In a browser navigate to [https://selfserve.sovrin.org](https://selfserve.sovrin.org). 

 2. For **Network**, select **StagingNet**. 

 3. Paste your DID and Verkey. 

 4. Leave the **Payment-Address** field blank. 

 5. Click **Submit**. You should see a message indicating that your DID was successfully written to the ledger.
