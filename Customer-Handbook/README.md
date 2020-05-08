# Introduction

This guidebook helps customers understand Evernym’s support obligations, and how we are organized to fulfill those obligations.

## Product Lifecycle

Each release of an Evernym product goes through a lifecycle consisting of six stages:

* Research and Development (R&D)
  * Evernym may engage customers in order to receive feedback to guide development, but no support is offered. Under no circumstances is Evernym willing to provide support for an R&D product to be used in production. After the feedback is provided, all copies of the product should be destroyed.
* Early Access Support (EA)
  * As product development progresses toward completion, Evernym may allow customers to evaluate the product in more detail and use it in limited production scenarios.
  * Customer participation in an EA program will depend on their meeting the admittance criteria as defined by Evernym. The policies for the EA program for each product will be individually defined, including who can participate in the program, what product uses have been tested, how stable development interfaces will be, how to receive help with the EA product, and how feedback should be provided.
  * No long term support of EA versions is offered; at the conclusion of the program, participants are expected to upgrade to the fully supported release or discontinue use of the product.
* Full Support
  * When a product is in Full Support, it is intended for production use. Support is offered through standard channels. The product will continue to be enhanced with features and fixes.
* Limited Support
  * Customers are encouraged to migrate off of the product version.
  * Only security fixes will be made to the product—no new features or general bug fixes will be provided.
  * Evernym can assist customers by answering questions about the product based on the documentation.
* Documentation Support
  * Customers are strongly encouraged to migrate off of the product version.
  * No code changes will be made to the product.
  * Evernym can assist customers by answering questions about the product based on the documentation.
* End-of-Life
  * Evernym may decommission support systems and retire documentation.

In addition to product versions, the lifecycle also applies to products as a whole, and their component features. For example, REST APIs will be versioned, supported, and deprecated in a similar way to the product of which they are a part.

## Product Versioning

Evernym uses version numbers to indicate the types of changes in a release. A version number consists of the following components: Major.Minor.Service Pack.Hot Fix

Major Release
* Major releases may have backwards incompatible API changes or major changes to the user experience.
* Customers are encouraged to upgrade to the latest major version after appropriate testing.

Minor Release
* Minor releases may have new features that will require code changes to adopt, but existing code should work unmodified.
* Customers are encouraged to stay on the latest minor release within a major release family.

Service Pack Release
* Service packs only contain bug fixes.
* Upgrading to a service pack should be low-risk.
* Customers are encouraged to quickly adopt the latest service pack release.

Hot Fix Release
* Hot fixes include a patch for a specific problem. Hot fixes are delivered quickly, with minimal regression testing.
* Hot fixes are often provided during the R&D stage of the lifecycle.
* Hot fixes are not delivered except as coordinated by a technical architect.
* Customers are expected to upgrade to the next service pack release that contains the fix included in the hot fix.

## Policies for Specific Products

Hyperledger Indy and Aries
* Evernym does not support artifacts provided by Hyperledger Indy or Aries.

Evernym LibVCX
* Description: Evernym provides a build of Indy and Aries artifacts which is supported as the Evernym LibVCX product.
* Product Support Status: Full Support.
  * With each release, new features will be delivered.
* Expected Release Frequency:
  * Major / minor release once each quarter.
  * Service packs monthly.
* Expected Support Duration:
  * Evernym will provide service packs for at least two versions of EvLibVCX at a time.
  * With each release, the previous release will move to Limited Support. The release that was previously in Limited Support will be moved to Documentation Support, where it will be supported for 12 months.
* License Model: Unlimited usage.

Verity SDK
* Description: Evernym supports an SDK with native language wrappers for accessing the Verity APIs.
* Product Support Status: Full Support.
* Expected Release Frequency:
  * Major / minor release once each quarter.
  * Service packs monthly.
* Expected Support Duration:
  * Evernym will provide bug fixes on two versions of Verity SDK at a time.
  * With each release, the previous release will move to Limited Support. The release that was previously in Limited Support will be moved to Documentation Support, where it will be supported for 12 months.
* License Model: Unlimited usage.

Verity SaaS
* Description: Evernym offers a hosted Verity service.
  * Includes usage of the Evernym Enterprise Agency.
* Product Support Status: Full Support
  * With each release, new features will be delivered.
* Expected Release Frequency:
  * New release once a month, after a month in beta on a separate deployment. TODO: Need to confirm this practice.
* Expected Support Duration
  * There is only one version of Verity SaaS in production at a time, and so with each release all previous versions move to Documentation Support.
  * A separate deployment of Verity SaaS exists for R&D and EA feedback. Product updates are deployed to this testing system where customers who are participating in the R&D or EA program can provide feedback on the coming release.
  * This public beta as R&D / EA might receive service pack fixes without restarting the beta period.
  * Feature toggles are used to allow specific customers EA access to new features in Verity SaaS.
  * Features in the production service will be versioned so that they can independently follow the various stages of the lifecycle: R&D, EA, Full Support, Documentation Support, and End-of-Life.
