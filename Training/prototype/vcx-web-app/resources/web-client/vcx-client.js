const url="172.28.128.19:5000";// set for the url where your VCX server resides
//let socket = io(url,{path:'/api/v1/proof_credential/socket.io'});// API path for REST requests (you may have multiple)
let socket = io("172.28.128.21:5000");
// set up sockets.io
function sockets(){
  let message = document.getElementById("message");
  let qrimage = document.getElementById('qr');

    socket.on('connected', ()=> {
      // successful connection
      message.innerHTML="connected";
      qrimage.setAttribute("src","");
    })
    socket.on('connection waiting',()=>{
      // connection offer sent, waiting on a response
      message.innerHTML="connection waiting";
    })
    socket.on('connection ready',()=>{
      // connection request send from vcx-client.js
      message.innerHTML="connection ready";
    })
    socket.on('connection expired',()=>{
      // connection request expired
      message.innerHTML="connection expired";
    })
    socket.on('credential offered',()=>{
      // credential offer sent, waiting on response
      message.innerHTML="credential offered";
    })
    socket.on('credential issued',()=>{
      // credential issued to Connect.Me user
      message.innerHTML="credential issued";
    })
    socket.on('proof requested',()=>{
      // Proof Request sent to Connect.Me user
      message.innerHTML="proof requested";
    })
    socket.on('proof valid',()=>{
      // Proof Request has been validated
      message.innerHTML="Proof Valid";
    })
    socket.on('proof invalid',()=>{
      // Proof has not been validated
      message.innerHTML="Proof Invalid";
    })
    socket.on('timer expired',()=>{
      // Timer for action on page has expired
      message.innerHTML="global timer expired";
    })
    socket.on('credential building',()=>{
      // Timer for action on page has expired
      message.innerHTML="Credential is being built and written to the Ledger. Please wait...";
    })
    socket.on('credential built',()=>{
      // Timer for action on page has expired
      message.innerHTML="Credential has been built and written to the Ledger";
    })
}
// This function accesses the REST API and retrieves the QR connection code
function buildCred(api_path){
  let bcred = document.getElementById("build_cred").value;
  let body={
    "build_cred":bcred
  }
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        console.log("response complete");
        console.log(this.response.body);
      }
  }
  xhttp.open("POST", api_path, true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  // xhttp.overrideMimeType('text/plain; charset=x-user-defined');
  xhttp.send(JSON.stringify(body));
}
function getQR(api_path) {
  let qrimage = document.getElementById('qr');
    let pcred = document.getElementById("proof_cred").value;
    let gcred = document.getElementById("give_cred").value;
    console.log(`${pcred} and ${gcred}`);
    let body = {
      "type":"qr",
      "proof_cred":pcred,
      "give_cred":gcred
    };
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
            let converted_qr = `data:image/png;base64,${base64str}`;
            qrimage.style.visibility="visible";
            qrimage.style.height="300px";
            qrimage.setAttribute('src',converted_qr);
        }
    }
    xhttp.open("POST", api_path, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.overrideMimeType('text/plain; charset=x-user-defined');
    xhttp.send(JSON.stringify(body));
}
// Place any GUI initialization code below
function init(){
    sockets();
}
// Listen for document to be completely loaded
document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        init();
        console.log("Loaded Document");
    }
}
