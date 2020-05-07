**Q. Where does the code for Evernym’s solution stack reside?**

**A.** The code stack we use is distributed among repositories as follows:

- *Hyperledger indy‑node (https://github.com/hyperledger/indy‑node)*

The stable branch of this repository contains the code that is used on the Sovrin networks’ validator nodes. We recommend installing and using the debian binaries at https://repo.sovrin.org/deb that are generated from thisrepository, unless you are a developer needing to work with the code directly.

- *Hyperledger indy‑sdk (https://github.com/hyperledger/indy‑sdk)*

The stable branch of this repository contains the library code, libindy and libvcx, that are used to create agents that interact with the Sovrin ledgers. These libraries also contain the tools needed to generate verifiable credentials, proofs, and to verify them against the ledger record. We recommend installing and using the debian binaries at https://repo.sovrin.org/deb that are generated from this repository, unless you are a developer needing to work with the code directly.

Lower‑level code repositories such as Hyperledger ursa are also pulled in as part of the distributions.

- *Sovrin (https://github.com/sovrin‑foundation/sovrin)*

The stable branch of this repository does not contain code per‑se, but it contains the genesis files required by both indy‑node and indy‑sdk in order to bootstrap the connection to the desired Sovrin network.

- *Sovrin steward‑tools (https://github.com/sovrin‑foundation/steward‑tools)*

This repository contains utility scripts used by stewards and other administrators of the networks.

- *Sovrin libsovtoken (https://github.com/sovrin‑foundation/libsovtoken)*

The stable branch of this repository contains code that is used on the Sovrin networks’ validator nodes to implement the Sovrin token plug‑in. We recommend installing and using the debian binaries at https://repo.sovrin.org/deb that are generated from this repository, unless you are a developer needing to work with the code directly.

- *Evernym (internal)*

Evernym maintains the code for its cloud offerings such as the Enterprise Agency Servers and Consumer Agency Servers in a private repository. It also maintains its own fork of indy‑sdk/libvcx to facilitate rapid development and stability of these libraries for our customers. This fork is occasionally re‑synced with the Hyperledger fork. Evernym also maintains private libraries for compatible iOS and Android Sovrin apps.
