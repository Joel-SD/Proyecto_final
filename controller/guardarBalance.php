<?php
    include('database.php');
    include('registrarPaciente.php');
    
    if (isset($_POST['idPaciente']) && isset($_POST['nombre']) && isset($_POST['idSistema']) && isset($_POST['presionArterial'])
        && isset($_POST['fecha']) &&  isset($_POST['concentracion1']) && isset($_POST['concentracion2']) && isset($_POST['concentracion3']) && isset($_POST['concentracion4'])
        && isset($_POST['drenaje1']) && isset($_POST['drenaje2']) && isset($_POST['drenaje3']) && isset($_POST['drenaje4'])
        && isset($_POST['condicion1']) && isset($_POST['condicion2']) && isset($_POST['condicion3']) && isset($_POST['condicion4'])
        && isset($_POST['balance1']) && isset($_POST['balance2']) && isset($_POST['balance3']) && isset($_POST['balance4'])
        && isset($_POST['totalDrenaje']) && isset($_POST['totalBalance'])) {

        $idPaciente = $_POST['idPaciente'];
        $nombre = $_POST['nombre'];
        $idSistema = $_POST['idSistema'];
        $presionArterial = $_POST['presionArterial'];
        $fecha = $_POST['fecha'];
        $concentracion1 = $_POST['concentracion1'];
        $concentracion2 = $_POST['concentracion2'];
        $concentracion3 = $_POST['concentracion3'];
        $concentracion4 = $_POST['concentracion4'];
        $drenaje1 = $_POST['drenaje1'];
        $drenaje2 = $_POST['drenaje2'];
        $drenaje3 = $_POST['drenaje3'];
        $drenaje4 = $_POST['drenaje4'];
        $condicion1 = $_POST['condicion1'];
        $condicion2 = $_POST['condicion2'];
        $condicion3 = $_POST['condicion3'];
        $condicion4 = $_POST['condicion4'];
        $balance1 = $_POST['balance1'];
        $balance2 = $_POST['balance2'];
        $balance3 = $_POST['balance3'];
        $balance4 = $_POST['balance4'];
        $totalDrenaje = $_POST['totalDrenaje'];
        $totalBalance = $_POST['totalBalance'];

        
        $consulta = "SELECT * FROM pacientes where id_paciente = '$idPaciente;";

        $resultado = mysqli_query($conexion,$consulta);

        if($resultado){

            echo $resultado;
            
            $setenciasql = "INSERT INTO `balance`(`id_paciente`, `id_sistema`, `fecha`, `presion`," .
            " `concentracion1`, `concentracion2`, `concentracion3`, `concentracion4`," .
            " `infusion1`, `infusion2`, `infusion3`, `infusion4`, `total_infusion`," .
            " `drenaje1`, `drenaje2`, `drenaje3`, `drenaje4`, `total_drenaje`," .
            " `cualidad1`, `cualidad2`, `cualidad3`, `cualidad4`," .
            " `total_balance1`, `total_balance2`, `total_balance3`, `total_balance4`, `total_balance_final`)" .
            " VALUES ('$idPaciente',$idSistema,'$fecha','$presionArterial','$concentracion1','$concentracion2','$concentracion3','$concentracion4'," .
            "'2000','2000','2000','2000','8000',$drenaje1,$drenaje2,$drenaje3,$drenaje4,$totalDrenaje," .
            "'$condicion1','$condicion2','$condicion3','$condicion4'," .
            "$balance1,$balance2,$balance3,$balance4,$totalBalance)";

            $insertar = mysqli_query($conexion,$setenciasql);

            if($insertar){
                echo "BALANCE REGISTRADO";
            }else{
                echo "ERROR: " . mysqli_error($conexion);
                echo  $setenciasql;
            }
        }else{

            registrarPaciente($idPaciente,$nombre);

            $setenciasql = "INSERT INTO `balance`(`id_paciente`, `id_sistema`, `fecha`, `presion`," .
            " `concentracion1`, `concentracion2`, `concentracion3`, `concentracion4`," .
            " `infusion1`, `infusion2`, `infusion3`, `infusion4`, `total_infusion`," .
            " `drenaje1`, `drenaje2`, `drenaje3`, `drenaje4`, `total_drenaje`," .
            " `cualidad1`, `cualidad2`, `cualidad3`, `cualidad4`," .
            " `total_balance1`, `total_balance2`, `total_balance3`, `total_balance4`, `total_balance_final`)" .
            " VALUES ('$idPaciente',$idSistema,'$fecha','$presionArterial','$concentracion1','$concentracion2','$concentracion3','$concentracion4'," .
            "'2000','2000','2000','2000','8000',$drenaje1,$drenaje2,$drenaje3,$drenaje4,$totalDrenaje," .
            "'$condicion1','$condicion2','$condicion3','$condicion4'," .
            "$balance1,$balance2,$balance3,$balance4,$totalBalance)";

            $insertar = mysqli_query($conexion,$setenciasql);

            if($insertar){
                echo "BALANCE REGISTRADO";
            }else{
                echo "ERROR: " . mysqli_error($conexion);
                echo  $setenciasql;
            }
        }
    }
?>