## Agents and Agency

What is an Agent? Who manages the messages between Enterprise and Consumer? How does a Connection Request get from a server to my phone? In order to send Connection Requests, Credential Offers, Proof Requests, and Structured Messages there must be some interacting server that manages requests. Much like a web server, an Agency Service can handle traffic of requests and messages that go back and forth between Enterprise/Consumer and Enterprise/Enterprise. The Evernym Agency Service is proprietary code that we run for you when you send your requests between Connect.Me and your Verity UI or VCX application. 


### Enterprise Agency Service

The Enterprise Agency Service handles outgoing and incoming requests from Enterprise customers, in which they have some piece of code running LibIndy or LibVCX in order to communicate with a Connect.Me user.

### Consumer Agency Service

The CAS is designed only to communicate with the Consumer wallet app (Connect.Me) and control the messages that occur between the EAS and the Identity Owner. 