## The Wallet

The app contains a wallet where all of your verifiable credentials are stored. The wallet is set up by default, and there are no additional steps to take after setting up or restoring your app.

The credentials that contain the different pieces of your identity or accomplishments are not stored on the Sovrin ledger itself.

Your personal data and other pieces of data that make up these credentials, the claims you make with those credentials, and the proofs of your credentials are stored only within this wallet. Your Connect.Me agent passes these pieces of data directly to the party you're connected to, with no central, third-party listening in. The exchange is done safely and securely with your permission. The agents check the ledger on your behalf to verify that the signatures of the person, place, or thing providing you the information, or verifying the information you've been provided, is valid.

The wallet is provided by libindy, utilizing SQL Cipher, which is an extension of SQL Lite, providing an encrypted flat-file database. The wallet is protected using AES-256-CBC encryption with HMAC-256 as the integrity check. The wallet automatically provides public/private key management between you and your authorized connections.
