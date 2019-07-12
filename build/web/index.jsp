<%-- 
    Document   : cliente
    Created on : 09/07/2019, 08:46:40 AM
    Author     : gangulom
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang = "en"> 
   <head> 
      <meta charset = "utf-8" /> 
   </head>
	
   <body> 
      <div> 
         <input type = "text" id = "loginInput" /> 
         <button id = "loginBtn">Login</button> 
      </div> 
		
      <div> 
         <input type = "text" id = "otherUsernameInput" /> 
         <button id = "connectToOtherUsernameBtn">Establish connection</button> 
      </div> 
		
      <div> 
         <input type = "text" id = "msgInput" /> 
         <button id = "sendMsgBtn">Send text message</button> 
      </div> 
      <div> 
         <input type = "text" id = "showMsg" /> 
      </div> 
        <br>
            -------------------------------------------------------------------------
            

       
            <h1>Prueba de uso de Audio</h1>

            <div id="prueba4">                
                <audio controls autoplay></audio>                
                
                 <br> <br>
                   <p></p>
                <input onclick="grabar()" id="startaudio" type="button" value="Grabar ahora" />
                <input  id="stopaudio" type="button" value="Parar y escuchar" />
                <br><br>
                <video controls autoplay></video> 
                <script src="recorder.js" type="text/javascript"></script>
                <script>

                    function load() {                      
                     // load_socket(); // abriendo conexion con websocket en el archivo main.js
                        console.log("Iniciando proceso...!")
                        navigator.permissions.query({name: 'microphone'}).then(function (result) {
                            if (result.state === 'granted') {
                            } else if (result.state === 'prompt') {                                
                                console.log('Accediendo al micrófono!');
                                
                            } else if (result.state === 'denied') {
                               console.log('Acceso denegado al microfono!');
                            }
                            result.onchange = function () {
                            };
                        });
//                      //Validar permisos  para acceder a la cámara  
                        navigator.permissions.query({name: 'camera'}).then(function (result) {
                            if (result.state === 'granted') {
                            } else if (result.state === 'prompt') {
                                console.log('Accediendo a la cámara!');                              
                            } else if (result.state === 'denied') {
                                console.log('Acceso denegado a la cámara!');
                            }
                            result.onchange = function () {
                            };
                        });
                    }
                    window.onload = load;
                 // Fin del proceso de audio y grabación //
                </script>		
      <script src= "client.js"></script>
   </body>
	
</html>