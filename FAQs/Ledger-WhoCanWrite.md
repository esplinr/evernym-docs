**Q. Who can write different types of transactions to the ledger?**

**A.** This answer will be changing, as the Transaction Endorser (TE) and Transaction Author (TA) roles are in the process of being added in the Indy code. Since this topic is evolving, this answer will be brief. More details will be provided as they emerge. To get a feel for how access policies will be evolving in the future, please refer to the Sovrin Governance Framework's [Ledger Access Policies](https://sovrin.org/wp-content/uploads/Sovrin-Ledger-Access-Policies-V1.pdf) document.

Currently, the Indy roles are Trustee, Steward, Trust Anchor, Network Monitor and Identity Owner. The Trust Anchor and possibly the Identity Owner roles will be absorbed into the TE and TA roles in the future.  Summarizing the capabilities of the current roles:

Trustees have great authority to manage the network. They can write any transaction for themselves or for others, with the following exceptions: They are unable to modify the verkey of an existing DID that is not their own. They are not able to write a node transaction to host a validator node. Some transactions require multiple trustees to sign them in concert, such as minting tokens or establishing token costs for network transactions.

Stewards are able to write DIDs for Trust Anchors, Network Monitors and Identity Owners. They are also able to write schemas, credential definitions, revocation registries. They are the only entity that is able to write a node transaction and to host a validator node. Stewards are able to query validator nodes for their status.

The only capability of Network Monitors is to query validator nodes for their status.

Trust Anchor is a role intended for entities that will be issuing credentials to others. It is able to write DIDs for Identity Owners, schemas and credential definitions. An entity must have written a credential definition to the ledger before it can issue credentials to others.

All roles are able to modify their own DID by writing transactions that rotate the verkey or modify DID attributes.
