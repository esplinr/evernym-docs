# Introduction

This manual helps customers understand Evernym’s support obligations, and how we are organized to fulfill those obligations.


## Support Services

Evernym provides support from the world’s experts in Self Sovereign Identity. Support for each product is tailored to that product, whether it is deployed on-premise or via SaaS. Our contractual support policies are available in the [Support Services Addendum](https://www.evernym.com/addendum-support-services/) to our customer agreement.

Some customers may choose to contract for additional services that would be handled separate from the core support offering described in this document, such as:
* an assigned support engineer to oversee the account and verify that all support escalations are appropriately handled,
* for specific training on credentials, governance frameworks, self-sovereign identity, or our products,
* or for other professional services to assist with customized customer solutions.

### Contacting Support

We offer multiple ways to engage with our support team.

#### Email Support
Our regular support process is email based. Most support inquires should be directed to support@evernym.com. Creating email based support tickets allows us to track the concern to a satisfactory conclusion.

#### Chat Support
Customers can also receive an invitation to our Slack Workspace for customer collaboration. Evernym Customer Slack is great for asking non-urgent questions and collaborating on a problem. If a problem proves complicated, we will create a support ticket that we can track to ensure a quality response.

All customers have access to the channel #support-questions. This is where you can ask for help, and a member of Evernym's team will respond. If you prefer to make your request in private, then we recommend using our email support. We can provide a private Slack channel as an additional service.

Please avoid directly messaging Evernym employees in Slack, as that prevents other employees from helping answer your question. It is fine to collaborate together in a private channel, but understand that the conversation will need to transition back to the main channel or to an email ticket when that employee needs to hand it off to a team mate.

#### Emergency Escalation
Customers who are licensed for production support will receive the emergency escalation email address at the time they deploy to production. This address is used for pager support, where any message sent will be routed to the mobile device of the on-call support representative. It is the fastest way to get help.

Standard production support entitles customers to raise issues categorized as SEV-1 (Production Outage). Premium support allows raising SEV-1 (Production Outage) and SEV-2 (Production Impact). 

Any message sent to the emergency escalation email address will be copied to support@evernym.com so that a ticket is created.

### Limitations on Support

Our support professionals want to assist our customers, but are limited based on the following:

* Products are supported according to the expectations set by their stage in the product lifecycle.
* Support is for the uses of the product described in the contract addendum.
* Support includes use of the software through the published APIs, but not changes made to the code base outside of the documented customization interfaces.
* Use of artifacts not distributed by Evernym is not supported unless through an ancillary agreement with the customer.
* Customers must provide instructions for reproducing issues starting with a clean version of the product with no customizations on a supported environment.
* Evernym support engineers will not debug customer code except under a separate agreement.
* Support is for defined environments. Customers can use other environments, but must reproduce issues on the defined supported environment before contacting Evernym support engineers.
* Support outside of US business hours is only provided by explicit agreement, except at Evernym's discretion.

### Categorizing Issue Severity

When a customer faces an issue with an Evernym product, the customer can expect assistance based on the severity of the issue and the support level of the customer’s subscription. This section sets expectations for how Evernym intends to respond to issues, but Evernym intends to exceed these expectations whenever possible.

Severity 1: Interruption to a production system
* Within the contractual "Triage" commitment, Evernym will notify the customer of the results of the issue triage and explain next steps.
* The issue will be transferred between Evernym customer service offices as each office finished the business day in their timezone.
* Evernym will provide follow-up status updates regularly, until production service is restored. The issue will then be downgraded to a lower severity.

Severity 2: Significant impact to a production system
* Within the contractual "Triage" commitment, Evernym will notify the customer of the results of the issue triage and explain next steps.
* If the customer is subscribed to 24x7 support, the issue will be transferred between Evernym customer      service offices as each office finished the business day in their timezone.
* If the customer is subscribed to business hours support, then the time periods will be based on US         business hours.

Severity 3: Transient or minor issues with production systems
* The issue will be worked during business hours, and the customer will be updated regularly.

Severity 4: Issues impacting non-production systems
* The issue will be worked during business hours, and the customer will be updated regularly.

Severity 5: Normal inquiry (including questions and normal bug reports)
* Until the issue is resolved, Evernym will provide follow-up status updates as new information is available.

### Disruptions to Hosted Products (SaaS)

#### SaaS Maintenance Window

Most maintenance to Evernym systems is performed transparently to users, but sometimes systems must be brought down. For this purpose, Evernym has scheduled a weekly maintenance window on Tuesdays from 9PM-10PM Mountain Time. We strive to minimize impairment to service, so it is unlikely that you will notice an interruption during the maintenance window.

#### Incident Policy

If usage of an Evernym hosted product is impaired outside of the maintenance window, Evernym will take the following actions.

Severity 1: Outages
* Upon recognizing an outage, Evernym will immediately update our service availability dashboard and issue a notification to impacted customers using our customer chat.
* Evernym will provide update notifications every 2 hours through the customer chat until service is restored.
* Within one week of the outage, Evernym will publish a post-mortem incident analysis.
* Evernym will then notify the technical contact at each customer account in writing. This will usually be provided as part of our regular newsletter.

Severity 2: Service Degradation (including slowed performance or impaired features)
* Upon recognizing a service degradation, Evernym will immediately update our service availability dashboard and issue a notification via the customer chat.
* Evernym will provide updates notifications every 4 hours through the customer chat until service is normalized.
* Within one week of the outage, Evernym will publish a post-mortem incident analysis.
* Evernym will then notify the technical contact at each customer account in writing. This will usually be provided as part of our regular newsletter.

Severity 3: Other Incidents
* Customer communication for other incidents will be handled on a case by case basis.

### Engaging with Customer Support

Your collaboration with Evernym support will be more productive if you follow these guidelines:

1. The support issue should be raised by your designated technical contact, so we know that they represent you.
1. Communicate in English.
1. Be polite, even when you are under pressure.
1. Recognize the support level to which you are subscribed.
1. Provide adequate information to investigate any issue so that we minimize rounds of back-and-forth communication.
1. Send a separate email for each issue so that it is easier for us to route it to the correct member of the team.

When raising an issue, we recommend that you follow this template:
* Summarize the problem.
* What steps did you follow?
* What behavior did you observe?
* What behavior did you expect?
* What is the impact?
* Describe the environment.
  * Client environment:
    * What device, operating system, and browser? Please include relevant version numbers.
  * Evernym environment:
    * Which product are you using? Please include relevant version numbers.
    * When applicable, include the URL of the servers and endpoints that are being accessed.
* Other useful data includes:
  * Any relevant logs,
  * A screen shot.

If you assign an internal issue number to the issue, please provide it so that we can track it alongside our issue number and refer to it in communications with you.

If you are unable to fulfill these expectations, we will still try and help. But please understand that our ability to assist will be constrained.


## Vulnerability Reporting

Customers choose Evernym’s products because they can fundamentally improve the security of networked environments. Our teams strive to follow industry best practices for proactive security scans, code analysis, and third party audits. Because so much of Evernym’s code is open and available to inspection, we regularly receive reports of security concerns and we address these concerns as a high priority. Our team is actively engaged with upstream open source communities used by our products to ensure a high level of security throughout our product stack. Evernym does not pay for vulnerability reports in our open code bases, but we do gladly accept pull requests.

We would like the chance to address security concerns before they are reported publicly. We expect our customers to privately disclose issues to us through our customer support. Others are encouraged to privately report any security concerns by sending an email to security@evernym.com.

Upon receiving a security report, Evernym commits to:

* Triage the security report within 3 business days, and respond to the reporter.
  * The triage will consist of an initial prioritization assessment and identification of next steps.
* Prioritize the fix for an appropriate product release (where the scope of the fix matches the expectations set by the above description of versions).
  * Per our security guidelines, Security Severity 1 issues will be fixed in the next possible release (recognizing that backwards incompatible changes cannot be included in a service pack). Mitigation strategies will be disclosed as soon as they are available.
  * Security Severity 2 issues will be fixed in the next Major / Minor version, but not included in a service pack.
  * Security Severity 3 issues will be addressed when possible.
* Publicly disclose the vulnerability after a mitigation has been identified or a fix has been released. If such disclosure will take more than 90 days, we commit to discuss the timeline of the disclosure with the reporter.

Due to the low quality of the automated security scans that we have submitted to us, we do not treat them with the same priority as a clear demonstration of a product vulnerability.

### Categorizing Security Issues

* Severity 1: Exploitation is straightforward and would result in a severity 1 security incident.
* Severity 2: Exploitation is difficult, and would result in a severity 1 security incident.
* Severity 3: Exploitation is unlikely to result in a severity 1 security incident.
* Severity 4: Routine security notifications and advisories with minimal consequences.

### Categorizing Security Incidents

* Severity 1: Any security breach where confidentiality or information integrity is compromised.
* Severity 2: Identification of a significant security vulnerability with no evidence of having been exploited.
* Severity 3: Other events that impact system security.

We will proactively notify our customers about severity 1 incidents. We will include information about other incidents in our normal customer communications.


## Product Lifecycle

Each release of an Evernym product goes through a lifecycle consisting of six stages:

* Research and Development (R&D)
  * Evernym may engage customers in order to receive feedback to guide development, but no support is offered. Under no circumstances is Evernym willing to provide support for an R&D product to be used in production. After the feedback is provided, all copies of the product should be destroyed.
* Early Access Support (EA)
  * As product development progresses toward completion, Evernym may allow customers to evaluate the product in more detail and use it in limited production scenarios.
  * Customer participation in an EA program will depend on their meeting the admittance criteria as defined by Evernym. The policies for the EA program for each product will be individually defined, including who can participate in the program, what product uses have been tested, how stable development interfaces will be, how to receive help with the EA product, and how feedback should be provided.
  * No long term support of EA versions is offered; at the conclusion of the program, participants are expected to upgrade to the fully supported release or discontinue use of the product.
* Full Support
  * When a product is in full support, it is intended for production use. Support is offered through standard channels. The product will continue to be enhanced with features and fixes.
* Limited Support
  * Customers are encouraged to migrate off of the product version.
  * Only security fixes will be made to the product—no new features or general bug fixes will be provided.
  * Evernym will assist customers by answering questions about the product based on the documentation.
* Documentation Support
  * Customers are strongly encouraged to migrate off of the product version.
  * No code changes will be made to the product.
  * Evernym will assist customers by answering questions about the product based on the documentation.
* End-of-Life
  * Evernym may decommission support systems and retire documentation.

In addition to product versions, the lifecycle also applies to products as a whole, and their component features. For example, REST APIs will be versioned, supported, and deprecated in a similar way to the product of which they are a part.

Customers can see where a product, version, or feature is in its lifecycle by referencing the [Support Status document](Support-Status.md).

Before a product, version, or feature leaves Full Support status, Evernym will notify the technical contact at each customer account in writing. This will usually be provided as part of our regular newsletter. We will provide similar notifications as products move through the later stages of the product lifecycle.


## Product Versioning

Evernym uses version numbers to indicate the types of changes in a release. A version number consists of the following components: Major.Minor.Service Pack.Hotfix

Major Release
* Major releases may have backwards incompatible API changes or major changes to the user experience.
* Customers are encouraged to upgrade to the latest major version after appropriate testing.

Minor Release
* Minor releases may have new features that will require code or process changes to adopt, but existing uses should continue to work without modification.
* Customers are encouraged to stay on the latest minor release within a major release family.

Service Pack Release
* Service packs only contain bug fixes.
* Upgrading to a service pack should be low-risk.
* Customers are encouraged to quickly adopt the latest service pack release.

Hotfix Release
* Hotfixes include a patch for a specific problem. Hotfixes are delivered quickly, with minimal regression testing.
* Hotfixes are often provided during the R&D stage of the lifecycle.
* Hotfixes are not delivered except as coordinated with an assigned support engineer.
* Customers are expected to upgrade to the next service pack release that contains the fix included in the hotfix once the service pack is available.
