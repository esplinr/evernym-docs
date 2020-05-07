# Completed Python CLI scripts

Now that we have achieved the primary functions of our CLI client, we can put it all together in a single script, which will allow us to manually perform VCX Credential Exchange with an Identity Holder using Connect.me.

## Examples of Use

1. Making a Connection

    ```bash
        node VCX-CLI.js makeConnection QR alice 9999999999
    ```

2. Defining Credentials

    ```bash
        node VCX-CLI.js createSchema employee
    ```

3. Issuing Credential Offer

    ```bash
        node VCX-CLI.js createCredentialDef employee
    ```

4. Validating Proof

    ```bash
        node VCX-CLI.js requestProof employee alice
    ```