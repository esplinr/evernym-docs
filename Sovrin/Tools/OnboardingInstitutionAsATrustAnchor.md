# How to Onboard the Institution as a Trust Anchor


## Introduction


A few of the actions that can be done with libvcx require a DID to be on the ledger with the role of Trust_Anchor. Two current actions that need this permission are adding a schema to the ledger and adding a credential definition​ (credential def or "cred def") to the ledger. Giving a DID the role of TRUST_ACHOR requires the submitter to be a STEWARD and therefore can't typically be done. The user of libvcx requires an outside party. For the Sovrin Testnet, this process can be streamlined using the Sovrin Testnet Trust Anchor Registration.

### Steps

**1\. Obtain an Institution DID (Issuer DID) and associated verkey.** This is the public DID for the Institution used to issue credentials. This DID will be created during the provisioning process. If you have not yet provisioned libvcx, follow these steps. If you've already completed these steps, then skip ahead to Step 2 below of the original instructions.

> #### Provisioning Libvcx
>
> The provisioning script will do the following:
>
> *   Creates a new wallet
> *   Creates a DID/Verkey and place the private keys into the wallet
> *   Outputs the content of what will be the vcxconfig.json file used by Verity UI
>
> **1\. Switch to the verity-ui user.** When you're finished, navigate to the directory where the provision\_agent\_keys.py file is located.
>
> ```
sudo su - verity-ui -s /bin/bash
>
> cd /usr/share/libvcx
```
>
> **Note:** In Step 2 of Provisioning Libvcx, you'll be running the provision\_agent\_keys.py script. The script command looks like the following:
>
> `python3 provision\_agent\_keys.py <WALLET\_NAME> <AGENCY\_URL> <WALLET\_KEY> --institution-seed <32 character seed>`
>
> | Parameters | Explanation | Required or Optional |
| --- | --- | --- |
| WALLET_NAME | The name you want to use for your wallet |Required
| AGENCY_URL | Location of the backend institution agent service you will be connecting to. |Required
| WALLET_KEY | Any alphanumeric combination that will become your master password for the encrypted wallet. |Required
| --agent-seed | Optional seed used to create institution->agent DID/VK   |  Optional
| institution-seed   |Optional seed used to create institution DID/VK. **Note:** If you already have a Trust Anchor DID on the ledger use the same seed that was used to create the existing DID. Whether you use this option or not the output from this script will give you a DID/Verkey that can be added to the ledger with Trust Anchor permissions by a Steward.     |   Optional
|--verbose    |     | Optional
|   |   |    |  |
>
>
> **2. Run the provision\_agent\_keys.py script.** Make sure to provide the path to the location of this script since you are logged in as the verity-ui user). An example of how this could look would be:
>
> `/usr/share/libvcx/provision\_agent\_keys.py testwallet https://agency-ea-sandbox.evernym.com thiskeyisforthewallet123456 --institution-seed 000000000000000000000000Issuer04`
>
> **3. Exit from the verity-ui user by pressing CTRL-d.**
>
> **4. Create a file named vcxconfig.json and save the output from** `stdout` **to that file.** Within the new vcxconfig.json there are three `<CHANGE\_ME>` sections:
>
> *   "logo\_url": "<CHANGE\_ME>",
> *   "institution\_name": "<CHANGE\_ME>",
> *   "genesis\_path": "<CHANGE\_ME>",
>
> The full path including name of the file pool\_transactions\_genesis is:
>
> `"/var/lib/indy/verity-sandbox/pool\_transactions\_genesis"`
>
> **5. Copy the vcxconfig.json to /etc/verity-ui.** Make sure it is owned by root, and group ownership is `verity-ui`.
>
>  `sudo chown root.verity-ui /etc/verity-ui/vcxconfig.json`
>
> **6. Set permissions to 660 (owner get read write, group gets read write, all else no permissions).**
>
> `sudo chmod 660 /etc/verity-ui/vcxconfig.json`
>
> **7. Start the Verity UI. This will run as a service:**
>
> `sudo systemctl start verity-ui`

**2. Have the STEWARD add the Institution DID and verkey to the ledger with a role of TRUST\_ANCHOR.** This could be done using the [Sovrin Test Network Trust Anchor Registration](https://s3.us-east-2.amazonaws.com/evernym-cs/sovrin-STNnetwork/www/trust-anchor.html) web page. Otherwise, a STEWARD will need to submit a transaction to add the DID. Makes sure the role is 101 or TRUST_ANCHOR. For more information, see this [here](https://github.com/hyperledger/indy-sdk/blob/master/libindy/src/services/ledger/constants.rs). Your DID and verkey are located In the vcxconfig.json, located in /etc/verity-ui, in the following entries:

*   `institution\_did`
*   `institution\_verkey`

If you already had a DID on the ledger with Trust Anchor permissions and used that seed when running the provision\_agent\_keys.py script, this step should be completed.

Alternately, if you do not have your DID/Verkey on the ledger, contact a Steward of the ledger and have them add you to it with the role of Trust Anchor. Give the Steward the output of `institution_did` and `institution_verkey`.

**3\. After the STEWARD has added the DID to the ledger, the user should verify that it has been correctly added by using libindy.** Submit a OP_GET_NYM transaction using the Institution DID and inspect the results. It should reflect a role of 101.
