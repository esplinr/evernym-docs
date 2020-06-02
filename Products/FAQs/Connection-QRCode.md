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

The QR code may contain the connection invitation itself, or a URL which points to the connection invitation. 

Connect.Me is able to understand a variant of the invitation format above which includes shortened attribute names, which is helpful in slightly reducing the size of the QR code when encoding directly:
```
{
  "id": "a3fd96ff-1fbb-42c4-b010-c837a9d5bf2f",
  "s": {
    "d": "Ppd2Pwj2fDXjB3iZkyo7X1",
    "dp": {
      "d": "39DdiESkDG8erN4mFan9XY",
      "k": "2AhmejTmqCr8A1F3TJUYxbKhtaQrXvXKjD91zbKYYYQ2",
      "s": "RUgRmYSwr3VBFqtthsvT+2PJsnn0s7iHpwOk/biAecBSfnj0RYDfDFFyae+a47t7sZaA3io5rOUCrm4YWobJAg=="
    }, 
    "l": "http://robohash.org/123", 
    "n": "Test Blank Credential", 
    "v": "DSRGodcE2edmCMJQSjKDKQp3EsEg6XTWsda6spLQNCYR"
  }, 
  "sa": {
    "d": "QreyffsPPLCUqetQbahYNu", 
    "e": "eas.pqa.evernym.com:80/agency/msg", 
    "v": "E194CfHi5GGRiy1nThMorPf3jBEm4tvcAgcb65JFfxc7"
  }, 
  "sc": "MS-101", 
  "sm": "message created", 
  "t": "there", 
  "threadId": null, 
  "version": "1.0"
}
```

The forthcoming 1.3 version of Connect.Me supports interoperability with the Aries 1.0 protocol, and is capable of decoding any of the following from a QR code:
1. Aries invitation base64 encoded in url
2. Aries invitation as JSON
3. Aries invitation from a url
4. Aries invitation in base64 encoded string directly in QR code
5. Aries invitation returned by a url in base64 encoded format
