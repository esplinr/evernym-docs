This document details common problems and solutions that have arisen in use of the LibVCX stack. It assumes that LibVCX is being used with its Node.js wrapper to integrate to an interactive web application representing the enterprise, and that the end-user is using Evernym's Connect.Me mobile device app.

### Definitions

**1. Genesis File**

A JSON-formatted list of validator nodes on a Hyperledger Indy distibuted ledger network.

**2. Consumer or Enterprise Agency Server**

A server that contains agents for connected LibVCX instances. These servers facilitate routing of LibVCX messages and objects between users and enterprises.

### Connect.Me Developer Mode Switch

Each instance of the installed Connect.Me app contains an internal configuration with a genesis file and a URL for a Consumer Agency Server (CAS). By default, Connect.Me is configured to connect to the MainNet ledger and CAS. This means it can only communicate with other devices on the MainNet. All development, test and most demonstration should occur on the StagingNet. In order to use the StagingNet, it is necessary to switch Connect.Me into "Developer Mode". The switch is available at install-time only on the screen upon which the user selects whether to use biometrics or a pass code. Once the selection is made it cannot be changed without uninstalling and reinstalling the app. An incorrect selection here will prevent Connect.Me from communicating with other devices on the desired network.

### Web App Config

As with Connect.me, the web application config includes a genesis file and an Enterprise Agency Server URL. The StagingNet genesis file is publicly available here:

[https://raw.githubusercontent.com/sovrin-foundation/sovrin/master/sovrin/pool\_transactions\_sandbox\_genesis](https://raw.githubusercontent.com/sovrin-foundation/sovrin/master/sovrin/pool_transactions_sandbox_genesis)

The default EAS URL for development, test and most demonstration is https://eas01.pps.evernym.com. The genesis file is used the first time LibVCX is initialized to connect to the distributed ledger network. Once the connection is made, LibVCX automatically requests the latest pool information from the validators and stores it in the wallet (normally `~/.indy_client`) in a subdirectory called "pool". If the genesis file needs to updated, it is necessary to stop any services or programs running LibVCX, delete the "pool" directory from the wallet, update the genesis file and lastly restart the applicable services or programs.

### Networking

A common issue encountered is that firewalls in an organization's network may block necessary traffic. All indy-based edge agents, including your LibVCX scripts and Connect.Me, need to communicate with a Sovrin or other indy-based ledger using the ZeroMQ protocol. Many organizations block this protocol by default, since it is not as commonly used as other protocols such as https. If you get errors either while attempting to initialize LibVCX or while attempting to do an operation the requires access to the ledger, you should confirm that your edge device is connected to a network that allows ZeroMQ traffic to the validator nodes.

### Depending on the Web App Implementation

* Evernym demo sites may not work correctly with Internet Explorer.
* Evernym demo sites may not work correctly if cookies are disabled in the browser.
* Demo tools that store state in the session cookie will not work reliably if the the browser is not restarted before the demo is run. session.destroy
  could be implemented as a workaround in the future.
* Demo tools may not be tolerant of upstream faults. This can cause glitches such as the connection QR code appearing as a broken image icon. It this occurs it is recommended to restart the browser and try the demo again.
