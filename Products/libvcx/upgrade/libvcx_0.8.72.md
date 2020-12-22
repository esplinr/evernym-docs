These upgrade notes assume that you are using an Ubuntu Bionic VM for your Agent. Users of Ubuntu Xenial, RHEL, or CentOS will need to adapt the instructions accordingly.

### Known Issues
* Reject Proof is broken. This is fixed in LibVCX 0.9.3.

### Prerequisites

Ensure that you are running LibVCX version 0.4.64 or 0.4.59 and LibIndy version 1.12.0.

`Before upgrading, it is recommended that you back up your system or take a snapshot of your VM`

We recommend using LibNullPay as the payment library. LibSovToken is only needed to test token functionality on Sovrin StagingNet and has only been packaged for Ubuntu Xenial. If you are currently using LibSovToken, you can switch to LibNullPay in the configuration without needing to migrate any data.

If you are using Ubuntu Linux, we recommend using Ubuntu 18.04 Bionic. For this release, we continue to support Ubuntu 16.04 Xenial for those who choose not to upgrade at this time. We will drop support for Ubuntu Xenial in our next release.

### Upgrade the Libraries

Retrieve the libraries needed for the upgrade from a single row of the [resources web page](/portal/software-downloads/). For this upgrade, use the line with libvcx version 0.8.72. You will need libraries for libvcx, libindy, a payment plugin, and the wrapper for whichever scripting language you use (python3 or nodejs). Copy these onto your Agent VM.

Using these files, run the installation (upgrade) command for libvcx on your VM.

```bash
$ sudo dpkg -i libindy_1.15.0-bionic_amd64.deb
$ sudo dpkg -i libvcx_0.8.72140829-d437603a5-bionic_amd64.deb
$ sudo dpkg -i libnullpay_1.15.0-bionic_amd64.deb
```

Now replace the wrapper that you use with the new version of it.

`Python`

```bash
$ tar xzf python3-vcx-wrapper_0.8.72143223.tar.gz
```

Update the PYTHONPATH environment variable in your .bashrc to point to the new wrapper location.

`NodeJS`

If necessary, please upgrade your install of Node.js while upgrading LibVCX. Node.js v8 is no longer receiving maintenance by the Node.js community, so we recommend that you upgrade to Node.js v10. If you are using Ubuntu Linux, we recommend using Node.js v10 on Ubuntu 18.04 Bionic. We still support using this version of LibVCX with Node.js v8 on Ubuntu 16.04 Xenial, but will drop that support in our next release.

To upgrade, copy the new node wrapper into your NodeJS project directory. Verify that the package versions required for this version of libvcx are in your packages.json file. Edit your NPM package.json file accordingly, remembering to update the node-vcx-wrapper's version, and re-run `npm install`

```json
{
  "name": "vcx-cli-tools-nodejs",
  "version": "1.0.0",
  "description": "VCX CLI Tools",
  "scripts": {
    "nodeVCXTools": "node vcx-cli-tools.js"
  },
  "dependencies": {
    "base64url": "^3.0.1",
    "ffi": "^2.3.0",
    "ffu": "0.0.1",
    "fs-extra": "^7.0.0",
    "make-runnable": "^1.3.6",
    "node-vcx-wrapper": "node-vcx-wrapper_0.8.72143220-d437603a5_amd64.tgz",
    "qr-image": "^3.2.0",
    "sleep": "^6.0.0",
    "uuid": "^3.3.3"
  }
}
```

### API Changes

`Message Getters in LibVCX`
Removed `connection_handle` from functions to get protocol messages. Here is the list of affected functions:
* `vcx_credential_get_request_msg` - gets the credential request message.
* `vcx_issuer_get_credential_offer_msg` - gets the offer message.
* `vcx_issuer_get_credential_msg` - gets the credential message.
* `vcx_proof_get_request_msg` - gets the proof request message.
* `vcx_get_proof` - gets the proof message.

`Connections in LibVCX`
Added new functions to get information about connection object:
* `vcx_connection_get_pw_did` - gets the DID of the current side (`pw_did`) associated with this connection.
* `vcx_connection_get_their_pw_did` - gets DID of the other side (`their_pw_did`) associated with this connection.
* `vcx_connection_info` - gets all information about this connection.
   
