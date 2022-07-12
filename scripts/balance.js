$(document).ready(function(){

    let sumaDrenaje = 0;
    let aux =0;
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

    $("#cedula").keyup(function (){

        $.ajax({
            url: 'controller/buscarPaciente.php',
            type: 'POST',
            data: {cedula: $("#cedula").val()},
    
        })
        .done(function(res){
            if (!res == "") {
                alert("Usuario en sistema: "+res);
                $("#nombre").val(res);
                $("#nombre").attr('disabled', 'disabled');
            }else{
                $("#nombre").val("");
                $("#nombre").removeAttr('disabled');
            }
            
        })
        .fail(function(res){
            alert(res);
        })

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

        console.log( $("#sistema option:selected").val())
        //almacenarData();
        guardarBalance(aux);

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

        aux = suma;

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
    });

   $("#descargar").click(function(){
        var popout = window.open("./pdfReporte.html", '_blank', 'toolbar=0,location=0,menubar=0');
        
   });
    

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
    function guardarBalance(sumaDrenaje){

        $.ajax({
            type: "POST",
            url: "controller/guardarBalance.php",
            data: {
                idPaciente: $("#cedula").val(),
                nombre: $("#nombre").val(),
                idSistema: $("#sistema option:selected").val(),
                presionArterial: $("#sistolica").val() + "/" + $("#diastolica").val(),
                fecha: $("#fecha").val(),
                concentracion1: $("#concentracion1 option:selected").text(),
                concentracion2: $("#concentracion2 option:selected").text(),
                concentracion3: $("#concentracion3 option:selected").text(),
                concentracion4: $("#concentracion4 option:selected").text(),
                drenaje1: $("#DRENAJE1").val(),
                drenaje2: $("#DRENAJE2").val(),
                drenaje3: $("#DRENAJE3").val(),
                drenaje4: $("#DRENAJE4").val(),
                condicion1: $("#condicion1 option:selected").text(),
                condicion2: $("#condicion2 option:selected").text(),
                condicion3: $("#condicion3 option:selected").text(),
                condicion4: $("#condicion4 option:selected").text(),
                balance1: Number(2000 - $("#DRENAJE1").val()),
                balance2: Number(2000 - $("#DRENAJE2").val()),
                balance3: Number(2000 - $("#DRENAJE3").val()),
                balance4: Number(2000 - $("#DRENAJE4").val()),
                totalDrenaje: sumaDrenaje,
                totalBalance: Number(8000 - sumaDrenaje)
            }
        }).done(function(res){
            alert(res);
        }).fail(function(res){
            alert("Error al mandar tus datos")
            console.log(res);
        })

        const myObj = { 
            
            presionArterial: $("#sistolica").val() + "/" + $("#diastolica").val(),
            resultadoBalance: $("#resultadoBalance").html(),
            resultadoPresion: $("#resultadoPresion").html()
        };
        const myJSON = JSON.stringify(myObj);
        localStorage.setItem("data", myJSON);
    }
})

