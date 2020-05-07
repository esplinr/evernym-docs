## Provision Wallet and Keys

In order to use Libvcx and Libindy, you must first provision your instance with a wallet and master secret keys that coorespond to your DID, which will be generated for you at the time of provisioning. This must be done every time you install Libvcx on a new instance without a wallet, or if you remove the current wallet.

### Provisioning script

There is a python script in /usr/shar/ that will set up a wallet and provision your vcx service to operate properly. If you use the --help argument you will see that it requires two arguments, and has two more as optionals. This provisioning step will create a /home/user/.indy-client/wallet directory and insert the master keys into that wallet which coorespond with the generated DID. The configuration values must be saved and entered into a file, usually named ./config/vcx-config.json. The values of this file can be changed or edited, but must contain matching keys in the wallet with the DID in the configuration file. 

If you want the seed to be randomly generated (the easiest way to do it) then you will only need the correct endpoint url (The actual STN endpoint is provided for you below.) /usr/shar/libvcx/provision_agent_keys.py required arguments:

AGENCY_URL: url for the agency ledger. For testing purposes you will use: "https:/eas01.pps.evernym.com"

WALLET_KEY: A key to seed your wallet. For testing purposes you may use "12345"

WALLET_NAME (--wallet-name) : Name of libindy wallet (auto-generated if left blank)

AGENT_SEED (--agent-seed): Seed to create enterprise -> agent (auto-generated if left blank)

**ENTERPRISE_SEED (--enterprise-seed) : Seed to create DID and Wallet. This argument is vital to input if you want to be able to re-seed the exact same wallet and DID pair again when re-provisioning. Once you provision a wallet and keys, the only way to re-provision and have the same DID produced is to use the same enterprise seed. This value is randomly generated if left blank. Evernym **highly** recommends you generate your own enterprise seed and save it somewhere secure for re-use if the need to re-provision an instance should arise. Multiple tools can generate a 32-character string for you, such as pwgen.**

```bash
    # install pwgen
    sudo apt-get update
    sudo apt-get install pwgen
    # generate 32 character random string
    pwgen 32 -1
    # resulting 32 bit string (yours will be different)
    Kue7ieheceuphooNeithaingioveesei
    # provision with enterprise key
    python3 /usr/share/libvcx/provision_agent_keys.py "https://eas01.pps.evernym.com" 12345 --enterprise-seed <pwgen_output>
    # save enterprise key for re-use to seed file
    echo Kue7ieheceuphooNeithaingioveesei >> seed.txt
```

### Configuration Values

Once you run this script successfully, it will return a JSON object of values. Your job is to save this out to a JSON file named "vcx-config.json" in a directory called "config".

```bash
# this is the returned value from the provision_agent_keys.py script
{
    "agency_did": "UNM2cmvMVoWpk6r3pG5FAq",
    "agency_endpoint": "https://eas01.pps.evernym.com",
    "agency_verkey": "FvA7e4DuD2f9kYHq6B3n7hE7NQvmpgeFRrox3ELKv9vX",
    "genesis_path": "<CHANGE_ME>",
    "institution_did": "BFBYCenin1YFe5CoNjS59k",
    "institution_logo_url": "<CHANGE_ME>",
    "institution_name": "<CHANGE_ME>",
    "institution_verkey": "6arFmHJyqhttd5hHDSbejq8wGtt8Rba1u6SM6U9h4eBG",
    "remote_to_sdk_did": "BPgrK8fKrsQDVrqrR3aWZL",
    "remote_to_sdk_verkey": "6fV8LYF1CMwwLh3gf9wrsvqxvrqxFoaGFmsezdNkp4rF",
    "sdk_to_remote_did": "9q2pwFqwwy6C4NbxzZR2qA",
    "sdk_to_remote_verkey": "5p5KqmAefZvEZos5vvFPCg15kJtzuwCCQdPaEvCw83c9",
    "wallet_key": "12345"
}
```

The fields that read **CHANGE_ME** must be updated with a value in order to properly register your DID on the STN ledger.

genesis_path : This is a direct path that will lead to the genesis.txn file, as provided for you in the Accelerator package. This file will initialize communication with the Validator pool.

institution_logo_url : This should lead to a url with an image, which will be used as your identifier on connections and credentials on the Ledger.

institution_name : The name of your Institution as it will appear on credentials and on the public ledger DID.

### Create vcx-config.json and save values

Here you will create, edit and save the configuration 'vcx-config.json' file for Libvcx to use when communicating with the Ledger. In this example I am using the nano editor to generate and edit a file called vcx-config.json, into which I will paste the contents of the returned json file from the provision_agent_keys.py. Edit the values with your logo url, genesis.txn path, and institution name. The values you see below are specific to my training instance of Libvcx.

```bash
    vim vcx-config.json
```

Enter the edited values, as specified above, into the ./config/vcx-config.json and save the file.

```bash
{
    "remote_to_sdk_did": "TwFRKdBMGyFsGD46Gc9USA",
    "genesis_path": "/vagrant/config/genesis.txn",
    "institution_did": "HjponjLr8uUknFBYbPEw1K",
    "wallet_name": "LIBVCX_SDK_WALLET",
    "institution_logo_url": "https://s3.us-east-2.amazonaws.com/static.evernym.com/images/icons/cropped-Evernym_favicon-trans-192x192.png",
    "remote_to_sdk_verkey": "FgUkz2N8r9FvFddgWoJN6siwTY2Vqa5wm6ywH6JkD3mT",
    "agency_did": "UNM2cmvMVoWpk6r3pG5FAq",
    "sdk_to_remote_did": "6Autx5LRBa2Ahed2GaRY7V",
    "agency_endpoint": "https://eas01.pps.evernym.com",
    "agency_verkey": "FvA7e4DuD2f9kYHq6B3n7hE7NQvmpgeFRrox3ELKv9vX",
    "institution_name": "MY_VCX_KIOSK",
    "institution_verkey": "A88fmuGnGquB2bDbPVbNzEqXPFgfuGvBCYrejRiLRPM2",
    "wallet_key": "55555",
    "sdk_to_remote_verkey": "3pTownZEGTP7KvFE1KdXGcSNEeGX8hN5aan3442Qr11P",
    "protocol_type": "1.0",
    "payment_method": "sov"
}

```

### Re-provisioning

When running tests and mutliple installations, it will often become necessary to re-install libvcx or possible re-provision for a number of reasons. In preparation for this eventuality, the provisioning should always be done with an enterprise-seed, as described above. Using the same enterprise seed to provision the instance of libvcx will always result in a matching wallet/DID pair, and thus avoiding a mismatch or the need to re-register the DID with the Sovrin Staging Network. The wallet, if re-provisioned, will lose any data (including DID connections, schema and credentials) saved to it. For this reason, when re-provisioning Evernym **highly** suggests making a backup of the wallet and copying the contents once the re-provision has occurred. Otherwise this data cannot be recovered. Before re-provisioning you **must** remove the wallet database.

```bash
    # remove wallet
    sudo rm -r ~/.indy_client/wallet
    # re-provision with enterprise seed (use the previously saved seed.txt key value)
    python3 /usr/share/libvcx/provision_agent_keys.py "https://eas01.pps.evernym.com" 12345 --enterprise-seed <seed.txt_value>
```