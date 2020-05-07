## Verity UI 0.1.413

### Released Features

#### libvcx

| Items | Additional Information |
| --- | --- |
| libVCX compatible with `libindy` 1.6.6. | |
| libVCX compatible with `libsovtoken` 0.9.3+5.4. |  |
| Java Android wrapper support. | |
| Objective C wrapper support.  | |
| **libVCX API for:** <ul><li>querying agency for credential offers and proof requests</li><li>retrieve messages from a specified connections</li><li>retrieving ledger write fees</li><li>creating a payment address</li><li>transferring tokens to a specific payment address</li><li>getting balance on all payment addresses</li><li>retrieving transactions associated with paying for a credential, credential definition and schema adding, updating and deleting records and tags in a wallet opening and closing search wallet contents export and import contents of a wallet</li></ul>  | |
|   |   |    |

#### Verity UI (0.1.413)

| Items | Additional Information |
| --- | --- |
| **BE AWARE! 0.1.413 is not backwards compatible with .1.284-4!** | You have to remove `/var/log/verity-ui`, `/var/lib/verity-ui` and `/etc/verity-ui` before installing 0.1.413.|
| Changed logo and name in *Settings* screen. |  |
| Added new transaction log screen for displaying payment transaction history. | |
| Added new payment info screen for displaying payment addresses and balances. | |
| Added new token balance info on all payment addresses below the name & logo. | |
| Created new payment address in the *Payment info* screen.  | |
| Display ledger write fees in **Create schema** and **Create credential definition** dialogs. | |
| Added new field for entering default price for issuing a credential in Create credential definition dialog. | |
| Display schema id and credential definition id in disclosed proof popovers. | |
| Credentials automatically issued as soon as the credential offer is accepted by the Connect.Me user. | |
|   |   |    |

#### Configuration Changes

| Items | Additional Information |
| --- | --- |
| Added `/etc/verity-ui/verity-ui-config.ini` config file to tune Verity UI. | You have to restart the service after changing it.|
| Verity UI creates not only HTTP, but WS connections as well. |  |
| Verity UI no longer needs port 3001 to be open. It establishes HTTP and WebSocket connections over the same port 3000 (it can be adjusted via `verity-ui-config.ini`). | |
| Interface Verity UI listens to can be adjusted via `verity-ui-config.ini`. | |
| Added new token balance info on all payment addresses below the name & logo.  | |
| Verity UI polls for a new state of each entity every 5 seconds (`queue:delay` in `verity-ui-config.ini`).  | |
| Verity UI updates ledger fees every 10 minutes (`queue:delayLedgerFees` in `verity-ui-config.ini`). | |
| Verity UI updates balance every 1 minute (`queue:delayBalance` in `verity-ui-config.ini`). | |
| Verity UI removes transaction logs older than 30 days (`transactionLog:maxAge` in `verity-ui-config.ini`). | |
|   |   |    |

####  Known Defects

| Items | Ticket |
| --- | --- |
| Verity UI causes high CPU utilization which causes the Verity UI slow down after it spends the CPU credits on AWS. | [EN-805](https://evernym.atlassian.net/browse/EN-805)|
| Argument is out of bounds error when setting price for issuing a credential. | [EN-846](https://evernym.atlassian.net/browse/EN-846)]|
| Terminology miss match in dialog for Offering Credentials/Requesting Data. | [EN-828](https://evernym.atlassian.net/browse/EN-828)|
| Verity UI shows status of attributes as UNKNOWN if there is a case mismatch between data attributes in credential definition and proof requests. |[EN-817](https://evernym.atlassian.net/browse/EN-817)|
| Images as data types cannot be verified in proofs. | [EN-852](https://evernym.atlassian.net/browse/EN-582)|
| Filter for Payment screen is not working. | [EN-837](https://evernym.atlassian.net/browse/EN-837)|
| Filter for Transaction log screen is not working. | [EN-838](https://evernym.atlassian.net/browse/EN-838)|
| Filter works incorrectly on the Connections screen. | [EN-809](https://evernym.atlassian.net/browse/EN-809)|
|   |   |    |
