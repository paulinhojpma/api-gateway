
 
var token = window.sessionStorage.getItem("token");
$(document).ready(function(){
      console.log("------------Carregando main.js -----------");
			
   			
       
   			console.log("token - " + token);
   			

        if(token){

   					console.log("Token já setado");
   					$.ajax({
   						url: window.location.href+ 'users/usersView',
   						headers: {
   							'x-access-token': token,
   							'index': 'index'},
   						success : function(data, status){
   							console.log("Status - "+ status);
                        console.log("Sucess - "+ data.success);
                if(!data.success){
                  window.sessionStorage.setItem("token", null);
                  console.log("Seu login expirou");
                }
   							
                 console.log(data.message);
                 console.log("token - " + window.sessionStorage.getItem("token"));
                
   						}
   					});

   			}
   				var lat = "";
   				var long = "";

   				function getLocation() {
   						console.log("Entrou no getLocation");
					    if (navigator.geolocation) {
					        navigator.geolocation.getCurrentPosition(showPosition);
					    } else { 
					        x.innerHTML = "Geolocation is not supported by this browser.";
					    }
					}

					function showPosition(position) {
					     lat = position.coords.latitude;
					     long =  position.coords.longitude;
					    console.log("Latitude  - "+ lat+"\nLongitude - "+ long);
					}
   				
               getLocation();
               console.log("token - " + window.sessionStorage.getItem("token"));
               
               $("#submit").click(function(){
               console.log("Entrou no logar: ");
               var path =  window.location.href+'logar';
               console.log("url - "+ path);
               console.log("Login - "+ $("#login").val()+" Senha - "+ $("#senha").val());
                $.ajax({
                   url : path,
                   type : 'POST',
                   data : {login: $('#login').val(), senha: $('#senha').val(), latitude: lat, longitude: long },
                   dataType : 'JSON',


                   success : function(data, statut){
                        // assuming you send a json token
                       //alert("foi carai");
                       $('#login').val("");
                       $('#senha').val("");
                       console.log(data.success);
                        if(data.success){
                           
                           window.sessionStorage.setItem('token',data.token);
                           console.log("token - " + window.sessionStorage.getItem("token"));
                          token = window.sessionStorage.getItem("token");
                           $("#form").slideUp("slow");
                           $.ajax({
                              url: window.location.href+ 'users/usersView',
                              headers: {
                                'x-access-token': token,
                                'index': 'index'},
                              success : function(data, status){
                                console.log("Status - "+ status);
                                 console.log(data);
                                   // window.location.pathname = "usuarios.html";
                                  $("#lista").html(data);
                             /*   if(!data.success){
                                  window.sessionStorage.setItem("token", null);
                                  console.log("Seu login expirou");
                                }else{
                                    
                                    window.location.pathname = "usuarios.html";
                                }*/
                                
                                 //console.log(data.message);
                                 console.log("token - " + window.sessionStorage.getItem("token"));
                                
                              }
                            });

                        }else{
                           alert(data.message);
                        }
                   },

                   error : function(resultat, statut, erreur){
                    
                     window.sessionStorage.setItem('resultado', erreur +" - "+ statut + " - "+ resultat.readyState); // assuming you send a json token
                   }
                });

            });

   				/*$("form").submit(function(){



   					alert("Entrou no submit");
   					


					
   					$("<input>").attr({
   						type: "hidden",
   						value: lat,
   						id: "latidude",
   						name: "latitude"
   					}).appendTo("form");
   					$("<input>").attr({
   						type: "hidden",
   						value: long,
   						id: "longitude",
   						name: "longitude"
   					}).appendTo("form");

   				});*/

   			
   			
   			
   			



}); 
