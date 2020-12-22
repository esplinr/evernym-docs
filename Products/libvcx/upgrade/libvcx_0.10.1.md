### Introduction
Evernym Verity is our decentralized protocol platform for issuing and verifying digital credentials. Verity 1.x is powered by LibVCX and LibIndy. With the release of Verity 2, we have designed a new protocol engine and a simpler API. We encourage you to start planning your migration from Verity 1 (LibVCX) to Verity 2 by reviewing the [Verity SDK](https://github.com/evernym/verity-sdk). We have not yet set a deprecation date for the Verity 1 (LibVCX) family of products.

This release of Verity 1 (LibVCX) deprecates releases of LibVCX previous to 0.8.72 based on LibIndy 1.15.0. If you are using an older version of LibVCX, we encourage you to upgrade to a newer LibVCX or migrate to Verity 2 as soon as possible.

These upgrade notes assume that you are using an Ubuntu Bionic VM for your Agent. Users RHEL or CentOS will need to adapt the instructions accordingly.

If you have any questions, please email [support@evernym.com](mailto:support@evernym.com).


### Prerequisites

If you are upgrading from a version of LibVCX earlier than 0.8.72, make sure to follow the [release instructions for upgrading to 0.8.72](/portal/docs/libvcx/upgrade/libvcx_0.8.72) in addition to these instructions.

`Before upgrading, it is recommended that you back up your system or take a snapshot of your VM`

This release does not support the LibSovToken payment library. If you are currently using LibSovToken, you can switch to LibNullPay in the configuration without needing to migrate any data.

This release does not support Ubuntu 16.04 Xenial. If needed, you should upgrade to Ubuntu 18.04 Bionic before upgrading LibVCX.


### Upgrade the Libraries

Retrieve the libraries needed for the upgrade from a single row of the [resources web page](/portal/software-downloads/). For this upgrade, use the line with libvcx version 0.10.1. You will need libraries for libvcx, libindy, a payment plugin, and the wrapper for whichever scripting language you use (python3 or nodejs). Copy these onto your Agent VM.

Using these files, run the installation (upgrade) command for libvcx on your VM.

```bash
$ sudo dpkg -i libindy_1.15.0-bionic_amd64.deb
$ sudo dpkg -i libvcx_0.10.1-bionic_amd64.deb
$ sudo dpkg -i libnullpay_1.15.0-bionic_amd64.deb
```

Now replace the wrapper that you use with the new version of it.

#### Python

```bash
$ tar xzf python3-vcx-wrapper_0.10.1.tar.gz
```

Update the PYTHONPATH environment variable in your .bashrc to point to the new wrapper location.

#### NodeJS

Note that this release only supports Node.js v10. If necessary, please upgrade your install of Node.js while upgrading LibVCX.

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
    "node-vcx-wrapper": "node-vcx-wrapper_0.10.1_amd64.tgz",
    "qr-image": "^3.2.0",
    "sleep": "^6.0.0",
    "uuid": "^3.3.3"
  }
}
```


### MySQL Wallet Storage Plugin

This release includes a wallet storage plugin that can be used to replace the default SQLite wallet storage with a MySQL compatible database such as MySQL, MariaDB, AWS RDS, or Azure Database for MySQL. It is currently only packaged for Ubuntu 18.04 Bionic. To use the plugin:

* Install the Debian package,
* Setup an empty database with credentials that can be used by the application,
* Use the database tools to setup the schema using [this SQL script](https://github.com/evernym/mysql-wallet-storage/blob/master/db_scripts/schema/change_scripts/wallet_schema_creation.2018-05-07.sql).
* Then follow the instructions for the method you use to interact with the wallet.

#### LibVCX

If you are using LibVCX you need to set these config values in `vcx_init`.

```
"wallet_type": "mysql"
"storage_config": "{
    db_name: "<database name>",
    port: "<mysql db port>",
    write_host: "<mysql db write hostname>",
    read_host: "<mysql db read hostname>", // in most usecases this is the same host
}"
"storage_credentials": "{
    user: "<db username>",
    pass: "<db user password>"
}"
```

You then need to call the `mysql_storage_init` function from your application code to register the plugin to libindy. You can then access the wallet as normal.

#### LibIndy

To use libIndy directly, you need to call the `mysql_storage_init` function from your application code to register the plugin to libindy.

Then, when you call libindy wallet functions such as `create_wallet` or `open_wallet`, you pass in the wallet configuration and database credentials as parameters:

```
config: {
    storage_type: "mysql",
    storage_config: {
        db_name: "<database name>",
        port: "<mysql db port>",
        write_host: "<mysql db write hostname>",
        read_host: "<mysql db read hostname>", // usually the same as the write_host
    }
}
credentials: {
    storage_credentials: {
        user: "<db username>",
        pass: "<db user password>"
    }
}
```

#### Migrating from SQLite to MySQL

There is a migration script available for moving from the SQLite wallet storage to MySQL. To use the script:
* Setup a MySQL server with an empty database.
* Install the libmysqlstorage package.
* Setup a Python 3 environment.
* Download [the migration script](https://github.com/evernym/mysql-wallet-storage/blob/master/migration).
* From the directory of the migration script, install dependencies with `pip install -r requirements.txt`
* Setup the migration configuration file `config.yml`
* Run the migration script with `python3 -m migration`


### Other Notes for Evernym LibVCX 0.10.1 (2020-12-08)

Improvements in LibVCX 0.10.1:
* Restored support for 32bit Android by correcting building of an Android aar artifact for armeabi-v7a architecture.
* Changed `get_provision_token` function to return token as JSON string value instead of void.
* Aries Invite Action Protocol:
    * Added `vcx_connection_send_invite_action` function which prepares and sends a message to invite another side to take a particular action.
* Updated VCX Aries message threading handling to use `@id` of the first message as thread id (thid) only if that first message doesn't contain `thid`.
* Added `vcx_credential_reject` function to explicitly reject Aries Credential Offer by sending a ProblemReport message.
* Added `vcx_delete_credential` function to delete Credential from the wallet.
* Supported Aries Question Answer Protocol:
    * added `vcx_connection_send_answer` which prepares and sends the answer on the received question.
* Partial support of Out-of-Band Aries protocol:
    * Sender - Added `vcx_connection_create_outofband` function which prepares Connection object containing Out-of-Band invitation.
       The parameter `handshake` specifies whether the Sender wants to establish a regular connection using connections handshake protocol or create a public channel.
       Next when you called `vcx_connection_connect` Connection state machine either goes by regular steps or transit to Accepted state when no handshake requested.
    * Received - Added `vcx_connection_create_with_outofband_invitation` function which accepts Out-of-Band invitation.
         If invitation contains `handshake_protocols` connection goes regular flow else transits to Completed state.
    * HandshakeReuse - Added `vcx_connection_send_reuse` function to send HandshakeReuse message.
    * request~attach:
        * Sender - It can be set into Out-of-Band invitation but VCX Issuance and Presentation state machines are not compatible with that protocol.
        * Receiver - User should start attached process once Connection is established.
* Add a helper function to download a single message from the Agency by the given id `vcx_agency_download_message`.
* Changed the logic for updating the status of the messages on the Agency (for Aries protocol only):
    * vcx_*_update_state - still update messages state on agency internally.
    * vcx_*_update_state_with_message - caller has full control, passes messages, and is also responsible to update states in agency.
* Updated handling of `~thread` decorator for Aries messages to track and set `sender_order` and `received_orders` fields.
* Updated building of DIDDoc to set `id` field according to W3C RFC.
* Adopted Aries `Problem Report` message for `issue-credential` and `present-proof` protocols.
    Previous VCX versions send general `Problem Report` messages from `notification` message family in case an error occurred in Issuance and Presentation protocols.
    VCX new sets the appropriate `issue-credential`/`present-proof` message family while sending `Problem Report` message.
* Put `institution_logo_url` into Aries Connection invitation as `profileUrl` field.
* Added separate function for Pool initialization.
    Now we can defer connecting to the Pool Ledger during library initialization(to decrease the time taken) by omitting `genesis_path` field in the config JSON.
    Next, we can use `vcx_init_pool` function (for instance as a background task) to perform a connection to the Pool Ledger.
* Added helper function `vcx_fetch_public_entities` to fetch public entities from the ledger.
    This function performs two steps:
        1) Retrieves the list of all credentials stored in the opened wallet.
        2) Fetch and cache Schemas / Credential Definitions / Revocation Registry Definitions correspondent to received credentials from the connected Ledger.
    This helper function can be used, for instance as a background task, to refresh library cache.
* Updated VCX library to make payment plugin optional dependency. We can omit installation of payment plugin in case we are not going to use payments for our application.
* Fixed "Connection handles in Aries state machines can't be serialized properly."
    Overview: Aries Issuance and Presentation state machines held `connection_handle` as property.
    But actual Connection object matching to handle will be destroyed once the library is unloaded.
    That will break Aries state machines.
    Change:  Updated Aries Issuance and Presentation state machines to embed required connection-related data.
    Consequences: Deserialization for Aries Issuance and Presentation state machines in the intermediate state is broken but will work for Started and Finished.
* Added check that Credential Offer attributes fully match the Credential Definition. Partially filled credentials cannot be issued.
* Updated signature of Java API functions to return null (Void type) value for functions that actually do not return any result.
  Consequences: the combination of `exceptionally/thenAccept` function to handle results may treat null as an error.
  Tip: Use `whenComplete` function to proper handling instead of combination `exceptionally/thenAccept`.
* Fixed custom logger to generate only logs with a set level.
* Corrected `vcx_download_agent_messages` function to set `msg_ref_id` field for downloaded messages.
* Significantly improved performance of the library by updating Object Cache to use concurrent map instead of the blocking variant.
* Updating user profile happens during provisioning and optionally during connecting.

Improvements in the MySQL Wallet Storage Plugin 0.1.1131
* Fix for connecting with SSL enabled.
