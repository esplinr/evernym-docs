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


# What Personal Identifying Information is collected by your products?

All sensitive data is encrypted. PII is provided to the credential holders for storage on their mobile devices. Our cloud agents do not access any of the data. The issuing system will only store copies of credentials when explicitly configured to do so.


# What mechanisms are used by Connect.Me to secure users' private DIDs, keys & credentials?
DIDs, keys and credentials are stored in a database which is encrypted using a key that lives in the secure enclave on the device.


# Is there any other sensitive information stored on the Connect.Me user's device?
Connect.Me stores the full history of a user's interactions, including all of the DIDs, credentials, proofs and secure messages which have been exchanged, in an encrypted database on the device. It also stores activity logs which can be shared with Evernym with the user's permission when filing a bug report, and certain device identifiers that are used for performance monitoring and analytics - the privacy policy contains more details: https://connect.me/privacy.html


# Do you have any security penetration testing results to share?
Our software has been audited and penetration tested by customers in the past, but we do not have a current report which we are at liberty to share.


# Would it be possible to “ACT on BEHALF of” a corporate customer, using a short form legal agreement to be essentially a surrogate Issuer and Verifier?
Yes. The most straightforward approach is to issue under a separate DID which is known to belong to your customer but be managed by you. We have envisaged future versions of the protocols which could explicitly separate the DID of the issuing authority (customer) from that of the service provider (you), and make that relationship explicit to anyone consuming the credential - but that isn’t fully designed at this point.

There are a few ways to achieve this from a technical perspective:
* “Guardianship” is where one entity manages the keys and wallet of another. It could be the scenario you describe, or an elderly person with a relative that has power of attorney, or a baby whose inoculation records are managed by its parents. In your scenario, RBS would be the guardian for John Lewis, and able to act on their behalf albeit as a company rather than a person. You can find out more about Guardianship here: https://www.evernym.com/blog/making-digital-identity-work-for-all/
* Multi-tenant configuration. You could have a Verity multi-tenant installation (this is just coming out of development now) which would enable multiple issuing instances to be configured and operated on the same platform, but separately (ie each with their own DIDs, cred defs etc). You would operate the customer instance on their behalf, along with a legal agreement not to do bad things like impersonate them and issue false credentials). Once the customer is ready to take on their own run & operate, you could hand over the customer wallet and they could rotate their keys to take it in house.
* Multiple single-tenant configurations. This is a variation on the multi-tenant configuration where you are operating a separate instance the software on behalf of your customer.

Lots of people are taking a flexible approach to get things off the ground - preserving a path to full decentralisation for when the market matures, but removing that burden for the early adopters.


# My Aries-compatible wallet app can't connect with a LibVCX-based issuer. I try to accept the connection but I get a timeout waiting for the protocol to complete. What is wrong?
The [Aries Connection RFC](https://github.com/hyperledger/aries-rfcs/tree/master/features/0160-connection-protocol#3-connection-acknowledgement) states that after sending a `connection-request` and receiving a `connection-response` message back, a wallet _SHOULD_ (but not _MUST_) send an `ack` to let the invitee know that the connection was correctly established. Not all wallets, inclusing Streetcred and others, implement this last step, which LibVCX expects before updating the connection status to `Status.Accepted`. If you are implementing your own wallet, send a `trust-ping` or other message after receiving a `connection-response` and everything will work as expected. We have asked Streetcred to implement the recommnendation in the RFC, and in the meantime we are looking at ways to make LibVCX more tolerant of other Aries implementations.


# What strategies do enterprises use to secure their private keys and other cryptographic material in production environments?

Best practices are driven by the principle of diffuse trust (don’t put all your eggs in one basket) and least privilege. Today, that principle manifests in tools like HashiCorp Vault. Evernym has explored the possibility of a fully decentralized version of such a tool, where all IT staff and other members of an org hold their own subset of keys in wallets on edge devices, and where these individual agents cooperate via protocol to do group signatures and so forth, to get work done. But this is still at the design level.

This generic discussion about wallets is useful in considering their attributes and how to secure them:
https://github.com/hyperledger/aries-rfcs/tree/master/concepts/0050-wallets
￼
Your use case will determine whether it is more important to protect against unauthorized access, or more important to protect against loss of access. Some considerations:
* If you lose access, you can generate new keys and issue new credentials or reissue existing credentials, but you can't revoke previously issued credentials. For most current use cases, that would be an acceptable outcome.
* Because of the privacy preserving nature of a self-sovereign credential, you won't have visibility into fraudulently issued credentials unless you are also the verifier of the credential. Depending on your use case, there are techniques for limiting the damage of a fraudulent credential, such as a governance framework that specifies that verifiers will only accept a credential within X weeks if issuance.
* If you detect a fraudulent credential, you can revoke previous credentials or notify verifiers to not trust such credentials.
* Best practices for preventing unauthorized access include ensure that collaboration of multiple trusted parties is required to access the wallet, and each access should be automatically logged. One way to do this is to keep your issuing keys in a wallet and put the password in a manager that requires multiple factors to access and automatically logs each access. Then you can have each factor controlled by a different person. This obviously makes it hard to use the wallet to issue credentials.


# What predicate support currently exists?
Evernym products like Verity, the Mobile SDK, and Connect.Me support the same predicates as exist in LibIndy: "<", "<=", ">=", ">".

We plan to expand this predicate support over time.


# How many attributes can be in a single credential?

Due to limitations in Indy, a schema definition cannot safely exceed 125 attributes.


# What is required for Connect.Me to communicate with the Sovrin Network?

The Sovrin Network allows validator nodes to accept connections on TCP ports between 9700 and 9800, so communication will fail if your network blocks those ports to outbound traffic. Also, deep packet inspection must not block the ZeroMQ (ZMQ) protocol, as that is used for communication between clients and the ledger.

Connect.Me also communicates with the Evernym Consumer Agency (CAS) at this address: https://agency.evernym.com:443


# What platforms does Connect.Me support?

iOS 11 or newer, and Android 6.0 or newer.
