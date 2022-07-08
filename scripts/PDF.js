//import { jsPDF } from "jspdf.es";

window.onload = function(){

    let data = JSON.parse(localStorage.getItem('data'));

    $("#nombrePaciente").html("PACIENTE: " + data.nombre);
    $("#fechaAnalisis").html("FECHA: " + data.fecha);
    $("#sistema").html("SISTEMA: " + data.sistema);
    $("#presionArterial").html("PRESIÓN ARTERIAL: " + data.presionArterial)
    $("#concentracion1").html(data.concentracion1);
    $("#concentracion2").html(data.concentracion2);
    $("#concentracion3").html(data.concentracion3);
    $("#concentracion4").html(data.concentracion4);
    $("#drenaje1").html(data.drenaje1);
    $("#drenaje2").html(data.drenaje2);
    $("#drenaje3").html(data.drenaje3);
    $("#drenaje4").html(data.drenaje4);
    $("#condicion1").html(data.condicion1);
    $("#condicion2").html(data.condicion2);
    $("#condicion3").html(data.condicion3);
    $("#condicion4").html(data.condicion4);
    $("#TOTAL_BALANCE1").html(data.balance1 + " ml");
    $("#TOTAL_BALANCE2").html(data.balance2 + " ml");
    $("#TOTAL_BALANCE3").html(data.balance3 + " ml");
    $("#TOTAL_BALANCE4").html(data.balance4 + " ml");
    $("#resultadoBalance").html(data.resultadoBalance);
    $("#resultadoPresion").html(data.resultadoPresion);

    $("#TOTAL_INFUSION").html("8000 ml");
    $("#TOTAL_DRENAJE").html((Number(data.drenaje1)+Number(data.drenaje2)+Number(data.drenaje3)+Number(data.drenaje4)) + " ml");
    $("#TOTAL_BALANCE_FINAL").html( Number(8000-(Number(data.drenaje1)+Number(data.drenaje2)+Number(data.drenaje3)+Number(data.drenaje4))) + " ml");

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
        .save()
        .catch(err => {
            console.log(err)
        });
    
};

