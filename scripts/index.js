$(document).ready(function(){
    
    $("#fecha").val(function(){
        let fecha = new Date();
        fecha.setHours(fecha.getHours()-5);
        return fecha.toJSON().slice(0,19)
    });

    $("#calcular").click(function(){
        if ($("#DRENAJE1").val() != "") {
            $("#TOTAL_BALANCE1").text(2000 - $("#DRENAJE1").val());
        }
        if ($("#DRENAJE2").val() != "") {
            $("#TOTAL_BALANCE2").text(2000 - $("#DRENAJE2").val());
        }
        if ($("#DRENAJE3").val() != "") {
            $("#TOTAL_BALANCE3").text(2000 - $("#DRENAJE3").val());
        }
        if ($("#DRENAJE4").val() != "") {
            $("#TOTAL_BALANCE4").text(2000 - $("#DRENAJE4").val());
        }
    })

        $(".input").change(function() {
    
            var empty = false;
            $('.input').each(function() {
                if ($(this).val() == '') {
                    empty = true;
                }
            });
    
            if (empty) {
                $('#calcular').attr('disabled', 'disabled'); // updated according to http://stackoverflow.com/questions/7637790/how-to-remove-disabled-attribute-with-jquery-ie
            } else {
                $('#calcular').removeAttr('disabled'); // updated according to http://stackoverflow.com/questions/7637790/how-to-remove-disabled-attribute-with-jquery-ie
            }
        });
})

