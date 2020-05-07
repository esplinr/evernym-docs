### Introduction

As explained in [this document](https://sovrin.org/preparing-for-the-sovrin-transaction-author-agreement/), the Sovrin Transaction Author Agreement (TAA) is used to inform transaction authors about appropriate use of the Sovrin Ledgers and to allow them to commit to only using it appropriately. When a TAA is enforced on a Sovrin ledger such as StagingNet or MainNet, your libVCX configuration must accommodate it. Without correct configuration, a failure will occur when attempting to write any transaction, such as a schema or a credential definition, to the ledger. Fortunately, in most cases changing the configuration to accommodate this is easy!

There are various ways that your organization can show that it agrees to the terms of a TAA. These are the acceptance means available, as currently permitted:

<style>
  table{
    border-collapse: collapse;
    border-spacing: 0;
    border:2px solid #000000;
  }
  th{
    border:2px solid #000000;
  }
  td{
    border:1px solid #000000;
  }
</style>
<table>
 <tr>
  <th>Label</th>
  <th>Description</th>
 </tr>
 <tr>
  <td>at_submission</td>
  <td>The agreement was reviewed by the user and accepted at the time of submission of this transaction.</td>
 </tr>
 <tr>
  <td>click_agreement</td>
  <td>The agreement was displayed and then agreed to by typing or clicking acceptance.</td>
 </tr>
 <tr>
  <td>for_session</td>
  <td>The agreement was reviewed by the user and accepted at some point in the user’s session prior to submission.</td>
 </tr>
 <tr>
  <td>on_file</td>
  <td>An authorized person accepted the agreement, and such acceptance is on file with the user’s organization.</td>
 </tr>
 <tr>
  <td>product_eula</td>
  <td>The agreement was included in the software product’s terms and conditions as part of a license to the end user.</td>
 </tr>
 <tr>
  <td>service_agreement</td>
  <td>The agreement was included in the terms and conditions the user accepted as part of contracting a service.</td>
 </tr>
 <tr>
  <td>wallet_agreement</td>
  <td>The agreement was reviewed by the user and this affirmation was persisted in the user’s wallet for use during submission.</td>
 </tr>
</table>
<br />

For most of you, the acceptance means that you will want to use is `on_file`, meaning that:
- Your management and/or legal team have read the TAA.
- Your organization accepts it.
- You have a record of your acceptance in your files.

This is the acceptance means that will be described here. <!--This makes no sense-->

### Steps
Perform the following steps to signify that you have accepted the TAA.

1. [Read and review it](https://sovrin.org/wp-content/uploads/Transaction-Author-Agreement-V2.pdf). You can also get it directly from the ledger using the indy CLI:

    ```bash
    indy> pool show-taa
    ```
2. Put a signed and dated copy of it in a safe place, or record your acceptance in another appropriate manner.

3. Complete the following steps on your agent:

    * If needed, upgrade your agent `libvcx` and `libindy` packages to a version that supports the TAA. The minimum versions are `libvcx 0.4.59278406` and `libindy 1.12.0`
    .
    * Insert the following into your VCX config JSON file on a single line, making sure that your JSON syntax remains valid:

        ```json
      "author_agreement": "{\"taaDigest\": \"8cee5d7a573e4893b08ff53a0761a22a1607df3b3fcd7e75b98696c92879641f\",\"acceptanceMechanismType\":\"on_file\",\"timeOfAcceptance\": 1580939969}"
        ```

      `taaDigest` is a SHA256 hash of the version number and the text of the TAA, concatenated. <!--Is this the digest that they should use or should they get an updated version?-->

      `acceptanceMechanismType` indicates that you accept the TAA and have your acceptance on file. 

      `timeOfAcceptance` is the Epoch time when you accepted the TAA. Replace `1580939969` with the actual date and time of your acceptance. You can use an online converter such as https://www.epochconverter.com for determining the current Epoch time.

4. Restart your agent.