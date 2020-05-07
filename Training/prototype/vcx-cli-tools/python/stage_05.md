# Building VCX CLI Tools - Making Connections

Connections are mutually authenticated channels of communication in VCX. Creating one first involves generation the Connection Object using Libvcx. This creates a data structure which will generate a name ID and attributes, generated as cryptographic elements which can communicate with another DID. The Connection Object is a json-like data structure, which is generated and offered to another DID through an Agent, which can be a User-oriented Wallet App such as Connect.me, or an Enterprise. 

In order to successfully fulfill a Connection between 2 Identity Holders, there are 3 key steps.

## Step 1 : Creating a Connection

This function will generate a new Connection object, as outlined above. This Connection Object can then be *offered* to any other DID Identity Holder. The connection can be currently accepted by an Identity Holder in one of 4 ways:

1. **QR Code** - A QR Code is generated with the invite_details, as listed above in the data structure. The QR code can be scanned with Connect.me.
2. **SMS Text** - An SMS text message will be sent to a mobile device with a link opening the Connect.me app with the Connection request.
3. **Deep Link** - A web link for mobile browsers can be generated from the "invite_url", as seen above.
4. **Agent Offer** - Connection offers can be accepted automatically by a cloud agent when offered through programmatic means.

## Step 2 : Connecting to a Connection

connection.connect() will send the connection request to the SMS number (if this is the method ) or enable this DID to be connected by the Connection offer, whether through QR, deep web link, or SMS link. The Connection Offer is extended to the Identity Owner, waiting for their response.

## Step 3 : Polling for Connection State

Connection State is an extension of the VCX State, in which an offer is extended, and reports back the status of that offer (for Credentials, Proofs, and Connections). In order to determine the State at any point, you must "poll" the Agency server to update the state of the object. IF the state never changes (i.e, the Identity Holder never responds or refuses the Connection), the state will not change. For that reason, we highly suggest putting your own expiration code in any Connection offer (see coding examples).

## makeConnection function

Below is the makeConnection() function, which will perform the creation, connection, and polling for state of a connection using NodeJS. It has been formatted for insertion into the CLI Mmodule Exports.

```python
async def makeConnection(connection_type, name, phone_number):
    print("You called {} with parameters {}".format(inspect.stack()[0][3], ', '.join(['{}={}'.format(k,v) for k,v in locals().items()])))
    await _initialize()
    connection = await Connection.create(name)
    print("Attempting connection via {}".format(connection_type))
    if (connection_type == 'QR'): 
        connection_data = {
            'id': name,
            'connection_type': 'QR',
            'use_public_did': False
        }        
        connection_args = json.dumps(connection_data)
        await connection.connect(connection_args)        
        await connection.update_state()
        details = await connection.invite_details(True)
        details_text = str(json.dumps(details))
        print(details_text)
        img = qrcode.make(details_text)
        img.save('./data/{}-connection-invite.png'.format(name))
        print(">>> Open the QR Code at ./data/{}-connection-invite.png for display, and scan it with connect.me".format(name))
    elif (connection_type == 'SMS'):
        connection_data = {
            'id': name,
            'connection_type': 'SMS',
            'phone': phone_number,
            'use_public_did': False
        }
        connection_args = json.dumps(connection_data)
        await connection.connect(connection_args)
        details = await connection.invite_details(True)
        details_text = str(json.dumps(details))
        print(details_text)
 
    else:
        print('Unrecognized connection type: {}'.format(connection_type))
        return
    connection_state = await connection.get_state()
    while connection_state != State.Accepted:
        sleep(2)
        print('The state of the connection is {}'.format(connection_state))
        await connection.update_state()
        connection_state = await connection.get_state()
    serialized_connection = await connection.serialize()
    with open('./data/{}-connection.json'.format(name), 'w') as fh:
        json.dump(serialized_connection, fh)
    print('Success!! Connection complete. The state of the connection is {}'.format(connection_state))
    return
}
```

## Important Connection functions

1. This function uses a json-object to contain the connection "id", which is a name for the intended Connection.

```python
    connection = await Connection.create(name)
```

2. Connection.connect() issues the actual request to Connect to Connection. This will contain a data structure that has information about the connection invite.

    ```json
    connection_data = {
        'id': name,
        'connection_type': 'QR',
        'use_public_did': False
    }   
    ```
    * id : the string value of the Connection name
    * connection_type : the type of connection (SMS or QR are the only acceptable current types)
    * use_public_did: Determines whether you want the Connection request to be recognized again. For instance, if this is set to "false", it will create a new Connection every time the user accepts the Connection. When set to "True", this Connection will be recognized the next time a Connection request from the same DID is sent. **As of the current EAP Libvcx version stack, this option is not available and if set to True will result in all subsequent code being inoperable in Connect.Me. Until the Connection Redirect feature is enabled, leave this value as False, which will generate a new Connection each time.**

    ```python
    connection_args = json.dumps(connection_data)
    await connection.connect(connection_args)
    ```

3. This will convert the Connection data object into a json-like data structure for insertion into a database. With this you can read a previously created connection from a local database and re-establish the connection at any time. Connections can be persistent or *ephemeral*, only existing in local memory as long as they are needed to transfer a Credential Offer or a Data Share Request.

```python
    await connection.serialize()
```

4. This will convert a serialized Connection object into a usable VCX Connection for sending data across. This is usually accomplished by reading the serialized Connection from a data file.

