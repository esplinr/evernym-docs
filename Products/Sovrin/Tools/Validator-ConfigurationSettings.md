# Validator configuration settings

Configuration settings are done in files in /etc/indy, which can be edited as necessary. A restart of the indy-node service is required for changes to be applied.

## Settings that are commonly modified

### Logging level
- *file:* indy_config.py
- *parameter:* loglevel
- *value:* an integer, lower numbers are more verbose, as shown in the table below
- *example:* logLevel = 0

| Log Levels| 	Setting|
| ---| ---| ---|
|CRITICAL|	50|
|ERROR|	40|
|WARNING	|30|
|INFO	|20|
| DEBUG	| 10|
|NOTSET (ALL)|	0|

 <br />
### Network name
- *file:* indy_config.py
- *parameter:* NETWORK_NAME
- *value:* The name of the network the validator attaches to. Commonly "live", "sandbox", or "buildernet"
- *example:* NETWORK_NAME = 'sandbox'

### Node IP address
- *file:* indy.env
- *parameter:* NODE_IP
- *value:* IPv4 dotted quad, the *internal* IP address the service process will bind to for inter-validator communication
- *example:* NODE_IP=172.168.42.11

### Client IP address
- *file:* indy.env
- *parameter:* NODE_CLIENT_IP
- *value:* IPv4 dotted quad, the *internal* IP address the service process will bind to for client communications
- *example:* NODE_CLIENT_IP=172.168.43.8
