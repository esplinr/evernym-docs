# Building VCX CLI Tools -- Proof Request Issuance

## Load Proof Request Template

The previous lesson showed how to creat a file with the Proof Request attributes and restrictions named `employee-proof-template.json`. Using this data, you will create the Proof Request.

```javascript
let proof_data = await fs.readJson(`./data/${proof_name}-proof-definition.json`);
```

## Creating the Proof Request

`proof.create()` creates a proof object from the proof data, loaded in the previous step as `proof_data`. 

```javascript
let proof = await Proof.create(proof_data);
```

## Offering the Proof Request

Now that you have a *proof* object, you can offer it to your connection. The connection will come from a previously saved file, which will be deserialized and converted back into a LibVCX connection object. This is an important step because we cannot offer a proof to serialized connection data; it must be converted back. This gives the Agency service the information on how to locate the connection, which reestablishes the connection data to send any requests through.

```javascript
let connection_data = await fs.readJson(`./data/${connection_name}-connection.json`);
let connection = await Connection.deserialize(connection_data);
await proof.requestProof(connection);
```

## Polling for Acceptance of the Request

As with all requests, you must poll the Agency for the status of the Proof Request you sent until you receive a response. As before in polling, use `sleep()` to pause the polling a bit.

```javascript
let state = await proof.getState();
while(state != StateType.RequestReceived){
    console.log(`The state of the proof is ${state}`);
    await sleep(2000);
    await proof.updateState();
    state = await proof.getState();
}
```

## Validation of the Proof Request

Inside of the `while` loop can you can insert an `if` statement that checks to see if the proof has been accepted. This logic prevents it from trying to validate a Proof Request that has been rejected by the user. So far, you  have created a proof and requested it from your connection, but now you must *validate* that proof. A returned proof (which is created by the Connect.Me app) will have the requested attributes enclosed. **IF** the attributes do not match the proof predicates and restrictions *exactly*, the Proof Request will return a state of invalid, or `int=2`. If all of the restrictions and predicates match exactly, the proof will return a value of `int=1`, or *valid*. If the Proof Request has been created but not issued or responded to, it will retain a value of `int=0`, or *undefined*. Thus the proof initiates at a value of `0` and can never return to that value once it has been issued and received.

`proof.getProof(connection)` checks the attributes of the returned proof object against the restrictions of the proof and determines the validity of that proof, based upon the restrictions inside of the proof data. This will return a value of `1` or `2`. (The initial value is `0`.)

```javascript
while(state != StateType.RequestReceived){
    console.log(`The state of the proof is ${state}`);
    await sleep(2000);
    await proof.updateState();
    state = await proof.getState();
    if(state == StateType.Accepted) {
        var proof_return = await proof.getProof(connection);
        console.log(`The get proof state is ${proof_return}`);
        break;
    }
}
```

## Verify Claims Function

This function creates an array and checks each attribute from the returned proof against the restrictions in the proof data. If they all match it will return as verified. 

```javascript
function _verifyClaims(the_proof, proof_template) {
    // determine which claims should have restrictions applied
    var restricted = [];
    var proof_obj = JSON.parse(the_proof['proof']);
    for (attribute in proof_template) {
        if ("restrictions" in proof_template[attribute]) {
            restricted.push(proof_template[attribute]["name"]);
        }
    }
    verified = true;
    for (claim in restricted) {
        if (!(restricted[claim] in proof_obj["requested_proof"]["revealed_attrs"])) {
            verified = false;
            console.log("Attribute " + restricted[claim] + " has unmet restrictions.");
        }
    }
    return verified;
}

```

## `requestProof` Sample Code

This is the entire code for the `requestProof` function. You should note here that the `_verifyClaims()` function is set after `var proof_return` is created, to check each requested attribute against its respective restrictions. 

```javascript
    async function requestProof(proof_name,connection_name){
        await vcx.initVcx(config);
        let proof_data = await fs.readJson(`./data/${proof_name}-proof-definition.json`);
        let connection_data = await fs.readJson(`./data/${connection_name}-connection.json`);
        let connection = await Connection.deserialize(connection_data);
        await connection.updateState();
        await connection.serialize();
        console.log(proof_data);
        let proof = await Proof.create(proof_data);
        await proof.requestProof(connection);
        await proof.updateState();
        state = await proof.getState();
        while(state != StateType.RequestReceived){
            console.log(`The state of the proof is ${state}`)
            await sleep(2000);
            await proof.updateState();
            state = await proof.getState();
            if(state == StateType.Accepted) {
                var proof_return = await proof.getProof(connection); // proof_return is created
                console.log(`The get proof state is ${proof_return}`);
                break;
            }
        }
        await proof.updateState();
        state = await proof.getState();
        //check proof return against restrictions
        if (_verifyClaims(proof_return, proof_data.attrs) == true) {
            console.log("Claims in the proof satisfy all restrictions. The proof is verified!");
        }
        else {
            console.log("Claims DO NOT meet all restrictions");
        }
        await fs.writeJson(`./data/${connection_name}-proof.json`, proof_return);

    function _verifyClaims(the_proof, proof_template) {
        // determine which claims should have restrictions applied
        var restricted = [];
        var proof_obj = JSON.parse(the_proof['proof']);
        for (attribute in proof_template) {
            if ("restrictions" in proof_template[attribute]) {
                restricted.push(proof_template[attribute]["name"]);
            }
        }
        verified = true;
        for (claim in restricted) {
            if (!(restricted[claim] in proof_obj["requested_proof"]["revealed_attrs"])) {
                verified = false;
                console.log("Attribute " + restricted[claim] + " has unmet restrictions.");
            }
        }
        return verified;
    }
    }
```

## CLI Use Example

```bash
node VCXTools.js requestProof employee nzeman
The state of the proof is 2
The state of the proof is 2
The state of the proof is 2
Success! You have issued a Proof request to nzeman and validated it.
```

## Proof Actions

You can access a few key functions from the proof wrapper.

1. `proof.create(proof_data)` -- Creates the proof object from attributes in `proof.json`.
    * `proof_data.source_id` -- Local identifier value
    * `proof_data.name` -- Local name of proof request
    * `proof_data.attrs` -- List of attributes to verify
2. `proof.request_proof(connection)` -- Requests the proof from the connection, which sends the request to the Identity Owner
3. `proof.get_proof(connection)` -- Gets the returned proof from the connection
4. `proof.update_state()` -- Always updates the state of the proof object, which will return one of three values; `0`, `1`, and `2` (*see below*).


## Proof States

Several states of the proof are returned by the `proof.proof_state` attribute.

* `Undefined = 0` -- The proof has not yet been issued
* `Verified = 1` -- The proof has been issued and verified
* `Invalid = 2` -- The proof has been revoked or does not contain the field requested

## Common Execution Errors

The most common error in creating and issuing a Proof Request is in having an incorrect data structure. Because complex proof definitions can be quite dense in terms of data structure, try using the simplest form first and appending further attributes in stages of complexity. For more information on more complex proof structures, refer to the tutorial "Complex Proofs and Predicates" in the EAP Training Portal.

```bash
{ Error: Invalid Option
    at Function.<anonymous> (/vagrant/node_modules/node-vcx-wrapper/dist/api/proof.js:85:23)
    at Generator.throw (<anonymous>)
    at rejected (/vagrant/node_modules/node-vcx-wrapper/dist/api/proof.js:5:65)
    at <anonymous> inheritedStackTraces: [], vcxCode: 1007 }

```