//import { jsPDF } from "jspdf.es";

window.onload = function(){

    $(document).ready(function(){

        let data = JSON.parse(localStorage.getItem('data'));
        
        $.ajax({
            type: "POST",
            url: "controller/buscarBalance.php",
            data: {},
            dataType: "json",
            success: function (response) {
                
                $("#nombrePaciente").html("PACIENTE: " + response.nombre);
                $("#fechaAnalisis").html("FECHA: " + response.fecha);
                $("#sistema").html("SISTEMA: " + response.descripcion);
                $("#presionArterial").html("PRESIÓN ARTERIAL: " + data.presionArterial)
                $("#concentracion1").html(response.concentracion1);
                $("#concentracion2").html(response.concentracion2);
                $("#concentracion3").html(response.concentracion3);
                $("#concentracion4").html(response.concentracion4);
                $("#drenaje1").html(response.drenaje1);
                $("#drenaje2").html(response.drenaje2);
                $("#drenaje3").html(response.drenaje3);
                $("#drenaje4").html(response.drenaje4);
                $("#condicion1").html(response.condicion1);
                $("#condicion2").html(response.condicion2);
                $("#condicion3").html(response.condicion3);
                $("#condicion4").html(response.condicion4);
                $("#TOTAL_BALANCE1").html(response.total_balance1 + " ml");
                $("#TOTAL_BALANCE2").html(response.total_balance2 + " ml");
                $("#TOTAL_BALANCE3").html(response.total_balance3 + " ml");
                $("#TOTAL_BALANCE4").html(response.total_balance4 + " ml");
                $("#TOTAL_INFUSION").html(response.total_infusion + " ml");
                $("#resultadoBalance").html(data.resultadoBalance);
                $("#resultadoPresion").html(data.resultadoPresion);
                $("#TOTAL_DRENAJE").html(response.total_drenaje + " ml");
                $("#TOTAL_BALANCE_FINAL").html(response.total_balance_final + " ml");

                let elemento = document.body;
                html2pdf()
                    .set({
                        margin: 1,
                        filename: "Analisis.pdf",
                        
                        html2canvas: {
                            scale: 3,
                            letterRendering: true,
                        },
                        jsPDF: {
                            unit: "in",
                            format: "letter",
                            orientation: "portrait"
                        }
                    })
                    .from(elemento)
                    .save(response.nombre +" "+response.fecha)
                    .catch(err => {
                        console.log(err)
                    });
            },
            error: function(response){
                alert(response);
            }
        });
    });    
};

