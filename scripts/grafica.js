    $(document).ready(function(){
        
        $.ajax({
            type: "POST",
            url: "controller/buscarBalance.php",
            data: {},
            dataType: "json",
            success: function (response) {
                let infusion1 = response.infusion1;
                let infusion2 = response.infusion2;
                let infusion3 = response.infusion3;
                let infusion4 = response.infusion4;
                let cedula = response.id_paciente;
                let nombre = response.nombre;
                let drenaje1 = response.drenaje1;
                let drenaje2 = response.drenaje2;
                let drenaje3 = response.drenaje3;
                let drenaje4 = response.drenaje4;
                let total_balance1 = response.total_balance1;
                let total_balance2 = response.total_balance2;
                let total_balance3 = response.total_balance3;
                let total_balance4 = response.total_balance4;
                let sistema = response.descripcion;
                let fecha = response.fecha;
                
                let ctx = document.getElementById("grafica").getContext("2d");
                let miGrafica = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: ["Balance 1","Balance 2","Balance 3","Balance 4"],
                        datasets: [{
                            label: "Infusión (mililitros)",
                            fillColor: "blue",
                            data: [infusion1,infusion2,infusion3,infusion4],
                            backgroundColor: 'rgba(255, 99, 132, 1)',
                            borderRadius: 15
                            },
                            {
                            label: "Drenaje (mililitros)",
                            fillColor: "green",
                            data: [drenaje1,drenaje2,drenaje3,drenaje4],
                            backgroundColor: 'rgba(75, 192, 192, 1)',
                            borderRadius: 15

                            },
                            {
                            label: "Balance (mililitros)",
                            fillColor: "red",
                            data: [total_balance1,total_balance2,total_balance3,total_balance4],
                            backgroundColor: 'rgba(153, 102, 255, 1)',
                            borderRadius: 15
                            }
                        ]
                        },
                        options: {
                            responsive: true,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Cédula: ' + cedula + '    Paciente: ' + nombre + "    Sistema: " + sistema+ "     Fecha: " + fecha.substr(0,10) + "    Hora: " + fecha.substr(11,5),
                                    font: {
                                        family: 'Helvetica',
                                        size: 20,
                                        weight: 'bold',
                                        lineHeight: 1.2,
                                    }
                                }
                            }
                        }
                });
            },
            error: function(response){
                json = JSON.stringify(response);
                alert(json.error);
            }
        });
    });