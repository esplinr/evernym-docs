### Introduction
Evernym Verity is our decentralized protocol platform for issuing and verifying digital credentials. Verity 1.x is powered by LibVCX and LibIndy. With the release of Verity 2, we have designed a new protocol engine and a simpler API. We encourage you to start planning your migration from Verity 1 (LibVCX) to Verity 2 by reviewing the [Verity SDK](https://github.com/evernym/verity-sdk). We have not yet set a deprecation date for the Verity 1 (LibVCX) family of products.

This release of Verity 1 (LibVCX) deprecates the previous releases of LibVCX 0.4 based on LibIndy 1.12.0. If you are using a version of LibVCX older than 0.8, we encourage you to upgrade to a newer LibVCX or migrate to Verity 2 as soon as possible.

These upgrade notes assume that you are using an Ubuntu Bionic VM for your Agent. Users RHEL or CentOS will need to adapt the instructions accordingly.

If you have any questions, please email [support@evernym.com](mailto:support@evernym.com).


### Prerequisites

If you are upgrading from a version of LibVCX earlier than 0.8.72, make sure to follow the [release instructions for upgrading to 0.8.72](/portal/docs/libvcx/upgrade/libvcx_0.8.72) in addition to these instructions.

`Before upgrading, it is recommended that you back up your system or take a snapshot of your VM`

This release does not support the LibSovToken payment library. If you are currently using LibSovToken, you can switch to LibNullPay in the configuration without needing to migrate any data.

This release does not support Ubuntu 16.04 Xenial. If needed, you should upgrade to Ubuntu 18.04 Bionic before upgrading LibVCX.


### Upgrade the Libraries

Retrieve the libraries needed for the upgrade from a single row of the [resources web page](/portal/software-downloads/). For this upgrade, use the line with libvcx version 0.9.3. You will need libraries for libvcx, libindy, a payment plugin, and the wrapper for whichever scripting language you use (python3 or nodejs). Copy these onto your Agent VM.

Using these files, run the installation (upgrade) command for libvcx on your VM.

```bash
$ sudo dpkg -i libindy_1.15.0-bionic_amd64.deb
$ sudo dpkg -i libvcx_0.9.3-bionic_amd64.deb
$ sudo dpkg -i libnullpay_1.15.0-bionic_amd64.deb
```

Now replace the wrapper that you use with the new version of it.

#### Python

```bash
$ tar xzf python3-vcx-wrapper_0.9.3.tar.gz
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
    "node-vcx-wrapper": "node-vcx-wrapper_0.9.3_amd64.tgz",
    "qr-image": "^3.2.0",
    "sleep": "^6.0.0",
    "uuid": "^3.3.3"
  }
}
```


### MySQL Wallet Storage Plugin

This release includes a new artifact for a wallet storage plugin that can be used to replace the default SQLite wallet storage with a MySQL compatible database such as MySQL, MariaDB, AWS RDS, or Azure Database for MySQL. It is currently only packaged for Ubuntu 18.04 Bionic. To use the plugin:

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


### Other Notes for Evernym LibVCX 0.9.3 (2020-07-28)
In LibVCX:
* [MSDK-155] Bugfix for reject proof.
* [MSDK-143] Semver style version numbers, instead of using a git commit hash.
* [MSDK-162] Add tags to the CredentialDefApi in the NodeJS and Python wrappers.
* [MSDK-212] Update the config parameter passed into vcx_agent_update_info function to allow an optional `type` field that can be used to distinguish between different classes of push notifications.
