<!DOCTYPE html>
<html>
    <head>
    
        <meta charset='UTF-8'>
		<meta name="Viewport" content="weight=device-width, initial-scale=1.0">
        <title>Menu</title>
        <!--<link href="css/style.css" rel="stylesheet" type="text/css"> -->
        <style>
            html{
                height: 100%;
            }
            body{
                height: 100%;
                margin: 0;
            }

            .padre{
                display: grid;
                align-items: center;
                grid-auto-flow: column;
                grid-template-rows: auto 730px auto;
                grid-template-columns: auto 190px 720px 190px auto;
                grid-template-areas:
                                    '. header header header .'
                                    '. col1 col2 col3 .'
                                    '. footer footer footer .';
                height: 100%;
            }

            .boton{
                grid-area: header;
                text-align: center;
            }

            #muertasB{
                display: grid;
                grid-auto-flow: column;
                grid-template-columns: 90px 90px;
                grid-template-rows: 90px 90px 90px 90px 90px 90px 90px 90px;
                box-sizing: border-box;
                border: 5px solid red;
                grid-area: col1;
            }

            #tablero{
                display: grid;
                grid-auto-flow: column;
                grid-template-rows: 90px 90px 90px 90px 90px 90px 90px 90px;
                grid-template-columns: 90px 90px 90px 90px 90px 90px 90px 90px;
                box-sizing: border-box;
                border-top: 5px solid red;
                border-bottom: 5px solid red;
                grid-area: col2;
            }

            #muertasN{
                display: grid;
                grid-auto-flow: column;
                grid-template-columns: 90px 90px;
                grid-template-rows: 90px 90px 90px 90px 90px 90px 90px 90px;
                box-sizing: border-box;
                border: 5px solid red;
                grid-area: col3;
            }
        </style>
    </head>

<body>


<div class="padre" >
    <div class="boton" >
        <button type="button" id="start"  onclick="Inicializar.Iniciar()">START!</button>
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