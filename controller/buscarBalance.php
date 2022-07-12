<?php
    include('database.php');

    $consulta = $conexion->prepare("SELECT * FROM(( BALANCE INNER JOIN PACIENTES ON balance.id_paciente = pacientes.id_paciente)INNER JOIN sistema ON balance.id_sistema = sistema.id_sistema) ORDER BY id_balance DESC LIMIT 1");

    $consulta->execute();

    $resultado = $consulta->get_result();
    
    echo json_encode(($resultado->fetch_assoc()));
    
    $conexion->close();
