    $('#ocultar').hide();
    $('#motivo').click(function(){
        var motivo = $('#motivo').val();
            if(motivo=="OTRO"){
                $("#ocultar").show();
            }
            else if(motivo!="OTRO"){
                $("#ocultar").hide();
            }

        })

    document.getElementById("formulario").addEventListener("submit", function (e) { 

        e.preventDefault();

        $('#btncita').click(function(){
            $.ajax({
            url: 'controller/citas.php',
            type: 'POST',
            data: $('#formulario').serialize(),
        
            }).done(function(res){
                alert(res);
                location.reload();
            }).fail(function(res){
                alert("Error al mandar tus datos")
                console.log(res);
            })
        })
    })
