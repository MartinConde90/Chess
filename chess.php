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
        <button type="button" id="start"  onclick="Inicializar.IntroducirNombre()">NEW GAME!</button>
        <button type="button" id="continue"  onclick="Inicializar.Continuar()">CONTINUE</button>
    </div>

    <div id="muertasB" >
        </div>

    <div id="tablero">
        </div>   

    <div id="muertasN">
    </div>
</div>
<script src="tablero.js"></script>

</body>