# Building Structured Messages 1 : Establish a Connection

## Connections

Connections are how encrypted information and Credentials are exchanged from one Identity to another. In the case of a structured message, we will be using the Connection to establish the mutually authenticated relationship through which we can send a validated message. 

The first function we will create will generate a new Connection, to be used with Connect.Me. When running this function, you can see that it creates and saves a PNG file entitled 'name-connection.png', which you will need to scan with Connect.Me in order to accept the Connection Request. The function will poll the Agency Service in a loop to wait until the status of the Connection Request is updated. There is a crude timer in the form of a timer to break the polling, in order to prevent spamming the Agency Server. You should also note that the Connection file is saved out as 'name-connection.json' as as a serialized file, with which you may reconstitute at a later time in order to send another message. Once you have established a Connection, you will then start with the structured message.

The second function will load a Connection from a previously created Connection, in order to re-establish an endpoint to the Identity Holder and then perform some action, such as issue a Credential Offer, or in this case, send them a message or ask them a question. 

```javascript
async function makeNewConnection(connectionName){
  await vcx.initVcx(config);
  console.log('vcx will attempt Connection through QR code');
  let connection = await Connection.create({id:connectionName});
  let connectionData=
  {
    "id":name,
    "connection_type":"QR",
    "use_public_did":true
  }
  connectionArgs = {data: JSON.stringify(connectionData)};
  await connection.connect(connectionArgs);
  let details = await connection.inviteDetails(true);
  console.log(details);
  let qrcode = qr.image(details, { type: 'png' });
  qrcode.pipe(fs.createWriteStream(`./data/${connectionName}-connection.png`));
  let state = await connection.getState();
  let counter = 0;
  while(state != StateType.Accepted && counter < 1000) {
      console.log("The State of the Connection is "+ state);
      await connection.updateState();
      await connection.serialize();
      state = await connection.getState();
      counter+=1;
  }
  //function complete
  let serialized_connection = await connection.serialize();
  let connection_file_path = `./data/${connectionName}-connection.json`;
  await fs.writeJson(connection_file_path,serialized_connection);
  console.log("Success!! Connection Complete");
  return connection;
}

async function loadConnection(connectionName){
  await vcx.initVcx(config);
  let connection_data = fs.readJson(`./data/${connectionName}-connection.json`);
  let connection = await connection_file.deserialize(connection_data);
  console.log('vcx will attempt Connection through QR code');
  await connection.connect();
  let details = await connection.inviteDetails(true);
  console.log(details);
  let qrcode = qr.image(details, { type: 'png' });
  qrcode.pipe(fs.createWriteStream(`./data/${connectionName}-connection.png`));
  let state = await connection.getState();
  let counter = 0;
  while(state != StateType.Accepted && counter < 1000) {
      console.log("The State of the Connection is "+ state);
      await connection.updateState();
      await connection.serialize();
      state = await connection.getState();
      counter+=1;
  }
  //function complete
  let serialized_connection = await connection.serialize();
  let connection_file_path = `./data/${connectionName}-connection.json`;
  await fs.writeJson(connection_file_path,serialized_connection);
  console.log("Success!! Connection Complete");
  return connection;

}

```