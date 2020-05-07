**Q.  If I am distributing the application across multiple microservices and servers, each will have its own wallet when it runs VCX tasks. So what if I run these things on containers and occasionally reset my wallets, what information is in there for me to care about in the future?**

**A.** Here are some things stored in wallets. In all cases, everything can be restored from a backup, but can it be recreated otherwise?
1. Enterprise DIDs. Typically generated from seeds, and so can be recreated in a new wallet.
2. Pairwise DIDs. Generated ad hoc. Cannot be recreated.
3. Credential Definitions (which contain private keys for issuing credentials). Keys are generated ad hoc. Cannot be recreated.

Of course, new pairwise DIDs can be formed with any endpoint. And new Cred Defs can be written to the ledger. So one way to do the farm <!--Do the farm?--> would be to export wallets and import them in some sort of syncing scheme. Or you could write a unique credential definition out to the ledger for each server (using the tag feature). But it would be undesirable to have to do this every time a container is restarted. In many applications persistance of connections is not important, so the main issue is the credential definition.
