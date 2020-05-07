# Error Messages

```javascript

ERROR_NO_QUESTION_DATA = {
  code: 'CM-QUE-004',
  message: 'No data received for this message.',
}

ERROR_NO_RESPONSE_ARRAY = {
  code: 'CM-QUE-005',
  message: 'Property valid_responses should be a JSON array.',
}

ERROR_NOT_ENOUGH_RESPONSES = {
  code: 'CM-QUE-006',
  message: 'Property valid_responses should have at least one response.',
}

ERROR_TOO_MANY_RESPONSES = {
  code: 'CM-QUE-007',
  message: 'There are more than 1000 responses.',
}

ERROR_RESPONSE_NOT_PROPERLY_FORMATTED = {
  code: 'CM-QUE-008',
  message:
    'One or more of response in valid_responses property is not in correct format {text: string, nonce: string}.',
}

ERROR_RESPONSE_NOT_UNIQUE_NONCE = {
  code: 'CM-QUE-009',
  message: 'Not every response in valid_responses array has unique nonce',
}

ERROR_EXTERNAL_LINKS_NOT_ARRAY = {
  code: 'CM-QUE-010',
  message: 'property "external_links" should be an array of object type { text?:string, src:string }'
}

ERROR_EXTERNAL_LINKS_NOT_PROPERLY_FORMATTED = {
  code: 'CM-QUE-011',
  message: 'One or more link object inside "external_links" array is invalid. Link object should be of format { text?:string, src:string }, where "text" property is optional. However, if "text" property is defined, then it should be a string with less than or equal to 1000 characters. "src" property should be a string and is not optional.'
}

ERROR_TOO_MANY_EXTERNAL_LINKS = {
  code: 'CM-QUE-012',
  message: '"external_links" array should not have more than 1000 link objects.'
}


```