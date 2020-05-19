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


# How to become an Endorser on the Sovrin Networks?
For Sovrin Builder Net and Sovrin Staging Net go to https://selfserv.sovrin.org
For Sovrin Main Net:
1. Complete the Transaction Endorser Agreement signing and approval process and send it in to the Sovrin Foundation.
2. Send the “Add Endorser DID to MainNet command” to 1 Trustee and have them add the Endorser.  We can help with this as Drummond Reed of Evernym is a Trustee.
3. That Endorser DID can start writing to MainNet.

