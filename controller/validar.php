<?php

    $ruta="localhost";
    $database="clinica_dialisis";
    $user="root";
    $pass="";

    $conexion=mysqli_connect($ruta,$user,$pass,$database);

    $usuario = $_POST['user'];
    $password = $_POST['password'];

    $consulta = "SELECT*FROM users where user='$usuario' and password='$password'";
    $resultado = mysqli_query($conexion,$consulta);

    $filas = mysqli_num_rows($resultado);

    if($filas){
        echo "DATOS INGRESADOS CORRECTAMENTE";
    }
    else{
        echo "ERROR!! USUARIO O CONSTRASEÑA INCORRECTOS";
    }

    mysqli_free_result($resultado);
    mysqli_close($conexion);
?>