# Building Structured Messages 2 : Data formats

The structured messaging has a specific data structure, which can be edited and saved as a JSON data file, or hard-coded as a JSON object.

## Full Message Structure

```json
{
    "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/committedanswer/1.0/question",
    "@id": "518be002-de8e-456e-b3d5-8fe472477a86",
    "question_text": "Test Question",
    "question_detail": "Are you There?",
    "valid_responses": [
      { "text": "ACCEPT", "nonce": "YES" },
      { "text": "REJECT", "nonce": "NO" }
    ],
    "@timing": {
      "expires_time": null
    },
    "external_links": [
      {"text": "Link 1", "src": "https://www.link1site.com/"},
      {"text" : "Link 2", "src": "https://www.link2site.com/"}
    ]
  }

```
1. @type - this is the specification for the message structure as it is written to the Sovrin ledger, currently 'committedanswer' version 1.0, 'question' is the only spec that has been implemented
2. @id - this is a hard-coded id for each message
3. question_text - This is title of the question
4. question_detail - This is the actual text of the questions
5. valid responses - This is an array which lists appropriate response buttons for the Connect.Me app
6. @timing - allows you to set an expiration time
7. external_links - External links are embedded web links that will appear as mobile web links in the message UI.