Added ability to accept a duplicate connection by redirecting to the already existing one instead of forming a duplicate connection. 
* `vcx_connection_redirect` - redirect a new connection to already existing one.
* `vcx_connection_get_redirect_details` - gets redirection information.
   
Example flow:   
1. Faber sends invite to Alice.
2. Alice creates a connection with Faber.
3. Faber exchange messages with Alice.
3. Faber sends a new invite to Alice. 
4. Alice creates a new Connection object and redirects it to existing one with `vcx_connection_redirect`.
5. Faber receives redirection response congaing old Alice DIDs/Keys.
6. Faber exchange messages with Alice.

`Disclose Proof in LibVCX`
Added a new function `vcx_disclosed_proof_decline_presentation_request` to explicitly reject a presentation request.

There are two rejecting options:
- Prover wants to propose using a different presentation - pass `proposal` parameter
- Prover doesn't want to continue interaction - pass `reason` parameter.

`Support for Aries Protocols in LibVCX`
We add support for Aries protocols:
* [Trust Ping](https://github.com/hyperledger/aries-rfcs/tree/master/features/0048-trust-ping)
  * Added `vcx_connection_send_ping` function to send `Ping` message on remote connection.
  * Updated connection state machine to respond on inbound `Ping` message after the connection is established.
  * Flow:
    * Outbound Ping:
      1. call `vcx_connection_send_ping` API function to send `ping` message on remote connection. 
      1. call `download_message` to download received messages from an agency.
      1. check that message with `ping_response` type is received.
    * Inbound Ping:
      1. call `download_message` to download messages from an agency.
      1. take the message with `ping` type.
      1. call `update_state_with_message` API function to handle received `ping` message.
* [Discover Features](https://github.com/hyperledger/aries-rfcs/tree/master/features/0031-discover-features)
  * Added `vcx_connection_send_discovery_features` function to send discovery features message to the specified connection to discover which features it supports, and to what extent.
  * Updated connection state machine to respond on `Query` and `Disclose` messages after the connection is established.
  * Flow:
    * Outbound Discover Features:
      1. call `vcx_connection_send_discovery_features` to send `discovery` query on remote connection.
      1. call `download_message` to download received messages from an agency.
      1. take the message with `disclose` type.
      1. call `update_state_with_message` API function to handle `disclose` message.  
    * Inbound Discover Features:
      1. call `download_message` to download messages from an agency.
      1. take the message with `query` type.
      1. call `update_state_with_message` API function to handle received `query` message.
  * Added a new Vcx setting: `actors` for use within the Discover Features protocol to specify the set of protocols that application supports.
    * The following actors are implemented by default: `[inviter, invitee, issuer, holder, prover, verifier, sender, receiver]`.
    * You need to edit this list in case application supports the less number of actors.
* [Service Decorator](https://github.com/hyperledger/aries-rfcs/tree/master/features/0056-service-decorator)
* [Basic Message](https://github.com/hyperledger/aries-rfcs/tree/master/features/0095-basic-message)
  * Updated `vcx_connection_send_message` function to send any kind of messages:
    * if the message is matched to a known aries message - send as is.
    * if the message isn't known - wrap and send as `basic` message.
* Accept incoming messages with `basicmessage` type. Use `download_message` to download messages from an agency.
* [Connection](https://github.com/hyperledger/aries-rfcs/tree/master/features/0160-connection-protocol)
* [Credential Issuance](https://github.com/hyperledger/aries-rfcs/tree/master/features/0036-issue-credential)
* [Credential Presentation](https://github.com/hyperledger/aries-rfcs/tree/master/features/0037-present-proof)

`Protocol Versioning in LibVCX`
In general, if you want to continue using the Evernym specific versions of LibVCX protocols (1.0 or 2.0), you don't need to do anything. No formats or workflows of those protocols were changed.

If you want to use newer versions of protocols and you are not getting any information from messages, then you should set "communication_protocol" value to "aries" and create a new connection with an agent who supports Aries. Your future interaction will be defined by Aries protocols.

If you need to parse some information from messages, you need to update parsers for the new formats of messages. You can find updated message formats in Aries protocol descriptions.

To ensure compatibility between the Evernym specific protocols represented by (`protocol_version`: `2.0`/`1.0`) and the Aries communication protocols (`protocol_version`: `3.0`):
* Added a new enum variant `Pending` for IssuerCredentials/Credentials/Proofs/DisclosedProofs objects.
* Initially create `Pending` objects and convert them to V1/V3 after receiving the connection handle.
* `Pending` objects have `3.0` versions during serialization.
* Added a `protocol_version`: `3.0` to represent the combination of settings: `protocol_version`: `2.0` and `communication_method`: `aries`.

`Anoncreds API in LibIndy`
You can now specify multiple attributes in a single revealed attribute unit using the parameter "names", allowing you to receive revealed attributes from a single credential ([IS-1381](https://jira.hyperledger.org/browse/IS-1381)).
Here is the current format of `revealed_attrs` parameter accepting by `vcx_proof_create` function:
```
requested_attrs: Describes requested attribute
 {
     "name": Optional<string>, // attribute name, (case insensitive and ignore spaces)
     "names": Optional<[string, string]>, // attribute names, (case insensitive and ignore spaces)
                                          // NOTE: should either be "name" or "names", not both and not none of them.
                                          // Use "names" to specify several attributes that have to match a single credential.
     "restrictions":  (filter_json) {
        "schema_id": string, (Optional)
        "schema_issuer_did": string, (Optional)
        "schema_name": string, (Optional)
        "schema_version": string, (Optional)
        "issuer_did": string, (Optional)
        "cred_def_id": string, (Optional)
    },
     "non_revoked": {
         "from": Optional<(u64)> Requested time represented as a total number of seconds from Unix Epoch, Optional
         "to": Optional<(u64)>
             //Requested time represented as a total number of seconds from Unix Epoch, Optional
     }
 }
```
Note: Use `names` to request from the Prover several attributes that must correspond to a single credential.

This required changes to the following API calls:

* `indy_prover_get_credentials_for_proof_req`
* `indy_prover_search_credentials_for_proof_req`
* `indy_prover_create_proof`

There is a new attribute in the response to `indy_prover_create_proof`: `revealed_attr_groups`. It contains data about revealed attributes with the "names" field. `indy_verifier_verify_proof` accepts this attribute in a `requested_proof` field.

The behavior when communicating between different versions of the API is as follows:
* If a Verifier using the old API sends a proof request without the "names" attribute to a Prover using the new API, it will receive the proof without the new field.
* If a Verifier using the new API sends a proof request with the "names" attribute to a Prover using the old API, it will not validate the proof request because it will not have the parameter "name" in it.

`Supporting the Transaction Author Agreement`
This release contains changes related to the transaction author agreement. The Transaction Author Agreement for the Sovrin Network is described in two blog posts:
* [Preparing for the Sovrin Transaction Author Agreement](https://sovrin.org/preparing-for-the-sovrin-transaction-author-agreement/)
* [How the Recent Approval of the Sovrin Governance Framework V2 Affects Transaction Authors](https://sovrin.org/how-the-recent-approval-of-the-sovrin-governance-framework-v2-affects-transaction-authors/)

And in the Hyperledger documentation for [Indy Node](https://github.com/hyperledger/indy-sdk/blob/v1.14.0/docs/how-tos/transaction-author-agreement.md) and [Indy SDK](https://github.com/hyperledger/indy-sdk/blob/master/docs/how-tos/transaction-author-agreement.md).

These changes allow the user to review and accept the TAA so that a submitted transaction can report the date of meaningful acceptance and the method used to accept the TAA.

The TAA acceptance date can be any date after the TAA is approved by network governance.

There are two changes related to Libindy Ledger API:
* extended definition of `indy_build_txn_author_agreement_request` to accept new parameters:
    * `ratification_ts` - the date (timestamp) of TAA ratification by network government.
    * `retirement_ts` - the date (timestamp) of TAA retirement.
* added a new function `indy_build_disable_all_txn_author_agreements_request` to build DISABLE_ALL_TXN_AUTHR_AGRMTS request which is used to disable all Transaction Author Agreements on the ledger.


### Release Notes for Evernym LibVCX 0.8.72 (2020-04-22)

* In LibVCX:
  * Supported `protocol_version`: `3.0` which actually is an alternative to combination of settings: `protocol_version`: `2.0` and `communication_method`: `aries`.
  * Fixed compatibility between proprietary (`protocol_version`: `2.0`/`1.0`) and aries communication protocols (`protocol_version`: `3.0`).
  * Removed `connection_handle` from functions to get protocol messages.
  * Added ability to accept a duplicate connection by redirecting to the already existing one instead of forming a duplicate connection. 
  * Added a new function `vcx_disclosed_proof_decline_presentation_request` to explicitly reject a presentation request.
  * Added a new function `vcx_connection_info` to get information about connection.
* LibVCX Aries support:
    * Implemented Basic Message RFC ([IS-1189](https://jira.hyperledger.org/browse/IS-1189))
    * Implemented Trust Ping RFC ([IS-1435](https://jira.hyperledger.org/browse/IS-1435))
    * Implemented Discover Features RFC ([IS-1155](https://jira.hyperledger.org/browse/IS-1155))
    * Implemented Service Decorator RFC ([IS-1449](https://jira.hyperledger.org/browse/IS-1449))
    * Implemented Connection RFC ([IS-1180](https://jira.hyperledger.org/browse/IS-1180))
    * Implemented Credential Issuance RFC ([IS-1393](https://jira.hyperledger.org/browse/IS-1393))
    * Implemented Credential Presentation RFC ([IS-1394](https://jira.hyperledger.org/browse/IS-1394))
    * Integrated Connection Protocol into Dummy Cloud Agent ([IS-1392](https://jira.hyperledger.org/browse/IS-1392))
* Indy-CLI changes:
    * Added new command `pool set-protocol-version` to set a protocol version that will be used for ledger requests ([IS-1391](https://jira.hyperledger.org/browse/IS-1391)).
    * Added new command `payment-address new` that does exactly the same work as the existing `payment-address create` command. The new command was added to match the naming of `did new` command. The `payment-address create` command will be removed in future releases ([IS-1415](https://jira.hyperledger.org/browse/IS-1415)).
* Transaction author agreement changes ([IS-1427](https://jira.hyperledger.org/browse/IS-1427)):
    * Extended the definition of `indy_build_txn_author_agreement_request` function to accept new parameters:
        * `ratification_ts` - the date (timestamp) of TAA ratification by network government.
        * `retirement_ts` - the date (timestamp) of TAA retirement.
    * Added a new function `indy_build_disable_all_txn_author_agreements_request` to disable all Transaction Author Agreement on the ledger.
    * new Indy-CLI commands:
        * `ledger disable-all-txn-author-agreements` to disable All Transaction Author Agreements on the ledger. 
        * `ledger get-acceptance-mechanisms` to get a list of acceptance mechanisms set on the ledger.
* Fix for proof verification when credential attributes encode a value that contains leading zeros ([IS-1491](https://jira.hyperledger.org/browse/IS-1491)). Previous versions of Indy would change "0" to "", leading to proof rejection.
* Updated behavior of `indy_store_their_did` function to allow updating of existing `theirDID` record`. It can be used to rotate a pairwise key ([IS-1166](https://jira.hyperledger.org/browse/IS-1166)).
* Enhanced validation of `schema_json`: added check that `id` is consistent with `name` and `version` values ([IS-1430](https://jira.hyperledger.org/browse/IS-1430)).
* Added support of the additional format of `rev_states_json` which is used for proof creation. Both `rev_reg_def_id` and `credential_id` can be used as map keys. `credential_id` must be used in case of proving that two credentials matching the same `rev_reg_def_id` are not revoked at the same timestamp ([IS-1447](https://jira.hyperledger.org/browse/IS-1447)).
* Added validation for `nonce` field in the proof request message. Now it must be a decimal number only represented as a string. It is highly recommended to use `indy_generate_nonce` function to generate a correct nonce.
* Added "names" parameter to Proof Request Revealed Attributes in LibIndy and updated LibVCX to match ([IS-1381](https://jira.hyperledger.org/browse/IS-1381))
* Fixed bool representation in Java wrapper ([IS-1368](https://jira.hyperledger.org/browse/IS-1368))
* And many other bug fixes.
