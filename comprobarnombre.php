<?php
    include 'conexion.php';
    
    $sql = $conexion->prepare('SELECT nombre
            FROM tablero
            where nombre = ?');
    
    $sql->bind_param('s', $_GET['usuario']);
    $sql->execute();
    $resultado = $sql->get_result();
   

   if($resultado->num_rows !== 0 ){
       echo json_encode(['res' => 1, 'texto' => "El nombre ya existe"]);
   } else {
    echo json_encode([]);
   }

   