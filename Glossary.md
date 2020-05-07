# Glossary

#### .md
An item found in Github repositories. Items with this extension means it is a "markdown" document. In the world of Git Hub this means it is a document.

#### A2A
Acronym for Agent-to-Agent. See Agent-to-Agent Protocol.

#### Accreditation
The service an Auditor performs of verifying that a Trust Community Member conforms to the requirements of a Governance Framework.

#### Accreditation Credential
A Credential issued by an Auditor asserting that a Trust Community Member conforms to the Accreditation requirements of a Governance Framework.

#### Accredited
The status of an Entity having a valid Accreditation Credential from an Auditor for a specific Governance Framework.

#### Agency
A service provider that hosts Cloud Agents and may provision Edge Agents on behalf of Entities. Agencies may be Unaccredited, Self-Certified, or Accredited.

#### Agent
A software program or process used by or acting on behalf of an Entity to interact with other Agents or with the Sovrin Ledger or other distributed ledgers. Agents are of two types: Edge Agents run at the edge of the network on a local device; Cloud Agents run remotely on a server or cloud hosting service. Agents require access to a Wallet in order to perform cryptographic operations on behalf of the Entity they represent.

#### Agent-to-Agent Protocol (A2A)
A protocol for communicating between Agents to form Connections, exchange Credentials, and perform other secure private transactions. The Sovrin Protocol is a specific Agent-to-Agent Protocol.

#### Alias
A human friendly, globally unique string that may be associated with an identity in addition to its primary cryptonym.

#### Anchor
A hash of a user's private ledger recorded to the public ledger to provide evidence of transactions taking place without necessarily revealing the details of those interactions. Users can generate these manually on their own or companies and organizations may require end users to provide these for auditing purposes as part of their terms of service. On the technical side of things, this is done via an API call. Enterprise customers could use this to set up the creation of anchors as part of their automated processes. See also "Consent receipt."

#### Anchored Verinym
A type of Verinym. This is the DID for an Identity Owner for whom the Trust Anchor can confirm consent to the Sovrin Identity Owner Agreement (Appendix A).

#### Anonym
A DID used exactly once, so it cannot be contextualized or correlated beyond that single usage. See also Pseudonym and Verinym.

#### Anywise
A non-reciprocal relationship rooted in the Identity of one party, where the other party is the public (a faceless “other” that can be instantiated without bound). For an Organization to issue publicly verifiable Credentials, its issuer DID must be on a public ledger such as the Sovrin Ledger. It is thus an Anywise DID—a DID to which any other Entity may refer without coordination. The term “public DID” is sometimes used as a casual synonym for “anywise DID”. However, “public DID” is deprecated because it is ambiguous. It may refer to a DID that is world-visible but usable only in pairwise mode, or to a DID that is not published in a central location but nonetheless used in many contexts, or to a DID that is both publicly visible and used in anywise mode. Compare N-wise and Pairwise.

#### API Ready Deliverable
Engineering term. This is a milestone for sub-projects within a project where interfaces are delivered to downstream sub-projects.  In our case an example would be where wallet technological interfaces in libindy are delivered to the consumer app team.  This then enables the consumer app team to programmatically build and integrate the app.

#### App
A software program created by a Developer and used by an Identity Owner to interact with the Identity Owner’s Agent(s) or the Sovrin Ledger. One typical (but not required) function of an App is to store the Identity Owner’s Private Keys and Master Secrets.

#### Assurance
See Trust Assurance.

#### Attribute
The identity traits, properties, or qualities of an Entity. A small set of Attributes of a Sovrin Entity, including its Public Key(s) and Service Endpoint(s), may be recorded on the Sovrin Ledger (specifically the Sovrin Domain Ledger). A private Attribute of a Sovrin Entity may be asserted by a Claim in a Credential.

#### Auditor
An Individual or Organization that performs Accreditation on behalf of a Governance Authority.

#### Auditor Accreditor
An Organization authorized by a Governance Authority to issue Auditor Credentials under a particular Governance Framework.

#### Auditor Accreditor Credential
A Credential issued by a Governance Authority asserting that an Auditor Accreditor is authorized to issue Auditor Credentials for a particular Governance Framework.

#### Auditor Credential
A Credential issued by a Governance Authority or an Auditor Accreditor asserting that an Auditor is authorized to perform Accreditation for a particular Governance Framework.

#### Authority
Sovrin infrastructure participant. An identity owner who is an individual or an organization, and thus can be held legally accountable.

#### Beta Complete Milestone
Engineering term. This milestone denotes that all integration testing of completed features and functions is complete.  Within the team we refer to this is as “DONE-DONE”. This milestone is preparatory for system, security, and regression testing.

#### Blockchain
A distributed database that maintains a continuously growing list of ordered records called blocks.

#### Board of Trustees
The set of Trustees entrusted with governance of the Sovrin Foundation.

#### Business Policies
The set of policies, defined under the heading of the same name in the Sovrin Trust Framework, that specify the business rules of the Sovrin Network.

#### Byzantine Fault Tolerance
This is the algorithm used on the Sovrin network.

#### CID
Sovrin identity identifier. This is also called a Cryptographic Identifier. It's a DID that also has cryptographic properties. In Sovrin, DIDs often act as verification keys, i.e., an identity owner is identified by its verification key. This saves storage space and simplifies some workflows, and it makes a DID a CID as well. The status of an identifier can change from CID to simple DID during revocation. Type-1 CIDs are established as Ed25519 verification keys. Ed25519 is the default signature scheme for Sovrin.

#### CKMS
Acronym. Cryptographic Key Management System.

#### Claim
An attestation about an Attribute of a Subject. Examples of a Claim include date of birth, height, government ID number, or postal address—all of which are possible Attributes of an Individual. A Credential is comprised of a set of Claims. _(Note: In the first version of the Sovrin Trust Framework, this term was used the same way it was used in the early W3C Verifiable Claims Working Group specifications—as a synonym for what is now a Credential. That usage is now deprecated.)_

#### Claim record
Type of claim in the Sovrin Network. (“claim”): an identity record that asserts one or more attributes of a Sovrin identity. A claim that asserts more than one attribute in a single identity record is called a credential. The origin of a claim is unambiguous, but the truthfulness of a claim must be evaluated against the reputation of the issuer: a university is likely to be a reliable issuer for claims about graduation, but not for claims about the expiry of a driver’s license.

A claim is a digital assertion made by a Sovrin Entity about itself or another Sovrin Entity. The entity making the Claim is called the Issuer. The entity holding the issued Claim is called the Holder. If the Claim supports Zero Knowledge Proofs, the Holder is also called the Prover. The entity to whom a Claim is presented is called the Relying Party. A Claim may be Public Data or Private Data.

#### Client
Sovrin network component. A software application that reads records from and/or writes records to the Sovrin ledger. Specifically, a software program or component that generates, stores and/or accesses Public Keys and Private Keys to perform transactions with the Sovrin Ledger. A Client may be a component of an App or a component of an Agent.

#### Cloud Agent
An Agent that runs on a computing device over which the Identity Owner does not have direct physical control or access. Mutually exclusive with Edge Agent. A Cloud Agent requires a Wallet and typically has a Service Endpoint. Cloud agents may be hosted by an Agency.

#### Code Complete Milestone
Engineering term.This milestone denotes all functions and features within the scope of the project are done.  Within the team we refer to this as “DONE”. This milestone is preparatory for integration (cross-functional) testing.

#### Connect.Me
A consumer facing app that interacts with Evernym's agency service that then interacts with the Sovrin ledger.

#### Connection
A cryptographically verifiable communications channel established using an Agent-to-Agent Protocol between two DIDs representing two Entities using two Service Endpoints and their associated Agents. Connections may be used to exchange Verifiable Credentials or for any other communications purpose. Connections may be encrypted and decrypted using the Public Keys and Private Keys for each DID. A Connection may be temporary or it may last as long as the two Entities desire to keep it. Two Entities may have multiple Connections between them, however each Connection must be between a unique pair of DIDs. A relationship between more than two Entities may be modeled either as Pairwise connections between all of the Entities (Peering) or each Entity can form a Connection with an Entity representing a Group.

#### Connection Invitation
An Agent-to-Agent Protocol message type sent from one Entity to a second Entity to invite the second Sovrin Entity to send a Connection Request.

#### Connection Offer
An invitation from a one Sovrin Entity to a second Sovrin Entity to send the first Sovrin Entity a Connection Request. Connection Offers are needed only in specialized use cases; in most cases a Connection will start with a Connection Request.

#### Connection Request
An Agent-to-Agent Protocol message type sent from one Entity to a second Entity to request to form a Connection.

#### Consent Receipt
Type of receipt in the Sovrin network. (“consent”): a receipt record that records proof that an identity owner has shared data with another party.

#### Controlled Document
A subdocument of a Governance Framework that is included by reference in the Master Document as a normative component of the framework. A Controlled Document is typically able to be revised independently from the Master Document, permitting a modular legal architecture. For the Sovrin Governance Framework, a list of Controlled Documents is included as Appendix A to the Sovrin Governance Framework Master Document. The present document (the Sovrin Glossary) is a Controlled Document.

