<?php

    include('database.php');
    include('registrarPaciente.php');

    $nombre = isset($_POST['nombre']) ? $_POST['nombre'] : '';
    $cedula = isset($_POST['cedula']) ? $_POST['cedula'] : '';
    $especialidad = isset($_POST['esp']) ? $_POST['esp'] : '';
    $medico = isset($_POST['medico']) ? $_POST['medico'] : '';
    $motivo = isset($_POST['motivo']) ? $_POST['motivo'] : '';
    $otro = isset($_POST['otro']) ? $_POST['otro'] : '';

    $consulta = "SELECT * FROM pacientes where id_paciente = '$cedula;";

    $resultado = mysqli_query($conexion,$consulta);

    if($resultado){

        $setenciasql = "INSERT INTO `tablacitas`(`cedula`, `especialidad`, `medico`, `motivo`, `otro`) VALUES ('$cedula','$especialidad','$medico','$motivo','$otro')";

        $insertar = mysqli_query($conexion,$setenciasql);

        if($insertar){
            echo "CITA AGENDADA CORRECTAMENTE";
        }else{
            echo "Detalles de error: " . mysqli_error($conexion);
        }
    }else{
        registrarPaciente($cedula,$nombre);

        $setenciasql = "INSERT INTO `tablacitas`(`cedula`, `especialidad`, `medico`, `motivo`, `otro`) VALUES ('$cedula','$especialidad','$medico','$motivo','$otro')";

        $insertar = mysqli_query($conexion,$setenciasql);

        if($insertar){
            echo "CITA AGENDADA CORRECTAMENTE";
        }else{
            echo "Detalles de error: " . mysqli_error($conexion);
        }
    }  
?>