    $(document).ready(function(){

        let data = JSON.parse(localStorage.getItem('data'));
        let ctx = document.getElementById("grafica").getContext("2d");
        let miGrafica = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Balance 1","Balance 2","Balance 3","Balance 4"],
                datasets: [{
                    label: "Infusión (mililitros)",
                    fillColor: "blue",
                    data: [2000,2000,2000,2000],
                    backgroundColor: 'rgba(255, 99, 132, 1)',
                    borderRadius: 15
                    },
                    {
                    label: "Drenaje (mililitros)",
                    fillColor: "green",
                    data: [data.drenaje1,data.drenaje2,data.drenaje3,data.drenaje4],
                    backgroundColor: 'rgba(75, 192, 192, 1)',
                    borderRadius: 15

                    },
                    {
                    label: "Balance (mililitros)",
                    fillColor: "red",
                    data: [data.balance1,data.balance2,data.balance3,data.balance4],
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
                        text: 'Paciente: ' + data.nombre + "    Sistema: " + data.sistema + "     Fecha: " + data.fecha.substr(0,10) + "     Hora: " + data.fecha.substr(11,5),
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

        $("#nombre-paciente").html("<p>"+data.nombre+"</p>");
        $("#sistema-drenaje").html("<p>"+data.sistema+"</p>");
        $("#fecha-prueba").html("<p>"+data.fecha+"</p>");
    });