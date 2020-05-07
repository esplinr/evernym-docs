Before you issue credentials, request proofs, or see the status of any of the individual credentials or proofs, you must first have valid, agreed-upon connections between yourself and the other party.

### Steps

**1. Launch the web UI.**

By default you should see the **CONNECTIONS** tab at the top on the left side. If you don't see any connections listed, actual or pending, you must add a connection.

![Connections Tab](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/VCX/ConnectionsTab.png)

**2. Click the *ADD CONNECTION* tab.**

The *Add Connection* dialog is displayed. You have the option of generating a QR code or sending a link via phone number.

![Add Connections Tab](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/VCX/AddConnectionTab.png)

![Add Connection Modal](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/VCX/AddConnectionModal.png)

* To generate a connection request via QR code, go to Step 3. 
* To generate a connection request via phone number, skip to Step 4.

**3. To generate a connection request via QR code, type the name of your end user and click *Generate QR Code*.**

![Add Connection - Add Name](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/VCX/AddConnectionAddName.png)

A QR code is generated.

![Add Connection - QR Code](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/VCX/AddConnectionQRCode.png)

To initiate the QR code request into the end user’s device within the Connect.Me app, the individual will need to be sitting with the person who generated the QR code to scan it with their Connect.Me app. <!--Does this mean the end user has to see the Verity UI screen in person?-->

Alternatively, the person who generated the QR code can take a screen shot of this QR code, send it to the end user, and have the user scan the code with the Connect.Me app.

**4. To generate a connection request via phone number, enter the phone number of the end user and click *Send Link*.**

At this time, the UI supports only 10-digit based U.S. phone numbers. Do not place a country code before the area code.

![Add Connection - Add Phone Number](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/VCX/AddConnectionAddPhoneNum.png)

Once the connection request is sent, you can see that it was sent successfully. If either the Institution agency or the individual has uploaded an image for their profile, the image is displayed in place of the default avatar placeholders.

![Successful Connection Request](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/VCX/ConnectionReqSuccessful.png)

**5. Click Continue to proceed.**

At this point, you'll be waiting on the end user to accept the connection request via the Connect.Me app. At this time, the newest connection requests you sent out will show at the top of the **CONNECTIONS** tab. The **State** column will show **Sent to...** rather than **Accepted by...**.

![Connection State Column](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/VCX/ConnectionsStateColumn.png)

You can click the name of the connection request you just sent to bring up a dialog that displaya the information, along with the option to **Resend SMS** or **QR Code**. 

![Connection Resend Dialog](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/VCX/ConnectionsResendDialog.png)

If you choose to resend the SMS code, you will receive a successful dialog showing you did. The QR Code option will simply display the QR code as before.

![Connection Resent](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/VCX/ConnectionResent.png)

After the end user has accepted the connection request via the Connect.Me app, the **State** column will displaty **Accepted by...** in the **CONNECTIONS** tab. This screen shot was taken with a different user; otherwise, the name would still be the same as before. Notice that the counters next to **CONNECTIONS** change  as connection requests are added. This same counter behavior is also true for credentials and proofs in their respective tabs.

![Connection State Accepted](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/VCX/ConnectionStateAccepted.png)

**6. Click the name again: this time you'll see that you can *Issue a Digital Credential* or *Request Proof*.**

You do not have to do either of these steps from this dialog. For the purposes of this example, we will use the icons on the left when it comes time do so. Close the dialog box when you're finished viewing it. <!--refactor this sentence-->

![Acction Accepted Options](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/VCX/ConnectionAcceptedOptions.png)
