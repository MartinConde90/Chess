<?php
$servidor =  'localhost';
$usuario = 'root';
$clave = '';
$nombreBaseDatos = 'ajedrez';

$conexion = new mysqli($servidor, $usuario, $clave, $nombreBaseDatos);

if($conexion->connect_error){ //connect_error es un atributo propio de la case de mysqli
    die('No se ha podido conectar a la BD: ' . $conexion->connect_error);
}

$conexion->set_charset('utf8');

?>