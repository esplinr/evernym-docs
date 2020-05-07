## Tokens

Within the Sovrin ecosystem you can send and receive tokens for obtaining verified credentials or for sending proofs to others you have connected to.

In the header of the app you see a token balance.

![alt text](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/ConnectMe/TokenBalance.png)

Tapping the balance brings up the token dashboard, which automatically starts generating a token payment address. This address is a *receive-only* address that Connect.Me generates locally on the phone. This address appears in the **Receive** tab.

### Receive Tab

![alt text](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/ConnectMe/ReceiveTab.png)

Because it's a receive-only address you can copy it to the device clipboard.

![alt text](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/ConnectMe/PaymentAddress.png)

You can freely share your token-payment address with anyone.

When people participate in the Sovrin token sale they will be asked to share their token payment address with Fractal (the token sale facilitator) as the “pay me my Sovrin tokens here” address. Then when the tokens are sent, they will just show up and your balance will update automatically the next time you enter this view from the dashboard. Notice the updated balance.

![alt text](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/ConnectMe/UpdatedBalance.png)

### Send Tab

To send tokens to a connection, click on the **Send** tab. First type an amount you want to send and then select the recipient.

> **NOTE:** Currently, the only way to get a valid recipient is by pasting (from the device clipboard) someone else’s token-payment address that they've given you.*

![alt text](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/ConnectMe/TypeTheAmount.png)

![alt text](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/ConnectMe/ChooseAddress.png)

Whenever you try to send tokens, the app checks the payment ledger to see if there is a transaction fee for sending tokens. It will always tell the user if there is a fee, even if it is zero:

![alt text](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/ConnectMe/CheckingFees.png)

When it's done transferring fees, you're returned to the token dashboard on the **Receive** tab.

![alt text](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/ConnectMe/TransferringTokens.png)

### Buying Verifiable Credentials

You can also buy Verifiable Credentials with tokens. To do this, you must receive a **Paid Credential Offer** from an issuer.

They will specify how many tokens they are charging for the credential they are offering.

Connect.Me displays a paid credential offer like this:

![alt text](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/ConnectMe/PaidCredential.png)

Tapping **Accept & Pay** checks what the token transaction fees are, and if there are zero fees, they transfer automatically:

![alt text](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/ConnectMe/CheckingForFees2.png)

If the token transaction fee is a non-zero value, Connect.Me will prompt you to confirm prior to completing the transaction.
