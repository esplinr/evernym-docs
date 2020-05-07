## What are "Connections"? 

Connections are relationships between 2 entitites, in which encryption is used to establish a digital channel to transmit information or data. 

### Anywise Relationships

A non-reciprocal relationship rooted in the Identity of one party, where the other party is the public (a faceless “other” that can be instantiated without bound). For an Organization to issue publicly verifiable Credentials, its issuer DID must be on a public ledger such as the Sovrin Ledger. It is thus an Anywise DID—a DID to which any other Entity may refer without coordination. (“Public” is a casual synonym for “Anywise”, but is problematic because something may be visible to the world but only usable in one relationship, or used in many relationships but not visible to the world.)

### Pairwise Relationships

A direct relationship between exactly two Entities. Most relationships in the Sovrin ecosystem are Pairwise, even when one or both Entities are not Individuals. For example, business-to-business relationships are pairwise by default. A DID or a Public Key or a Service Endpoint is Pairwise if it is used exclusively in a Pairwise relationship.

## Relationship schematics

Relationships between pairwise and non-pairwise entities can have several different models. 

<img src="https://s3-us-west-2.amazonaws.com/static.pps.evernym.com/training/ssi-basics/basics-connections-img-01.png" height="400px">

<img src="https://s3-us-west-2.amazonaws.com/static.pps.evernym.com/training/ssi-basics/basics-connections-img-02.png" height="400px">

<img src="https://s3-us-west-2.amazonaws.com/static.pps.evernym.com/training/ssi-basics/basics-connections-img-03.png" height="400px">

<img src="https://s3-us-west-2.amazonaws.com/static.pps.evernym.com/training/ssi-basics/basics-connections-img-04.png" height="400px">


## Making Connections

Connections are established by one party extending a "Connection Invitation" to another, which is done through various means. In the examples of the Verity UI demo software, this is accomplished by using a QR code, which embeds the Connection Invitation details into the image, allowing a QR reader to deconstruct the Connection Invitation and respond to it. When the invited party "accepts" the Connection Invitation, a unique cryptographic channel gets created between the Inviter and the Invitee, through which data can then be sent in the form of Proofs, Proof Requests, Credential Offers, Credential Issuance, and Validated Response Messages. This Connection can be maintained and re-used, or deleted by the Invitee at any point.

## Enterprise to Consumer Connections

In an Enterprise to Consumer model, the consumer uses a physical mobile wallet app, cloud wallet, or a combination of both to receive and respond to Connection Invitations. A Connection Invitation, unlike a telemarketer, can never come to a consumer in an unsolicited manner! There's no global "phone number" to find you. Typically, a consumer will use a mobile wallet app, such as Evernym's Connect.Me (now available for iOS and Android), to scan a QR code offered by the Connection Inviter, which will then prompt the consumer to accept the Connection Invitation. Other ways to receive a Connection Invitation are through a mobile link (which opens the Connect.Me app) or to receive that same link through an SMS text message. However the process initiates, the Connection will be established and that Connection will be a conduit for all further exchanges from the Enterprise to the Consumer, which can come in the form of Credential Offers, Proof Requests, and Provable Questions. Because this is a Self-Sovereign Identity world, the Consumer can delete the Connection with the Enterprise *at any time* and still maintain all Credentials associated with that Connection. That means that you can keep your Credentials but delete the Connection with the Issuer of those Credentials, in case at any point they become unwanted (in the case of "spamming" or unsolicited advertisements through the Connection).

## Enterprise to Enterprise Connections

Enterprise to Enterprise Connections are executed in the same way as Enterprise to Consumer, with a few important differences! An Enterprise Connection is generally (but not necessarily) executed between 2 automated systems, in which both entitites possess Enterprise Wallets and some sort of server codebase that is "listening" for Connection Requests from external sources. This listener codebase is also able to filter out requests from unrecognized DID's, alllwing it to "white-list" only requests for DID's that it trusts. Enterprise to Enterprise Connections can be used to automate many time-consuming elements of commerce, including the exchange of regulatory Credentials or certificates with complex pre-requisites in a fast and efficient manner, with a high level of trust. The Connection invitations and acceptance is able to be automated, removing the individual choice from the process and allowing automation to perform the tasks at a high level of efficiency. Enterprise to Enterprise automated Credential Exchange is an emerging field of supply chain business model that is being explored by multiple international commerce developers.