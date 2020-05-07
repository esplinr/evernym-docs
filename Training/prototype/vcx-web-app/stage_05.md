# Creating the Service

A service is a script or program that automatically runs on a server or Linux machine until it crashes or is manually exited. In order to have a web-accesible endpoint running continuously on your VCX server, you must set it up to run in the background as a service. 

## Writing the Service File

```bash
[Unit]
Description=VCXWebApp

[Service]
ExecStart=/home/ubuntu/codeDir/your-script.js
Restart=always
User=ubuntu
# Note Debian/Ubuntu uses 'nogroup', RHEL/Fedora uses 'nobody'
Group=nogroup
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=production
WorkingDirectory=/home/ubuntu/codeDir/

[Install]
WantedBy=multi-user.target

```

## Start, Stop and Restarting the Service

```bash
# start a service
sudo systemctl -start service
# stop a service 
sudo systemctl -stop service
# restart a running service, in the case that you make changes to the vcx-server.js code and need to restart the service
sudo systemctl -restart service
```

## Logging the Service

```bash
# log running service to console for debugging
sudo journalctl -fu service
```
