# Connect.Me Release Notes

Below are the release notes for the builds of the Connect.Me app.

* [779](#779)
* [768](#768)
* [682](#682)
* [556](#556)
* [414](#414)


## 779

### New Stuff

| Items | Additional Information |
| --- | --- |
| App now points to the Sovrin MainNet (live network) by default. Updating to this version **will not** change your current network configuration. |   |
| Upon fresh install, if you want to continue using the Sovrin TestNet, you’ll see a switch to flip on the “Choose how to unlock this app” view. |   |
| The app now uses Libnullpay. |   |
|   |   |  |

### Known Issues

| Items | Additional Information |
| --- | --- |
|Can’t set your avatar photo in settings.   |   |   
| Connect.Me turns white when trying to view a cred offer quickly after fulfilling a proof. | [CM-2146](https://evernym.atlassian.net/browse/CM-2146) |
| Backup fails to create recovery phrase when offline or servers are down. | [CM-2090](https://evernym.atlassian.net/browse/CM-2090) |
| Connect.Me fails to connect and appears to hang on &#39;Connecting&#39; status screen when servers are down. | [CM-2062](https://evernym.atlassian.net/browse/CM-2062) |
| Credentials restored from a backup do not contain the enterprise icon. | [CM-2082](https://evernym.atlassian.net/browse/CM-2082) |
| Entering passcode to form a connection loops infinitely. | [CM-2098](https://evernym.atlassian.net/browse/CM-2098) |
| Instructions to create a new passcode need some grammatical modifications. | [CM-2050](https://evernym.atlassian.net/browse/CM-2050) |
| [REGRESSION] Unable to set an avatar from Connect.Me #730 onwards. | [CM-2080](https://evernym.atlassian.net/browse/CM-2080) |
| The URL invite does not open Connect.Me to create a connection. | [CM-2139](https://evernym.atlassian.net/browse/CM-2139) |
| Connect.Me shouldn''t show backup success if I cancel out of the backup/recovery flow. | [CM-2106](https://evernym.atlassian.net/browse/CM-2106) |
| Upgrade Failed: Lost everything in my wallet on CME when it was replaced with a different wallet from a previous install after upgrading versions. | [CM-2084](https://evernym.atlassian.net/browse/CM-2084) |
| Connect.Me times out while accepting new credential offer with 100 attributes. | [CM-2092](https://evernym.atlassian.net/browse/CM-2092) |
| Android: App crash observed on selecting the maximum font size available. | [CM-1394](https://evernym.atlassian.net/browse/CM-1394) |
| [Moto G5] Connection invite not observed on installing the app via SMS at times. | [CM-2045](https://evernym.atlassian.net/browse/CM-2045) |
| Scanning a QR code is unacceptably slow on older Android phone. | [CM-2003](https://evernym.atlassian.net/browse/CM-2003) |
| Color picker sometimes works on Android but not on iOS for the same image. | [CM-1984](https://evernym.atlassian.net/browse/CM-1984) |
|   |   |   |


## 768

### New Stuff

| Items | Additional Information |
| --- | --- |
| Token screens are hidden. |   |
|   |   |  |

### Known Issues

| Items | Additional Information |
| --- | --- |
| Connect.Me turns white when trying to view a cred offer quickly after fulfilling a proof. | [CM-2146](https://evernym.atlassian.net/browse/CM-2146) |
| Backup fails to create recovery phrase when offline or servers are down. | [CM-2090](https://evernym.atlassian.net/browse/CM-2090) |
| Connect.Me fails to connect and appears to hang on &#39;Connecting&#39; status screen when servers are down. | [CM-2062](https://evernym.atlassian.net/browse/CM-2062) |
| Credentials restored from a backup do not contain the enterprise icon. | [CM-2082](https://evernym.atlassian.net/browse/CM-2082) |
| Entering passcode to form a connection loops infinitely. | [CM-2098](https://evernym.atlassian.net/browse/CM-2098) |
| Instructions to create a new passcode need some grammatical modifications. | [CM-2050](https://evernym.atlassian.net/browse/CM-2050) |
| [REGRESSION] Unable to set an avatar from Connect.Me #730 onwards. | [CM-2080](https://evernym.atlassian.net/browse/CM-2080) |
| The URL invite does not open Connect.Me to create a connection. | [CM-2139](https://evernym.atlassian.net/browse/CM-2139) |
| Connect.Me shouldn''t show backup success if I cancel out of the backup/recovery flow. | [CM-2106](https://evernym.atlassian.net/browse/CM-2106) |
| Upgrade Failed: Lost everything in my wallet on CME when it was replaced with a different wallet from a previous install after upgrading versions. | [CM-2084](https://evernym.atlassian.net/browse/CM-2084) |
| Connect.Me times out while accepting new credential offer with 100 attributes. | [CM-2092](https://evernym.atlassian.net/browse/CM-2092) |
| Android: App crash observed on selecting the maximum font size available. | [CM-1394](https://evernym.atlassian.net/browse/CM-1394) |
| [Moto G5] Connection invite not observed on installing the app via SMS at times. | [CM-2045](https://evernym.atlassian.net/browse/CM-2045) |
| Scanning a QR code is unacceptably slow on older Android phone. | [CM-2003](https://evernym.atlassian.net/browse/CM-2003) |
| Color picker sometimes works on Android but not on iOS for the same image. | [CM-1984](https://evernym.atlassian.net/browse/CM-1984) |
|   |   |   |

### Fixed Stuff

| Items | Additional Information |
| --- | --- |
| The 747 build was breaking biometrics. | [CM-2107](https://evernym.atlassian.net/browse/CM-2107) |
| App is stuck while accepting connection in case of high load. | [CM-2026](https://evernym.atlassian.net/browse/CM-2026) |
| App should show me when it&#39;s having connectivity issues. | [CM-1588](https://evernym.atlassian.net/browse/CM-1588) |
| Connect.Me gets stuck when self attested attribute is sent in a proof. | [CM-1775](https://evernym.atlassian.net/browse/CM-1775) |
| The QR code scan cross button is not responsive. | [CM-687](https://evernym.atlassian.net/browse/CM-687) |
| Unable to accept or deny a connection request sent via QR code. | [CM-592](https://evernym.atlassian.net/browse/CM-592) |
| The screen freezes after entering the pin code. | [CM-683](https://evernym.atlassian.net/browse/CM-683) |
| Clicking on push notifications does not redirect to the app when the phone is locked. | [CM-658](https://evernym.atlassian.net/browse/CM-658) |
| The Claim offer UI does not display when app is killed and reopened. | [CM-760](https://evernym.atlassian.net/browse/CM-760) |
| The QR scan fails on build 747 on iOS. | [CM-2126](https://evernym.atlassian.net/browse/CM-2126) |
| The Connect.Me logo is fuzzy. | [CM-1821](https://evernym.atlassian.net/browse/CM-1821) |
|   |   |   |


## 682

### Known Issues

| Items | Additional Information |
| --- | --- |
| Android SMS connection invitations don&#39;t open the app. | You need to open it manually. |
| App will sometimes freeze after tapping back arrow on Invitation Expired view. |   |
| Sometimes, app dashboard is shown twice if app is kept idle for 30 or so minutes. |   |
| App crashes if maximum phone font size is selected (in the OS settings of the phone). |   |
| Proof &amp; Cred attributes are not being sent in the same order they are received. The Verifier/Issuer doesn&#39;t yet have a way to specify the ordering. |   |
| Agency Internal server error if cred offer json is malformed. |   |
| Keyboard doesn't pop sometimes. This is very difficult to reproduce. |   |
| If biometrics fail repeatedly after fresh install the option becomes unusable. |   |
| Text formatting on lower end devices is sometimes lost. |   |
| Various UI clunkiness issues that will be addressed in the 1.0 UI redesign. |   |
| Using the feedback button on Android sometimes crashes. |   |
|   |   |

### Updates and Fixes

| Items | Additional Information |
| --- | --- |
| You can now find and deal with missed offers &amp; requests from your connections. |   |
| Connect.Me now runs on an open source LibVCX core, subsumed by LibIndy. |   |
| You now can receive, hold and spend Sovrin tokens. |   |
| You can now export your wallet and back up the file wherever you want. |   |
| After a fresh install, you can import a wallet backup and restore all your things. |   |
| Added logic to remind users to backup their wallets often. |   |
| You can now buy digital credentials with tokens, by responding to a paid credential offer. |   |
| Improved overall time to accept a connection request. |   |
| Revised pop over messages for credential acceptance and proof fulfillment. |   |
| Added a cute Sovrin loader when sending tokens. |   |
| Created automated tests that would install, form connections, accept credentials, present proofs, backup wallet, uninstall, reinstall, restore wallet, and repeat all functionality. These tests run after every build for iOS and Android. |   |
| Added automated Agency tests to test overall system load limits. |   |
| Added support for Armv7 and x86\_64 in LibIndy. |   |
| Post-install app size reduced from 1.1GB to roughly 100MB on iOS. |   |
| Fixed a bug where in various scenarios the app would crash. |   |
| Fixed a bug where your passcode would not be remembered after a restore. |   |
| Fixed a bug where tapping connection bubbles didn&#39;t work sometimes. |   |
| Fixed a bug where after paying for and receiving a credential it wasn&#39;t being stored. |   |
| Fixed a bug where the app automatically switched environments. |   |
| Fixed a bug where under certain scenarios credential offers could not be accepted. |   |
| Fixed a bug where invalid screen transitions were occurring. |   |
| Fixed a bug where token amount was cut off by the keyboard on smaller devices. |   |
| Fixed a bug where the 0 on the token number pad was hidden behind the footer button. |   |
| Fixed a bug where the feedback button broke. |   |
| Fixed a bug where app freezes if you receive a cred offer/proof req while changing your pass code. |   |
| Fixed a bug where an error when generating a proof is seen if a proof request contains two attribute names that are the same. |   |
| Fixed a bug where iPhone 5c does not receive credentials. |   |
| Fixed a bug where the iOS app icon badge count didn&#39;t go away after you&#39;ve read all the missed messages. |   |
| Fixed a bug where a restore from iOS to Android was causing problems. |   |
| Fixed a bug where the Agency couldn&#39;t handle high load for a certain request. |   |
| Fixed a bug where certain images were pixelated. |   |
| Improved wallet load time for lower end devices. |   |
| Added error handling for LibIndy and LibVCX unknown errors. |   |
| Fixed a bug where Android logger was not using environment variables. |   |
| Fixed a bug where scrolling was disabled on connection details view in Android. |   |
| Fixed a bug where push notification messages timed out and did not show. |   |
| Fixed a bug where push notifications would not open on Android 6.0. |   |
| Fixed a bug where Android 8.0 would crash randomly. |   |
| Fixed a bug where connection bubbles displayed weird on smaller devices. |   |
| Fixed a bug where app would crash when trying to backup from settings. |   |
| Fixed a bug where long tapping the connection bubble didn&#39;t show pairwise info. |   |
| Fixed a bug where the Agency DB threw a high thread count error. |   |
| Fixed a bug where the backup banner was not vertically aligned between views. |   |
| Fixed a bug where DB was not failing gracefully for certain scenario. |   |
| Fixed a bug where the backup reminder would disappear after killing/relaunching the app. |   |
| Fixed a bug where the QR scanner sometimes wouldn&#39;t display the camera view. |   |
| Fixed a bug where QR view would crash the app. |   |
| Fixed a bug where a back arrow in the backup flow would exit the flow. |   |
| Fixed a bug where push notifications wouldn&#39;t register properly. |   |
| Fixed a bug when biometrics repeatedly fail, app would overlay screens on top of the prompt. |   |
| Fixed a bug where a blank screen would show after disabling biometrics. |   |
| Fixed a bug where a long delay occurred between accepting and receiving a credential. |   |
| Fixed a bug where the wallet would not fulfill a proof request because of a case mismatch. |   |
| Refactored logic for displaying RECEIVED for an accepted credential. |   |
| Fixed a bug where you could not form new connections after an update or reinstall. |   |
| Fixed a bug where your recovery phrase generation was timing out on older devices. |   |
|   |   |   |


## 556

### Known Issues

| Items | Additional Information |
| --- | --- |
| App crashes under certain scenarios. |   |
| Push Notifications only work while the app is in focus. | Fails to launch if opened from lock or home screens. |
|   |   |  |

### Updates and Fixes

| Items | Additional Information |
| --- | --- |
| Added EULA and Privacy Policy. |   |
| Improved the color picker. It was struggling with certain logos. |   |
| Added Android APKs to our automated build pipeline. |   |
| Added end-to-end automated tests between app and VCX UI. |   |
| You can now long-press on a connection bubble and see the pairwise info between you. |   |
| Shortened the delay seen after pressing &#39;send&#39; on the proof request view. |   |
| Enabled Android back button in various places. |   |
| Added cred offer api support for LibVCX. |   |
| Added connection req api support for LibVCX. |   |
| Added a view for buying a credential with tokens (UI only). |   |
| Added an &#39;About&#39; view in settings. |   |
| Wrote various sagas for token related functions. |   |
| Added a wallet export button. | Currently encrypts with a random key and saves as exported .zip file, and asks you to copy the decryption key. This flow will be refined soon. |
| Added a token view, where you can see your token balance and send tokens to other token payment addresses (UI only). |   |
| You can now view your token payment address and copy it to the clipboard. |   |
| Locked (prevented) landscape mode in Android. |   |
| Added SMS invitation support for Android. |   |
| Added passcode and face/touch biometric support for Android. |   |
| Added all setting options for Android. |   |
| Added color picker for Android. |   |
| Added dev mode for Android. |   |
| Added LibIndy via LibVCX for Android. |   |
| Added basic monitoring tools to the C.A.S. |   |
|  Adjusted header height and layout on connection details view and subviews. |   |
| Added iPhone X safe area support. |   |
| Fixed a bug where an attribute isn&#39;t auto-filled in a proof request when it is in the wallet. |   |
| Fixed &quot;error generating proof&quot; message when multiple attributes exist for the same attribute name in the wallet. |   |
| Improved touch target responsiveness of &quot;+&quot; icon. |   |
| Fixed a bug where connection invitations weren&#39;t showing up from an SMS invite link. |   |
| Fixed a bug where app would crash after scanning QR and failing touch ID. |   |
| Fixed a bug where the wrong issuer logos and attribute data is shown in the history of a connection, if you had swiped when fulfilling a proof request from a connection. |   |
| Fixed a bug where app would freeze if left open and idle for a time. |   |
| Changed the default accent color from green to grey. |   |
| Fixed a bug where you could tap multiple times on the close button and get a weird response. |   |
| Tightened various areas of the app where you could press buttons rapidly and cause it to hang. |   |
| Fixed a bug where the back button wasn&#39;t behaving correctly in certain scenarios. |   |
| Tightened/refined various messages the app displays on pop overs. |   |
| Refined the iOS header to match iOS design guidelines. |   |
| Fixed a bug where app was asking for Touch/Face ID when it shouldn&#39;t. |   |
| Fixed a bug where the token screen could be closed by tapping in a specific spot. |   |
| Fixed the status bar for Android. |   |
| Added descriptive log messages for most errors on the Consumer Agency Service. |   |
| Fixed an issue where the keyboard was not popping on &#39;create a passcode&#39; view. |   |
| Fixed a bug where the background accent color of connection A was showing for connection B when the color picker failed to pick a color for connection B. |   |
| Fixed a bug where the arrows were pointing the wrong way on the proof request sent success pop over. |   |
|   |   |    |


## 414

### Updates and Fixes

| Items | Additional Information |
| --- | --- |
| Feedback button added. |   |
| You can now set your profile photo from the camera role. | You cannot crop and scale it yet though. |
| The color picker was enhanced. | It should no longer lag when navigating between connections. |
| Logo images were resized to manageable sizes and then cached for future display. |   |
| Fixed a bug where pressing some buttons rapidly triggered a screen to display twice and overlap. |   |
| Fixed a bug where the app would crash when left in focus and idle. |   |
| Adjusted the safe area on iPhone 10. |   |
| The connection history (and subhistory) view cards expanded from two lines to three lines high. | This looks better for displaying long credential names. |
| Fixed a bug where the app was filling a white background for transparent connection logos. |   |
| Fixed a bug where what I actually share with a connection is not displayed in the connection history card. |   |
|   |   |  |
