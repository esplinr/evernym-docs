To issue credentials to end users, use the **CREDENTIALS** tab, which is the icon underneath the **CONNECTIONS** icon. 

### Steps

**1. Navigate to the CREDENTIALS tab.**

The *CREDENTIALS* list shows no entries until a credential offer is sent and accepted by the end user in the Connect.Me app.

![Credentials Tab](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/VCX/CredentialsTab.png)

**2. Click the *Issue a Digital CREDENTIAL* tab.**

The *Issue a Digital Credential* dialog is displayed.

**3. Choose a credential offer type from the drop-down menu on the left.**

If you've added credential schemas previously, then these credential types will be listed in this drop-down.

Alternatively, if you would like to create a new credential-definition schema, you can click **Create New Credential** in the **MY CREDENTIAL DEFINITIONS** tab on the left.

> **Note:** You are creating a credential schema when you choose which attributes to offer as part of your new credential-offer type, which will eventually be sent to the end user. The _credential definition_ contains the cryptographic keys that actually allow you send the credential and gives you the ability to prove that it is a verified credential.

![Send Credential Offer](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/VCX/SendCredOffer.png)

The information from the credential-offer type will populate the fields of information available to be filled. Underneath the credential type you'll see a **SCHEMA ID...**. This is the schema ID for this particular credential type. It is listed here so that you can use it again, reference it in the future, or use it a as a template when creating your own schemas. The bottom field contains **PRICE** in Sovrin Tokens. When the credential schema is created, you can choose to place an amount for the credential at that time. You can also set it here to a 
different number. This number represents how much the credential will cost (how much the customer must pay you to have the credential issued.)

**4. Choose a connection name from the drop-down on the right.**

Fill in the necessary information in each field. Alternately, you may fill in the information in each field first and then choose the name from the drop-down on the right. Either order is fine.

Example with all of the information filled in:

![Send Credential Offer](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/VCX/SendCredOffer1.png)

Notice that you won't be able to send the credential offer until all of the required fields are filled in:

![Send Credential Offer Validation](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/VCX/SendCredOfferValidation.png)

**5. Click *Send Credential Offer*.**

A successful confirmation dialog is displayed.

![Successful Credentail Offer](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/VCX/CredOfferSuccess.png)

The credential offer you just sent will then appear in the **CREDENTIALS** tab.

> **NOTE:** At this time, if your offer is missed on the customer's end, it's gone forever. The sender must resend it. The ability to revoke a credential is not yet built into the system but will be in the future.

![Credential Offer State Tab](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/VCX/CredentialOfferStateInTab.png)

**6. Once the credential has been accepted by the customer, you'll see the *State* column change from *Offered* to *Sent*.**

This completes the transaction.

![Credential Offer State Sent](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/VCX/CredentialOfferStateSent.png)
