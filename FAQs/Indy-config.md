**Q. Where do I find the configuration file settings?**

**A.** With file and folder changes the new location for `indy_config.py` is in the directory location `/etc/indy/`. The configuration file has a new setting called `"NETWORK_NAME"` which is used to identify which network and associated genesis transaction files to use like `sandbox` or `live`. If adding a new node to a live pool change this setting before initializing the node.

The genesis files are now located in their own directory based off the network name `/var/lib/indy/NETWORK_NAME`. The defaults are `live`, `local`, and `sandbox`. Setting the `"NETWORK_NAME"` in the `indy_config.py` file will determine which network is used. The default setting in the `indy_config.py` file is `"NETWORK_NAME=sandbox"`.
