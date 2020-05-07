## Appendix - findPubkey.py

```python

#!/usr/bin/python3
import sys
import os
import re
import base58
from zmq.utils
import z85
agent = sys.argv[1]
baseDir = os.path.expanduser('~')
path = os.path.join(baseDir, '.sovrin', agent, 'public_keys', agent + '.key')
keyfile = open(path)
lines = keyfile.readlines()
match = re.search('"(.*)"', lines[8])
print ('The pubkey from the file is: ' + match.group(1))
binary_key = z85.decode(match.group(1))
print ('The base58 encoded pubkey: ' + base58.b58encode(binary_key))
```
