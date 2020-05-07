Logging for `libvcx` and the underlying `libindy` is available, but your Node.js or Python code must configure their respective loggers in order for you to be able to see it. Beginning in version 0.2.0 of `libvcx`, the standard loggers for each wrapper language controls the logging. The following are instructions for enabling logging for each wrapper.

### Python
Set up a logger using the standard Python3 logging library. For example, to see logs at the `INFO` level or above in your console, add this to the beginning of your code:

```python
import logging
...

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)
```

### Node.js
In Javascript, logging is enabled through a call to the `indy-sdk` JavaScript wrapper. If the `indy-sdk` module is not already present, you will need to install it:

```sh
$ npm install indy-sdk
```

Then in your code, add these lines near the top:

```javascript
var indy = require('indy-sdk')
indy.setDefaultLogger('trace')
```

Trace logging is very verbose. You can modify the above for the log level desired, e.g., `debug` or `info`.
