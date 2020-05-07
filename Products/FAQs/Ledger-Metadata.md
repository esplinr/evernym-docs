**Q. When transactions are recorded to the ledger, is "metadata" also recorded about the transaction? If so, what kinds of metadata?**

**A.** Yes, metadata is recorded. An example, taken from the Sovrin StagingNet validator pool is:

```json
{
  "_id": "5caa5815ca9e7c001d001ae4",
  "reqSignature": {
    "values": [
      {
        "value": "2JRGJHCbjHUvKYAPtoqpiNvZ9LR7eZ4RLh3YxcbFqqeG38AkqjcBuJS4tvtdH9gCYFq4RBGpBT9S25N8Qz7otkjR",
        "from": "VRgXDR2LD6kDsGpMZRHpto"
      }
    ],
    "type": "ED25519"
  },
  "auditPath": [
    "HuzLF2xkXyuLWUFmAyafehb6ej1Y1J7aLhj8RTFtAvoZ",
    "9bejDKLrDkEQ4m8nWZ1WtDfSXHyfSxpQiUr8PcZpLk3y",
    "6bbhm4UJXruxKUq6UXJcKmdQh2TAyQaVP3EXy2bZ9Wqu",
    "GdKaNdAhDpJDgWXiQY9Rgfcw5e9kUJ6LwwPuZi388dUM",
    "CAXf1BVVc2BJ1yfHKBegQsVsv12b23VXF3cgevST5qA4",
    "7ZdHsSytTkDPFZDZPFfLrC695nqDLiu53NpKzZtqTNw1",
    "FxoBSgbtp1uL8zcDejDcq43gc2gx3izrz5mf53HiVcCe",
    "5Qd3svXVLAQgFH4dr4ZZo5N3CWhNSBKxPpMviREybr8p",
    "GLJgYJp12vMqmkLQBjEKmcSvKxvYecvw7sAoykWFr7HQ",
    "HSMKPPJs2WggDosXiPSYFAekmgjzRkp5Zsmx6PQAPyS5",
    "3tDy8q4SGB3aA2bcNLLuiawQxtcUXhPehe3Xx5ZYMWjm"
  ],
  "ver": "1",
  "txnMetadata": {
    "txnTime": 1554667540,
    "seqNo": 49101,
    "txnId": "VRgXDR2LD6kDsGpMZRHpto:2:Big Bank1554667539415:1.0"
  },
  "rootHash": "CZWAFVeAi6vnBZZzpFKymFXvHfMBC2PvPuKDq9hbVBZ5",
  "txn": {
    "metadata": {
      "reqId": 1554667539480604200,
      "digest": "54270dc26bd35fd62f88c6be1904cda67ff70d39abaf64fbe865418a41ca57fe",
      "from": "VRgXDR2LD6kDsGpMZRHpto"
    },
    "protocolVersion": 2,
    "type": "101",
    "data": {
      "data": {
        "attr_names": [
          "LastName",
          "DateOfBirth",
          "KYCExpiry",
          "AccountNumber",
          "KYCLastChecked",
          "FirstName",
          "KYCStatus"
        ],
        "version": "1.0",
        "name": "Big Bank1554667539415"
      }
    }
  }
}
```

The actual transaction data is in the `txn.data` section. The rest of this transaction data could be considered metadata. The type (`101`) shows that this is a schema transaction. `txn.from` shows that the transaction was written by a trust anchor with DID `VRgXDR2LD6kDsGpMZRHpto`. Also of interest are the fields in `txnMetadata`, which include the time that the transaction was written (in Epoch time), its sequence number on the ledger, and its unique identifier string.
