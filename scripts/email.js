$(document).ready(function(){
    $("#email").hide();
  })
  
  //Funcion para llenar el formulario del email automaticamente, se hace al presionar el boton *Detalle*
  function llenarEmail(){
    var fill = document.getElementById("asunto")
    fill.value = document.getElementById("nombre").value + " Alerta DP"
    var desc = document.getElementById("mensaje")
    desc.value = fecha.value + "\n" + document.getElementById("nombre").value +"\n"+ document.getElementById("resultadoBalance").innerText + "\n" + document.getElementById("resultadoPresion").innerText
  }
  
  //Funcion para enviar el email, proporcionado por el recurso STMP
  $("#detalle").one("click", function enviarEmail(){
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "alfonsodelcid14@gmail.com",
        Password : "2A2B25BA300EA0B73D5CF394B559FFB615E3",
        To : document.getElementById("destinatario").value,
        From : "alfonsodelcid14@gmail.com",
        Subject : document.getElementById("asunto").value,
        Body : document.getElementById("mensaje").value 
    }).then(
      _message => alert("Mensaje enviado satisfactoriamente")
    );
})
  