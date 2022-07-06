$(document).ready(function(){

    
    $("#window-resultados").hide();
    $("#detalle").hide();
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

        $("#detalle").show();
    });

    $("#detalle").click(function(){
        $("#window-resultados").show();

        $("#nombre_resultado").text($("#nombre").val());

        let contTurbio =0;

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

        console.log(contTurbio);

        if($("TOTAL_BALANCE_FINAL")>2000){
            $("#resultadoBalance").text("ALERTA: Excesiva retención de líquidos. Consulte de inmediato con su nefrólogo\nBalance Final del día =" +  $("#TOTAL_BALANCE_FINAL").val());
            alert("Excesiva retención de líquidos. Consulte de inmediato con su nefrólogo");
            if((contTurbio) >= 2){
                alert("ALERTA: Consulte de inmediato con su néfrologo y programe su cita en la unidad de diálisis");
            }
        }else if($("TOTAL_BALANCE_FINAL")>0){
            $("#resultadoBalance").text("Retención de líquidos considerable. En caso de presentarse esta situación por más de dos días consecutivos, llame y consulte con la unidad hospitalaria de Diálisis\nBalance Final del día" + $("#TOTAL_BALANCE_FINAL").val());
            if((contTurbio) >= 2){
                alert("ALERTA: Consulte de inmediato con su néfrologo y programe su cita en la unidad de diálisis");
            }
        }else{
            $("#resultadoBalance").text("Balance Hídrico Favorable. Condición normal, no hay retención de líquidos.");
            if((contTurbio) >= 2){
                alert("ALERTA: Consulte de inmediato con su néfrologo y programe su cita en la unidad de diálisis");
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
})

