# Building Structured Messages 1 : Establish a Connection

## Connections

Connections are how encrypted information and Credentials are exchanged from one Identity to another. In the case of a structured message, we will be using the Connection to establish the mutually authenticated relationship through which we can send a validated message. 

This function will generate a new Connection, to be used with Connect.Me. When running this function, you can see that it creates and saves a PNG file entitled 'name-connection.png', which you will need to scan with Connect.Me in order to accept the Connection Request. The function will poll the Agency Service in a loop to wait until the status of the Connection Request is updated. There is a crude timer in the form of a timer to break the polling, in order to prevent spamming the Agency Server. You should also note that the Connection file is saved out as 'name-connection.json' as as a serialized file, with which you may reconstitute at a later time in order to send another message. Once you have established a Connection, you will then start with the structured message.

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
```