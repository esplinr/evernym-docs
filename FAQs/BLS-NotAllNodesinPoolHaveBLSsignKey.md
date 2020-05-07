**Q. What if not all nodes in the pool have BLS signing keys for a transaction?**

**A.** Transactions only get signed if all nodes reaching consensus can sign it (`>= 2N+1` Nodes with correct BLS signatures). Nodes in a pool are able to sign if they have a BLS key configured that matches the corresponding key that was written to the ledger for that node. Ideally, this is done for all Sovrin ledger nodes.
