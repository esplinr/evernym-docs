## Starting the Agents

When starting each agent, you will do so in three separate machines or terminals. Don’t use the one you used for the Indy CLI. Start each agent in its own machine or terminal.  Substitute the port number you chose for each agent respectively, making sure that each matches the port number for the agent you used when you registered it. These have to match in order to run properly.

**Terminal 1**
```
$ python3/usr/local/lib/python3.5/dist-packages/indy_client/test/agent/faber.py --port &lt;port number&gt;
```

**Terminal 2**
```
$ python3/usr/local/lib/python3.5/dist-packages/indy_client/test/agent acme.py --port &lt;port number&gt;
```

**Terminal 3**
```
$ python3/usr/local/lib/python3.5/dist-packages/indy_client/test/agent/thrift.py --port &lt;port number&gt;
```
