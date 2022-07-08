$(document).ready(function(){
    $("#email").hide();
  })
  //Mostrar form del email al clickear el boton *Detalle*
  $("#detalle").click(function(){
    $("#email").show();
  })
  
  //Funcion para llenar el formulario del email automaticamente, se hace al presionar el boton *Detalle*
  function llenarEmail(){
    var fill = document.getElementById("asunto")
    fill.value = document.getElementById("nombre").value + " Alerta DP"
    var desc = document.getElementById("mensaje")
    desc.value = fecha.value + "\n" + document.getElementById("nombre").value +"\n"+ document.getElementById("resultadoBalance").innerText + "\n" + document.getElementById("resultadoPresion").innerText
  }
  
  //Funcion para enviar el email, proporcionado por el recurso STMP
  function enviarEmail(){
      Email.send({
          Host : "smtp.elasticemail.com",
          Username : "hamundohamundo@gmail.com",
          Password : "D9423D323247D368AF16EF26E1EDB30D6797",
          To : document.getElementById("destinatario").value,
          From : "hamundohamundo@gmail.com",
          Subject : document.getElementById("asunto").value,
          Body : document.getElementById("mensaje").value 
      }).then(
        _message => alert("Mensaje enviado satisfactoriamente")
      );
  }
  
  //Ocultar form del email al enviarlo
  $("#btn").click(function(){
    $("#email").hide();
  })