## How are Connections encrypted?

When a Connection Invitation is extended to one Identity Owner to another, there is an encryption that occurs and is *unique to that channel*, just like a secret code that is only shared between 2 entities. This is asymmetric key encryption, in which each Identity owner has a public and private key, which are used to encode and decode the data that passes through that pairwise Connection. 

### Cryptographic Primitives in Sovrin: 

1. One way hash function : SHA256

2. Authentication : Poly1305 MAC

3. Symmetric key cryptography : XSalsa20

4. Public key cryptography : Curve25519

5. Digital signatures : Ed25519
