## Running the Demo

The following commands are a list of what you will enter in order to run through the demo. You’ll do this in the terminal you used for the indy client.

### Steps

**1. Start the indy client.**
```
$ indy
```

**2. Connect to the test environment.**
```
$ connect sandbox
```

**3. Switch to user Alice.**
```
$ prompt ALICE
```

**4. Evaluate the invitation from Faber College.**
```
$ show sample/faber-invitation.indy
$ load sample/faber-invitation.indy
$ show link Faber
```

**5. Accept the invitation from Faber College.**
```
$ accept invitation from Faber
$ show link Faber
```

**6. Test secure interaction with Faber.**
```
$ ping Faber
```

**7. Inspect the credential.**
```
$ show claim Transcript
$ request claim Transcript
$ show claim Transcript
```

**8. Apply for a job with Acme.**
```
$ show sample/acme-job-application.indy
$ load sample/acme-job-application.indy
$ show link Acme
$ accept invitation from Acme
$ show proof request Job-Application
$ set first_name to Alice
$ set last_name to Garcia
$ set phone_number to 123-45-6789
$ show proof request Job-Application
$ send proof Job-Application to Acme
$ show link Acme
```

**9. Apply for a loan from ThriftBank.**
```
$ show claim Job-Certificate
$ request claim Job-Certificate
$ show claim Job-Certificate
$ load sample/thrift-loan-application.indy
$ accept invitation from thrift
$ show proof request Loan-Application-Basic
$ send proof Loan-Application-Basic to Thrift Bank
$ show proof request Loan-Application-KYC
$ send proof Loan-Application-KYC to Thrift Bank
```

**10. Show the available credentials.**
```
$ request available claims from Faber
$ request available claims from Acme
$ request available claims from Thrift
```
