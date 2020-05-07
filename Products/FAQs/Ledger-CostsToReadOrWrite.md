**Q. What is the cost to read or write on the ledger?**

**A.** The only Sovrin ledger with costs associated with it is MainNet. Interaction with the other ledgers (i.e. BuilderNet, StagingNet) is always free.

On MainNet, reads are always free as well. Note that ordinary operations such as connecting to an agency, credential exchange, proof exchange, and proof verification do not require writes to the ledger and thus are free of charge. Writes to the ledger have charges associated, which are currently as shown in the below table. These costs are subject to change.

|Ledger Write Type|Price|
|---|---|
|DID|$10|
|Schema   |$50   |
|Credential Definition   |$25   |
|Revocation Registry   |$20   |
|Revocation Update   |$0.10   |

<br />
Write costs serve two purposes: 1) Reduce capricious writes to the ledger (spam or DOS attacks), and 2) Provide funds for the operation of the Sovrin Foundation and steward validators.
