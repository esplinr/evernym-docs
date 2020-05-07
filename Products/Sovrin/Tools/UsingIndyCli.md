# Using the Indy CLI

## Background

The Indy CLI is a command line tool for interacting with any Indy validator pool, such as the Sovrin StagingNet. It is commonly used by Stewards, Trustees and Transaction Endorsers to monitor and administer the pool. It has been successfully installed on other systems such as MacOS as well, but it is best supported in Ubuntu.

## Installation

Follow the steps in its github repository's [README](https://github.com/hyperledger/indy-sdk/blob/master/cli/README.md) file for installation instructions.

## Using the CLI

Enter the cli from the command line to get a command prompt:
```bash
$ indy-cli
indy>
```
### The built-in help
The CLI has extensive on-line help built in. To see a list of possible commands, just type "help" at the prompt.
```bash
indy> help
Hyperledger Indy CLI

Usage:
	[<command-group>] <command> [[<main-param-name>=]<main-param-value>] [<param_name-1>=<param_value-1>]...[<param_name-n>=<param_value-n>]

Getting help:
	help - Display this help
	<command-group> help - Display the help for the specific command group
	[<command-group>] <command> help - Display the help for the specific command

Command groups are:
	payment-address - Payment address management commands
	wallet - Wallet management commands
	pool - Pool management commands
	ledger - Ledger management commands
	did - Identity management commands

Top level commands are:
	init-logger - Init logger according to a config file.
	Indy Cli uses `log4rs` logging framework: https://crates.io/crates/log4rs
	about - Show about information
	exit - Exit Indy CLI
	load-plugin - Load plugin in Libindy
	prompt - Change command prompt
	show - Print the content of text file
```
Commands are separated into groups as shown. To find the individual commands within a group, type the command group name followed by "help"
```bash
indy> pool help
Group:
	pool - Pool management commands

Usage:
	pool <command> [[<main-param-name>=]<main-param-value>] [<param_name-1>=<param_value-1>]...[<param_name-n>=<param_value-n>]

Getting help:
	pool <command> help - Display the help for the specific command

Group commands are:
	refresh - Refresh a local copy of a pool ledger and updates pool nodes connections.
	delete - Delete pool config with specified name
	connect - Connect to pool with specified name. Also disconnect from previously connected.
	disconnect - Disconnect from current pool.
	create - Create new pool ledger config with specified name
	list - List existing pool configs.
```
Once again, you can drill down further on any command within a command group by typing the command group name and the command, followed once again by help.
```bash
indy> pool create help
Command:
	pool create - Create new pool ledger config with specified name

Usage:
	pool create <name-value> gen_txn_file=<gen_txn_file-value>

Parameters are:
	name - The name of new pool ledger config
	gen_txn_file - Path to file with genesis transactions

Examples:
	pool create pool1 gen_txn_file=/home/pool_genesis_transactions
```
### Preliminary commands
There is a sequence of commands that is typically executed before running your desired instruction. After you start the CLI and get the prompt, at a minimum you must select and connect to a pool, open a wallet, and select a DID from your wallet to use. Additional commands are needed if these entites are not already set up on your machine. This figure illustrates the commands needed before you can interact with the ledger from your CLI client.

![alt text](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/Sovrin/cliSequence.png)

### Other common Commands
Commands are restricted by the _role_ associated with the DID that is active in your client. Some commands can only be done with a Steward's DID, and others may require a Trustee's access, for example. If your current DID has insufficient privileges, an error will be returned. For more information on roles and privileges, see [the ledger FAQs]({% link _pages/learning-resources/faq.md %})

 * ledger nym  -- add a DID / verkey / role to the ledger
 * ledger get-nym  -- read a nym's data from the ledger
 * ledger get-validator-info  -- get status information from node(s)
 * ledger node  -- post validator metadata to the ledger