#### Core Principles
The principles published in a Governance Framework that apply broadly to all Trust Community Members. The Core Principles of the Sovrin Governance Framework are defined in Section 2.

#### Credential
A digital assertion containing a set of Claims about a Subject made by an Entity about itself or another Entity. Credentials are a subset of Identity Data. A Credential is based on a Credential Definition. The Entity creating the Credential is called the Issuer. The Entity holding the issued Credential is called the Holder. If the Credential supports Zero Knowledge Proofs, the Holder is also called the Prover. The Entity to whom a Credential is presented is called the Verifier. Once issued, a Credential is typically stored by an Agent. (In Sovrin Infrastructure, Credentials are not stored on the Sovrin Ledger.) Examples of Credentials are college transcripts, driver licenses, health insurance cards, and building permits. See also Verifiable Credential.

#### Credential Definition (CredDef)
A machine-readable definition of the semantic structure of a Credential based on one or more Schemas. In Sovrin Infrastructure, Credential Definitions are stored on the Sovrin Ledger. Credential Definitions must include an Issuer Public Key. Credentials Definitions facilitate interoperability of Credentials and Proofs across multiple Issuers, Holders, and Verifiers.

#### Credential Exchange
A set of Interaction Patterns within an Agent-to-Agent Protocol for exchange of Credentials between Entities acting in Credential Exchange Roles.

#### Credential Exchange Roles
The business roles defined at the Credential Exchange layer of Sovrin Infrastructure. These include Subjects, Issuers, Holders, Verifiers, and Insurers.

#### Credential Offer
An Agent-to-Agent Protocol message type sent from an Issuer to a Holder to invite the Holder to send a Credential Request to the Issuer.

#### Credential Offer
An Agent-to-Agent Protocol message type sent from an Issuer to a Holder to invite the Holder to send a Credential Request to the Issuer.

#### Credential Registry
An Entity that serves as a Holder of Credentials issued by Trust Community Members in order to provide a cryptographically verifiable directory service to the Trust Community or to the public. An informal Credential Registry may accept Credentials from participants whose purpose is to cross-certify each other’s roles in the Trust Community. A formal Credential Registry may be authorized directly by a Governance Authority or Accredited by an authorized Auditor for the Governance Framework.

#### Credential Registry Credential
A Credential issued by a Governance Authority asserting that a Credential Registry is authorized under a particular Governance Framework.

#### Credential Request
An Agent-to-Agent Protocol message type sent from a Holder to an Issuer to request the issuance of a Credential to that Holder.

#### Credential Registry
An Entity that serves as a Holder of Credentials issued by Trust Community Members in order to provide a cryptographically verifiable directory service to the Trust Community or to the public. An informal Credential Registry may accept Credentials from participants whose purpose is to cross-certify each other’s roles in the Trust Community. A formal Credential Registry may be authorized directly by a Governance Authority or Accredited by an authorized Auditor for the Governance Framework.

#### Credential Registry Credential
A Credential issued by a Governance Authority asserting that a Credential Registry is authorized under a particular Governance Framework.

#### Credential Schema
This is what you're creating when you choose what attributes you want to offer as part of your new credential offer type that will eventually be sent to the end user. This schema defines the values and restrictions on those values you want to offer as a credential an end user.

#### Cryptographic Hash Function
This is a special class of hash function that has certain properties which make it suitable for use in cryptography. It is a mathematical algorithm that maps data of arbitrary size to a bit string of a fixed size (a hash function) which is designed to also be a one-way function, that is, a function which is infeasible to invert. In other words, it's meant to be exact, complex and not easily "crackable."
https://en.wikipedia.org/wiki/Cryptographic_hash_function

#### Cryptonym
A public identifier, which corresponds to a (potentially confidential) set of attributes; a primary identifier.

#### CU Ledger
Acronym. Credit Union Ledger.

#### CUFX
Acronym. Credit Union Financial Exchange. A credit union industry standards body.

#### CynjaSpace
This is a "cyberspace with training wheels"—the first complete online cyber environment for kids that uses graphic novel characters and storylines to teach them (and their parents) how to interact online safely and securely.

#### CynjaTech
A Washington D.C. company who contracted with KiwiTech to build CynjaSpace.

#### Data Center
The physical facility hosting a Sovrin Network component such as a Node or an Agency.

#### Data Controller
As defined by the [EU General Data Protection Regulation](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation) (GDPR), the natural or legal person, public authority, agency, or other body which, alone or jointly with others, determines the purposes and means of the processing of Personal Data.

#### Data Processor
As defined by the [EU General Data Protection Regulation](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation) (GDPR), a natural or legal person, public authority, agency, or other body which processes Personal Data on behalf of a Data Controller.

