## Transaction Author Agreement 

In order to be allowed access to write a Credential to the Sovrin Ledger, any Enterprise wishing to create, define, or issue Credentials must first read and sign the Transaction Author Agreement and validate their agreement in some form or fashion. Rights to push data to the Ledger will only be granted when Sovrin can confirm this.

When a Transaction Author Agreement (TAA) is enforced on a Sovrin ledger such as StagingNet or MainNet, your libvcx configuration must be changed to accommodate it. Without that update a failure will occur when attempting to write any transaction, such as a schema or a credential definition, to the ledger. Fortunately, in most cases, changing the configuration to accommodate this is easy!

There are various ways that your organization can show that it agrees to the terms of a TAA. These are the acceptance means available, as currently written:

1. at_submission - The agreement was reviewed by the user and accepted at the time of submission of this transaction. 
2. click_agreement - The agreement was displayed and then agreed to by typing or clicking acceptance.
3. for_session - The agreement was reviewed by the user and accepted at some point in the user’s session prior to submission.
4. on_file - An authorized person accepted the agreement, and such acceptance is on file with the user’s organization.
5. product_eula - The agreement was included in the software product’s terms and conditions as part of a license to the end user.
6. service_agreement - The agreement was included in the terms and conditions the user accepted as part of contracting a service.
7. wallet_agreement - The agreement was reviewed by the user and this affirmation was persisted in the user’s wallet for use during submission.

For most of you, the acceptance means that you will want to use is "on_file", meaning that:

1. Your management and/or legal team have read the TAA.
2. Your organization accepts it.
3. You have a record of your acceptance in your files.
4. This is the acceptance means that will be described here.

## Transaction Author Agreement Steps

Please do the following steps to signify that you have accepted the TAA.

1. Read and review it. You can get it directly from the ledger using the indy-cli, with this command:
	indy> pool show-taa
2. Put a signed and dated copy of it in a safe place, or record your acceptance in another appropriate manner.
3. Complete the following steps on your agent
4. If needed, upgrade your agent libvcx and libindy packages to a version that supports the TAA. This would be libvcx=0.4.59278406 and libindy=1.12.0 or newer. 
Insert the following string into your vcx config JSON file (on a single line):
"author_agreement": "{\"taaDigest\": \"8cee5d7a573e4893b08ff53a0761a22a1607df3b3fcd7e75b98696c92879641f\",\"acceptanceMechanismType\":\"on_file\",\"timeOfAcceptance\": 1580939969}"
5. Restart your agent

This string contains the TAA digest, which is simply a sha256 hash of the version number and the text of the TAA, concatenated together. It also indicates that you accept the TAA, and have your acceptance on file. Finally, it has an epoch time representation of the time (date) that you accepted it. Replace 1580939969 with the actual date of your acceptance. There are a number of online converters, such as [https://www.epochconverter.com/](https://www.epochconverter.com/) for determining the current epoch time.