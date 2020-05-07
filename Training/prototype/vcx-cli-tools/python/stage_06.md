# Building VCX CLI Tools - Credential Issuance

Issuing a Credential to a Connection requires building a Credential from the Definition and specific field data and the Issuing an Offer to the Connection. IF the Offer is accepted, the Credential can then be Issued (or withheld dependent upon some other term such as payment for the Credential) to the Connection.

## The Credential Exchange Process

The Credential Exchange process must be constructed in a very specific order.

1. Write Credential Definition to Ledger [(see previous module)](../04/);
2. Establish Connection to Identity Holder [(see previous module)](../05/);
2. Create/Access data for Credential Schema fields (this can be hard-coded or from a database/datafile)
3. Create Credential Object 
4. Issue Credential Offer to Connection
5. Poll for Credential Offer State to become Acccepted (which occurs when the Identity Holder accepts the Credential Offer)
6. Issue the Credential to the Connection

## Sample Credential Offer Code

```python
async def offerCredential(credential_name, connection_name):
    print("You called {} with parameters {}".format(inspect.stack()[0][3], ', '.join(['{}={}'.format(k,v) for k,v in locals().items()])))
    await _initialize()
    with open('./data/{}-credential-definition.json'.format(credential_name),'r') as fh:
        credential_definition_data = json.load(fh)
    with open('./data/{}-{}-data.json'.format(connection_name, credential_name),'r') as fh:
        credential_data = json.load(fh)
    with open('./data/{}-connection.json'.format(connection_name),'r') as fh:
        connection_data = json.load(fh)
    connection = await Connection.deserialize(connection_data)
    credential_definition = await CredentialDef.deserialize(credential_definition_data)
    cred_def_handle = credential_definition.handle
    credential = await IssuerCredential.create(
                       'arbitrary_enterprise_tag', 
                       credential_data['attrs'], 
                       cred_def_handle, 
                       'arbitrary_cred_name', 
                       '0')
    print('Credential is successfully created. Now offering it to {}'.format(connection_name))
    await credential.send_offer(connection)
    await credential.update_state()
    state = await credential.get_state()
    while state != State.RequestReceived:
        sleep(2)
        print('The state of the credential offer is {}'.format(state))
        await credential.update_state()
        state = await credential.get_state()    
    print('The state of the credential offer is {}'.format(state))
    print('The credential offer has been accepted. Now sending the signed credential to {}'.format(connection_name))
    await credential.send_credential(connection)
    await credential.update_state()
    state = await credential.get_state()
    while state != State.Accepted:
        sleep(2)
        print('The state of the credential transmission is {}'.format(state))
        await credential.update_state()
        state = await credential.get_state()
    print('The state of the credential transmission is {}'.format(state))
    print('Success! The verifiable credential has been sent to {}'.format(connection_name))
    return
```

## Credential Data

In order to create a Credential Object, we need to generate a data file with the keypair values *named exactly as they are in the schema* and associated with data values. Create a new file named 'alice-employee-data.json' in data/ in your root code directory.

```bash
    vim data/alice-employee-data.json
```

Enter in the data structure (or copy and paste it) from the following json:

```json
{
  "attrs":
  {
    "FirstName":"Kelsey",
    "LastName":"Ford",
    "ID":"20202020",
    "Phone":"999-999-9999"
  }
}
```

Make **sure** the names of the data field are *exactly* like the schema data fields! Otherwise you will still be able to build the Credential, but issuing it will fail. Currently, as of this writing, only string values are allowed as data in these fields (there are plans to expand the available data types soon).

## Creating a Credential

The first step in issuing a Credential is to create the Credential object, as shown below:

```python
credential = await IssuerCredential.create(
                    'arbitrary_enterprise_tag', 
                    credential_data['attrs'], 
                    cred_def_handle, 
                    'arbitrary_cred_name', 
                    '0')
```

The arguments for this are explained as follows:

1. "sourceId" = "arbitrary_enterprise_tag". This key is derived from the Credential Definition key "data.source_id" in the employee-credential-definition.json file.
2. "attr" = cred_def_handle['attrs']. This key will contain the attributes from the alice-employee-data.json file key names "attrs".
3. "credDefHandle" = cred_def_handle. This key is derived from the Credential Definition key "data.handle" in the *deserialized* employee-credential-definition.json file.
4. "credentialName" = "arbitrary_cred_name" = This key is an arbitrary string name that you will use to identify the Credential.
5. "price" = 0. This is a spot for the price of the Credential, for future token functionality. It is left as 0 for this version.

## Issuing a Credential Offer

Once the Credential object has been properly created, you will issue the offer to the Connection. In this case, you will be creating the connection first from the serialized file created during the original credential creation [(in Connection creation)](../05/). You should have a file named 'name-connection.json', which you will use to deserialize and create the connection object.

1. Load the Connection from .json data file data and update state: 

    ```python
    with open('./data/'+connection_name+'-connection.json','r') as fr:
        serialized_connection = json.loads(fr.read())
    connection = await Connection.deserialize( serialized_connection )
    await connection.update_state()
    ```

2. Send Credential offer:

    ```python
    # Issue the credential offer to the Connection
    await credential.send_offer(connection)
    ```

## Polling for State

Once the Credential is created, you will need to poll the Agency for the state of the Credential Offer. The Agency Server puts each request and response into a queue, which updates the state of each request as it resolves them. Just like the Connection request, the State of the action will be updated and changed by the Agency when it occurs.

