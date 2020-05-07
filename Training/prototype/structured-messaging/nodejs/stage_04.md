# Structured Messages 4 : Sending a Message to a Connection

In this first example of messaging, we will only send a message to a Connection, and not request a response from them.

## Sending a Question to a Connection

Since we already have a function that returns a Connection, the next step is to send that Connection a message. We use the connection.send_message() function to send the message,which is loaded from our message.json file, as saved in the previous step. Once the message is loaded, we will send it to the Connection created using the makeConnection() or the loadConnection() function we created [previously](../03/). If you choose to make a new Connection in this process, you must scan the resulting QR code with Connect.Me to establish the new Connection before you send it the message. If you decide to load a previously established Connection, you will need to have made that Connection and stored the name-connection.json file in the 'data' directory in order to retrieve and deserialize the data into a Connection object.

```javascript

async function sendMessage(connectionName, newConnection, msgName){
  var connection = {};
  //await the creation of the connection from the previously save
  if (newConnection){
    connection = await makeNewConnection(connectionName);
  }else{
    connection = await loadConnection(connectionName);
  }
  //construct the message/question
  let msgFile = await fs.readJson(`data/${msgname}-message.json`);
  let msg ={
    'msg':JSON.stringify(msgFile),
    'type':'Question',
    'title':msgFile.question_text 
  };

  //send the message/question
  await connection.send_message(msg);
  
}
```

In the previous code, you can see that the message data structure is as follows:

```json
  "msg":"JSON String", // string version of the JSON msg format
  "type":"Question",// 'Question' is currently the only type recognized by Connect.Me
  "title":"Title"// Title of Message/Question being sent
```

The message is bundled into this format, including the question structure previously saved as "question-message.json" in the data directory, which we load in with fs.readJson().

## Receiving the Message in Connect.Me

Once the question is sent to Connect.Me, the Identity Holder should receive it, along with any external links that are embedded into the file. The message appears in the window, just like a Connection Request, Credential Offer, or Proof Request. The answer to the message is conveyed cryptographically back to the Asker, with the response encoded in the data structure (along with the time stamp). Based upon the validation of the end user and the response received, the Requesting Agent can then execute any code desired.

## How UI renders responses

If there is exactly one object in valid_responses array then no radio buttons would be rendered. This one response would be rendered as a primary actionable button (green button) in bottom of message screen. Text of this button would be set from object's text property. There is limit on number of characters that can be displayed on button. For smaller width devices (for example: iphone 5), at most 17 characters would be displayed on this action button. For bigger width devices such as iphone 7 at most 20 characters would be shown.

If there are exactly two objects in valid_responses array, then first object would be considered primary response. This primary response would be rendered as primary action button. Second object would also be rendered as secondary action button. There is a limit of 40 characters on big devices, and 35 characters on small devices.

If there are more than objects in valid_responses array, then all responses would be rendered as radio buttons and put in a scrollable view. There is no limit on number of characters in this case.

If there are more than 20 objects in valid_responses array. Then only first 20 responses would be rendered as radio buttons.

If there are more than 1000 objects in valid_responses array. UI would throw validation error with code CM-QUE-007