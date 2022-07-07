$(document).ready(function(){


    $("#window-resultados").hide();
    $("#detalle").hide();
    $("#fecha").val(function(){
        let fecha = new Date();
        fecha.setHours(fecha.getHours()-5);
        return fecha.toJSON().slice(0,19)
    });

    let sumaDrenaje = 0;

    let contTurbio =0;

    $("#calcular").click(function(){
        if ($("#DRENAJE1").val() != "") {
            sumaDrenaje += Number($("#DRENAJE1").val());
            $("#TOTAL_BALANCE1").text(Number(2000 - $("#DRENAJE1").val()) + " ml");
        }
        if ($("#DRENAJE2").val() != "") {
            sumaDrenaje += Number($("#DRENAJE2").val());
            $("#TOTAL_BALANCE2").text(Number(2000 - $("#DRENAJE2").val()) + " ml");
        }
        if ($("#DRENAJE3").val() != "") {
            sumaDrenaje += Number($("#DRENAJE3").val());
            $("#TOTAL_BALANCE3").text(Number(2000 - $("#DRENAJE3").val()) + " ml");
        }
        if ($("#DRENAJE4").val() != "") {
            sumaDrenaje += Number($("#DRENAJE4").val());
            $("#TOTAL_BALANCE4").text(Number(2000 - $("#DRENAJE4").val()) + " ml");
        }

        $("#TOTAL_INFUSION").html("<p>8000 ml</p>");

        $("#TOTAL_DRENAJE").html("<p>"+sumaDrenaje+" ml</p>");

        $("#TOTAL_BALANCE_FINAL").html("<p id=\"sumaTotalBalance\">"+Number(8000-sumaDrenaje)+"</p><p> ml</p>");

        $("#detalle").show();

        if($("#condicion1").val()==2){
            contTurbio++;
        }
        if($("#condicion2").val()==2){
            contTurbio++;
        }
        if($("#condicion3").val()==2){
            contTurbio++;
        }
        if($("#condicion4").val()==2){
            contTurbio++;
        }

        if(contTurbio >= 2){
            alert("Consulte de inmediato con su néfrologo y programe su cita en la unidad de diálisis");
        }

        // $.ajax({
        //     url     : 'data.json',
        //     method  : "POST",
        //     data    : { 'nombre': $("#nombre").val(),
        //                 'fecha': $("#fecha").val(),
        //                 'sistema': $("#sistema option:selected").text(),
        //                 'presionArterial': $("#sistolica").val() + "/" + $("#diastolica").val(),
        //                 'totalInfusion': 8000,
        //                 'totalDrenaje': sumaDrenaje,
        //                 'totalBalance': Number(8000-sumaDrenaje)
        //             },
        //     contentType: "application/json; charset=utf-8",
        //     dataType: "json",
        //     success : function( response ) {
        //         alert( response );
        //     },
        //     error: function (xhr) { console.log(xhr.responseText);
        //     }
        // });

        $.post("http://127.0.0.1:5500//scripts/data.json", {'nombre': $("#nombre").val(),
                             'fecha': $("#fecha").val(),
                             'sistema': $("#sistema option:selected").text(),
                             'presionArterial': $("#sistolica").val() + "/" + $("#diastolica").val(),
                             'totalInfusion': 8000,
                             'totalDrenaje': sumaDrenaje,
                             'totalBalance': Number(8000-sumaDrenaje)
        }, function(status) {
            alert(status);
        });

        sumaDrenaje = 0;

        console.log(contTurbio);
    });

    $("#detalle").click(function(){
        $("#window-resultados").show();

        $("#nombre_resultado").text($("#nombre").val());

        if($("#sumaTotalBalance").text()>2000){
            alert("Excesiva retención de líquidos. Consulte de inmediato con su nefrólogo");
            if((contTurbio) >= 2){
                alert("Consulte de inmediato con su néfrologo y programe su cita en la unidad de diálisis");
                $("#resultadoBalance").html("<p><strong>ALERTA</strong>: Consulte de inmediato con su néfrologo y programe su cita en la unidad de diálisis.</p><p><strong>ALERTA</strong>: Excesiva retención de líquidos. Consulte de inmediato con su nefrólogo</p><p>Balance Final del día = " +  $("#sumaTotalBalance").text() + " ml</p>");
            }else{
                $("#resultadoBalance").html("<p><strong>ALERTA</strong>: Excesiva retención de líquidos.</p><p>Consulte de inmediato con su nefrólogo</p><p>Balance Final del día = " +  $("#sumaTotalBalance").text() + " ml</p>");
            }
        }else if($("#sumaTotalBalance").text()>0){
            if((contTurbio) >= 2){
                alert("Consulte de inmediato con su néfrologo y programe su cita en la unidad de diálisis");
                $("#resultadoBalance").html("<p><strong>ALERTA</strong>: Consulte de inmediato con su néfrologo y programe su cita en la unidad de diálisis.</p><p>Retención de líquidos considerable. En caso de presentarse esta situación por más de dos días consecutivos, llame y consulte con la unidad hospitalaria de Diálisis</p><p>Balance Final del día = " + $("#sumaTotalBalance").text() + " ml</p>");
            }else{
                $("#resultadoBalance").html("<p>Retención de líquidos considerable. En caso de presentarse esta situación por más de dos días consecutivos, llame y consulte con la unidad hospitalaria de Diálisis</p><p>Balance Final del día = " + $("#sumaTotalBalance").text() + " ml</p>");
            }
        }else{
            if((contTurbio) >= 2){
                alert("Consulte de inmediato con su néfrologo y programe su cita en la unidad de diálisis");
                $("#resultadoBalance").html("<p><strong>ALERTA</strong>: Consulte de inmediato con su néfrologo y programe su cita en la unidad de diálisis.</p><p>Balance Hídrico Favorable. Condición normal, no hay retención de líquidos.</p>");
            }else{
                $("#resultadoBalance").html("<p>Balance Hídrico Favorable. Condición normal, no hay retención de líquidos.</p>");
            }
        }
    });

    $(".input").change(function() {

        var empty = false;
        $('.input').each(function() {
            if ($(this).val() == '') {
                empty = true;
            }
        });

        if (empty) {
            $('#calcular').attr('disabled', 'disabled');
        } else {
            $('#calcular').removeAttr('disabled');
        }
    });

    $("#cerrar-detalle").click(function(){
        $("#window-resultados").hide();
    })

    $("#grafica").click(function(){
        var ventana = window.open('./grafico.html');
        ventana.focus();
    }).css('cursor', 'pointer');
})

