<!DOCTYPE html>
<html>
    <head>
    
        <meta charset='UTF-8'>
		<meta name="Viewport" content="weight=device-width, initial-scale=1.0">
        <title>Menu</title>
        <!--<link href="css/style.css" rel="stylesheet" type="text/css"> -->
    </head>
<body style="width: 590px;">
<button type="button" id="start" style="position: absolute; left: 50%; " onclick="Inicializar.Iniciar()">START!</button>
<div id="muertasB" style="display: grid; grid-auto-flow: column; grid-template-columns: 90px 90px; grid-template-rows: 90px 90px 90px 90px 90px 90px 90px 90px; 
            box-sizing: border-box; border: 5px solid red; position: absolute; top: 10%; left: 12.5%;">
    </div>

<div id="tablero" style="display: grid; grid-auto-flow: column; grid-template-rows: 90px 90px 90px 90px 90px 90px 90px 90px; grid-template-columns: 90px 90px 90px 90px 90px 90px 90px 90px;
            box-sizing: border-box; border: 5px solid red; position: absolute; top: 10%; left: 25%;">
    </div>   

<div id="muertasN" style="display: grid; grid-auto-flow: column; grid-template-columns: 90px 90px; grid-template-rows: 90px 90px 90px 90px 90px 90px 90px 90px; 
        box-sizing: border-box; border: 5px solid red; position: absolute; top: 10%; left: 73.4%;">
</div>
 <script src="tablero.js"></script>

