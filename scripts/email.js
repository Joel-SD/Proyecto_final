$(document).ready(function(){
    $("#email").hide();
  })
  
  $("#calcular").click(function(){
    $("#email").show();
  })
  
  function llenarEmail(){
    var fill = document.getElementById("asunto")
    fill.value = document.getElementById("nombre").value + " Alerta DP"
    var desc = document.getElementById("mensaje")
    desc.value = fecha.value + "\n" + document.getElementById("nombre").value +"\n"+ document.getElementById("resultadoBalance").innerText + "\n" + document.getElementById("resultadoPresion").innerText
  }
  
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
  
  $("#btn").click(function(){
    $("#email").hide();
  })