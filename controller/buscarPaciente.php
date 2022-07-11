<?php

use LDAP\Result;

    include('database.php');

    if(isset($_POST['cedula'])){

        $cedula = $_POST['cedula'];

        $consulta = "SELECT * FROM pacientes where id_paciente = '$cedula';";

        $resultado = mysqli_query($conexion,$consulta);

        while($row = mysqli_fetch_assoc($resultado)){
            echo $row['nombre'];
        }

    }
?>