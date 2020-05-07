## Finding the Versions of Things

In an Ubuntu system, the dpkg command can be used to find the installed version of software packages. In the Sovrin world, packages of interest will typically have the string "indy" or "sov" in their names. While testing, it is common for us to use libnullpay, so we may want to find the "null" string as well. So we can combine dpkg with grep to find the versions of our sovrin packages:

```bash
$ dpkg -l | grep "sov\|indy\|null"
```
### Examples

#### A validator node

```bash
$ dpkg -l | grep "sov\|indy\|null"
hi  indy-anoncreds                   1.0.11                                     amd64        Anonymous credentials
hi  indy-node                        1.6.83                                     amd64        Indy node
hi  indy-plenum                      1.6.58                                     amd64        Plenum Byzantine Fault Tolerant Protocol
hi  libindy-crypto                   0.4.5                                      amd64        This is the shared crypto libirary for Hyperledger Indy components.
hi  python3-indy-crypto              0.4.5                                      amd64        This is the official wrapper for Hyperledger Indy Crypto library (https://www.hyperledger.org/projects).
hi  sovrin                           1.1.35                                     amd64        Sovrin node
hi  sovtoken                         0.9.9                                      amd64        Token Plugin For Indy Plenum
hi  sovtokenfees                     0.9.9                                      amd64        Token Fees Plugin For Indy Plenum
```

#### A CLI client

```bash
$ dpkg -l | grep "sov\|indy\|null"
ii  indy-cli                            1.8.1                                      amd64        This is the official command line interface for Indy SDK,
ii  libindy                             1.8.1                                      amd64        This is the official SDK for Hyperledger Indy, which provides a
```
#### An agent

```bash
vagrant@sandbox:~$ dpkg -l | grep "sov\|indy\|null"
ii  libindy                          1.8.1                                      amd64        This is the official SDK for Hyperledger Indy, which provides a
ii  libnullpay                       1.8.1                                      amd64        This is a simple plugin that can be used for development of applications that use Payments API of Indy SDK.
```
