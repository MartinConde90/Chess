<?php
include 'conexion.php';

if(isset($_POST["datos"])){
    //echo "recibo algo POST";
    
    
    //$misDatosJSON = $_POST["datos"];
    //var_dump($misDatosJSON["color"]);
    //var_dump($misDatosJSON);
    
    $null = null;
    $chess = $conexion->prepare('INSERT INTO tablero values(?,?);');
    $chess->bind_param('is',$null, $_POST['datos']);
    $chess->execute();
}

?>