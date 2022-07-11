document.getElementById("formlogin").addEventListener("submit", function(e){
e.preventDefault();

//$(document).ready(function(){

    $('#btn').click(function(){
        $.ajax({
        url: 'controller/validar.php',
        type: 'POST',
        data: $('#formlogin').serialize(),

    })
    .done(function(res){
        alert(res);
        if(res==="DATOS INGRESADOS CORRECTAMENTE"){
        location.href="options.html";}
    })
    .fail(function(res){
        alert(res);
    })
        })
    //})
})