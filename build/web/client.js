/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global recorder */

var host = window.location.host.split(":");  
var connection = new WebSocket('ws://' + host[0] + ':6503'); 
var name = "";
var receiveChannel;
var loginInput = document.querySelector('#loginInput'); 
var loginBtn = document.querySelector('#loginBtn'); 
var otherUsernameInput = document.querySelector('#otherUsernameInput'); 
var connectToOtherUsernameBtn = document.querySelector('#connectToOtherUsernameBtn'); 
var msgInput = document.querySelector('#msgInput'); 
var sendMsgBtn = document.querySelector('#sendMsgBtn'); 
var callstop = document.querySelector('#stopaudio'); 
var showMsg = document.querySelector('#showMsg');  
var connectedUser, myConnection, dataChannel;

//when a user clicks the login button 
loginBtn.addEventListener("click", function() { 
   name = loginInput.value; 	
   if(name.length > 0) { 
      send({ 
         type: "login", 
         name: name 
      }); 
   } 
}); 
 
//handle messages from the server 
connection.onmessage = function (message) { 
   console.log("MESSAGE WEBSOCKET", message.data); 
   var data = JSON.parse(message.data); 
	
   switch(data.type) { 
      case "login": 
         onLogin(data.success); 
         break; 
      case "offer": 
         onOffer(data.offer, data.name); 
         break; 
      case "answer":
         onAnswer(data.answer); 
         break; 
      case "candidate": 
         onCandidate(data.candidate); 
         break; 
      default: 
         break; 
   } 
}; 
 
//when a user logs in 
function onLogin(success) { 

   if (success === false) { 
      alert("oops...try a different username"); 
   } else { 
      //creating our RTCPeerConnection object 
      var configuration = { 
         "iceServers": [{ "url": "stun:stun.1.google.com:19302" }]
      };
 
      myConnection = new RTCPeerConnection(configuration, { 
//         optional: [{RtpDataChannels: true}] 
      }); 
      
      console.log("RTCPeerConnection object was created"); 
      console.log(myConnection); 
  
      //setup ice handling 
      //when the browser finds an ice candidate we send it to another peer 
      myConnection.onicecandidate = function (event) { 
        if (event.candidate) { 
            console.log("event Candidatte send to websocket: ",event);		

            send({ 
               type: "candidate", 
               candidate: event.candidate 
            });
         } 
      };      
      myConnection.ondatachannel = receiveChannelCallback;		
      openDataChannel();		
   } 
};
  
connection.onopen = function () { 
   console.log("Connected"); 
}; 
 
connection.onerror = function (err) { 
   console.log("Got error", err); 
};

function receiveChannelCallback(event) {
  console.log('Receive Channel Callback');
  receiveChannel = event.channel;
  receiveChannel.onmessage = onReceiveMessageCallback;
  receiveChannel.onopen = onReceiveChannelStateChange;
//  receiveChannel.onclose = onReceiveChannelStateChange;
}

function onReceiveMessageCallback(event) {
 console.log('Received Message:' + event.data); 
 var audio = document.querySelector('audio');  
 audio.src = event.data; 
 showMsg.value = event.data;
}

function onReceiveChannelStateChange() {
  var readyState = receiveChannel.readyState;
  console.log('Receive channel state is: ', readyState);
}
  
// Alias for sending messages in JSON format 
function send(message) { 
   if (connectedUser) { 
      message.name = connectedUser; 
   }
   connection.send(JSON.stringify(message)); 
};

//setup a peer connection with another user 
//paso 1 crea offer
connectToOtherUsernameBtn.addEventListener("click", function () {  
   var otherUsername = otherUsernameInput.value;
   connectedUser = otherUsername;	
   if (otherUsername.length > 0) { 
      //make an offer 
      myConnection.createOffer(function (offer) {      			
         send({ 
            type: "offer", 
            offer: offer 
         }); 			
         myConnection.setLocalDescription(offer); 
      }, function (error) { 
         alert("An error has occurred."); 
      }); 
   } 
});
  

//paso2 recibo la offer
function onOffer(offer, name) { 
   connectedUser = name; 
   myConnection.setRemoteDescription(new RTCSessionDescription(offer));	
   myConnection.createAnswer(function (answer) { 
      myConnection.setLocalDescription(answer); 		
      send({ 
         type: "answer", 
         answer: answer 
      }); 		
   }, function (error) { 
      alert("oops...error"); 
   }); 
}

