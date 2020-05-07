# Receiving a Structured Answer

The answer response coming from an official Structured Message Question is parseable upon receipt, and any action can be triggered by the response. The authenticity of response can be verified through a signature-checking method. This can be used as a verification method to validate the endpoint by the DID signature. This could be used for a variety of purposes, including something akin to 2FA, in which a second confirmation of a mutually authenticated relationship can be processed for an extra layer of security for any sensitive data transaction such as cryptocurrency purchases, bank transfers, or other financial transactions.

## Answer Data structure

The structure below is the response data structure from the Connect.Me or wallet holder, once they have responded to the Question. 

```javascript

{ 
  statusCode: 'MS-103',
  payload: null,
  senderDID: 'Kceg6C1zmvp7jjgzpiu3nc',
  uid: 'MTZhM2R',
  type: 'Answer',
  refMsgId: null,
  deliveryDetails: [],
  decryptedPayload:
   '{"@type":{"name":"Answer","ver":"1.0","fmt":"json"},"@msg":"{\\"@type\\":\\"did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/committedanswer/1.0/answer\\",\\"response.@sig\\":{\\"signature\\":\\"Rt8nq0RHyFBOcwl/TJ7s1vDNMOssyLBQubRmjTSg8FU6KVAQAallnDWuBHF2jM0vEYa5h16fV+vSXZUU9N2uAA==\\",\\"sig_data\\":\\"QnV5\\",\\"timestamp\\":\\"2019-09-24T14:50:58-06:00\\"}}"}' 
}
```
## Decrypted Payload

The decrypted payload is the body of the response from the Identity Owner. 

1. @type - describes the convention and protocol of the structured messaging type
2. Signature - the response has been verifiably signed with the user's DID and time-stamped


## Parsing the Answer

The code below parses the answer from the Responder and returns the value of the response. For brevity in discussion, comments have been added to the Answer Validation process in order to illuminate the process as it occurs. The order of events is as follows:

1. The Question is sent to the Responder Agent from the Asking Agent, using the structured Question with pre-set responses, and a timer is started for expiration.
2. The Responder Connection responds in Connect.Me (or other Sovrin Wallet app).
3. The Asking Agent creates a new null variable called 'answer', which will filled with the received answer
4. If the time has not expired, the Asking Agent will download all messages from the Agency Service
5. The messages will be parsed and if the message type is 'Answer' and the answer variable has no value, the decrypted payload of the Answer will be parsed and pushed to the value of the answer variable.
6. The messages for the Asking Agent will be updated
7. If the answer is not expired the signature of the message will be validated
8. If the signature is validated, the response will be parsed and returned
9. Code based upon the value of the response can be executed

```javascript
var answer;// answer is for pushing data when message is returned from Connect.me user
function getAnswer(){
  while (!isExpired(expiration)) { // if the message is not expired 
    let messages = await vcx.downloadMessages({ status: 'MS-103', pairwiseDids: pairwiseDid }); // download messages
    messages = JSON.parse(messages); //parse messages
    for (const message of messages[0]['msgs']) { // loop through the messages received
      console.log(`message:  ${message}`); //log the message to the console
      if (message.type === 'Answer') { // if the type is an Answer
        if (answer) { // if answer has a value (it should not at this point)
          console.log('More then one "Answer" message');
        } else {
          answer = JSON.parse(JSON.parse(message['decryptedPayload'])['@msg']);// fill the answer JSON with the decryptedPayload converted as a JSON object
        }
        await vcx.updateMessages({ msgJson: JSON.stringify([{ 'pairwiseDID': pairwiseDid, 'uids': [message.uid] }]) });// update the messages
      }
    }
    if (answer) {
      break;// break loop if answer already has a value
    }
  }
  if (isExpired(expiration)) {// if the answer is expired, error out
    console.log("expired");
    throw Error('Timeout');
  } else {// if the answer is not expired check for validation of signature
    const signature = Buffer.from(answer['response.@sig']['signature'], 'base64');
    const data = answer['response.@sig']['sig_data'];
    console.log('validating signature');
    const valid = await deserialized_connection.verifySignature({ data: Buffer.from(data), signature });
    if (valid) {
      console.log('Signature is valid!');
      console.log('The user response is : ');
      return base64decode(data); // returns the nonce value from the user response
    } else {
      console.log('Signature validation failed');
      return false;
    }
}

if (getAnswer() === "YES"){
  // execute answer-based code here
  console.log(`The answer is YES`);
}else{
  console.log(`The answer is ${getAnswer()}`);
}
```