<?php
//var_dump($_GET);
include 'conexion.php';


$prep = $conexion->prepare('SELECT * FROM tablero WHERE codigo = ?');
            if($conexion->error)
                echo $conexion->error;
            $prep->bind_param('i', $_GET['buscado']);
            
            $prep->execute();
            $resultado = $prep->get_result();
            $registro = $resultado->fetch_assoc();
            echo($registro["partida"]);
            

