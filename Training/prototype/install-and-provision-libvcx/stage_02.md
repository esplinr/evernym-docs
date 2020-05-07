## Vagrant VM Environment

Running a Vagrant host is the preferred method of getting started with Libvcx! In a short time you can spin up and provision a virtual machine on your host machine, with all of the dependencies needed to get started writing code for your verified credential exchanges! In order to get started you'll need an Internet connection, and the following software installed:

* VirtualBox VM Manager
* Vagrant VM Manager

### Step 1 : Install VirtualBox

You can download and install the latest version of VirtualBox at [www.virtualbox.org](https://www.virtualbox.org). There are versions for Windows, Mac, Linux, and Solaris available.

### Step 2 : Install Vagrant VM

1. [Click Here](https://www.vagrantup.com/downloads.html) to download Vagrant VM Manager for your operating system and install it.

2. Create an empty directory and name it "VCX-Vagrant".

3. Download this [Vagrant file](/portal/training/install-and-provision-libvcx/resources/Vagrantfile) and save it inside your directory. In your command line, you will navigate to that directory and run the Vagrant commands. This 'Vagrantfile' is a simple text file that will tell VirtualBox exactly which operating system and specs with which to spin up a virtual machine.

    ```bash
            cd VCX-Vagrant
            vagrant up
            ==> vui-wiz-flabian: Checking if box 'ubuntu/xenial64' is up to date...
            ==> vui-wiz-flabian: A newer version of the box 'ubuntu/xenial64' for provider 'virtualbox' is
            ==> vui-wiz-flabian: available! You currently have version '20181030.0.0'. The latest is version
            ==> vui-wiz-flabian: '20181102.0.0'. Run `vagrant box update` to update.
            ==> vui-wiz-flabian: Clearing any previously set forwarded ports...
            ==> vui-wiz-flabian: Fixed port collision for 22 => 2222. Now on port 2201.
            ==> vui-wiz-flabian: Clearing any previously set network interfaces...
            ==> vui-wiz-flabian: Preparing network interfaces based on configuration...
                vui-wiz-flabian: Adapter 1: nat
                vui-wiz-flabian: Adapter 2: hostonly
            ==> vui-wiz-flabian: Forwarding ports...
                vui-wiz-flabian: 22 (guest) => 2201 (host) (adapter 1)
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
                vui-wiz-flabian: /vagrant => /Users/nicholas.zemanevernym.com/agency-helpers/verityui-wizard-flabian
            ==> vui-wiz-flabian: Machine already provisioned. Run `vagrant provision` or use the `--provision`
            ==> vui-wiz-flabian: flag to force provisioning. Provisioners marked to run always will still run.
    ```
4. Once you run "vagrant up" it will start up your virtual machine. When it is complete, you will see the command line prompt again. Next you will ssh into the virtual machine in order to log into it and continue with the installation. You should see the name of the VM in the command line prompt after successfully ssh logging in. *Don't forget to make sure you are logged into the VM before attempting the rest of the installation!* It will not work if you are in the command line prompt but not inside the Ubuntu 16.04 instance.

    ```bash
        vagrant ssh
        Welcome to Ubuntu 16.04.4 LTS (GNU/Linux 4.4.0-124-generic x86_64)

        * Documentation:  https://help.ubuntu.com
        * Management:     https://landscape.canonical.com
        * Support:        https://ubuntu.com/advantage

        Get cloud support with Ubuntu Advantage Cloud Guest:
            http://www.ubuntu.com/business/services/cloud

        69 packages can be updated.
        1 update is a security update.

        New release '18.04.1 LTS' available.
        Run 'do-release-upgrade' to upgrade to it.

        *** System restart required ***
        Last login: Thu Sep 27 19:40:52 2018 from 10.0.2.2
        vagrant@VCX-Vagrant:~$
    ```

### Step 3 : Your Shared Directory

In the host machine directory where you ran the 'vagrant up' command, you will see a directory named '/vagrant'. This is the shared directory where you can drop and read files between your host machine (the computer you're using) and the virtual machine (the terminal you are ssh logged into). This directory is the perfect place to drop the installation files from your Accelerator package before moving to the next Module, in which you will be installing all the software from the packages distributed. In your ssh terminal shell, make sure you navigate to the '/vagrant' directory, which is in the user HOME directory.

```bash
    cd /vagrant/
    ls -l
    -r--r-- 1 vagrant vagrant  1539080 Nov 30  2018 libsovtoken_0.9.7_amd64.deb
    -rw-r--r-- 1 vagrant vagrant 15885188 May  6 23:16 libvcx_0.2.41140129-e0d1c6e_amd64.deb
    -rw-r--r-- 1 vagrant vagrant    34491 May  6 23:16 node-vcx-wrapper_0.2.41140129-e0d1c6e_amd64.tgz
    -rw-r--r-- 1 vagrant vagrant    18806 May  6 23:17 python3-vcx-wrapper_0.2.41140129.tar.gz
    -rw-r--r-- 1 vagrant vagrant      431 Jun 24 21:38 Vagrantfile
```
