You may run your agent on any Ubuntu 18.04 VM, including those on a cloud provider like AWS or GCloud. These steps will use Vagrant to set up an Ubuntu 18.04 VM with VirtualBox on your local machine. 

> **NOTE:** This is an optional step for those who are running Windows or Mac OSX, or who prefer to work with a VM on a local host. 

VirtualBox and Vagrant work together to create an instance of Ubuntu 18.04, for the purposes of running LibVCX on any platform.

### Steps

**1. Install Virtual Box.**

Download and install the latest version of VirtualBox at [www.virtualbox.org](https://www.virtualbox.org). There are versions for Windows, Mac, Linux, and Solaris available.

**2. Install the Vagrant VM Manager.**

Click [here](https://www.vagrantup.com/intro/getting-started/install.html) to download the Vagrant VM manager for your operating system and install it.

**3. Create an empty directory and name it `VCX-Vagrant`.**

**4. Download the Vagrantfile and save it inside your directory.**

In your command line, navigate to that directory and run the Vagrant commands. This Vagrantfile is a simple text file that tells VirtualBox exactly which operating system and specs to use when spinning up the virtual machine.

```bash
# cd VCX-Vagrant
# vagrant up

==> vui-wiz-flabian: Checking if box 'bento/ubuntu-18.04' is up to date...
==> vui-wiz-flabian: Clearing any previously set forwarded ports...
==> vui-wiz-flabian: Fixed port collision for 22 =&gt; 2222. Now on port 2201.
==> vui-wiz-flabian: Clearing any previously set network interfaces...
==> vui-wiz-flabian: Preparing network interfaces based on configuration...
    vui-wiz-flabian: Adapter 1: nat
    vui-wiz-flabian: Adapter 2: hostonly
==> vui-wiz-flabian: Forwarding ports...
    vui-wiz-flabian: 22 (guest) =&gt; 2201 (host) (adapter 1)
==> vui-wiz-flabian: Running 'pre-boot' VM customizations...
==> vui-wiz-flabian: Booting VM...
==> vui-wiz-flabian: Waiting for machine to boot. This may take a few minutes...
    vui-wiz-flabian: SSH address: 127.0.0.1:2201
    vui-wiz-flabian: SSH username: vagrant
    vui-wiz-flabian: SSH auth method: private key
==> vui-wiz-flabian: Machine booted and ready!
==> vui-wiz-flabian: Checking for guest additions in VM...
    vui-wiz-flabian: The guest additions on this VM do not match the installed version of
    vui-wiz-flabian: VirtualBox! In most cases this is fine, but in rare cases it can
    vui-wiz-flabian: prevent things such as shared folders from working properly. If you see
    vui-wiz-flabian: shared folder errors, please make sure the guest additions within the
    vui-wiz-flabian: virtual machine match the version of VirtualBox you have installed on
    vui-wiz-flabian: your host and reload your VM.
    vui-wiz-flabian:
    vui-wiz-flabian: Guest Additions Version: 5.1.34
    vui-wiz-flabian: VirtualBox Version: 5.2
==> vui-wiz-flabian: Setting hostname...
==> vui-wiz-flabian: Configuring and enabling network interfaces...
==> vui-wiz-flabian: Mounting shared folders...
    vui-wiz-flabian: /vagrant =&gt; /Users/nicholas.zemanevernym.com/agency-helpers/verityui-wizard-flabian
==> vui-wiz-flabian: Machine already provisioned. Run `vagrant provision` or use the `--provision`
==> vui-wiz-flabian: flag to force provisioning. Provisioners marked to run always will still run.
```

**5. Run `vagrant up` to start your virtual machine.**

When startup is complete, you will see the command-line prompt again. 

Connect to the VM via SSH to continue with the installation. You should see the name of the VM in the command-line prompt after successfully logging in 
with SSH. 

> **NOTE:** You must be logged in to the VM before attempting the rest of the installation. It won't work if you are in the command-line prompt but not inside the Ubuntu 16.04 instance.
<!--What are we seeing here?-->

```bash
# vagrant ssh

Welcome to Ubuntu 18.04.3 LTS (GNU/Linux 4.15.0-72-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Wed Dec 18 19:16:01 UTC 2019

  System load:  0.0               Processes:           98
  Usage of /:   3.0% of 61.80GB   Users logged in:     1
  Memory usage: 21%               IP address for eth0: 10.0.2.15
  Swap usage:   0%                IP address for eth1: 10.20.30.97


 * Canonical Livepatch is available for installation.
   - Reduce system reboots and improve kernel security. Activate at:
     https://ubuntu.com/livepatch

3 packages can be updated.
0 updates are security updates.



This system is built by the Bento project by Chef Software 
More information can be found at https://github.com/chef/bento/README.md
Last login: Thu Dec 12 21:46:45 2019 from 10.0.2.2
vagrant@sandbox:~$
  ```

**6. Create a shared directory.**

In a terminal on the host machine directory where you ran the `vagrant up` command, go to the `VCX-Vagrant` directory that you created in Step 3. This is a shared directory where you can drop and read files between your host machine (the computer you're using) and the virtual machine (the terminal you are logged into via SSH). This directory is the perfect place to drop the installation files that you will download while following the installation instructions. After you put the files here, you can go back to the terminal that is logged into your VM and find the downloaded files in the `/vagrant` directory there.