#### Data Protection by Design
A widely recognized [set of principles](https://ico.org.uk/for-organisations/guide-to-the-general-data-protection-regulation-gdpr/principles/) for protecting Personal Data. Specific Sovrin Data Protection by Design principles are a subset of the Core Principles in the Sovrin Governance Framework.

#### Data Subject
As defined by the [EU General Data Protection Regulation](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation) (GDPR), any person whose Personal Data is being collected, held, or processed. In the Sovrin Governance Framework, a Data Subject is referred to as an Individual.

#### DDO
Acronym. DID Descriptor Object. These are simple JSON documents that contain all the metadata needed to prove ownership and control of a DID. Specifically, a DDO contains a set of key descriptions— machine-readable descriptions of the identity owner’s public keys—and a set of service endpoints—resource pointers necessary to initiate trusted interactions with the identity owner. A DDO is associated with exactly one DID.

#### Decentralization by Design
A set of principles developed by the Sovrin Foundation to build decentralization into systems from the very start. The Decentralization by Design principles are a subset of the Sovrin Core Principles.

#### Delegation
The act of one Identity Owner authorizing another Identity Owner to act as a Delegate. In the Sovrin Network, Delegation is accomplished by the delegating Identity Owner issuing a Delegation Credential to the Delegate. Note that Delegation is not Impersonation.

#### Delegation Credential
A Credential issued by an Identity Owner to authorize another Identity Owner to act as a Delegate.

#### Dependent
An Individual whose circumstances or capabilities requires dependence on a Guardian to administer the Individual’s Identity Data. Under the Sovrin Governance Framework, all Dependents have the right (though perhaps not the appropriate circumstances) to become Independents. Mutually exclusive with Independent. Note that a Thing is not a Dependent; rather a Thing may have a Thing Controller.

#### Developer
An Individual or Organization that develops hardware or software providing the functionality of any component of Sovrin Infrastructure, including Nodes, Agents, and Wallets.

#### DID
A decentralized identifier as defined by the [W3C DID specification](https://w3c-ccg.github.io/did-spec/). DIDs enable interoperable decentralized Self-Sovereign Identity management. A DID is associated with exactly one DID Document. The Sovrin Technical Governance Board defines the technical specifications for a Sovrin DID in the Sovrin DID Method Specification.

#### DID Document
The machine-readable document to which a DID points as defined by the [W3C DID specification](https://w3c-ccg.github.io/did-spec/).  A DID document describes the Public Keys, Service Endpoints, and other metadata associated with a DID. A DID Document is associated with exactly one DID.

#### DID Method
A specification that defines a particular type of DID conforming to the [W3C DID specification](https://w3c-ccg.github.io/did-spec/). A DID Method specifies both the format of the particular type of DID as well as the set of operations for creating, reading, updating and deleting (revoking) it. See Sovrin DID Method Specification.

#### DID Resolver
A software module that takes a DID as input and returns a DID document by invoking the DID Method used by that particular DID. Analogous to the function of a [DNS resolver](https://en.wikipedia.org/wiki/Domain_Name_System#DNS_resolvers).

#### DIDM
Acronym. Decentralized ID Management (?)

#### Digi.Me
This is a site that has been dubbed the "the Internet of Me”—the first service that brings all your personal data together—social media, photos, files, financial data, health records—into one private library that you can search and share entirely under your own control.

#### Digital Signature
This is a mathematical scheme for demonstrating the authenticity of digital messages or documents. https://en.wikipedia.org/wiki/Digital_signature

#### DKMS
[Decentralized Key Management System](http://bit.ly/dkmsv3), an emerging standard for interoperable cryptographic key management based on DIDs. In Sovrin Infrastructure, the DKMS standard applies to Agents and Wallets.

#### Domain-Specific Governance Framework
A Governance Framework designed to achieve the trust objectives a specific Trust Community that inherits its Core Principles, Core Policies, and other definitions from a more general Governance Framework. The Sovrin Governance Framework is designed to serve as a general model for Domain-Specific Governance Frameworks based on the Sovrin Web of Trust Model.

#### DPKI
Acronym. Decentralized Public Key Infrastructure.

#### Edge Agent
An Agent that runs at the edge of the network on a local device, such as a smartphone, tablet, laptop, automotive computer, etc. The device owner usually has local access to the device and can exert control over its use and authorization. Mutually exclusive with Cloud Agent. An Edge Agent may be an app used directly by an Identity Owner, or it may be an operating system module or background process called by other apps. Edge Agents typically do not have a Service Endpoint, but do have access to a Wallet.

#### Entity
As used in [IETF RFC 3986, Uniform Resource Identifier (URI)](https://tools.ietf.org/html/rfc3986), a resource of any kind that can be uniquely and independently identified. An Entity identified with a Sovrin DID is a Sovrin Entity. See also Identity.

#### Evernym Edge
Saas platform for the edge.

#### Founding Steward
A Steward whose service to the Sovrin Network began by executing the [Sovrin Founding Steward Agreement](https://docs.google.com/document/d/1Fxu3Qg1naSHl1taF1CfokHA32O7G6pt3t19g1dI4FPM/edit?usp=sharing) and hosting a Node under the first version of the Sovrin Governance Framework, formally called the [Sovrin Provisional Trust Framework](https://sovrin.org/wp-content/uploads/2017/07/Sovrin-Provisional-Trust-Framework-2017-06-28.pdf).

#### General Availability Network
The second stage of the Sovrin Network that begins when the Provisional Network stage ends. Once the General Availability Network stage begins, all Stewards transition from operating under the Provisional Trust Framework to operating under the Sovrin Trust Framework.

#### Genesis Transactions
The first Transactions written to a ledger or blockchain that establish starting conditions upon which all future evolution of ledger state depend. The Sovrin Genesis Transactions were written on 28 July 2017 and defined the initial set of Trustees, Stewards, and Nodes.

#### Governance Authority (GA)
The Identity Owner (typically an Organization) governing a particular Governance Framework such as a Domain-Specific Governance Framework. Depending on the design of the Governance Framework, the Governance Authority may be responsible for issuing Trust Anchor Credentials, Credential Registry Credentials, Auditor Credentials, or Auditor Accreditor Credentials. A Governance Authority may also issue a Governance Authority Credential to another Governance Authority to cross-link two Domain-Specific Governance Frameworks. See the Sovrin Web of Trust Model.

#### Governance Authority Credential
A Credential issued by one Governance Authority asserting the recognition of another Governance Authority.

#### Governance Framework
The set of business, legal, and technical definitions, policies, specifications, and contracts by which the members of a Trust Community agree to be governed in order to achieve their desired Levels of Assurance. Typically divided into a Master Document and a set of Controlled Documents. A Governance Framework is itself governed by a Governance Authority. A Governance Framework is also known as a Trust Framework.

#### Group
An Entity that exists to provide a Connection between other Entities. An Organization that is represented by an Entity is an example of a Group. Compare Peering.

#### GST
Acronym. Greenwich Standard Time.

#### Guardian
An Identity Owner who administers Identity Data, Wallets, and/or Agents on behalf of a Dependent. A Guardian is different than a Delegate—in Delegation, the Identity Owner still retains control of one or more Wallets. With Guardianship, an Identity Owner is wholly dependent on the Guardian to manage the Identity Owner’s Wallet.

#### Guardian Obligations
The set of obligations under the heading of the same name in the Sovrin Trust Framework.

#### Guardianship
The legal responsibility of serving as a Guardian. In Sovrin Infrastructure, Guardianship maps to the rights and responsibilities defined in prevailing legal constructs such as parent, in loco parentis, legal capacity and power of attorney. Note that Guardianship is not Impersonation. See also Delegation.

#### Guide
Within Indy: Some who consults on vision, core principles, priorities, and best practices. Might include inactive founders of a codebase, product managers, others with a strong business or community viewpoint.

#### Hardening Complete Milestone
Engineering Term. This milestone denotes that all testing of the project is complete.  Testing efforts that must be completed prior to achieving this milestone include system, regression, security, actual user, and integration.  Within the team we refer to this as “DONE-DONE-DONE”. This milestone is preparatory for deployment and launch of the project to production systems.

#### Holder
A role played by an Entity when it is issued a Credential by an Issuer. The Holder may or may not be the Subject of the Credential. (There are many use cases in which the Holder is not the Subject, e.g., a birth certificate where the Subject is a baby and both the mother and father may be Holders.) If the Credential supports Zero Knowledge Proofs, the Holder is also the Prover. Based on the definition provided by the [W3C Verifiable Claims Working Group](https://www.w3.org/2017/vc/).

#### Hosting Provider
A Data Processor that provides hosting services to a Steward or an Agency.

#### Hyperledger
Community and project started by IBM, Intel, Digital Asset, R3, plus several banks, which is hosted/adminstered by the Linux Foundation.

#### IBM Fabric
This is an IBM blockchain based off Hyperledger Fabric, a project by Hyperledger.

#### Identifier
A text string or other atomic data structure used to provide a base level of Identity for an Entity. In Self-Sovereign Identity systems, Decentralized Identifiers (DIDs) are the standard Identifier.

#### Identity
The capability to distinguish a specific Entity from all others in a specific context. Identity may apply to any type of Entity, including Individuals, Organizations, and Things. Note that Legal Identity is only one form of Identity. Many technologies can provide Identity capabilities; the Sovrin Governance Framework defines one such system, the Sovrin Network.

#### Identity Data
The set of data associated with an Identity. In Self-Sovereign Identity, the sharing of Identity Data is under the control of the Identity Owner. See also Sovrin Identity Data.

#### Identity Graph
Type of graph in the Sovrin network. The graph of linked identity records that have a single identifier record as the root. For examples of identity graphs, see the OASIS XDI Core 1.0 specification.

#### Identity Owner
A classification of a Sovrin Entity as either an Individual or an Organization. Mutually exclusive with Thing. Identity Owners are the only type of Sovrin Entity that may be held legally accountable, however the actual legal accountability of an Identity Owner for any particular action depends on many contextual factors including the laws of the applicable Jurisdiction, Guardianship, and so forth. An Identity Owner may play any of the Sovrin Infrastructure Roles.

#### Identity Record
Sovrin identity record. (“record”): The record written into the Sovrin ledger by an identity transaction. A transaction on the Sovrin Ledger that describes a Sovrin Entity. Every Identity Record is associated with exactly one DID. The registration of a DID is itself an Identity Record. Identity Records may include Public Keys, Service Endpoints, Public Claims, and Proofs. Identity Records are Public Data.

#### Identity Transaction
Sovrin identity record. (“transaction”): The act of writing a new identity record to the Sovrin ledger.

#### Impersonation
The act of one Entity assuming the Identity of another Entity for malicious purposes. Note that Guardianship and Delegation are not Impersonation because the Guardian or Delegate is acting on behalf of and with the authorization of the Identity Owner.

#### Inclusive by Design
A widely recognized [design practice](http://www.inclusivedesigntoolkit.com/whatis/whatis.html) for building inclusion into systems, products, services and buildings from the very start. Specific Inclusive by Design principles for Sovrin Infrastructure are a subset of the Core Principles of the Sovrin Governance Framework.

#### Independent
An Individual who directly controls the Private Key(s) and Link Secret(s) required to administer a set of Sovrin Identity Data and thus is not dependent on any other party for control (other than the Developer of an Agent or Wallet used by that Individual). For any particular set of Sovrin Identity Data, this definition is mutually exclusive with Dependent. Note that it is possible for the same Identity Owner to be both an Independent for some Sovrin Identities and a Dependent for others.

#### Individual
An Identity Owner who is a natural person. Mutually exclusive with Organization.

#### Industry Sector
An area of distinct economic activity as defined by the World Trade Organization. See https://www.wto.org/english/tratop_e/serv_e/mtn_gns_w_120_e.doc.

#### Insurer
A service provider who provides insurance for Issuers for the potential liability of asserting a Credential or to Verifiers or Relying Parties for the potential risk of relying on a Credential.

#### Interaction
A set of messages exchanged over a Connection using an Agent-to-Agent Protocol.

#### Interaction Pattern
An orchestrated set of Interactions that defines a subprotocol of an Agent-to-Agent Protocol. Credential Exchange is one type of Interaction Pattern.

#### IPR
Acronym. Intellectual Property Review.

#### iRespond
A global non-profit; improve quality of care thru efficient use of technology; human identity solutions that work in resource poor areas of the world.

#### Issuer
The Entity that issues a Credential to a Holder. Based on the definition provided by the [W3C Verifiable Claims Working Group](https://www.w3.org/2017/vc/).

#### Issuer Public Key
The special type of cryptographic key required for an Issuer to issue a Credential that supports Zero Knowledge Proofs. In Sovrin Infrastructure, the Issuer Public Key is published in the Credential Definition.

#### Jurisdiction
A legally defined scope of authority to which an Identity Owner is bound by law at any one point in time. Jurisdiction is relevant to Sovrin Governance Framework policies in order to help ensure diversity among Stewards. For these purposes, Jurisdiction is defined broadly as: sovereign states or autonomous regions that are members of the United Nations, any UN Specialized Agency, or the Universal Postal Union, as well as sovereign states or autonomous regions that have observer status at the UN or any UN Specialized Agency.

#### Key Recovery
The process of recovering access to and control of a set of Private Keys—or an entire Wallet—after loss or compromise. Key Recovery is a major focus of the emerging DKMS standard for cryptographic key management. See also Recovery Key.

#### KYC
Acronym. Know Your Customer.

#### Ledger-Wide Tombstone
A Tombstone marked across the entire Sovrin Ledger so that it is no longer returned by any Node in response to requests for read access. Mutually exclusive with Node-Specific Tombstone.

#### Legal Identity
A set of Attributes sufficient to identify an Identity Owner for the purpose of legal accountability in at least one Jurisdiction. A Legal Identity may be established by a valid Credential from an Issuer that is trusted to provide the necessary Attributes.

#### Legal Policies
The set of policies, defined under the heading of the same name in the SovrinTrust Framework, that specify the legal requirements of the Sovrin Network.

#### Level of Assurance
A measure—usually numeric—of the Trust Assurance that one Entity has in another Entity.

#### Link Contract
Type of contract in the Sovrin network. A record of who is sharing data with whom, for what purpose and with what controls on its usage. As a semantic data structure, link contracts have a formal definition in the OASIS XDI Core 1.0 specification, however the general concept can be implemented in any structured data format. You can read more about the OASIS XDI Core 1.0 here: goo.gl/uXtQyR

#### Link Secret
An item of Private Data used by a Prover to link a Credential uniquely to the Prover. A Link Secret is an input to Zero Knowledge Proofs that enables Claims from one or more Credentials to be combined in order to prove that the Credentials have a common Holder (the Prover). A Link Secret should be known only to the Prover.

#### M1
Acronym. Milestone 1.

#### M1 SOV
Acronym. Milestone 1 Sovrin.

#### M2
Acronym. Milestone 2.

#### Maintainer
Within Indy: Someone who vetts contributions and provides technical leadership, actively shepherding the evolution of the technology and promoting its quality. Named in MAINTAINERS.md. Brain trust for codebase. This person has write/merge privileges in github (requires github “contributor”, but having these privledges doesn’t automatically make you a maintainer).

#### Master Document
The controlling document of a Governance Framework. The Master Document typically references a set of Controlled Documents constituting the rest of the framework. See Sovrin Governance Framework Master Document.

#### Master Secret
An item of Private Data used by a Prover to guarantee that a claim uniquely applies to them. The Master Secret is an input to Zero Knowledge Proofs that combine data from multiple Claims in order to prove that the Claims have a common subject (the Prover). A Master Secret should be known only to the Prover. Similar to a Private Key, but without a corresponding Public Key.

#### Member
An Identity Owner who enters into one or more of the Sovrin Legal Agreements with the Sovrin Foundation in order to participate in the Sovrin Network.

#### MGL
Acronym. Minimum Go Live (for Sovrin network).

#### Microledger
A cryptographic data structure maintained over a single Connection that enables two or more Agents to securely share Pairwise DIDs, Public Keys, Service Endpoints, and other Identity Data. See Sovrin Microledger.

#### Milestone
Engineering term. A point-in-time at which deliverables and/or results for the project are scheduled to be ready.

#### Multi-Use Anonyms
A type of anonym. These are also called pseudonyms. Multi-Use Anonyms are used by the Identity Owner for more than one digital relationship.

#### N-wise
A direct relationship between a limited number of entities, N, such that N is greater than 2, and such that the Identity of each party is understood in the same way by all participants. A doctor-patient-hospital relationship is N-wise, as is a nuclear family relationship among siblings. Compare Pairwise and Anywise. See also Peering.

#### NIST
Acronym. National Institute of Standards and Technology.

#### Node
A computer network server running an instance of the code necessary to operate a distributed ledger or blockchain. In Sovrin Infrastructure, a Node is operated by a Steward running an instance of the Sovrin Open Source Code to maintain the Sovrin Ledger. A Node must be either a Validator Node or an Observer Node.

#### Node-Specific Tombstone
A Tombstone marked by an individual Steward so that it is no longer returned in response to a request for read access to the Node operated by that Steward. Mutually exclusive with Ledger-Wide Tombstone.

#### Node Selection Algorithm
An algorithm specified by the Sovrin Technical Governance Board in the _Sovrin Steward Technical Policies_ document (see Appendix A of the SGF Master Document) that automatically selects the current active set of Validator Nodes at any one point in time.

#### Node-Specific Tombstone
A Tombstone marked by an individual Steward so that it is no longer returned in response to a request for read access to the Node operated by that Steward. Mutually exclusive with Ledger-Wide Tombstone.

#### N-wise
A direct relationship between a limited number of entities, N, such that N is greater than 2, and such that the Identity of each party is understood in the same way by all participants. A doctor-patient-hospital relationship is N-wise, as is a nuclear family relationship among siblings. Compare Pairwise and Anywise. See also Peering.

#### Nym
Sovrin identity identifier. A shorthand term used in the Sovrin source code for a cryptographic identifier (CID).

#### OASIS XDI Core 1.0 Specification
A formal definition of a semantic data structure used in creating link contracts. You can read more about it here: goo.gl/4JW3Uq

#### Observer Node
A Node that maintains a read-only copy of the Sovrin Ledger. A Node may be able to operate as either an Observer Node or Validator Node, but at any one point in time it must operate in only one of these two roles. There is no restriction on who may run an Observer node or how many they may run because the responses from Observer Nodes may be verified using State Proofs.

#### OIX
Acronym. Open Identity Exchange. This is a non-profit company that  is a technology agnostic, collaborative cross sector membership organisation with the purpose of accelerating the adoption of digital identity services based on open standards, according to their website. http://www.openidentityexchange.org/

#### Open Governance
A governance model in which the governing organization is open to public participation, operates with full transparency, and does not favor any particular contributor or constituency. The Sovrin Foundation operates under an Open Governance model.

#### Open Source License
Any form of intellectual property license approved and published by the [Open Source Initiative](https://opensource.org/).

#### Open Standards
Technical standards that are developed under an Open Governance process; are publicly available for anyone to use; and which do not lock in users to a specific vendor or implementation. Open Standards facilitate interoperability and data exchange among different products or services and are intended for widespread adoption. Many Open Standards have implementations available under an Open Source License.

#### Organization
An Identity Owner who is a legal Entity of any kind except an Individual, e.g., a Group, sole proprietorship, partnership, corporation, LLC, association, NGO, cooperative, government, etc. Mutually exclusive with Individual.

#### Observer Node
A Node that maintains a read-only copy of the Sovrin Ledger. A Node may be able to operate as either an Observer Node or Validator Node, but at any one point in time it must operate in only one of these two roles. There is no restriction on who may run an Observer node or how many they may run because the responses from Observer Nodes may be verified using State Proofs.

#### Organization
An Identity Owner who is a legal Entity of any kind except an Individual, e.g., a Group, sole proprietorship, partnership, corporation, LLC, association, NGO, cooperative, government, etc. Mutually exclusive with Individual.

#### Other Entity
An Entity identified on a network external to the Sovrin Network.

#### OTT
Acronym. Over the Top (referring to mobile protocols for real time IM and chat).

#### Overlay
A data structure that provides an extra layer of contextual and/or conditional information to a Schema. This extra context can be used by an Agent to transform how information is displayed to a viewer or to guide the Agent in how to apply a custom process to Schema data. In Sovrin architecture, Overlays are stored on and accessed from the Sovrin Ledger and can therefore be both searched for and provided by reference to an Agent.

#### Pairwise
A direct relationship between exactly two Entities. Most relationships in the Sovrin ecosystem are Pairwise, even when one or both Entities are not Individuals. For example, business-to-business relationships are pairwise by default. A DID or a Public Key or a Service Endpoint is Pairwise if it is used exclusively in a Pairwise relationship. Compare N-wise and Anywise.

#### Payment
A transfer of Sovrin Tokens or other cryptographically verifiable units of value from one Entity to another Entity.

#### Payment Address
The address of a Payment Transaction on the Sovrin Payment Ledger.

#### Payment Transaction
A Transaction with the Sovrin Payment Ledger that makes a Payment.

#### Peering
An N-wise relationship that does not need a separate Sovrin Entity to coordinate. Compare Group.

#### PEN Testing
Egineering term. Acronym. Short for Penetration (security) testing.  Test criteria for each pen test are to be determined by the product, engineering, and operations teams. Components that can be part of this testing include:
_ Social engineering
_ Personnel training
_ Corporate policies
_ Physical facilities
_ Rights management (individual and groups)
_ Roles through the infrastructure and environment
_ Network testing
_ Network penetration
_ Infrastructure testing
_ Corporate servers and databases
_ Corporate software assets - systems, databases, email, messaging, collaboration tools
_ Security configuration strengths of servers, firewalls, wireless access points, etc
_ IOT (internet of things) points of presence
_ etc

#### Permissioned Write Access
The set of policies defined by the Sovrin Governance Framework governing how an Identity Owner may write a Transaction to the Sovrin Ledger using an authorized Transaction Submitter. Mutually exclusive with Public Write Access. See [Sovrin Ledger Access Policies](https://docs.google.com/document/d/1jMVkRWaK2s1sJaLP6LhEJgCY2AIZ7VTqCJeaMF6jKEM/edit?usp=sharing).

#### Persona
[In the context of digital identity and user experience design](https://en.wikipedia.org/wiki/Persona_(user_experience), a fictional character created to represent a classification of an Individual that might use a site, brand, or product in a similar way.

#### Personal Data
As defined by the [EU General Data Protection Regulation](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation) (GDPR), any information relating to an identified or identifiable natural person. In the GDPR, this natural person is called the Data Subject. In the Sovrin Governance Framework, this natural person is called an Individual.

#### PI
Acronym. Principal Investigator.

#### PKI
Acronym. Public Key Infrastructure.

#### Plenum
A consensus algorithm that, in simple terms, makes sure that the secure order of events understood by each node in a network matches the order understood by all other nodes, while also addressing latency. The Plenum platform serves as a proof of concept to validate connectivity, throughput, encryption and administration needs.

#### POC
Acronym. Proof of Concept.

#### Policy
A business, legal, or technical rule specified in a Governance Framework. In the Sovrin Governance Framework, a Policy is expressed using a “MUST”, “SHOULD”, “MAY”, “MUST NOT”, “SHOULD NOT”, or “MAY NOT” statement.

#### Practice
An actionable process that implements a Policy.

#### Premium Claim
Type of claim in the Sovrin network. A claim record for which the issuer charges a fee for a relying party to access the claim. The Sovrin Trust Framework will establish a global marketplace for premium claims. For more information see "The Inevitable Rise of Self-Sovereign Identity" whitepaper.

#### Privacy by Design
A set of [seven foundational principles](https://en.wikipedia.org/wiki/Privacy_by_design) for taking privacy into account throughout the entire design and engineering of a system, product or service. Originally defined by the [Information and Privacy Commissioner of Ontario, Canada](https://www.ipc.on.ca/). Specific Sovrin Privacy by Design principles are a subset of the Core Principles in the Sovrin Governance Framework.

#### Private Claim
A Claim that is sent by the Issuer to the Holder’s Agent or App to hold (and present to Relying Parties) as Private Data but which can be verified using Public Claims and Public Data. A Private Claim will typically use a Zero Knowledge Proof, however it may also use a Transparent Proof.

#### Private Data
Data over which an Entity exerts access control. In Sovrin Infrastructure, Private Data is never stored on the Sovrin Ledger. Private Data may be stored by an Agent in a Wallet or Vault or other secure location. Mutually exclusive with Public Data.

#### Private Key
The half of a cryptographic key pair designed to be kept as the Private Data of an Entity. In elliptic curve cryptography, a Private Key is called a signing key.

#### Private Ledger
This is a term sometimes referenced in the Whitepapers. In some cases it means the place where the status of the pairwise keys are kept. Sometimes it can also refer to the Wallet where things like proofs from others or encrypted attributes are.

#### Procedure
A set of actionable steps that implements a Practice.

#### Proof
Cryptographic verification of a Claim or a Credential. A [digital signature](https://en.wikipedia.org/wiki/Digital_signature) is a simple form of Proof. A [cryptographic hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) is also a form of Proof. Proofs are one of two types: Transparent or Zero Knowledge. Transparent Proofs reveal all the information in a Credential. Zero Knowledge Proofs enable [selective disclosure](https://en.wikipedia.org/wiki/Selective_disclosure) of the information in a Credential.

#### Proof Definition
This is similar to a credential definition, in that it defines values and the restrictions on those values of what you want to ask for from someone else as proof.

#### Proof Request
This is a request from an individual or an organization requesting certain credentials as proof of something to be provided by the holder.

#### Prover
A role played by a Entity when it generates a Zero Knowledge Proof from a Credential. The Prover is also the Holder of the Credential.

#### Provisional Network
The first stage of the Sovrin Network during which Founding Stewards operate Nodes under the terms of the Provisional Trust Framework.

#### Provisional Trust Framework
The first version of the Sovrin Trust Framework that will govern the Sovrin Network from the start of the Provisional Network until the transition to the General Availability Network.

#### Pseudonym
A DID used to prevent correlation outside of a specific context. A Pseudonym may be Pairwise, N-wise, or Anywise. See also Anonym and Verinym.

#### Public Data
Data over which an Entity does not exert access control—it is publicly available to be read by anyone. In Sovrin Infrastructure, all Transactions on the Sovrin Ledger are Public Data. Mutually exclusive with Private Data.

#### Public Key
The half of a cryptographic key pair designed to be shared with other parties in order to decrypt or verify encrypted communications from an Entity. In digital signature schemes, a Public Key is also called a verification key. A Public Key may be either Public Data or Private Data depending on the policies of the Entity. In Sovrin Infrastructure, a Public Key is an Attribute of a Sovrin Entity. All Public Keys published on the Sovrin Ledger are Public Data.

#### Public Profile
In Sovrin Infrastructure, a Public Profile is a set of Attributes describing a Sovrin Entity, including its Legal Identity, logo(s) or other trademarks, location(s), marketing information, web links, and any other information that may be required by the Sovrin Governance Framework or a Domain-Specific Governance Framework in order to ensure transparency and accountability.

#### Public Write Access
The set of policies defined by the Sovrin Governance Framework governing how an Identity Owner may write a Transaction directly to the Sovrin Ledger without needing to go through an authorized Transaction Submitter. Mutually exclusive with Permissioned Write Access. See [Sovrin Ledger Access Policies](https://docs.google.com/document/d/1jMVkRWaK2s1sJaLP6LhEJgCY2AIZ7VTqCJeaMF6jKEM/edit?usp=sharing).

#### Purpose
The overarching goal of a Governance Framework as defined by its Governance Authority and Trust Community. The Purpose of Sovrin Infrastructure as a global public utility is defined in section 1 of the Sovrin Governance Framework.

#### Queue
This has been called "secure collaboration for everyone"—the first cross-platform team messaging app that is simple, safe, and smart enough to use in any context.

#### Receipt Record
Type of receipt in the Sovrin network. (“receipt”): an identity record that records proof of an off-ledger transaction made by a Sovrin identity.

#### Recovery Key
A special Private Key used for purposes of recovering a Wallet after loss or compromise. In the DKMS key management protocol, a Recovery Key may be cryptographically sharded for [secret sharing](https://en.wikipedia.org/wiki/Secret_sharing) among multiple Trustees.

#### Recovery Key Trustee
An Identity Owner trusted by another Identity Owner to authorize sharing back a Recovery Key for purposes of restoring a Wallet after loss or compromise. See also Sovrin Board of Trustees for a different usage of the term “Trustee”.

#### Relationship Graph
Type of graph in the Sovrin network. The graph of relationships between identities represented by identity graphs. Social graphs—the graph of relationships between “friends” on Facebook, “followers” on Twitter, or “connections” on LinkedIn—are all examples of relationship graphs.

#### Relying Party
An Entity that consumes Identity Data for some purpose. Verifiers are one type of Relying Party.

#### Reputation Graph
Type of graph in the Sovrin network. A specialization of relationship graphs in which each of the relationships is a reputation statement, i.e., an assertion of positive or negative reputation. For examples of a relationship graph, see the "Open Reputation Framework" whitepaper.

#### Reputation Record
Having to do with reputation in the Sovrin network. (“reputation”): an identity record that records a reputation event describing a Sovrin identity. Reputation records are what form reputation graphs. Reputation records maybe stored on-ledger or off-ledger. For more about identity and reputation, see the "Open Reputation Framework" whitepaper.

#### Reputation Trust Anchor
Having to do with reputation in the Sovrin network. A Sovrin identity that forms the start of a chain of reputation statements. See the Wikipedia definition (which deals mostly with PKI) and the definition in the Respect Reputation System.

#### Resolver
A software module that accepts an Identifier as input, looks up the identifier in a database and returns metadata describing the identified Entity. The Domain Name System (DNS) uses a [DNS resolver](https://en.wikipedia.org/wiki/Domain_Name_System#DNS_resolvers). Self-Sovereign Identity uses a DID Resolver.

#### Revocation
The act of an Issuer revoking the validity of a Claim or a Credential. With the Sovrin Protocol and the Sovrin Ledger, Revocation is accomplished using a Revocation Registry.

#### Revocation Registry
An online repository of data needed for Revocation. In Sovrin Infrastructure, a Revocation Registry is a privacy-respecting cryptographic data structure maintained on the Sovrin Ledger by an Issuer in order to support Revocation of a Credential. See Transaction Type.

#### Revocation Registry Definition
In Sovrin Infrastructure, the Transaction Type written by an Issuer to create a new Revocation Registry.

#### Revocation Registry Entry
In Sovrin Infrastructure, the Transaction Type written by an Issuer to update the state of a Revocation Registry. A Revocation Registry Entry may authorize newly issued Credentials or revoke previously issued Credentials.

#### RWOT
Acronym.

#### SBIR
Acronym. Small Business Innovation Resesarch (DHS).

#### Schema
A machine-readable definition of the semantics of a data structure. Schemas are used to define the Attributes used in one or more Credential Definitions.

#### Schema Overlay
Synonym for Overlay.

#### Security by Design
A widely recognized [set of principles](https://en.wikipedia.org/wiki/Secure_by_design) for building security into systems, products and services from the very start. Specific Sovrin Security by Design principles are a subset of the Core Principles in the Sovrin Governance Framework.

#### Selective Disclosure
A Privacy by Design principle of revealing only the subset of the data described in a Claim, Credential, or other set of Private Data that is required by a Verifier. There are many techniques for achieving Selective Disclosure. One of the primary techniques used in Sovrin Infrastructure is Zero Knowledge Proof cryptography.

#### Self-asserted Claim
Type of claim in the Sovrin network. A claim record asserted by the identity owner whose identity record it describes. For example, Alice may claim that she is a fan of Manchester United, on her own authority.

#### Self-Certification
The act of an Entity issuing a Self-Issued Credential that serves as a public Claim of conformance to a Governance Framework.

#### Self-Certification Credential
A Credential that asserts Self-Certification.

#### Self-Certification Page
A page on the website of the Issuer of a Self-Certification Credential that includes a link to the Credential and human-readable statement of the Credential.

#### Self-Issued Credential
A Credential whose Holder is the Issuer of the Credential.

#### Self-Sovereign Identity
An identity system architecture based on the core principle that Identity Owners have the right to permanently control one or more Identifiers together with the usage of the associated Identity Data. The Sovrin Governance Framework specifies two types of Identity Owners: Independents, who do not need to rely on any external administrative authority, and Dependents, who need to rely on a Guardian.

#### Service Endpoint
An addressable network location offering a service operated on behalf of an Entity. As defined in the [DID specification](https://w3c-ccg.github.io/did-spec/), a Service Endpoint is expressed as a [URI (Uniform Resource Identifier)](https://tools.ietf.org/html/rfc3986). In the Sovrin Network, a Cloud Agent uses a specific type of Service Endpoint as specified by the Sovrin Protocol.

#### SGF
Acronym for Sovrin Governance Framework.

#### SIDN
Acronym. Sovrin Identity Network; consists of multiple, distributed nodes located around the world with each having a copy of the ledger.

#### Signing Key
Sovrin identity identifier. A never-shared asymmetric private key that an identity owner uses to encrypt messages. If this key is ever compromised, the identity owner can replace it with a new one. You can read more about private keys here: goo.gl/hG4JV2

#### Single-Use Anonyms
One type of anonym. These are also known as Pairwise-Unique Identifiers and are used by the Identity Owner only for only a single digital relationship (potentially evenjust for a single interaction).

#### Social Purpose Organization
An Organization whose primary mission is service to society rather than generation of profit.

#### Sovereign Domain
The set of Agents, Wallets, Vaults, devices, services, and other digital resources over which an Identity Owner exercises sovereignty. Note that the actual sovereignty of the Identity Owner is limited to the control granted and protected by the Developer of the hardware or software being used.

#### Sovrin
The primary trademark of the Sovrin Foundation held in trust on behalf of the Sovrin Community.

#### Sovrin Agency Agreement
The contract between the Sovrin Foundation and an Agency thatdesires official recognition by the Sovrin Foundation.

#### Sovrin Board of Trustees
The set of Individuals entrusted with governance of the Sovrin Foundation under the present Sovrin governance model. The rights and responsibilities of the Sovrin Board of Trustees are specified in the Sovrin Governance Framework and its Controlled Documents.

#### Sovrin Code
The Sovrin Open Source Code or any other computer code that is functionally equivalent.

#### Sovrin Code Repository
The official version control repository for Sovrin Open Source Code and other documents of the Sovrin Foundation as designated from time to time by the Sovrin Board of Trustees. At present, this is the github repository at https://github.com/sovrin-foundation.

#### Sovrin Community
A specific Trust Community defined as the set of all Identity Owners cooperating under the Sovrin Governance Framework.

#### Sovrin Config Ledger
The subledger of the Sovrin Ledger used to record a special set of Transaction Types that are not publicly writable as they are reserved for configuration of the Sovrin Ledger. Writes to the Sovrin Config Ledger are only be made by Trustees or their Delegates.

#### Sovrin Consensus Protocol
The Byzantine fault tolerant protocol used to communicate between Nodes to maintain the Sovrin Ledger.

#### Sovrin Demo Network
A non-authoritative version of the Sovrin Ledger operated by Stewards exclusively for demonstration purposes. The Sovrin Demo Network is separate from and complementary to the Sovrin Test Network. The Sovrin Demo Network is intended to remain relatively stable for long periods while the Sovrin Test Network is used for active testing and may need to be frequently reset.

#### Sovrin Developer Agreement
The contract between the Sovrin Foundation and a Developer who desires official recognition by the Sovrin Foundation.

#### Sovrin DID
A DID that conforms to the Sovrin DID Method Specification.

#### Sovrin DID Method Specification
A Controlled Document defined by the Sovrin Technical Governance Board specifying the format, registration, and resolution of DIDs rooted in the Sovrin Ledger or a Sovrin Microledger. The Sovrin DID Method Specification must conform to the requirements of a DID method specification as specified in the [W3C DID specification](https://w3c-ccg.github.io/did-spec/).

#### Sovrin Domain Ledger
The subledger of the Sovrin Ledger used to record Identity-related Transaction Types except Payments (which use the Sovrin Payment Ledger). The Sovrin Domain Ledger is publicly readable. It is publicly writable via protection mechanisms specified in the Sovrin Governance Framework.

#### Sovrin Entity
A classification of an Entity that is described by Sovrin Identity Data including at least one Sovrin DID. A Sovrin Entity must be either an Identity Owner or a Thing. A Sovrin Entity may play the role of the Subject, Issuer, Holder, Prover, or Verifier of a Credential. Mutually exclusive with Other Entity.

#### Sovrin Foundation
The public trust organization chartered to administer Sovrin Infrastructure on behalf of the Sovrin Community. The Sovrin Foundation is the Governance Authority for the Sovrin Governance Framework and the Sovrin Web of Trust Framework. The Sovrin Foundation website is https://sovrin.org.

#### Sovrin Founding Steward Agreement
The contract between the Sovrin Foundation and a Founding Steward.

#### Sovrin Glossary
The present document. The Sovrin Glossary is a Controlled Document of the Sovrin Governance Framework and an appendix to the Sovrin Steward Agreement.

#### Sovrin Governance Framework (SGF)
The Governance Framework defined by the Sovrin Foundation to govern Sovrin Infrastructure. The Sovrin Foundation is the Governance Authority for the Sovrin Governance Framework. The Sovrin Governance Framework consists of the Sovrin Governance Framework Master Document plus the Controlled Documents listed in Appendix A of the Master Document. The Sovrin Governance Framework is also referred to as the Sovrin Trust Framework.

#### Sovrin Governance Framework Master Document
The controlling document of the Sovrin Governance Framework. Appendix A of the Master Document lists the Controlled Documents that constitute the rest of the Sovrin Governance Framework.

#### Sovrin Governing Body
An official governing body within the Sovrin Foundation. The list of official Sovrin Governing Bodies is maintained as a Controlled Document of the Sovrin Governance Framework. See Appendix A of the SGF Master Document.

#### Sovrin Identity
The subset of Sovrin Identity Data shared by a Sovrin Entity in the context of a specific Connection. To respect privacy, a Sovrin Entity may have as many Sovrin Identities as needed to maintain their desired separation of contexts.

#### Sovrin Identity Data
The collection of Identity Data, including DIDs, Public Keys, Attributes, Credentials, and Proofs, that describe a Sovrin Entity.

#### Sovrin Identity Network
Sovrin network component. (“Sovrin network” or “Sovrin”): the global identity network forself-sovereign identity based on the Sovrin ledger.

#### Sovrin Identity Owner Agreement
The contract between the Sovrin Foundation and an Identity Owner.

#### Sovrin Infrastructure
A term encompassing all of the components that constitute Sovrin as a global public utility, including the Sovrin Ledger, Sovrin Network, Sovrin Web of Trust, Sovrin Governance Framework, and the Sovrin Foundation.

#### Sovrin Infrastructure Roles
The business roles defined in the Sovrin Governance Framework, grouped as follows: Sovrin Ledger Roles, Sovrin Network Roles, Credential Exchange Roles, and Sovrin Web of Trust Roles.

#### Sovrin Ledger
The distributed, continuously-replicated global cryptographic database of Transactions maintained by Stewards operating Nodes communicating with the Sovrin Consensus Protocol. The Sovrin Ledger consists of four subledgers: the Sovrin Config Ledger, Sovrin Node Ledger, Sovrin Domain Ledger (also called the Sovrin Main Ledger), and Sovrin Payment Ledger. Only the Sovrin Domain Ledger and Sovrin Payment Ledger accept publicly available Transaction Types. See [Sovrin Ledger Access Policies](https://docs.google.com/document/d/1jMVkRWaK2s1sJaLP6LhEJgCY2AIZ7VTqCJeaMF6jKEM/edit?usp=sharing).

#### Sovrin Ledger Fee
The fee in fiat currency, Sovrin Tokens or other units of economic value for making a write to the Sovrin Ledger. See Sovrin Governing Bodies for more information about the process of governing Sovrin Ledger Fees.

#### Sovrin Ledger Fee Table
A table of Sovrin Ledger Fees determined by the Sovrin Foundation and stored on the Sovrin Config Ledger.

#### Sovrin Ledger Roles
The business roles defined at the Sovrin Ledger layer of Sovrin infrastructure. These include the Sovrin Foundation, Stewards, Transaction Authors, and Transaction Submitters.

#### Sovrin Legal Agreements
The set of contracts between Members and the Sovrin Foundation as defined in the appendices of the Provisional Trust Framework or the Sovrin Trust Framework. Includes the Sovrin Identity Owner Agreement, the Sovrin Founding Steward Agreement, theSovrin Agency Agreement, and the Sovrin Developer Agreement.

#### Sovrin Main Ledger
Synonym for Sovrin Domain Ledger.

#### Sovrin Main Network
The authoritative version of the Sovrin Ledger operated by Stewards hosting Validator Nodes. The Sovrin Main Network is separate from and complementary to the Sovrin Test Network and the Sovrin Demo Network.

#### Sovrin Microledger
A Microledger that uses a Sovrin DID and conforms to the specifications for Sovrin Microledgers defined by the Sovrin Technical Governance Board. A Sovrin Microledger is separate (“off-ledger”) from the Sovrin Ledger, however future Transaction Types for the Sovrin Ledger may include special features to support Sovrin Microledgers.

#### Sovrin Network
The Sovrin Ledger and its Nodes plus the set of all Agents that communicate with the Sovrin Ledger and with each other using the Sovrin Protocol.

#### Sovrin Network Roles
The business roles defined at the Sovrin Network layer of Sovrin infrastructure. These include Agencies and Developers.

#### Sovrin Node Ledger
The subledger of the Sovrin Ledger used to record Transactions identifying the authorized Nodes. The Sovrin Node Ledger is publicly readable but not publicly writable; writes may only be made by Trustees or Stewards.

#### Sovrin Open Source Code
The computer code base governed by the Sovrin Technical Governance Board and distributed under an Open Source License to operate Nodes, Agents, and Wallets. The Sovrin Open Source Code is currently maintained primarily at the Hyperledger Indy Project managed by Linux Foundation and secondarily at the Sovrin Code Repository managed by the Sovrin Foundation.

#### Sovrin Payment Ledger
A subledger of the Sovrin Ledger used to record Payment Transactions. The Sovrin Payment Ledger is publicly readable. It is publicly writable via Sovrin Ledger Fees or via another permissioning model specified in the Sovrin Governance Framework.

#### Sovrin Principle
A tenet guiding governance of the Sovrin Community. The Core Principles are published in section 2 of the Sovrin Governance Framework.

#### Sovrin Promise
This is the contractually-binding obligation of all Identity Owners to abide by the purpose, principles, and policies of the Sovrin Trust Framework.

#### Sovrin Protocol
The Open Standard Agent-to-Agent Protocol for communicating between Agents or performing Transactions with the Sovrin Ledger as defined by the Sovrin Community and implemented in the Sovrin Open Source Code.

#### Sovrin Protocol Token
A cryptographic token that may be exchanged using the Sovrin Protocol via Transactions with the Sovrin Payment Ledger. The Sovrin Protocol Token implements specifications defined by the Sovrin Technical Governance Board and policies defined by the Sovrin Governance Framework.

#### Sovrin Provisional Trust Framework
The formal name for the first version of what is now the Sovrin Governance Framework. The SPTF was approved by the Sovrin Board of Trustees on 28 June 2017.

#### Sovrin Service Provider
A Steward, Agency, or Developer.

#### Sovrin Steward
An organization that has agreed to operate a node on the Sovrin network and has permission to do so from the Sovrin Foundation.

#### Sovrin Steward Agreement
The legal contract between the Sovrin Foundation and a Steward. The Sovrin Steward Agreement incorporates the Sovrin Governance Framework and the Sovrin Glossary as appendixes.

#### Sovrin Technical Governance Board (TGB)
The set of technical experts appointed by the Sovrin Foundation Board of Trustees to oversee the technical design and architecture of Sovrin Infrastructure. The TGB is one of the Sovrin Governing Bodies.

#### Sovrin Test Network
A non-authoritative version of the Sovrin Ledger deployed for the purposes of testing new versions of the Sovrin Open Source Code and preparing new Stewards for activation on the Sovrin Main Network. See also Sovrin Demo Network.

#### Sovrin Token
Synonym for Sovrin Protocol Token.

#### Sovrin Trust Framework
Synonym for Sovrin Governance Framework. This was the term used for the first generation framework, formally known as the Sovrin Provisional Trust Framework, approved by the Sovrin Board of Trustees in July 2017.

#### Sovrin Trust Graph
The graph of all Trust Anchor Connections that forms the Sovrin Web of Trust.

#### Sovrin Trust Mark
A trademark, design mark, logo, icon, or other trust mark defined by the Sovrin Foundation for indicating conformance with the Sovrin Governance Framework.

#### Sovrin Trust Mark License
The license governing the use of a Sovrin Trust Mark as published on the Sovrin Foundation website.

#### Sovrin Trustee
An Individual who is a member of the Sovrin Foundation Board of Trustees.

#### Sovrin Web of Trust
The global network of interwoven Trust Communities implementing the Sovrin Web of Trust Model.

#### Sovrin Web of Trust Framework
The Domain-Specific Governance Framework defined by the the Sovrin Foundation to implement the Sovrin Web of Trust Model by specifying Credentials and protocols for decentralized discovery, navigation and verification across other Domain-Specific Governance Frameworks and their Trust Community Members.

#### Sovrin Web of Trust Model
The decentralized, non-hierarchical trust model defined by the Sovrin Governance Framework that combines a cryptographic trust layer achieved using the Sovrin Ledger, Agents and Connections with a human trust layer achieved via Credential Exchange. The Sovrin Web of Trust Model does not rely on a single root of trust, but empowers any Sovrin Entity to serve as a root of trust and enables all Sovrin Entities to participate in any number of interwoven Trust Communities, either informally or as defined by Domain-Specific Governance Frameworks. See the Sovrin Web of Trust Model white paper.

#### Sovrin Web of Trust Roles
The business roles defined at the Sovrin Web of Trust layer of Sovrin Infrastructure. These include Governance Authorities, Trust Anchors, Credential Registries, Auditors, and Auditor Accreditors.

#### Spectrum of Identity
According to this blog post: https://identitywoman.net/the-identity-spectrum/ there is a spectrum to a person's identity. This includes which portions we present to others, which parts we conceal, which parts are validated, understood, accepted and more.

#### SSI
Acronym for Self-Sovereign Identity.

#### Stakeholder
Within Indy: Someone who submits bugs, asks questions, advocates for features, and participates in debates, design discussions, working groups, and so forth. Usually no github account is required; but the individual will need at least a Linux Foundation account for jira.

#### State Proof
A Proof requested from a Node that provides cryptographic verification that the response reflects the current state of the Sovrin Ledger.

#### State Proof
A Proof requested from a Node that provides cryptographic verification that the response reflects the current state of the Sovrin Ledger.

#### Steward
An Organization approved by the Sovrin Foundation to operate a Node. A Steward must meet the qualifications defined in the Steward Business Policies and the technical requirements defined in the Steward Technical Policies (see Appendix A of the SGF Master Document). A Steward must also execute the Sovrin Steward Agreement.

#### Steward Obligations
The set of obligations of a Steward. Defined under the heading of the same name in the Sovrin Trust Framework.

#### Steward Qualifications
The set of qualifications for an Organization to become a Steward. Defined under the heading of the same name in the Sovrin Trust Framework.

#### Subject
The Entity whose Attributes are asserted by a Credential. Based on the definition provided by the [W3C Verifiable Claims Working Group](https://www.w3.org/2017/vc/).

#### Subject
The Entity whose Attributes are asserted by a Credential. Based on the definition provided by the W3C Verifiable Claims Working Group.

#### Submitter
Within Indy: someone who donates code, documentation, and other tangible artifacts via pull request. Any github account can make a private fork, submit a pull request, or do a code review.

#### TDE
Engineering Term. Token Term. Acronym. Token Distribution Event - this event shall occur following the Hardening Complete milestone achievement.

#### Technical Governance Board
The set of technical experts appointed by the Board of Trustees to oversee the technical design and architecture of the Sovrin Network, the Technical Policies in the Sovrin Trust Framework, and the Sovrin Open Source Code.

#### Technical Policies
The set of policies, defined under the heading of the same name in the Sovrin Trust Framework, that specify the technical requirements of the Sovrin Network.

#### TGB
Acronym for Sovrin Technical Governance Board.

#### Thing
A Sovrin Entity that is not an Individual or an Organization. A Thing cannot be held legally accountable. A Thing may be an animal (e.g., pet, livestock), a natural or physical object (e.g., mountain, house, car, phone), or a digital or logical object (e.g., software program, network service, document, data structure, concept). In Self-Sovereign Identity, a Thing is represented by an Agent who can form Connections, exchange Credentials, and communicate securely even if the Thing itself is not network-enabled. Mutually exclusive with Identity Owner. See also Thing Controller.

#### Thing Controller
An Identity Owner that controls the Sovrin Identity Data for a Thing. The Thing Controller may or may not be the legal owner of the Thing, however the Thing Controller may still be legally responsible for actions Agent(s) take on behalf of the Thing.

#### Tombstone
A mark associated with a Transaction to suggest that the Transaction should no longer be returned in response to requests for read access. In the Sovrin Ledger, a Tombstone may be either a Node-Specific Tombstone or a Ledger-Wide Tombstone. Tombstones do not modify the Sovrin Ledger—only the behavior of a Node that serves data from the Ledger and that wishes to honor the Tombstone’s semantics. In the general context of Self-Sovereign Identity, Tombstones are undesirable, as they represent a vector for censorship. However, they may be used by a specific Steward that is forced to comply with a legal demand to stop returning a specific Transaction, such as a Transaction containing data that is locally considered Personal Data or that is illegal or violates the Transaction Author Agreement in some other way. In such a case, other Stewards may not face the same legal demands and may take different action.

#### Transaction
A record of any type written to the Sovrin Ledger. Transactions are classified by Transaction Type.

#### Transaction Author
The Entity initiating a Transaction. Most (but not all) Transaction Authors will be Identity Owners. See also Transaction Submitter.

#### Transaction Author Agreement
The legal agreement between the Sovrin Foundation and any Transaction Author which must be digitally signed or otherwise explicitly agreed to by the Transaction Author in order to write a Transaction. See [Sovrin Ledger Access Policies](https://docs.google.com/document/d/1jMVkRWaK2s1sJaLP6LhEJgCY2AIZ7VTqCJeaMF6jKEM/edit?usp=sharing).

#### Transaction Data
The set of data and metadata processed by a Node in order to validate and write a Transaction.

#### Transaction Submitter
An Identity Owner authorized under Permissioned Write Access to submit a Transaction to a Validator Node. A Transaction Submitter is only necessary as a separate Sovrin Ledger Role under Permissioned Write Access. Under Public Write Access, any Transaction Author can also serve as a Transaction Submitter.

#### Transaction Type
A classification of a Transaction. Authorized Transaction Types are specified by the Sovrin Technical Governance Board in the Steward Technical Policies (see Appendix A of the SGF Master Document). For example supported Transaction Types include: NYM (for writing a DID), ATTRIB (for writing an Attribute), CLAIM_DEF (for writing a Credential Definition), SCHEMA (for writing a Schema), REVOC_REG_DEF (for writing a Revocation Registry Definition), and REVOC_REG_ENTRY (for writing a Revocation Registry Entry).

#### Transparent Proof
A Proof that uses a conventional digital signature scheme and therefore does not provide [selective disclosure](https://en.wikipedia.org/wiki/Selective_disclosure) any of the information in a Credential, including the identity of the Identity Owner providing the Proof. Mutually exclusive with Zero Knowledge Proof.

#### Trust Anchor
An Issuer considered authoritative for a particular set of Claims or Credentials. An Issuer may be: a) informally recognized as a Trust Anchor by one or more Verifiers, b) formally designated as a Trust Anchor by a Governance Authority, or c) Accredited as a Trust Anchor by an Auditor. (Note: In the first version of the Sovrin Trust Framework, this term was used to describe what is now defined as an Authorized Transaction Author. That usage is now deprecated.)

#### Trust Anchor Connection
An Identity Owner who accepts a Trust Anchor Invitation (which requires agreeing to the Trust Anchor Obligations) now has a Trust Anchor Connection and becomes a Trust Anchor.

#### Trust Anchor Credential
A Credential issued by a Governance Authority or an Auditor asserting that an Issuer is Accredited to serve as a Trust Anchor.

#### Trust Anchor Identity
A specific DID selected by an Identity Owner to serve as the owner’s exclusive Sovrin Identity in the role of Trust Anchor.

#### Trust Anchor Invitation
This can happen when a Trust Anchor believes another Identity Owner is qualified to be a Trust Anchor, the Trust Anchor may issue this invitation.

#### Trust Anchor Obligations
The set of obligations of a Trust Anchor. Defined under the heading of the same name in the Sovrin Trust Framework.

#### Trust Anchor Qualifications
The set of qualifications for an Identity Owner to become a Trust Anchor. Defined under the heading of the same name in the Sovrin Trust Framework.

#### Trust Anchor Verinym
A type of Verinym. This is the DID of a Trust Anchor itself. This DID is required to have at least one Public Claim asserting the Trust Anchor’s Legal Identity.

#### Trust Assurance
A means by which one Entity develops confidence that another Entity is complying with the rules of a Governance Framework. See Sovrin Trust Assurance Framework.

#### Trust Community
A set of Identity Owners cooperating to achieve their mutual trust objectives. An informal Trust Community may not have an official structure or a Governance Framework. A formal Trust Community consists of the set of all Identity Owners participating in a Governance Framework. See also Sovrin Community.

#### Trust Community Member
An Identity Owner who has agreed to participate in a Trust Community. Participation may be informal, such as via a terms of service or other mechanism, or formal, such as via a legal contract or membership agreement. The Sovrin Community is a formal Trust Community governed by the Sovrin Governance Framework.

#### Trust Framework
Synonym for Governance Framework, particularly when used in the context of digital identity systems.

#### Trustee
Sovrin infrastructure participant. An individual member of the Board of Trustees that governs the Sovrin Foundation. All Trustees are automatically Trust Anchors.

#### Unaccredited
The status of an Entity not being Accredited.

#### USAA
Acronym. US Automobile Association, financial services for the US Armed Forces.

#### UUID
A globally unique identifier. For more informaton see "UUID" at Wikipedia: goo.gl/bLv7bh

#### Validator Node
A Node that validates new Transactions and writes valid Transactions to the Sovrin Ledger using the Sovrin Consensus Protocol. A Node may be able to operate as either a Validator Node or an Observer Node, but at any one point in time it must operate in only one of these two roles. A Steward may run only one Validator node.

#### Vault
A term used to describe cryptographically-protected secure storage that is outside a Wallet but still accessible to and/or managed by an Agent. A Vault may (but is not required to) contain a Wallet. A Vault is often used for secure storage of digital assets too large to fit into a Wallet.

#### VCWG
Acronym. Verifiable Claims Working Group.

#### Verifiable Claim _(deprecated)_
Type of claim in the Sovrin network. (aka third party claim): a claim record asserted by an identity owner other than the identity owner whose identity record it describes. The claim is verifiable in the sense that its origin may be verified by its digital signature on the Sovrin identity record.A Claim that includes a Proof from the Issuer.

#### Verifiable Credential
A Credential that includes a Proof from the Issuer. Typically this proof is in the form of a digital signature. In Sovrin Infrastructure, a Verifiable Credential uses Zero Knowledge Proofs by default and may be verified by the Issuer Public Key stored in the Credential Definition on the Sovrin Ledger. Based on the definition provided by the [W3C Verifiable Claims Working Group](https://www.w3.org/2017/vc/).

#### Verification Key
Sovrin identity identifier. Also called the "public key" or a "verKey" for short. A published asymmetric public key that’s used to decrypt a message. Decryption with this key proves authenticity, because the message’s sender necessarily held the corresponding signing key. Verification keys can be revoked; the current verification key fora given identifier must be looked up on the Sovrin ledger. More information on public key cryptology can be found here: goo.gl/5wEq6a

#### Verifier
A party who requests a Credential or Proof from a Holder and verifies it in order to make a trust decision about a Sovrin Entity. Based on the definition provided by the [W3C Verifiable Claims Working Group](https://www.w3.org/2017/vc/). See also Relying Party.

#### Verinym
A DID that it is directly or indirectly associated with the Legal Identity of the Identity Owner. Mutually exclusive with Anonym and Pseudonym.

#### Virtual Vault
The collection of all Vaults used by an Entity. For example, the Virtual Vault for an Individual Identity Owner would include the Vaults on all that person’s devices, plus any cloud-based Vaults that are accessible to and/or managed by the Identity Owner’s Agent(s). See also Sovereign Domain.

#### Wallet
A software module, and optionally an associated hardware module, for securely storing and accessing Private Keys, Link Secrets, other sensitive cryptographic key material, and other Private Data used by an Entity. A Wallet is accessed by an Agent. In Sovrin infrastructure, Wallets implement the emerging DKMS standards for interoperable decentralized cryptographic key management.

# Web of Trust
See Sovrin Web of Trust Model.

#### Zero Knowledge Proof
A Proof that uses special cryptography and a Link Secret to support Selective Disclosure of information about a set of Claims from a set of Credentials. A Zero Knowledge Proof provides cryptographic proof about some or all of the data in a set of Credentials without revealing the actual data or any additional information, including the identity of the Prover. Mutually exclusive with Transparent Proof.

#### Zero Knowledge Proof Cryptography
According to Wikipedia: "...a zero-knowledge proof or zero-knowledge protocol is a method by which one party (the prover) can prove to another party (the verifier) that a given statement is true, without conveying any information apart from the fact that the statement is indeed true..."

#### ZKP
Acronym. Zero Knowledge Proof.
