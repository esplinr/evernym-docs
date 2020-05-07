When setting up an instance of Verity UI on your virtual machine (or your host machine running Ubuntu 16.04), you must complete all previous steps of the VCX installation first. You do not need to provision the wallet and pool, because you will be doing that step as the Verity UI user.

### Steps

**1. Check your prerequisites.**

1. `libindy` 1.6.8 installed
2. `libsovtoken_0.9.6_amd64.deb` installed
3. `libvcx_0.1.27328536-fb7b7b6_amd64.deb` installed
4. You are logged in to the Vagrant virtual machine via SSH (if you are using a Vagrant VM)

**2. Install the Debian package.**

In your `/vagrant/` directory (when using Vagrant) or wherever you have unpacked the Accelerator package, run the following command:

```bash
sudo dpkg -i verity-ui_0.1.413_all.deb
```

This will install the Verity UI package and add a user account on your VM called `verity-ui`.

**3. Switch Users**

To properly provision the Verity UI service, you will switch users in the VM and provision the wallet for the Verity UI user only.

This means that if you have installed VCX and have been working with that on the same VM, none of that data will be available when using Verity UI. It is highly recommended that for this reason you set up Verity UI and VCX (if you're working with the Python and Node wrappers) on separate VMs to avoid conflicts and confusion. It is, however, perfectly possible to have both running at the same time.

```bash
sudo su - verity-ui -s /bin/bash
python3 /usr/share/libvcx/provision_agent_keys.py https://eas01.pps.evernym.com 12345
```

Running the above code will accomplish the same step as you performed in the Configuring and Provisioning step,  <!--Where is this step?--> meaning that it will output the configuration file values, as shown below:

 ```json
{
  "agency_did": "UNM2cmvMVoWpk6r3pG5FAq",
  "agency_endpoint": "https://eas01.pps.evernym.com",
  "agency_verkey": "FvA7e4DuD2f9kYHq6B3n7hE7NQvmpgeFRrox3ELKv9vX",
  "genesis_path": "<CHANGE_ME>",
  "institution_did": "Bc5wkoouaccMK2qapqmPAY",
  "institution_logo_url": "<CHANGE_ME>",
  "institution_name": "<CHANGE_ME>",
  "institution_verkey": "6nF4K2LMSe7zYTAqQBEHqiWw7ofDahu2SXnj7JrtGTAG",
  "remote_to_sdk_did": "2Yg67uxMz9NNnKE6oZvpnS",
  "remote_to_sdk_verkey": "qsmetkR2BqdZcAj7FfriS8jptigpA2nzUCo7d5oEuDR",
  "sdk_to_remote_did": "VZqQNMdetF77PrV2SWhgis",
  "sdk_to_remote_verkey": "Ga2ojrRXB6DfZZsb67W5BDEBA396jb8dWB4TvPKghL2x",
  "wallet_key": "12345"
}
```
The values you will need to manually edit are:

1. `genesis-path` - The **absolute** path to your `genesis.txn` file. If you're a member of the Accelerator program, this should already be in your package.
2. `institution_logo_url` - Any online logo or image to be used as the logo identifier for Connect.Me to display.
3. `institution_name` - The name of your Institution.

**4. Save values to Verity `config.json`**

Because you are setting up this configuration file for Verity, you will have to save these values in the Verity UI configuration directory in a file named `vcxconfig.json`. Once you paste and edit the values above with the edits mentioned in Step 3, save the `vcxconfig.json` file.

```bash
cd /etc/verity-ui
touch vcxconfig.json
vi vcxconfig.json
```

**5. Start the Verity UI service.**

Manually start and check the Verity-UI service to ensure that it is functioning.

```bash
sudo systemctl start verity-ui
sudo systemctl status verity-ui
```

If the system is running and active you will see the output below:

```bash
● verity-ui.service - Verity Enterprise UI Server
Loaded: loaded (/lib/systemd/system/verity-ui.service; enabled; vendor preset: enabled)
Active: active (running) since Mon 2018-11-05 20:44:42 UTC; 12min ago
Main PID: 28606 (start)
Tasks: 21
Memory: 49.7M
CPU: 1.838s
CGroup: /system.slice/verity-ui.service
├─28606 /bin/bash /usr/share/verity-ui/app/bin/start
└─28613 node /usr/share/verity-ui/app/src/index.js
```

**6. Determine IP address and open port in browser.**

Determine your IP address for the virtual machine. In the following example, it is the third address listed, listening on port `tcp/3000`, so the full IP address is `172.28.128.8:3000`. <!--How do we know that it's the third address-->

```bash
# ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1
link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
inet 127.0.0.1/8 scope host lo
  valid_lft forever preferred_lft forever
inet6 ::1/128 scope host
  valid_lft forever preferred_lft forever
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc  pfifo_fast state UP group default qlen 1000
  link/ether 02:84:11:a3:6c:d2 brd ff:ff:ff:ff:ff:ff
  inet 10.0.2.15/24 brd 10.0.2.255 scope global enp0s3
  valid_lft forever preferred_lft forever
  inet6 fe80::84:11ff:fea3:6cd2/64 scope link
  valid_lft forever preferred_lft forever
3: enp0s8: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
  link/ether 08:00:27:b4:47:75 brd ff:ff:ff:ff:ff:ff
  inet 172.28.128.8/24 brd 172.28.128.255 scope global enp0s8
  valid_lft forever preferred_lft forever
  inet6 fe80::a00:27ff:feb4:4775/64 scope link
  valid_lft forever preferred_lft forever
```

Load that IP address in a browser and you should see your instance of Verity UI running.