$(document).ready(function(){

			console.log("jquery pronto");
			//localStorage.setItem('token',null);
   			console.log("token - " + localStorage.getItem("token"));
   			
   			if(localStorage.getItem("token") != undefined && localStorage.getItem("token") != null){

   					alert("Token já setado");
   					$.ajax({
   						url: window.location.href+ 'autenticar',
   						headers: {
   							'x-access-token': localStorage.getItem("token"),
   							'index': 'index'},
   						success : function(data, status){
   							alert("Seu login expirou");
   							localStorage.setItem('token', null);
   						}
   					});

   			}else{
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

               $("#submit").click(function(){
               console.log("Entrou no logar: ");
               var path =  window.location.href+'logar';
               console.log("url - "+ path);
               //alert("Login - "+ $("#login").val()+" Senha - "+ $("#senha").val());
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
                           
                           localStorage.setItem('token',data.token);
                           console.log("token - " + localStorage.getItem("token"));

                        }else{
                           alert(data.message);
                        }
                   },

                   error : function(resultat, statut, erreur){
                    
                     localStorage.setItem('resultado', erreur +" - "+ statut + " - "+ resultat.readyState); // assuming you send a json token
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

   			}
   			
   			
   			



}); 
