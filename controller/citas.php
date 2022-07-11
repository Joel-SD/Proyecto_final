<?php

    $ruta="localhost";
    $database="clinica_dialisis";
    $user="root";
    $password="";

    $conexion=mysqli_connect($ruta,$user,$password,$database);

    $nombre = isset($_POST['nombre']) ? $_POST['nombre'] : '';
    $cedula = isset($_POST['cedula']) ? $_POST['cedula'] : '';
    $especialidad = isset($_POST['esp']) ? $_POST['esp'] : '';
    $medico = isset($_POST['medico']) ? $_POST['medico'] : '';
    $motivo = isset($_POST['motivo']) ? $_POST['motivo'] : '';
    $otro = isset($_POST['otro']) ? $_POST['otro'] : '';

    $setenciasql = "INSERT INTO `tablacitas`(`nombre`, `cedula`, `especialidad`, `medico`, `motivo`, `otro`) VALUES ('$nombre','$cedula','$especialidad','$medico','$motivo','$otro')";

    $insertar = mysqli_query($conexion,$setenciasql);

    if($insertar){
        echo "CITA AGENDADA CORRECTAMENTE";
    }else{
        echo "Detalles de error: " . mysqli_error($conexion);
    }

?>