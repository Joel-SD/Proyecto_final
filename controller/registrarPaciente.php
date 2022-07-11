<?php

    function registrarPaciente($idPaciente, $nombrePaciente){

        include('database.php');

        $consulta = "INSERT INTO `pacientes`(`id_paciente`,`nombre`) VALUES('$idPaciente','$nombrePaciente');";

        mysqli_query($conexion,$consulta);
    }
?>