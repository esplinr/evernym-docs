# Building The Client

The client is a combination of HTML and javascript UI controls, which operates by sending and receiving messages through some kind of service (sockets.io in this case), which will send REST requests and receive sockets messages in order to control the UI for the web-based interface.

## vcx-client.js

Building the vcx-client.js is an integral part of the VCX Web App design. The vcx-client.js will perform the following tasks:

1. Provide a UI for action items, such as Connecting with the remote VCX Server.
2. Interpolate and display the QR code response from the Connection Request, through the REST-like interface 
3. Provide feedback to Identity Holder using Connect.Me with the use of sockets.io and messaging

Although the provided vcx-client.js is written in vanilla javascript, you should be able to replicate it in any framework of your choice (such as Angular, React, or Ember).

```javascript
const url="https://village.evernym.com/";
let socket = io(url,{path:'/api/village_bank/socket.io'});
let msg = {};
let testMobile = false;
let connectionType = "";
function sockets(){
    socket.on('connected', ()=> {
      // successful connection
    })
    socket.on('connection waiting',()=>{
      // connection offer sent, waiting on a response
    })
    socket.on('connection ready',()=>{
      // connection request send from vcx-client.js
    })
    socket.on('connection expired',()=>{
      // connection request expired
    })
    socket.on('credential offered',()=>{
      // credential offer sent, waiting on response
    })
    socket.on('credential issued',()=>{
      // creedential issued to Connect.Me user
    })
    socket.on('proof requested',()=>{
      // Proof Request sent to Connect.Me user
    })
    socket.on('proof valid',()=>{
      // Proof Request has been validated
    })
    socket.on('proof invalid',()=>{
      // Proof has not been validated
    })
    socket.on('timer expired',()=>{
      // Timer for action on page has expired
    })
}
function xhrQR(api_path) {
    let body = {"type":"QR"};
    let base64str = "";
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            // Process response here
            choice = "qr";
            let raw = "";
            for (let i=0; i<=this.responseText.length-1; i++){
                raw += String.fromCharCode(this.responseText.charCodeAt(i) & 0xff);
            }
            base64str = btoa(raw);
            let qrimage = document.getElementById('qr-code');
            let converted_qr = `data:image/png;base64,${base64str}`;
            loadspinner.style.visibility="hidden";
            qrimage.style.visibility="visible";
            qrimage.style.height="300px";
            qrimage.setAttribute('src',converted_qr);
        }
    }
    xhttp.open("POST", api_path, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.overrideMimeType('text/plain; charset=x-user-defined');// this is necessary to assemble the QR code into an image URI
    xhttp.send(JSON.stringify(body));
}
function init(){
    sockets();
}
//initialize
document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        init();
        console.log("Loaded Document");
    }
}
```

## Sockets.io - client side

Looking at the code above, you will notice that the "sockets.io" variable is set to "let socket = io(url,{path:'/api/village_bank/socket.io'});", which is pulling this code library from the sockets.io client script (imported into your html <head> as a script). The sockets message string that is read (sockets.on()) will come from the vcx-server.js. where they are structured around important Credential Exchange events in the flow. You can build your own messaging system, but the one in the client/server code as they appear in the Credential Village are listed below. Keep in mind that the time between waiting for an event can be very short, especially between a request sent and a response given, so writing blocking code dependent upon response/request actions it may be problematic.

1. Connection Request sent
2. Connection Established
3. Proof Request Issued
4. Proof Validated/Invalidated
5. Credential Offer Issued
6. Credential Issued


## Sockets.io - server side

Sockets.io can be imported into your NodeJS vcx-server.js script (and installed in the package.json file).

```javascript
const io = require('socket.io')(server,{path:'/api/village_bank/socket.io'});// establish socket var for sending messages
io.on('connection',socket=>{// run function to send/receive sockets messaging
    console.log("a user connected"); // user connected to socket
    socket.on('disconnect',()=>{
        console.log("user disconnected"); // user connected to socket
    })
    socket.on('message',function(data){// log message data
        console.log(data); // 
    })
})
io.emit('insert message here');// send message to client using sockets.io

```

## HTML page

While it is not in the current scope of this tutorial to teach basic HTML web design, it is important to note here a few minor things that might assist you in setting up your front end web page. Most notably are the imports and script setup. The following code indicates the socket.io client import and the vcx-client.js script. If you are working offline the socket.io script has been provided.

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.slim.js"></script>
    <script src = "vcx-client.js"></script>
    <style>
        h3{
          border-radius: 12px;
          color:white;
          padding:8px;
          height:30px;
          width: 80%;
          background-color: rgba(12,99,100,.56);
        }
        button{
          font-size:22px;
          height:80px;
          background-color:rgba(146, 206, 124, 0.4);
          color:rgba(200,34,12,.7);
          border-radius: 8px;
        }button:hover{
          background-color:rgba(186, 206, 124, 0.4);
          cursor: pointer;
        }
        #qr{
          width:300px;
          height:300px;
          border:1px solid black;
        }
        #message{
          display: inline;
          font-size:32px;
          color:rgba(120,0,09,.7);
        }
    </style>
</head>
<body>
  <h1>Welcome to the VCX Web App Toolkit </h1>
  <a href="vcx-build_cred.html">Build Credential Definition</a>
  <h3>Client Files</h3>
    <ol>
      <li>vcx-index.html</li>
      <li>vcx-client.js</li>
    </ol>
  <h3>Server Files</h3>
    <ol>
      <li>package.json</li>
      <li>vcx-server.js</li>
      <li>vcx-web-tools.js</li>
    </ol>
  <img id="qr" align="middle"/> &nbsp;<div id="message">Interactive messages will appear here.</div>
  <br>
  <br>
  <button onclick="getQR('http://<YOUR VCX-SERVER IP ADDRESS HERE>/api/v1/proof_credential')" >Click for Connection Request QR</button>
  <br>
  <br>
  <label>Select Credential to Prove</label>
  <select id="proof_cred">
    <option value="passport">passport</option>
    <option value="employee">employee</option>
  </select>
  <br>
  <br>
  <label>Select Credential to Give </label>
  <select id="give_cred">
    <option value="employee">employee</option>
    <option value="passport">passport</option>
  </select>
  <br>
  <br>
  
</body>
</html>

```

## Hosting the web page

There are multiple methods of hosting your site and front-end UI for your demo or prototype, including using a local host to server the web page, and using a remote host (like an AWS VM ) to host your vcx-server.js.