//when another user answers to our offer 
//paso3 el usuario que envio la llamada recibela respuesta del otro usuario
// como answer
function onAnswer(answer) { 
   myConnection.setRemoteDescription(new RTCSessionDescription(answer)); 
}
//when we got ice candidate from another user 
function onCandidate(candidate) {

myConnection.addIceCandidate(new RTCIceCandidate(candidate)).then(

//        myConnection.addIceCandidate(candidate).then(
            onAddIceCandidateSuccess,
            onAddIceCandidateError);
       console.log('Remote ICE candidate: ', candidate);
       myConnection.onopen = onSendChannelStateChange;
//       myConnection.onclose = onSendChannelStateChange;
       
}

function onSendChannelStateChange() {
  var readyState = myConnection.readyState;
  console.log('Send channel state is: ', readyState);
//  if (readyState === 'open') {
//    dataChannelSend.disabled = false;
//    dataChannelSend.focus();
//    sendButton.disabled = false;
//    closeButton.disabled = false;
//  } else {
//    dataChannelSend.disabled = true;
//    sendButton.disabled = true;
//    closeButton.disabled = true;
//  }
}

function onAddIceCandidateSuccess(){
    console.log("AddIceCandidate success.");
}
function onAddIceCandidateError(event){
    console.log('Failed to add Ice Candidate: ', event);
}
//creating data channel 
function openDataChannel() { 
   console.log("Open Channel"); 
   var dataChannelOptions = { 
      reliable:true 
   }; 
	
   dataChannel = myConnection.createDataChannel("myDataChannel", dataChannelOptions);	
   dataChannel.onerror = function (error) { 
      console.log("Error:", error); 
   };
	
   dataChannel.onmessage = function (event) {
      console.log("evento RTC onmessage");
      console.log(event.data); 
   };  
}
//  
////when a user clicks the send message button 
sendMsgBtn.addEventListener("click", function (event) { 
   var val = msgInput.value;    
   console.log("send message: ",msgInput.value);
   console.log("State Channel " + dataChannel.readyState);
   dataChannel.send(val); //envia la data
});
 
callstop.addEventListener("click", function (event) {       
console.log("State Channel " + dataChannel.readyState); 
sendaudio(); 
});



        var error = function (e) {
            alert('Error: ' + e);
        };
 
//                    //Cuando este todo OK
                    var success = function (s) {                     
                        var context = new AudioContext(); //Conectamos con nuestra entrada de audio          
                       var flujo = context.createMediaStreamSource(s); //Obtenemos el flujo de datos desde la fuente
                       console.log(flujo);
                        recorder = new Recorder(flujo); //Todo el flujo de datos lo pasamos a nuestra libreria para procesarlo en esta instancia
                        recorder.record(); //Ejecutamos la función para procesarlo
                    };
//
//                    //Convertirmos el objeto en URL
                    window.URL = window.URL || window.webkitURL;
                    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

                    var recorder; //Es nuestra variable para usar la libreria Recorder.js
                    var audio = document.querySelector('audio'); //Seleccionamos la etiqueta audio para enviarte el audio y escucharla
//
//                    //Funcion para iniciar el grabado
                    function grabar() {                        
                        document.getElementById("startaudio").disabled = true;   
                        document.getElementById("stopaudio").disabled = false;
                        if (navigator.getUserMedia) { //Preguntamos si nuestro navegador es compatible con esta función que permite usar microfono o camara web
                            //En caso de que si, habilitamos audio y se ejecutan las funciones, en caso de exito o error.
                            navigator.getUserMedia({audio: true}, success, error);                           
                            document.querySelector('p').innerHTML = "Estamos grabando...";
                        } else {
                            console.log('¡Tu navegador no es compatible!, ¿No lo vas a acutalizar?'); //Si no es compatible, enviamos este mensaje.
                        }
                    }
//                    //Funcion para parar la grabación y escucharla
                    function sendaudio() {
                     
                        document.getElementById("stopaudio").disabled = true;
                        document.getElementById("startaudio").disabled = false;
                        document.querySelector('p').innerHTML = "Detenido... ";
                        recorder.stop(); //Paramos la grabación
                        recorder.exportWAV(function (s) { //Exportamos en formato WAV el audio 
                         
                             msgInput.value = window.URL.createObjectURL(s); 
                             dataChannel.send(window.URL.createObjectURL(s));
//                        //Y convertimos el valor devuelto en URL para pasarlo a nuestro reproductor.
                        });
                         
                        document.querySelector('p').innerHTML = "Escuchando...";
                    }
