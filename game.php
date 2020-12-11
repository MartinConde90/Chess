<!DOCTYPE html>
<html>
    <head>
    
        <meta charset='UTF-8'>
		<meta name="Viewport" content="weight=device-width, initial-scale=1.0">
        <title>Ajedrez</title>
        <link href="chessStyle.css" rel="stylesheet" type="text/css">
    </head>

<body>


<div class="padre"  >
    <div class="boton" id="padrebotones" >
        <button class="estilo botoni" type="button" id="start"  onclick="Inicializar.IntroducirNombre()">NEW GAME!</button>
        <button class="estilo botond" type="button" id="continue"  onclick="Inicializar.BuscarPartida()">CONTINUE</button>
    </div>
    

    <div id="muertasB" >
        </div>

    <div id="tablero">
        </div>   

    <div id="muertasN">
    </div>

    <div id="turnoB">
    </div>

    <div id="turnoN">
    </div>

    <div id="promocion">
    </div>

</div>
<script src="tablero.js"></script>

</body>