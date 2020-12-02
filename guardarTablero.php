<?php

if(isset($_POST["datos"])){
    //echo "recibo algo POST";
    
    //recibo los datos y los decodifico con PHP
    $misDatosJSON = json_decode($_POST["datos"]);
    var_dump($misDatosJSON);
}

?>