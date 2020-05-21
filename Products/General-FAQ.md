# What happens to a wallet when someone dies or is otherwise incapacitated?

The short answer is that what’s possible will depend on what pre-planning is done by the person who dies. They could plan ahead in the following ways:
Directly give the key to their wallet, or the key to their wallet backup, to a loved one.
Give a shard of the key to their wallet to various friends/family/trusted parties.
Put themself under guardianship (possibly conditional on their death or incapacitation) ahead of time.
These actions are not mutually exclusive.
If they use the first strategy, then the loved one can impersonate them after death. This allows useful cleanup, but it is also susceptible to abuse. This is 100% doable today.
If they use the second strategy, they have a mechanism whereby holders of a key shard can get back together and jointly impersonate the dead person later. This is not as susceptible to abuse. This has been described in public docs, but not implemented; it is not doable with any products we make today. However, it could be doable for a power user of technology, using publicly available tools in combination with our products.
The third strategy can be done with legal paperwork, or with verifiable credentials (only in cmdline today, not in our products), or both. However it’s done, the guardian creates new relationships with every party that the deceased had a relationship with (the bank of the deceased, the insurance company of the deceased, etc.) The guardian then proves their guardianship status, and directs the relationship with the deceased to evolve as needed (close the account, transfer funds, issue a check, etc).
If none of this work has been done in advance, the legal system eventually appoints an executor or guardian to clean things up, and that party proceeds according to strategy 3, but much delayed.


# How to transition from Sovrin Staging Net to Sovrin Main Net?
1. Register a DID as an endorser on Sovrin Main Net.
2. Re-run the provision scripts to setup a peer connection with the Evernym Agency and generate a LibVCX configuration file with the correct values.
3. Re-write any schemas and cred-defs to Main Net.


# How to become an Endorser on the Sovrin Networks?
For Sovrin Builder Net and Sovrin Staging Net go to https://selfserv.sovrin.org
For Sovrin Main Net:
1. Complete the Transaction Endorser Agreement signing and approval process and send it in to the Sovrin Foundation.
2. Send the “Add Endorser DID to MainNet command” to 1 Trustee and have them add the Endorser.  We can help with this as Drummond Reed of Evernym is a Trustee.
3. That Endorser DID can start writing to MainNet.


# What are the limits on fields in schemas?

The maximum length of a field in a V1 credential schema is a hexadecimal string of 256 characters (128 bytes). This is set by plenum here: https://github.com/hyperledger/indy-plenum/blob/master/plenum/config.py#L312

The maximum number of fields in a V1 credential schema is 125. This is set by node here: https://github.com/hyperledger/indy-node/blob/master/indy_common/config.py#L112
and tested here: https://github.com/hyperledger/indy-node/blob/master/indy_node/test/schema/test_send_schema.py#L59

V1 credential schemas are an array of property names, so there is no concept of data types. Those will come as we move to rich schemas.

Currently, indy-sdk accepts values for V1 schema properties as raw and encoded values: https://github.com/hyperledger/indy-sdk/blob/master/libindy/src/api/anoncreds.rs#L555, where the raw value is a string of the raw value, and the encoded value is a string of an integer representation of the raw value.

libvcx automatically encodes attribute values based on two types: if the raw value is an integer string, the resulting encoding is the integer value; if the raw value is any other string, the resulting encoding is the SHA256 hash of the string. The libvcx encoding function is here: https://github.com/hyperledger/indy-sdk/blob/master/vcx/libvcx/src/issuer_credential.rs#L575


# Why use Indy for identity management?

Identity management with verifiable credentials depends on a common root of trust for distributing issuer keys. The highest level of reliability is provided by decentralized ledger technology where the data is redundant and can not easily be censored.

Verifiable credentials have been implemented on a variety of ledgers. When the Hyperledger Indy project was founded, there were no other identity focused open source ledgers. At the time, permissionless ledgers were too slow and transaction costs were too high to be the backbone of a global utility for identity. BFT ledgers were much cheaper to operate, but didn't scale sufficiently. The Indy project, and it's Plenum ledger, broke new ground for scalability while still offering cheap consensus. And on-ledger support for emerging open standards like DIDs and credential schemas facilitated implementing SSI solutions.

As technology has advanced, there are now other ledgers that could scale sufficiently for global identity use cases and there are standards for packaging verifiable credentials which have reduced dependence on an identity focused ledger.

We continue to use Indy because it has a few important features:
* A correlation resistant design through all layers of the stack.
* Privacy preserving revocation registries.
* BLS signatures that allow clients to only contact a single node.
* A flexible permission scheme that allows ledger governance to be determined outside of the technology.
* Anti-spam protections based on endorsers or payments.
* On-ledger support for transaction author agreements, which increases steward confidence that they won't be held liable for misuse of the ledger.
* Ledger plugins that allow easy integration of new technologies.

There are a number of integrations that use Indy as an identity layer integrated into a larger implementation: CORDA+INDY (Tieto & Luxsoft), FETCH+INDY (Anvil), even Fabric+INDY (see the talk by Chris Ferriss at the Hyperledger Hackfest AMS 2018).

# How is Aries different from Indy?

Aries provides a ledger independent standard for exchanging verifiable credentials between identity agents. This is in contrast to the Indy identity ledger where issuer keys are stored. Aries protocols can look up issuer keys and schemas on any ledger or without a ledger.

# What performance testing has been done with Indy?


