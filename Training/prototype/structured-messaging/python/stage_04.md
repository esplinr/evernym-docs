# Structured Messages 4 : Receiving a Message from a Connection


## Receiving the Message in Connect.Me

Once the question is sent to Connect.Me, the Identity Holder should receive it, along with any external links that are embedded into the file. The message appears in the window, just like a Connection Request, Credential Offer, or Proof Request. The answer to the message is conveyed cryptographically back to the Asker, with the response encoded in the data structure (along with the time stamp). Based upon the validation of the end user and the response received, the Requesting Agent can then execute any code desired.

## How UI renders responses

If there is exactly one object in valid_responses array then no radio buttons would be rendered. This one response would be rendered as a primary actionable button (green button) in bottom of message screen. Text of this button would be set from object's text property. There is limit on number of characters that can be displayed on button. For smaller width devices (for example: iphone 5), at most 17 characters would be displayed on this action button. For bigger width devices such as iphone 7 at most 20 characters would be shown.

If there are exactly two objects in valid_responses array, then first object would be considered primary response. This primary response would be rendered as primary action button. Second object would also be rendered as secondary action button. There is a limit of 40 characters on big devices, and 35 characters on small devices.

If there are more than objects in valid_responses array, then all responses would be rendered as radio buttons and put in a scrollable view. There is no limit on number of characters in this case.

If there are more than 20 objects in valid_responses array. Then only first 20 responses would be rendered as radio buttons.

If there are more than 1000 objects in valid_responses array. UI would throw validation error with code CM-QUE-007