* License Model: Active monthly DID connections.

Verity On-Premises
* Description: Evernym provides a product to help Enterprises leverage verifiable credentials in their organizational workflows.
  * Includes usage of the Evernym Enterprise Agency.
* Product Support Status: Full Support
  * With each release, new features will be delivered.
* Expected Release Frequency:
  * Verity On-Premises service packs each month.
  * Verity On-Premises minor releases each quarter.
  * Verity On-Premises major releases every eighteen months.
  * Evernym Enterprise Agency releases every four weeks, after a four week beta period in a separate deployment.
* Expected Support Duration:
  * Customers are expected to stay current on service packs. With each service pack release (X.Y.N.0), all previous service packs for that minor version family (X.Y.N-1.0) are moved to Documentation Support.
  * Customers are encouraged to adopt minor versions within two release cycles. With each minor version release (A.B.0.0), the previous minor version will be moved to Limited Support (A.B-1.0.0). The version that was previously in Limited Support (A.B-2.0.0) will be moved to Documentation Support.
  * Customers will have more time to adopt major versions. With each major version release (A.0.0.0), all releases in the previous major version family (A-1.0.0.0) will be moved to Limited Support, but will receive service packs until at least two minor versions have been released in the new major version family (A.1.0.0 and A.2.0.0).
  * Versions in Documentation Support will be supported until a formal announcement of End of Life is made.
* License Model: Active monthly DID connections.

Evernym Mobile SDK
* Description: Evernym offers an mobile SDK for quickly building mobile identity wallet applications.
  * Includes usage of the Evernym Consumer Agency.
* Product Support Status: Full Support
  * With each release, new features will be delivered.
* Expected Support Duration
  * Will be handled the same as Verity On-Premises.
* License Model: Active monthly users.

Connect.Me
* Description: Evernym’s flagship mobile identity wallet for consumers.
  * Includes usage of the Evernym Consumer Agency.
* Product Support Status: Full Support
  * With each release, new features will be delivered.
* Expected Support Duration
  * With each release, previous releases move to Documentation Support.
  * Evernym provides support to consumers on an at-will basis.
  * Each release candidate is published as a public beta for four weeks, where interested users can opt-in to download the release.
  * This public beta might receive service pack fixes without restarting the beta period.
* Expected Release Frequency: A new release is expected every two weeks.
* License Model:
  * Free for consumers with no expectation of formal support.
  * Paid support is provided to partners on the basis of active monthly users.

## Vulnerability Reporting

Customers choose Evernym’s products because they can fundamentally improve the security of networked environments. Our teams strive to follow industry best practices for proactive security scans, code analysis, and third party audits. Because so much of Evernym’s code is open and available to inspection, we regularly receive reports of security concerns which we address as a high priority. Our team is actively engaged with upstream open source communities used by our products to ensure a high level of security throughout our product stack. Evernym does not pay for vulnerability reports in open source code bases, but we do gladly accept pull requests.

We would like the chance to address security concerns before they are reported publicly. We expect our customers to privately disclose issues to us through our customer support. Others are encouraged to privately report any security concerns by sending an email to security@evernym.com.

Upon receiving a security report, Evernym commits to:

* Triage the security report within 3 business days, and respond to the reporter.
  * The triage will consist of an initial prioritization assessment and identification of next steps.
* Prioritize the fix for an appropriate product release (where the scope of the fix matches the expectations set by the above description of versions).
  * Per our security guidelines, Security Severity 1 issues will be fixed in the next possible release (where backwards incompatible changes cannot be included in a service pack). Mitigation strategies will be disclosed as soon as they are available.
  * Security Severity 2 issues will be fixed in the next Major / Minor version, but not included in a service pack.
  * Security Severity 3 issues will be addressed when possible.
* Publicly disclose the vulnerability after a mitigation has been identified or a fix has been released. If such disclosure will take more than 90 days, we commit to discuss the timeline of the disclosure with the reporter.

Due to the low quality of the automated security scans that we have submitted to us, we do not treat them with the same priority as a clear demonstration of a product vulnerability.

More information about our engineering practices can be obtained from our:

* Security priority guidelines, TODO: link needed
* Security best practices checklist, TODO: link needed
* Testing best practices checklist, TODO: link needed
* Testing and release process for each product. TODO: link needed

## Customer Notification
When a product version is released, Evernym will announce a commitment for how long it will receive full support. Evernym may at its option extend the time period for full support. Customers can see where a product, version, or feature is in the lifecycle by referencing the [Support Status document](Support-Status.md).

