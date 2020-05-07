## Decentralized Identifiers

A "DID", or "Decentralized Identifier", is the anchor of the Self-Sovereign Identity architecture. At the most basic level, a decentralized identifier (DID) is simply a new type of globally unique identifier—not that different from the URLs you see in the address bar of your browser. But at a deeper level, DIDs are the atomic building block of a new layer of decentralized digital identity and public key infrastructure (PKI) for the Internet. This decentralized public key infrastructure (DPKI) could eventually have as much impact on global cybersecurity and cyberprivacy as the development of the SSL/TLS protocol for encrypted Web traffic (currently the largest PKI in the world).

### History and Conception 

The original concept of an "Evernym" was an identity that would forever be a static method of identifying an individual (such as a "psuedonym" but in perpetuity). At some point Blockchain was discovered and the concept of indelible ledgers gave way to the idea that your personal DID would be placed on this permanent ledger, and available for permanent identification.

Privacy and security concerns quickly led to a re-thinking of the Decentralized Identifier and "where" exactly an individual's identity would exist. Eventually, the concept of a DID evolved into the concept of "Self-Sovereign Identity", in which an individual, enterprise, or thing would be responsible for and solely in the possession of it's own unique identity and set of "Connections" to other identities, through which information and data could be exchanged securely.

This system has become the modern standard of private communication between two parties, and is in use by all Sovrin-based technology today.

### Current Standards

In its current form, a Decentralized Identifier has been standardized by W3C as a data structure. The Verifiable Credentials Data Model 1.0 specification is now a full W3C Recommendation (their term for a top-level open standard). This means implementers and users of verifiable credentials can proceed with confidence that there is a full standard for interoperability. This standard covers the machine-readable format for a digital credentials that can be verified using cryptography.

### Formats supported by the VC 1.0 Specification

#### 1. JSON Web Token format:

* Works with OAuth infrastructure.

#### 2. Linked Data Signatures format:

* Works with Semantic Web infrastructure.

#### 3. Zero Knowledge Proof (ZKP) format:

* Strongest privacy protection.
* Supports full selective disclosure.
* Used by Hyperledger and the Sovrin Network.