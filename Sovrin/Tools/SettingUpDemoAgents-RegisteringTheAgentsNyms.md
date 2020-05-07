## Registering the Agent’s NYMs

### Steps

**1. Start the Indy CLI.**
```
$ indy
```

**2. Connect to the test pool.**
```
$ connect sandbox
```

**3. Connect to the pool as a Steward to set the signer to be a Steward.** The 32 character string will be the seed with your steward name listed as the last part of it. What you see below is what is used if you used a default installation.
```
$ indy@sandbox> new key with seed 000000000000000000000000Steward1
OR 
use DID Th7MpTaRZVRYnPiabds81Y
```

**4. Pick three separate port numbers to use for each of these machines.**


#### <u>FABER</u>

**5. Register the Faber agent’s DID (NYM) and endpoint.**  The agent’s endpoint is the IP address of the machine that the agent will run from. This IP address will be used as an attribute against the NYM. An example endpoint for Agent 01 would be the IP address of (10.0.0.202). When you run these commands, you will substitute the IP address of the machine or terminal you’re  using for Faber in place of ours. This adds Faber as a Trust Anchor with its verkey.

Enter the following, exactly as you see it here:
```
$ send NYM dest=ULtgFQJe6bjiFbs7ke3NJD role=TRUST_ANCHOR verkey=~5kh3FB4H3NKq7tUDqeqHc1
```

**6. Set the signer to be the Faber Trust Anchor in order to be able to set the endpoint attribute.**
```
new key with seed Faber000000000000000000000000000ORuse DID ULtgFQJe6bjiFbs7ke3NJD
```
Next:

Run this exactly as seen but substitute your IP address and port numbers for the one you’re using for Faber. The numbers below are highlighted only to draw your attention to the fact you need to substitute these for yours.
```
$ send ATTRIB dest=ULtgFQJe6bjiFbs7ke3NJD raw={"endpoint": {"ha": "10.0.0.202:5555", "pubkey": "5hmMA64DDQz5NzGJNVtRzNwpkZxktNQds21q3Wxxa62z"}}
```

#### <u>ACME</u>

**7. Register the Acme agent’s DID (NYM) and also register the agent’s endpoint as we did for Faber’s agent above.**  An example endpoint for Agent 01 would be the IP address of (10.0.0.203). When you run these commands, you will substitute the IP address of the machine or terminal you’re  using for Acme in place of ours.

Enter the following, exactly as you see it here:
```
$ send NYM dest=CzkavE58zgX7rUMrzSinLr role=TRUST_ANCHOR verkey=~WjXEvZ9xj4Tz9sLtzf7HVP
```

**8. Set the signer to be the Acme Trust Anchor in order to be able to set the endpoint attribute.**
```
new key with seed Acme0000000000000000000000000000
Or
use DID CzkavE58zgX7rUMrzSinLr
```

**9. Run this exactly as seen but substitute your IP address and port numbers for the one you’re using for Acme.** The numbers below are highlighted only to draw your attention to the fact you need to substitute these for yours.
```
$ send ATTRIB dest=CzkavE58zgX7rUMrzSinLr raw={"endpoint": {"ha": "10.0.0.203:6666", "pubkey" "C5eqjU7NMVMGGfGfx2ubvX5H9X346bQt5qeziVAo3naQ"}}
```

#### <u>THRIFTBANK</u>

**10. Register the ThriftBank agents DID (NYM) and endpoint as you did for the others.**  An example endpoint for Agent 01 would be the IP address of (10.0.0.204). When you run these commands, you will substitute the IP address of the machine or terminal you’re  using for ThriftBank in place of ours.

Enter the following, exactly as you see it here:
```
$ send NYM send NYM dest=H2aKRiDeq8aLZSydQMDbtf role=TRUST_ANCHOR verkey=~3sphzTb2itL2mwSeJ1Ji28
```

**11. Set the signer to be the ThriftBank Trust Anchor in order to be able to set the endpoint attribute.**
```
new key with seed Thrift00000000000000000000000000
OR
use DID H2aKRiDeq8aLZSydQMDbtf
```

**12. Run this exactly as seen but substitute your IP address and port numbers for the one you’re using for ThriftBank.** The numbers below are highlighted only to draw your attention to the fact you need to substitute these for yours.
```
$ send ATTRIB dest=H2aKRiDeq8aLZSydQMDbtf raw={"endpoint": {"ha": "10.0.0.204:7777", "pubkey": "AGBjYvyM3SFnoiDGAEzkSLHvqyzVkXeMZfKDvdpEsC2x"}
```

**13. Exit the Indy client.**
```
$ exit
```
