**Q. What is an agency, and how does it differ from an agent?**

**A.** When you write some code and configure your VCX libraries for it, what you are doing is setting up an enterprise edge agent. This communicates with the Sovrin ledger when needed, as shown on the diagram below. For agent-to-agent communications it passes data through cloud "agencies". These are not much more than store-and-forward devices that we maintain for this purpose. In addition to facilitating communications for mobile edge devices, this method provides an anonymizing layer that can help prevent cross-correlation between colluding enterprises by user endpoints.

![Agents and Agencies](https://s3.us-east-2.amazonaws.com/static.evernym.com/images/FAQ/agents+and+agencies.png){:width="50%"}

Evernym customers are provided with cloud agencies, as a service. There is currently no open-source equivalent. There are other implementations for agent-to-agent communications being developed, but we consider this to be superior to other options.

More detailed information on agents and agencies is [here](https://github.com/hyperledger/aries-rfcs/blob/master/concepts/0004-agents/README.md).