```python
    await connection.deserialize()
```

5. This updates the VCX State of the Connection object.

```python
    await connection.update_state()
```
6. This gets the VCX State of the Connection. 

```python
    await connection.get_state()
```

The possible States are as follows:

* StateNone = 0
* StateInitialized = 1
* StateOfferSent = 2
* StateRequestReceived = 3
* StateAccepted = 4
* StateUnfulfilled = 5 - **Set by Issuer and not by Agency**
* StateExpired = 6 - **Set by Issuer and not by Agency**
* StateRevoked = 7

As you can see, certain States are not set by the Agency, but by the user. If an Identity Holder chooses to ignore the request, or never sees it at all, this is not reported back by design, in order to provide the maximum level of privacy and security for the Identity Holder. The best use-case for determining that the Identity Holder has *not* chosen to accept the Connection Request is to set a timer that ceases to poll the Agency for status updates after a certain time has passed. This is equally important in reducing requests to the Agency Service, which is set to timeout your polling after a certain limit.

## Polling the Agency for State

VCX often has asynchronous actions that require waiting for a State to change before moving to the next step. Because an Agency Server could be processing multiple requests at once, this request will get put in to a queue and processed when the server reaches that point in the queue. For this reason, there is an unknown quantity of time that will transpire before the status of a Connection Request will change from one State to another.

0. You have not created a Connection object : **State = 0 (None)**
1. You create a Connection  : **State = 1 (Initialized)**
2. You issue the Connection Request to the Identity Holder : **State = 2**
3. The Idenity Holder receives the Connection Request : **State = 3**
4. The Identity Holder Accepts to the Connection Request : **State = 4**
5. The Identity Holder Ignores the Request : if a timer is set to expire, the polling will stop and you can set **State = 5 or 6**. Otherwise the polling will continue in perpetuity. This is important, as the State will not change of its own accord until the Issuer does it manually.

```python
while (connection_state != State.Accepted ):
    await connection.update_state()
    connection_state = await connection.get_state()
```
## Serialized Connection Example

This is an example of a serialized Connection, once it has been created, connected, and accepted. The 'invite_detail' key is set to display the full key names, and not abbreviated, in this example. 

```json
{
    "version": "1.0",
    "data": {
        "source_id": "connection_1",
        "pw_did": "SnDwvw7QoMJusLJi93mYfZ",
        "pw_verkey": "F3wxKdePpYq4aqGVL5H3NrtuTWH52DNiUYn2LHxqM5xw",
        "state": 4,
        "uuid": "",
        "endpoint": "",
        "invite_detail": {
            "statusCode": "MS-101",
            "connReqId": "YzcyYTQ",
            "senderDetail": {
                "name": "MY_VCX_KIOSK",
                "agentKeyDlgProof": {
                    "agentDID": "Dch9XGZ23wQSc3CaeWQuch",
                    "agentDelegatedKey": "7soEVDHMdsJiWv6VHXHKbgf42HZsTAAyeA16MKY9yp4Q",
                    "signature": "djOaWF3xyn8q2rmftTQjZX6v7d9W2QBqcqhpdTZ5VkdPOddPPURLfU/GIxw8VslGkEbIOSOuQINTt+CVgBcNBw=="
                },
                "DID": "SnDwvw7QoMJusLJi93mYfZ",
                "logoUrl": "https://s3.us-east-2.amazonaws.com/static.evernym.com/images/icons/cropped-Evernym_favicon-trans-192x192.png",
                "verKey": "F3wxKdePpYq4aqGVL5H3NrtuTWH52DNiUYn2LHxqM5xw",
                "publicDID": "M9tg47pCMgisfNwSRzRtAv"
            },
            "senderAgencyDetail": {
                "DID": "UNM2cmvMVoWpk6r3pG5FAq",
                "verKey": "FvA7e4DuD2f9kYHq6B3n7hE7NQvmpgeFRrox3ELKv9vX",
                "endpoint": "52.26.236.159:80/agency/msg"
            },
            "targetName": "there",
            "statusMsg": "message created",
            "threadId": null
        },
        "invite_url": "https://eas01.pps.evernym.com/agency/invite/Dch9XGZ23wQSc3CaeWQuch?uid=YzcyYTQ",
        "agent_did": "Dch9XGZ23wQSc3CaeWQuch",
        "agent_vk": "7soEVDHMdsJiWv6VHXHKbgf42HZsTAAyeA16MKY9yp4Q",
        "their_pw_did": "3XoSVzteCyB5yUez4imh9W",
        "their_pw_verkey": "2P1fDvH9JpBuJo6EbobWJoFUZeuUy2ij1HfMWpp3nejk",
        "public_did": "V5ipGZhPeQ5B86nQUMWiUV",
        "their_public_did": null
    }
}
```

## CLI Tools use

Using the makeConnection() function allows you to choose SMS or QR code Connections. QR code connections will save a PNG image file named alice-connection.png (alice being the name of the connection).

```bash
    python3 connectToUser SMS alice 9999999999
```

## Common Execution Errors
{: style="color: red"}

### Invalid Connection Handle
{: style="color: red"}

An invalid Connection Handle Error when creating the Connection object is generally a result of having a mismatched wallet and vcx-config.json file data. If for some reason you re-provision your wallet but fail to update your configuration file, this will report an error.

```bash

    UnhandledPromiseRejectionWarning: Error: Invalid Wallet or Search Handle
        at Function
```