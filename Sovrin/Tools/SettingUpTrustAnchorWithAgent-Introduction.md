# Setting up a Trust Anchor with an Agent

## Introduction

A trust anchor, like a trustee, steward or identity owner, is a role on the Sovrin ledger.  It has capabilities to post transactions to the ledger, but less than a trustee or steward does, limited to posting transactions directly related to itself and its interactions with its customers.  Along with identity owners, it is able to set up agents for itself, which are automated computer processes that are authorized to post transactions to the ledger on its behalf.  Please refer to the “Sovrin Roles” Appendix for a breakdown of Sovrin roles.

In order to configure a trust anchor with an agent, there are five main steps:

* Create the agent software
* Place the trust anchor credentials onto the Sovrin ledger
* Place the agent attributes (IP address, etc.) onto the Sovrin ledger
* Start the agent process
* Issue and respond to connection requests to clients
