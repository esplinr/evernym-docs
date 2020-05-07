## Install and Configure Connect.Me

Connect.Me is the Evernym Mobile Wallet App for Credentials. Connect.Me can exchange verifiable credentials by receiving Connection Requests, Credential Offers, and Proof Requests. By using Connect.Me you can hold digital Credentials in your wallet and provide proofs of these Credentials to anyone who needs it. In order to create a Credential Exchange Demonstration for a consumer-based exchange, you will need Connect.Me install on either your Android or iOS mobile device. 

### Step 1 : Download and install Connect.Me

You can find Connect.Me at the Google Play Store and the iOS App Store (links below)

#### [Apple App Store](https://apps.apple.com/us/app/connect-me/id1260651672)

![CM 06](https://static.pps.evernym.com/training/verityui-demo/CM_06.png){: height="400" style="border:1px solid black;"}

#### [Google Play](https://play.google.com/store/apps/details?id=me.connect)

![village proof blueprint](https://static.pps.evernym.com/training/verityui-demo/appstore-google.png){: width="400" style="border:1px solid black;"}

###  Step 2 : Enable Staging Net

In order to use the Staging Net, which is a developer Ledger for testing purposes (as opposed to the Production Network), you must install Connect.Me and choose "Staging Net" in the setup and provisioning stage. This cannot be altered without re-installing the app completely. If you forget to enable Staging Net during the install process, you must delete the current app and re-install it. The Connections and Credential Offers will not be able to complete from your Verity-UI instances or your code if the app is not set to Staging Net. 

![CM 01](https://static.pps.evernym.com/training/verityui-demo/CM_01.png){: height="400" style="border:1px solid black;"}

###  Step 3 : Complete Data Backup Protection

The data backup and recovery is very similar to most cryptocurrency wallets, in that it allows for a backup and restore process based upon a wallet seed phrase. Once you choose to backup your wallet you will be given a pass phrase to record or save in a text file. Once you verufy this seed phrase the current state of your wallet will be saved and stored in a .zip file, which you can then send to an email address of your choice. You can make multiple backups of your wallet at any time you like (and the more Credentials you are holding in your wallet, the more important backing it up should be).

#### Step 3.1 : Get Recovery Phrase

This will give you a Recovery Phrase for restoring your wallet.

![CM 03](https://static.pps.evernym.com/training/verityui-demo/CM_03.png){: height="400" style="border:1px solid black;"}

#### Step 3.2 : Repeat Recovery Phrase

Since you are required to remember your Recovery Phrase, you will be asked to repeat it before you can backup your wallet.

![CM 04](https://static.pps.evernym.com/training/verityui-demo/CM_04.png){: height="400" style="border:1px solid black;"}

#### Step 3.3 : Export Wallet Backup

The backup will create an archive (.zip) file for export to an email address. In order to restore your wallet, you will need to put this in your icloud drive or Google Drive for cloud-based access. 

![CM 05](https://static.pps.evernym.com/training/verityui-demo/CM_05.png){: height="400" style="border:1px solid black;"}

#### Step 3.4 : Backup Complete!

![CM 07](https://static.pps.evernym.com/training/verityui-demo/CM_07.png){: height="400" style="border:1px solid black;"}

###  Step 4 : Restoring from a Backup

When you reinstall Connect.Me after deleting it, or install it on another device, you will be asked if you want to restore your wallet from a backup. In order to restore your wallet, or to seed your wallet on a new device and retain your Credentials, you should choose this option.

####  Step 4.1 : Install and Choose Restore

After installation, choose to Restore from Backup instead of "Start Fresh".

![CM 09](https://static.pps.evernym.com/training/verityui-demo/CM_09.png){: height="400" style="border:1px solid black;"}

#### Step 4.2 : Enter Recovery Phrase

You will be asked to enter your Recovery Phrase before you can restore from a backup.

![CM 10](https://static.pps.evernym.com/training/verityui-demo/CM_012.png){: height="400" style="border:1px solid black;"}

####  Step 4.3 : Load from device or cloud storage.

Here, the .zip file has been downloaded from an email to the iCloud Drive. I can browse to retrieve it from the Connect.Me interface.

![CM 12](https://static.pps.evernym.com/training/verityui-demo/CM_010.png){: height="400" style="border:1px solid black;"}

### Step 5 : Learn the Interface

Connect.Me has 3 menu panels; Connections, Scan, and Menu. **Connections** is where you organize your Connections, Credentials and Proofs (which are all stored in your Wallet). **Scan** allows you to scan a QR code to establish a Connection from a Connection Offer (this requires access to the phone camera). The **Menu** screen allows you to change your security settings and execute a backup at any time.

#### Panel 1 : Connections

The Main interface panel will list your Connections, and any Credentials or Proof Requests that have been offered and/or accepted by you. These are all kept as records in your wallet.

* Listing your Connections

  ![CM 16](https://static.pps.evernym.com/training/verityui-demo/CM_016.png){: height="400" style="border:1px solid black;"}

* Click on a Connection, and it will display all of the Credentials and Proof Requests you have exchanged

  ![CM 17](https://static.pps.evernym.com/training/verityui-demo/CM_017.png){: height="400" style="border:1px solid black;"}

#### Panel 2 : Scan QR

Swiping left or touching the QR button on the bottom opens the Scan Panel, with which you can scan a QR code containing an offer for a Connection. Connection Offers may also be mobile browser web links or SMS messages (both which will open the app for you to accept the Connection Request).

* Scan Panel

  ![CM 15](https://static.pps.evernym.com/training/verityui-demo/CM_015.png){: height="400" style="border:1px solid black;"}

#### Panel 3 : Settings

The Settings panel contains security options and backup access. One thing to note is that the OnFido Credential offer at the bottom will **only** work when you are *not* in Staging Net mode, and only complete itself in Production Mode. So if you have installed your Connect.Me for development and testing, you will not be able to receive an OnFido Credential without deleting and re-installing the app in Production Mode.

* Settings Panel

  ![CM 14](https://static.pps.evernym.com/training/verityui-demo/CM_014.png){: height="400" style="border:1px solid black;"}

<br>