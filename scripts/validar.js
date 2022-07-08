
    
    function datosJSON() {
        $(document).ready(function(){
     
          $.ajax({dataType: "json",url: "http://127.0.0.1:5500/users.json",success: function(data, status, xhr){
    
          console.log(xhr)
          data.sort();
          data.reverse();
    
    
    
          validar(data[0].user, data[0].passwordd, data[1].user, data[1].passwordd);
      
          
     
          }}); 
     
        });
      }
    
    
        function validar(nombre1, password1, nombre2, password2){
          
    
          let usuario = document.getElementById("userr").value; 
          let passwordd = document.getElementById("passwordd").value;
          
          
          if(usuario==nombre1 && passwordd==password1){
            location.assign("../balance.html")
          }
          else if(usuario==nombre2 && passwordd==password2){
            location.assign("../balance.html")
          }
          else{
            alert("ERROR, USUARIO O CONTRASEÑA INCORRECTOS")
          }
    
        }
    
        
    