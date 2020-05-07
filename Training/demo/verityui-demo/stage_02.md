## Using Verity UI

In order to Offer, Exchange, and Validate Credentials, there must first be a Credential to Issue to an Identity Holder. In this section of the Tutorial, we will create a Credential Schema with appropriate data field and write that Schema to the Ledger on the Sovrin Staging Net. Once that Credential Schema has been written to the Ledger, we can use it to create a Credential Definition. Both of these must be written to the Ledger because the Credential Definition uses the Credential Schema to create the data fields, while the Credential Definition is tied to the Issuer of the Credential, and their respective DID, so that they can sign a Credential Offer with it. The Credential Schema can be used by anyone who knows the unique identifier (which makes re-use of Credential Schema and standardization very easy).

![VUI 01](https://static.pps.evernym.com/training/verityui-demo/VUI_01.png){: height="500" style="border:1px solid black;"}

### Step 1 : Open Credential Definition in Verity-UI

Click the "Create New Credential Definition" tab, and you will see a dialogue box pop up for Credential Definitions. Before we can create a Credential Definition, however, we must first create a Credential Schema (hereafter simply referred to as a "schema"). A Credential Schema contains fields for data, which will be populated with personal information for each Credential Holder.

Below is an image of the Credential Definition Creation Box.

![VUI 03](https://static.pps.evernym.com/training/verityui-demo/VUI_03.png){: height="500" style="border:1px solid black;"}

### Step 2 : Open New Schema Creation Box

Clicking on the lower left-hand button will open the New Schema Creation Box.  The schema simply contains the field names and the type of data that field will use. A schema is written to the Ledger, and is available for anyone to use in their Credential Definitions. This makes template Credentials easier to manage.

![VUI 05](https://static.pps.evernym.com/training/verityui-demo/VUI_05.png){: height="300" style="border:1px solid black;"}

### Step 3 : Create data fields for Schema

Use the Create New Schema box to define the names of the data field and the type of data (currently only strings are supported).

![VUI 010](https://static.pps.evernym.com/training/verityui-demo/VUI_010.png){: width="400" style="border:1px solid black;"}

### Step 4 : Write Schema to Ledger

Once you write the Schema to the Ledger, and it is succesful, the Sovrin Ledger will return a Ledger ID value for the Schema which will be automatically entered into the Credential Creation Box for you. 

*The Token is currently not implemented, so maintain all Token and Cost values at 0.*

![VUI 011](https://static.pps.evernym.com/training/verityui-demo/VUI_011.png){: height="400" style="border:1px solid black;"}

### Step 5 : Create Credential Definition

Now that the Schema has been written to the Ledger, the Credential Definition will also be written to the Ledger, using the Ledger Schema ID. The Schema is public and openly available, however the Credential Definition is tied to the Issuing DID and can only be Issued from the DID that wrote it to the Ledger. Once the Credential Definition has been written to the Ledger, you will be able to Issue it to any Identity Holder you make a Connection with. 

*The Token is currently not implemented, so maintain all Token and Cost values at 0.*

![VUI 012](https://static.pps.evernym.com/training/verityui-demo/VUI_012.png){: height="400" style="border:1px solid black;"}
