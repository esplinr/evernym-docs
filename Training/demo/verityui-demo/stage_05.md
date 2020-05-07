## Proof Requests

Proof Requests, also known as "Proofs", are the 3rd Pillar of Verifiable Credential Exchange. Proof Requests allow an Institution or individual to request verified data from an Identity Holder in various and configurable ways. The Credentials that you hold in your wallet can be requested by the Institution, in order for them to determine the validity of said Credential (as signed by the Issuer). BigCorp can now onboard employees from TinyCorp without having to create a new account for each employee, in the case where they need to grant them access to certain parts of their infrastructure or network.

###  Step 1 : Create Proof Template

Once you have issued yourself a TinyCorp Credential through Verity UI, you can access your second instance of Verity-UI, in this case which I have named "BigCorp". As specificed in Part 5 of this tutorial, you must also make a Connection with your Connect.me App for BigCorp, since it is a separate DID from TinyCorp. Once you have made the Connection, you can create a Proof Request, issue the Proof Offer to the Connection, requesting the verified information from the Credential. The Proof Request can be constructed to ask for the TinyCorp Credentials, as seen in the image below.

The Proof Request Template Tab.

![VUI 020](https://static.pps.evernym.com/training/verityui-demo/VUI_020.png){: height="500" style="border:1px solid black;"}

Building a Proof Request Template for the TinyCorp Employee Credential.

![VUI 021](https://static.pps.evernym.com/training/verityui-demo/VUI_021.png){: height="500" style="border:1px solid black;"}

Successful Data Request Creation

![VUI 022](https://static.pps.evernym.com/training/verityui-demo/VUI_022.png){: height="500" style="border:1px solid black;"}


###  Step 2 : Issuing Proof Request to Connection

Once the Proof Request Template has been created, it can be offered to the Connection. If the Connection accepts the request, the Proof Request will determine the "validity" of the Credentials requested, which will be determined by the Proof Request parameters. ALthough Libvcx and Libindy support complex Proof Requests, in which compound Proofs and Zero-Knowledge Proofs can be specified, Verity-UI currently only supports basic proofs, in which the fields specified in the Proof Request can be verified from the Issuing Party. Complex Proofs will be covered in later tutorials. 

Sending the Data Request

![VUI 023](https://static.pps.evernym.com/training/verityui-demo/VUI_023.png){: height="300" style="border:1px solid black;"}

The Data Request is offered through Connect.me. Accepting the offer will share the Data from the Credential with the Requesting party.
 
![CM 024](https://static.pps.evernym.com/training/verityui-demo/CM_024.png){: width="300" style="border:1px solid black;"}

The Data Request, including what was shared, can be seen any time in Connect.me.
 
![CM 021](https://static.pps.evernym.com/training/verityui-demo/CM_021.png){: width="300" style="border:1px solid black;"}

### Step 3 : Validating the Proof

Verity UI takes care of this step for you by determining whether the Proof is valid or not. When a Proof is sent to a Connect.Me user, the object sent back will have values for the requested attributes from the requested Issuer. Since Verity UI is a simple demonstration tool, the Proof Request template does not have the ability to request specific attributes from specific DID Issuers. The codebase, however, allows you to be very specific with the Proof Request template on multiple aspects of the credential attributes you are asking for. For this demonstration purpose, any attributes that do not exist in the user's wallet will be requested from the user as "self-attested" attributes, which will fill in the gaps. When a Proof is valid (containing the attributes requested), the Verity UI will indicate it with a "Validated" window and save the status in the local database. 

![VUI 024](https://static.pps.evernym.com/training/verityui-demo/VUI_024.png){: height="500" style="border:1px solid black;"}