Indy's performance will depend hugely on how big the pool of validators is, how much RAM and compute power they have, and how fast their network connections are. Thus, there isn't a general "Indy performance" study. The team that builds Indy evaluates it in a specific configuration to guarantee acceptable performance before each release. They are trying to prove sustained reads of thousands of reads per second and >10 writes per second, with a validator pool of 25-ish, and they have consistently achieved those metrics. Less validators would increase write performance significantly. (10 writes per second sounds slow to me, although it is twice as fast as the global bitcoin network. However, Indy has a number of performance optimizations that are still teed up, that should easily allow this number to be 1-3 orders of magnitude faster when we need it. It just hasn't been a focus for now, partly because of how skewed traffic is toward reading.) The bottom line is that Indy's performance is predictable, and fast enough, for the use cases we have today. And it can be increased substantially when we need to.
Exchanging credentials does not involve the ledger very much, though. Issuance doesn't require any write with each credential--only a write of the schema, cred def, and revocation registry that they all use. So you could issue 1000 or 10M credentials, and you still only have 3 ledger writes and no ledger reads (except maybe to populate a cache). When the credential is used to present proof, the verifier and the holder/prover each do a ledger read to check an accumulator value. These reads are likely to be cached for the holder, if they are proving regularly; in real usage, only the verifier's reads will probably have a linear correlation to ledger traffic.

Because of the protections on correlation, performance metrics don't need to be a primary focus (but any and all help here is very much appreciated). Time correlation means that throughput spikes ought to be spread out over time, so we don't have to worry about "visa network" type numbers.
We have been using 10 writes per second and 100 reads per second as our performance minimum (if we fall below that we are worried). Benchmarks can go much much faster of course, the Sovrin Foundation uses those numbers as a guideline for our production configuration on a global pool of 24 nodes.

Also, regarding performance - 10 write transactions per second can look small compared to 1000s, but there is huge difference in benchmarking conditions:
- other ledgers usually use just 4 nodes, often inside one LAN, while 10 TPS in plenum was measured with 25 nodes scattered across the world, which increases number of messages per batch 40-fold with PBFT/Aardvark and 240-fold with RBFT, and increases latencies
- other ledgers often generate batches every 5-10 seconds, but plenum defaults to 1 batch per second, so this is 5-10 more batches per unit of time than with other projects, but significantly decreases latency
- other ledgers use very simple test transactions, like incrementing some counter, while in plenum we test with writing cred defs, revocations etc with fees on top of that - many of these things use pretty heavyweight crypto
If we conduct a test in a single AWS VPC with 4 nodes, batch per 5 seconds and some dummy transactions I believe we can easily achieve something in a 500 write transactions per second range with current code.
read performance in Indy Ledger is pretty good, this is more than 5000 per sec on 25 nodes pool, and this is easily scalable with Observer Nodes (which are almost done BTW).


Why do you recommend a pool of 24 nodes?
The more nodes you have in the pool, the more malicious (faulty) nodes you may have. So, theoretically you may want to have as many nodes as possible. 
However, PBFT (and especially RBFT protocol that we use) is very "chatty", and it becomes non-linearly slower with increasing number of nodes. 
So, currently we don't recommend to have more than 25 nodes and do our tests on a pool with 25 nodes.

The number of nodes on the pool is recommended to be equal to 3f+1 where f is a number of faulty/malicious nodes. 
So, for a pool of 25 nodes we may have 8 faulty/malicious nodes. 

It's recommended to have exactly 3f+1 nodes, because if the number of nodes is 3f+2 or 3f+3, then the number of malicious nodes is still the same, while performance is worse and getting consensus may be harder.
In our testing, 25 nodes seemed to be the sweet spot between security (8 potential faulty nodes) and performance.
28 nodes would allow 9 faulty nodes, but we saw a drop in performance.

In 2018, Evernym sponsored a series of load tests for Indy that are captured in [Jira issues](https://jira.hyperledger.org/browse/INDY-1343).


# Is there any facility to browse transactions on Sovrin, similar to Etherscan for Ethereum?
https://sovrin-mainnet-browser.vonx.io/browse/domain?page=1&query=&txn_type=

https://indyscan.io/home/SOVRIN_MAINNET


# What is the relationship between Hyperledger Indy, Aries, and Ursa, and Sovrin
and Evernym?


# What is the Sovrin Token?
[The Sovrin Token Whitepaper](https://sovrin.org/library/sovrin-protocol-and-token-white-paper/) explains the role a token could play in the Sovrin ecosystem to facilitate identity use cases.

A proposed implementation exists on both Sovrin StagingNet and Sovrin BuilderNet. Testing can be done by switching the payment plugin in LibIndy from LibNullPay to LibSovToken, and issuing tokens to your payment wallet using the [Sovrin Self Service Portal](https://selfserv.sovrin.org).

The design of the token is documented here:
https://github.com/sovrin-foundation/sovrin-sip/tree/master/text/sovrin-tokens

More detailed documentation is here:
https://github.com/sovrin-foundation/token-plugin/blob/master/docs/
https://github.com/sovrin-foundation/libsovtoken/tree/master/doc/
https://github.com/hyperledger/indy-sdk/tree/master/docs/design/004-payment-interface
https://github.com/hyperledger/indy-sdk/tree/master/docs/design/007-cli-payments

The issue tracker is here:
https://sovrin.atlassian.net/projects/ST/issues

There are currently no announced plans to release a production token.


# Is it easy to migrate away from your solution?
Evernym supports industry standard protocols for DID Communication, as well as for Aries Agent interactions, allowing portability of credentials. Our credential storage leverages a vendor independent implementation from Hyperledger Indy. Further, the source code for the application is available to the customer under a license that permits the customer to self-support or study the code sufficient for migration.
