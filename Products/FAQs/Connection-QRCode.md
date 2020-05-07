**Q. What is encoded into a connection QR Code?**

**A.** In the Sovrin ecosystem, QR codes are often used for encoding connection invitations. These invitations can be transmitted between edge agents by other means as well. The Connect.Me app can receive connection invitations by either scanning a QR code or by receiving an SMS message.

An example connection invitation (from the well‑known Faber example) is shown for discussion:

```json
{
  "statusMsg": "message created",
  "statusCode": "MS-101",
  "senderAgencyDetail": {
    "endpoint": "52.26.236.159:80/agency/msg",
    "DID": "UNM2cmvMVoWpk6r3pG5FAq",
    "verKey": "FvA7e4DuD2f9kYHq6B3n7hE7NQvmpgeFRrox3ELKv9vX"
  },
  "connReqId": "nzbjogn",
  "targetName": "there",
  "senderDetail": {
    "name": "Faber College",
    "logoUrl": "https://mlsvc01-prod.s3.amazonaws.com/1f731cd6201/85813f08-d11d-
    47c3-ab45-9325001cdb7b.jpg",
    "verKey": "32hzAgny9BeRYMUupUM1dNZuzYcyyeLrn15NCDLUTMgJ",
    "agentKeyDlgProof": {
      "signature":"OaSMywozjpGudxX8DRcTaIGSGheGMPDocAdpFbDknZ0XH5WCczrGYovWm+6Wg
      kQxVVrUWZiAQ4UPgBsK8i2SCQ==",
      "agentDID": "L6WvZywNPxHWPCwA5fPAPR",
      "agentDelegatedKey": "BQdmBNKfjZnxckUVDDV21PN6ir5CbtuH8hKD1GpjaLhb"
    },
    "DID": "4ixoHNQ1E94qZAQzo67sBN",
    "publicDID": "dvF3PAtq818Bu1RDPbxsy"
  }
}
```

In this example, the `senderAgencyDetail` gives endpoint information for the Enterprise Agency Server (EAS) that acts as the cloud intermediary for the enterprise’s edge agent. The `senderDetail` is routing information that the EAS can use to pass communications on to the enterprise edge agent. For more information on the roles of these entities, refer to the Agent Vs. Agency article.

The other interesting piece of this connection invitation is the `connReqId`, which is essentially a nonce used to identify exactly which is the invitation that was sent by an enterprise agent that this user is responding to.
