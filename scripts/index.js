$(document).ready(function(){

    let sumaDrenaje = 0;
    let contTurbio =0;

    //* Oculta Ventanas y Botones Inicialmente

    $("#window-resultados").hide();
    $("#detalle").hide();
    $("#reset").hide();

    //* Define Fecha y Hora Actual */

    $("#fecha").val(function(){
        let fecha = new Date();
        fecha.setHours(fecha.getHours()-5); //* UTC-5 */
        return fecha.toJSON().slice(0,19)
    });

    //* Validación de Campos */

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

    $("#sistolica").change(function(){
        if ($("#sistolica").val() < 80) {
            $("#sistolica").val(80);
        }
    });

    $("#diastolica").change(function(){
        if ($("#diastolica").val() < 60) {
            $("#diastolica").val(60);
        }
    });

    //******************************************/

    //* Botón Calcular */

    $("#calcular").click(function(){
        
        calcBalance(sumaDrenaje);

        contTurbio = analisisTurbiedad(contTurbio);

        analizarBalance(contTurbio);

        calcPresion($("#sistolica").val(),$("#diastolica").val());

        almacenarData();

        sumaDrenaje = 0;

        $("select").attr("disabled","disabled");
        $("input").attr("disabled","disabled");
        $('#calcular').attr('disabled', 'disabled');
        $("#reset").show();
        $("#detalle").show();
    });

    //* Calcula Balance */

    function calcBalance(suma){
        if ($("#DRENAJE1").val() != "") {
            suma += Number($("#DRENAJE1").val());
            $("#TOTAL_BALANCE1").text(Number(2000 - $("#DRENAJE1").val()) + " ml");
        }
        if ($("#DRENAJE2").val() != "") {
            suma += Number($("#DRENAJE2").val());
            $("#TOTAL_BALANCE2").text(Number(2000 - $("#DRENAJE2").val()) + " ml");
        }
        if ($("#DRENAJE3").val() != "") {
            suma += Number($("#DRENAJE3").val());
            $("#TOTAL_BALANCE3").text(Number(2000 - $("#DRENAJE3").val()) + " ml");
        }
        if ($("#DRENAJE4").val() != "") {
            suma += Number($("#DRENAJE4").val());
            $("#TOTAL_BALANCE4").text(Number(2000 - $("#DRENAJE4").val()) + " ml");
        }

        $("#TOTAL_INFUSION").html("<p>8000 ml</p>");

        $("#TOTAL_DRENAJE").html("<p>"+suma+" ml</p>");

        $("#TOTAL_BALANCE_FINAL").html("<p id=\"sumaTotalBalance\">"+Number(8000-suma)+"</p><p> ml</p>");
    }

    //* Abre Ventana de Detalle */

    $("#detalle").click(function(){
        $("#window-resultados").show();

        $("#nombre_resultado").text($("#nombre").val());
    });

    //* Cierra Ventana de Detalle */

    $("#cerrar-detalle").click(function(){
        $("#window-resultados").hide();
    })

    //* Refresca la pantalla */

    $("#reset").click(function(){
        location.reload();
    });

    //* Abre Ventana de Gráfica */

    $("#grafica").click(function(){
        var ventana = window.open('./grafico.html');
        ventana.focus();
    }).css('cursor', 'pointer');

    //* Analiza el nivel de turbiedad */

    function analisisTurbiedad(cont){
        if($("#condicion1").val()==2){
            cont++;
        }
        if($("#condicion2").val()==2){
            cont++;
        }
        if($("#condicion3").val()==2){
            cont++;
        }
        if($("#condicion4").val()==2){
            cont++;
        }

        return cont;
    }

    //* Analiza los Resultados del Balance Hídrico
    //* Toma en Cuenta los Niveles de Turbiedad */

    function analizarBalance(cont){
        if($("#sumaTotalBalance").text()>2000){
            alert("Excesiva retención de líquidos. Consulte de inmediato con su nefrólogo");
            if((cont) >= 2){
                alert("Consulte de inmediato con su néfrologo y programe su cita en la unidad de diálisis");
                $("#resultadoBalance").html("<p><strong>ALERTA</strong>: Consulte de inmediato con su néfrologo y programe su cita en la unidad de diálisis.</p><p><strong>ALERTA</strong>: Excesiva retención de líquidos. Consulte de inmediato con su nefrólogo</p><p>Balance Final del día = " +  $("#sumaTotalBalance").text() + " ml</p>");
            }else{
                $("#resultadoBalance").html("<p><strong>ALERTA</strong>: Excesiva retención de líquidos.</p><p>Consulte de inmediato con su nefrólogo</p><p>Balance Final del día = " +  $("#sumaTotalBalance").text() + " ml</p>");
            }
        }else if($("#sumaTotalBalance").text()>0){
            if((cont) >= 2){
                alert("Consulte de inmediato con su néfrologo y programe su cita en la unidad de diálisis");
                $("#resultadoBalance").html("<p><strong>ALERTA</strong>: Consulte de inmediato con su néfrologo y programe su cita en la unidad de diálisis.</p><p>Retención de líquidos considerable. En caso de presentarse esta situación por más de dos días consecutivos, llame y consulte con la unidad hospitalaria de Diálisis</p><p>Balance Final del día = " + $("#sumaTotalBalance").text() + " ml</p>");
            }else{
                $("#resultadoBalance").html("<p>Retención de líquidos considerable. En caso de presentarse esta situación por más de dos días consecutivos, llame y consulte con la unidad hospitalaria de Diálisis</p><p>Balance Final del día = " + $("#sumaTotalBalance").text() + " ml</p>");
            }
        }else{
            if((cont) >= 2){
                alert("Consulte de inmediato con su néfrologo y programe su cita en la unidad de diálisis");
                $("#resultadoBalance").html("<p><strong>ALERTA</strong>: Consulte de inmediato con su néfrologo y programe su cita en la unidad de diálisis.</p><p>Balance Hídrico Favorable. Condición normal, no hay retención de líquidos.</p>");
            }else{
                $("#resultadoBalance").html("<p>Balance Hídrico Favorable. Condición normal, no hay retención de líquidos.</p>");
            }
        }
    }

    //* Analiza la Presión Arterial */

    function calcPresion(sistolica, diastolica) {
        if (sistolica >= 210 || diastolica >= 120) {
            alert("ALERTA: Hipertensión crítica (Grado 4). Requiere ATENCIÓN HOSPITALARIA DE INMEDIATO");
            $("#resultadoPresion").html("<strong>ALERTA:</strong> Hipertensión crítica (Grado 4). Requiere <strong>ATENCIÓN HOSPITALARIA DE INMEDIATO</strong>");
        }else if(sistolica >= 180 || diastolica >= 110){
            alert("ALERTA: Hipertensión grave (Grado 3). Requiere ATENCIÓN HOSPITALARIA DE INMEDIATO");
            $("#resultadoPresion").html("<strong>ALERTA:</strong> Hipertensión grave (Grado 3). Requiere <strong>ATENCIÓN HOSPITALARIA DE INMEDIATO</strong>");
        }else if (sistolica >= 160 || diastolica >= 100) {
            $("#resultadoPresion").html("Hipertensión moderada (Grado 2): " + $("#sistolica").val() + "/" + $("#diastolica").val());
        }else if (sistolica >= 140 || diastolica >= 90) {
            $("#resultadoPresion").html("Hipertensión leve (Grado 1): " + $("#sistolica").val() + "/" + $("#diastolica").val());
        }else if (sistolica >= 130 || diastolica >= 85) {
            $("#resultadoPresion").html("Presión arterial normal alta: " + $("#sistolica").val() + "/" + $("#diastolica").val());
        }else if (sistolica >= 80 && diastolica >= 60) {
            $("#resultadoPresion").html("Presión arterial normal.");
        }
    }

    //* Almacena Datos de Manera Local */
    function almacenarData(){
        const myObj = { 
            nombre: $("#nombre").val(),
            fecha: $("#fecha").val(),
            sistema: $("#sistema option:selected").text(),
            presionArterial: $("#sistolica").val() + "/" + $("#diastolica").val(),
            drenaje1: $("#DRENAJE1").val(),
            drenaje2: $("#DRENAJE2").val(),
            drenaje3: $("#DRENAJE3").val(),
            drenaje4: $("#DRENAJE4").val(),
            balance1: Number(2000 - $("#DRENAJE1").val()) ,
            balance2: Number(2000 - $("#DRENAJE2").val()) ,
            balance3: Number(2000 - $("#DRENAJE3").val()) ,
            balance4: Number(2000 - $("#DRENAJE4").val()) 
        };
        const myJSON = JSON.stringify(myObj);
        localStorage.setItem("data", myJSON);
    }
})

