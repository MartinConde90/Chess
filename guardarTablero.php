<?php
include 'conexion.php';

if(isset($_POST["datos"])){
    //echo "recibo algo POST";
    
    
    //$misDatosJSON = $_POST["datos"];
    //var_dump($misDatosJSON["color"]);
    //var_dump($misDatosJSON);
    
    
    $prep = $conexion->prepare('select nombre from tablero where nombre = ?'); 
    $prep->bind_param('s', $_POST['nombre']);
    $prep->execute();
    $resultado = $prep->get_result();
    $registro = $resultado->fetch_assoc();
    $comprobamos = $registro["nombre"];

    var_dump($comprobamos);
    if($comprobamos == ""){
    $null = null;
    $chess = $conexion->prepare('INSERT INTO tablero values(?,?,?);');
    $chess->bind_param('iss',$null, $_POST['nombre'], $_POST['datos']);
    $chess->execute();
    }

    if($comprobamos == $_POST['nombre']){
    $null = null;
    $chess = $conexion->prepare('UPDATE tablero set partida = ? where nombre = ?;');
    $chess->bind_param('ss', $_POST['datos'], $_POST['nombre']);
    $chess->execute();
    
    }
}

?>