Update State will update the state of the Credential Offer from the Agency Server. (it will not return a value, however).

```python
await credential.update_state()
```
Get State gets the state of the Credential Offer, returning a value of the updated State.

```python
state = await credential.get_state()
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

Note that the states VcxStateUnfulfilled and VcxStateExpired aren't actually set by the Agency (and will never be returned as such). These states are left up to the Credential Issuer to alter as they see fit, based upon expiration times or as unfulfilled if there was no response to the offer. The Identity Holder, either as a Connect.me user or another Enterprise Agent, must accept the Offer. If they choose *not* to accept this offer, it is up to the Issuer Agent to set the State to Unfulfilled, in order to keep a record of it for their database for any internal purpose necessary (this data is saved in the Credential Offer object if you choose to serialize it).

Loop for polling of Credential Offer status:

```python
# get the state of the credential offer and assign the value to the credential state
while credential_state != State.RequestReceived:
    sleep(2)
    await credential.update_state()
    credential_state = await credential.get_state()
print("Cred State %s" % credential_state)
```

The loop for the poll keeps it checking the Agency Service until the state is accepted. If you want to kill the polling at a certain time limit (and you should) a global timeout variable can be created.

## Sending Credentials

Once you confirm that the Connection has Accepted the Credential, you will issue it to them. This is separated from the Offer, because you may want to make the issuance contingent upon some circumstance or payment, such as withholding a college transcript from a student who owes the University unpaid fines or tuition fees. In this case, for instance, a Credential of Good Financial Standing can be issued to the former or current student and thusly veified in the same transaction as offering and issuing them a Transcript Credential. If the Credential for Good Financial Standing is not proved or held, the Transcript Credential will not be issued to them.

Send the credential to the connection:

```python
await credential.send_credential(connection)
```

## Serializing and writing Credential

You may want to keep records of each Credential issued to a Connection. In this case, you will serialize the Credential object and save it to a data format of some kind. At any point you can deserialize this Credential and re-offer it to an Identity Holder (in case it is lost at some point). In this example I simply serialize the Credential data and write it to a json format.

```python
serialized_cred = await credential.serialize()
with open('./data/'+credential_name+'-'+connection_name_+'-credential.json','w') as fw:
    fw.write(json.dumps(serialized_cred))
```

## offerCredential function

This function exists inside of the attached vcx-cli-tools.py code. It sends a Credential Offer to a previously established Connection, which has been saved to disk as ./data/connection.json. It also loads the connection's credential data and the Credential Definition from the ./data directory, in order to create and issue the Credential Offer. The data itself may come from any database format, but in this case a JSON format is used for simplicity.

```python
async def offerCredential(credential_name, connection_name):
    print("You called {} with parameters {}".format(inspect.stack()[0][3], ', '.join(['{}={}'.format(k,v) for k,v in locals().items()])))
    await _initialize()
    with open('./data/{}-credential-definition.json'.format(credential_name),'r') as fh:
        credential_definition_data = json.load(fh)
    with open('./data/{}-{}-data.json'.format(connection_name, credential_name),'r') as fh:
        credential_data = json.load(fh)
    with open('./data/{}-connection.json'.format(connection_name),'r') as fh:
        connection_data = json.load(fh)
    connection = await Connection.deserialize(connection_data)
    credential_definition = await CredentialDef.deserialize(credential_definition_data)
    cred_def_handle = credential_definition.handle
    credential = await IssuerCredential.create(
                       'arbitrary_enterprise_tag', 
                       credential_data['attrs'], 
                       cred_def_handle, 
                       'arbitrary_cred_name', 
                       '0')
    print('Credential is successfully created. Now offering it to {}'.format(connection_name))
    await credential.send_offer(connection)
    await credential.update_state()
    state = await credential.get_state()
    while state != State.RequestReceived:
        sleep(2)
        print('The state of the credential offer is {}'.format(state))
        await credential.update_state()
        state = await credential.get_state()    
    print('The state of the credential offer is {}'.format(state))
    print('The credential offer has been accepted. Now sending the signed credential to {}'.format(connection_name))
    await credential.send_credential(connection)
    await credential.update_state()
    state = await credential.get_state()
    while state != State.Accepted:
        sleep(2)
        print('The state of the credential transmission is {}'.format(state))
        await credential.update_state()
        state = await credential.get_state()
    print('The state of the credential transmission is {}'.format(state))
    print('Success! The verifiable credential has been sent to {}'.format(connection_name))
    return
```

## CLI use example

With the following files in your data directory, you can use the CLI client to send the Credential Offer to your Connect.me mobile app.

1. alice-connect.json
2. alice-employee-data.json
3. employee-credential-definition.json

```bash
    python3 offerCredential employee alice
```

## Common Execution Errors
{: style="color: red"}

### Invalid JSON Data Structure
{: style="color: red"}

The attribute fields in the Schema, Credential Definition, *and* Credential Data must all match *exactly* or there will be an error thrown when attempting to issue the Credential. This is confusing because the error is not specific, and it only occurs after the Credential has been built, offered, and accepted.

```bash
{ Error: Object (json, config, key, credential and etc...) passed to libindy has invalid structure
    at IssuerCredential.<anonymous> (/vagrant/node_modules/node-vcx-wrapper/dist/api/issuer-credential.js:163:23)
    at Generator.throw (<anonymous>)
    at rejected (/vagrant/node_modules/node-vcx-wrapper/dist/api/issuer-credential.js:5:65)
    at <anonymous> inheritedStackTraces: [], vcxCode: 1080 }
```