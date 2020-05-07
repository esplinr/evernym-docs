## Making a Connection

Mutually Authenticated Connections are the 1st Pillar of Verifiable Credential Exchange (VCX). In order to transfer Credentials and Proof Requests, or any other data, between 2 parties in a mutually authenticated manner a cryptographically secured connection between them must exist. This Connection is established when one party offers a Connection Request to another. In our case, these offers are generated as a unique QR code with embedded information (or it can be sent as a link to SMS or as a deep web link in a mobile browser). We create the Connection in Verity-UI through the Connections tab.

### Step 1 : Create and Accept Connection Request

In order to establish a Connection with a Connect.me wallet app user, you must first send them a Connection Request through Verity-UI. You can accomplish this by clicking on the Connection Tab in Verity-UI and creating your new Connection, with a name. As you can see below, you can send the offer as a QR code for the Connect.me user to scan, or you can send it to their mobile device with an SMS text, which will send them a link to follow (which will open the Connect.me app). Both of these methods will end up in a Connection Request coming into the Connect.me app, with options for the Identity Holder to accept or ignore.

![add connection](https://static.pps.evernym.com/training/verityui-demo/add-connection.png){: width="300" style="border:1px solid black;"}

### Step 2 : Scan the QR code with Connect.me

If you choose to use the QR offer, open the Connect.me app and scan the QR code with it. If using SMS, wait for the text message to come through and click on the embedded link. This will open the Connect.me app with a Connection Offer from LittleCorp.

![CM 15](https://static.pps.evernym.com/training/verityui-demo/CM_015.png){: width="300" style="border:1px solid black;"}

### Step 3 : Accept the Connection Request from LittleCorp

Accept the Connection from LittleCorp in your Connect.me app. It will take a short second or two to update as an established Connection in the Verity-UI. 

![CM 18](https://static.pps.evernym.com/training/verityui-demo/CM_018.png){: width="300" style="border:1px solid black;"}

### Step 4 : The Connection will be added to the Verity UI database

Verity-UI will report the Connection as accepted when it is processed by the Agency Server.

![VUI 14](https://static.pps.evernym.com/training/verityui-demo/VUI_014.png){: height="500" style="border:1px solid black;"}