At least X number of days before a product, version, or feature leaves Full Support status, Evernym will notify the technical contact at each customer account in writing. This will usually be provided as part of our regular newsletter. We will provide similar notification as products move through the later stages of the product lifecycle.

## Support Services

Evernym provides support from the world’s experts in Self Sovereign Identity. Support for each product is tailored to that product, whether it is deployed on-premise or via SaaS. Evernym supports our licensed customers, with the following support tiers:

* Evaluation (Business hours only)
  * Recommended for evaluation, trial, and PoCs.
* Production (24x7 support)
  * Recommended for production use.
* Enterprise (Technical account manager)
  * An assigned technical architect who will oversee the account and verify that all support escalations are appropriately handled.
  * Recommended for large deployments.
  * Each subscription includes X hours of architecture and developer support.
  * The TA can coordinate deployment of hot fixes for specific issues.
* Dedicated technical account manager
  * A technical architect who has no other responsibilities beyond the client account.

Each license:
* Includes access to Evernym provided product artifacts that have passed our highest tier of quality assurance.

## Limitations on Support

Our support professionals want to assist our customers, but are limited based on the following:

* Products are supported according to the expectations set by their stage in the product lifecycle.
* Support is for the documented uses of the product.
* Support includes use of the software through the published APIs, but not changes made to the code base outside of the documented customization interfaces.
* Use of artifacts not distributed by Evernym is not supported unless through an ancillary agreement with the customer.
* Customers must provide instructions for reproducing issues starting with a clean version of the product with no customizations on a supported deployment environment.
* Evernym support engineers will not debug customer code.
* Support is for defined deployment environments. Customers can deploy on other environments, but must reproduce issues on the defined supported environment before contacting Evernym support engineers.

Evernym is happy to provide a professional services estimate for assisting with customized customer solutions.

## Escalations Tiers
* Level 1
  * Experts in the documentation and able to provide answers to product questions.
  * Helps to triage the problem.
* Level 2
  * Will reproduce the problem in-house.
  * Can help find workarounds to the problem while engineering addresses the issue.
* Engineering
  * Engineering will work on problems once they have been reproduced in-house.
  * Fixes will be delivered through the next product release, unless the customer has a Technical Architect who can coordinate deployment of a Hot Fix.
* Professional Services
  * At any point, customers can pay professional services for assistance unique to their circumstances.
  * Professional services will work closely with standard support and engineering.

Partners and resellers who provide Level 1 support for their customers might be granted direct access to Level 2 support as they show sufficient familiarity with our products.

## Categorizing Issue Severity

When a customer faces an issue in a deployment of Evernym products, the customer can expect assistance based on the severity of the issue and the support level of the customer’s subscription. This section sets expectations for how Evernym intends to respond to issues, but Evernym intends to exceed these expectations whenever possible.

Severity 1: Interruption to a production service
* A production system is either down or unresponsive, which has direct and significant impact on customers and users.
* Within the contractual "Triage" commitment, Evernym will notify the customer of the results of the issue triage and explain next steps.
* Evernym will provide follow-up status updates regularly, until production service is restored. The issue will then be downgraded to a lower severity.
* If the customer is subscribed to business hours support, then the time periods will be based on US business hours.
* If the customer is subscribed to 24x7 support, the issue will be transferred between Evernym customer service offices as each office finished the business day in their timezone.

Severity 2: Significant impact to usage
* Within the contractual "Triage" commitment, Evernym will notify the customer of the results of the issue triage and explain next steps.

Severity 3: Transient or minor issues to production systems
* Transient or other minor issues that negatively impact the customer or end user experience on production systems. This also applies to transient, significant events such as connection loss or data loss in transit that can be corrected through the user retrying the operation.

Severity 4: Issues impacting non-production systems

Severity 5: Normal inquiry (including questions and normal bug reports)
* Until the issue is resolved, Evernym will provide follow-up status updates as new information is available.

## Disruptions to Hosted Products (SaaS)
If usage of an Evernym hosted product is impaired, Evernym will take the following actions.

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

## Engaging with Customer Support

To receive support for Evernym products, send an email to support@evernym.com. This will allow Evernym to track the concern to a satisfactory conclusion. Non-urgent questions can also be asked in the support-questions channel of the Evernym customer chat, but be aware that other Evernym customers can see those questions.

When engaging with Evernym support, Customers have the following responsibilities:
* Be polite
* Communicate in English
* Provide adequate information to triage the issue
  * Describe the problem fully
    * What was observed
    * What was expected
    * What is the environment
    * What is the impact
  * Provide any relevant logs
* Have seen the problem in a supported environment
  * Currently support versions
  * Supported platforms (operating systems, etc)
* Recognize the support level to which you are subscribed
  * Support outside of US Business Hours is provided by explicit agreement, except at Evernym's discretion.

If you are unable to fulfill these expectations, we will still try and help. But please understand that our ability to assist will be constrained.
