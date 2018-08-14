$(document).ready(function(){

		var usuarios = [];


		$.ajax({
   				
   				url: window.location.href+ 'usersView',
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


	
});