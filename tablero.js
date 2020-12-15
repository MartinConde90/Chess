class Tablero{

    constructor(){
         
        //this.piezas = new Piezas();

        this.seleccion = ""; //nombre pieza
        this.cambiofig = true;

        this.cadena1 = ""; //id1
        this.caracter1 = ""; //y
        this.caracter2= "";  //x

        this.cadena2 = ""; //id2
        this.caracter3 = ""; //y
        this.caracter4= "";  //x

        this.segmov = ""; // div segundo click

        this.figuraselecc1 = ""; //array figura 1
        this.figuraselecc2 = "";//array figura 2

        this.borrar = "";
        this.blancasM = [];
        this.negrasM = [];

        this.direct = ""; //directorio fig1

        this.turno = "B";
        this.jugadasB = 0;
        this.jugadasN = 0;
        this.jugadasVictoria = 0;

        this.guardar = "";
        this.guardarturno = "";

        this.nombrePartida = "";

        this.sumres = 1;
        this.sumres2 = 2;

        this.arrayPosi = [];

        this.casillas = [[new Torre("B"),new Caballo("B"),new Alfil("B"),new Reina("B"),new Rey("B"),new Alfil("B"),new Caballo("B"),new Torre("B")],
                        [new Peon("B"),new Peon("B"),new Peon("B"),new Peon("B"),new Peon("B"),new Peon("B"),new Peon("B"),new Peon("B")],
                        ["","","","","","","",""],
                        ["","","","","","","",""],
                        ["","","","","","","",""],
                        ["","","","","","","",""],
                        [new Peon("N"),new Peon("N"),new Peon("N"),new Peon("N"),new Peon("N"),new Peon("N"),new Peon("N"),new Peon("N"),],
                        [new Torre("N"),new Caballo("N"),new Alfil("N"),new Reina("N"),new Rey("N"),new Alfil("N"),new Caballo("N"),new Torre("N")]];
    }

     dibujarT(){
         
        let filas = [1,3,5,7];
        let i = 1;
        let tablero = document.getElementById('tablero');
        while(i <= 8){
            if(filas.includes(i)){
                let x = 3;
                while(x>=0){
                    tablero.innerHTML +='<div class="B"  id="' +  (x*2+1) + '-' + (i-1) +'" onclick="Inicializar.mover(this)" > ' +(x*2+1) + '-' + (i-1) +' </div>';
                    tablero.innerHTML +='<div class="N"  id="' +  x*2 + '-' + (i-1) +'" onclick="Inicializar.mover(this)">' +  x*2 + '-' + (i-1) +'</div>';
                    x--;
                }
            }
            else{
                let x = 3;
                while(x>=0){
                    tablero.innerHTML +='<div class="N"  id="' +  (x*2+1) + '-' + (i-1) +'" onclick="Inicializar.mover(this)">' +  (x*2+1) + '-' + (i-1) +'</div>';
                    tablero.innerHTML +='<div class="B"  id="' +  x*2 + '-' + (i-1) +'" onclick="Inicializar.mover(this)">' +  x*2 + '-' + (i-1) +'</div>';
                    x--;
                }
            }
            i++;
        }
    }

    IntroducirNombre(){
        let borrar1 = document.getElementById('start');
        borrar1.parentNode.removeChild(borrar1);

        let borrar2 = document.getElementById('continue');
        borrar2.parentNode.removeChild(borrar2);

        document.getElementById('padrebotones').innerHTML=`<form id="buscarbd" name="formulario" method="post">
                                                            <input class="form__field" id="nombre" type="text" name="fname" placeholder="Insert game name" required autofocus >
                                                            <input class="estilo botonOtro" id="bloquea" type="button" value="START!" onclick="Inicializar.Iniciar()" >
                                                           </form>`;
        this.comprobarNombre();

    }

    BuscarPartida(){
        let borrar1 = document.getElementById('start');
        borrar1.parentNode.removeChild(borrar1);

        let borrar2 = document.getElementById('continue');
        borrar2.parentNode.removeChild(borrar2);

        document.getElementById('padrebotones').innerHTML=`<form  name="formulario" id="buscarbd" method="post">
                                                            <input class="form__field" id="nombre" type="text" name="fname" placeholder="Find your game" required autofocus >
                                                            <input class="estilo botonOtro" id="bloquea" type="button" value="START!"  onclick="Inicializar.Continuar()" >
                                                           </form>`;
        //this.comprobarNombre();
    }

    comprobarNombre(){
        let inputUsuario = document.getElementById('nombre');
            inputUsuario.onkeyup = function(){
                        
                            let peticion = new XMLHttpRequest();
                            peticion.open('GET', 'comprobarNombre.php?usuario=' + inputUsuario.value); /*con open le pedidmos mediante GET, que se conecte a esa pagina*/
                            peticion.send();
                        
                            peticion.onreadystatechange = function(){
                                if(this.readyState == 4){
                                    if(this.status == 200){
                                        let datos = JSON.parse(this.responseText); //decodificamos
                                        
                                        let alerta = document.getElementById('buscarbd');
                                        if(document.getElementById('parrafo_alerta')) //si existe, lo borro
                                            document.getElementById('parrafo_alerta').remove();
                                        let crea = document.createElement('p'); 
                                        crea.id = 'parrafo_alerta';
                                        crea.style.margin = "0px";
                                        
                                        if(datos['res'] == 1){
                                            
                                            crea.innerText = datos['texto'];
                                            crea.style.marginTop = "11px"; 
                                            alerta.append(crea);
                                            
                                            document.getElementById("bloquea").disabled = true;
                                        }
                                        else{
                                            document.getElementById("bloquea").disabled = false;
                                        }
                                    }
                                }
                            };
                        };
    }
    
    Iniciar(){

        this.nombrePartida = document.forms["formulario"]["fname"].value;
        if (this.nombrePartida == "")    
            return false;

        this.ColocarPiezas();
    }
 
    ColocarPiezas(){

        let borrar = document.getElementById("buscarbd");
        //borrar.innerHTML = '';
        borrar.parentNode.removeChild(borrar);
        
        let n = 0;
        while(n <= 7 ){
            let m = 0;
            while(m<=7){
                if(typeof this.casillas[m][n] === 'object' )
                    document.getElementById(m + '-' + n).innerHTML='<img style="display: block; margin: auto; padding: 13px;" src="' + this.casillas[m][n].figura() +'" />';
            m++;
            }
        n++; 
        }
        document.getElementById('padrebotones').innerHTML='<button class="estilo botonOtro" type="button"   onclick="location.reload();">Guardar y salir</button> ';
    }

    factoriaDePiezas(ficha){
        let nuevaPieza;
        switch(ficha.pieza) {
            
            case "Torre": nuevaPieza = new Torre(ficha.color); break;
            case "Alfil": nuevaPieza = new Alfil(ficha.color); break;
            case "Caballo": nuevaPieza = new Caballo(ficha.color); break;
            case "Reina": nuevaPieza = new Reina(ficha.color); break;
            case "Rey": nuevaPieza = new Rey(ficha.color); break;
            case "Peon": nuevaPieza = new Peon(ficha.color); break;
        }

        return nuevaPieza;

    }

    mover(elemento){
        
        if(this.cambiofig == true){
            
            this.cadena1 = elemento.id;
            this.caracter1 = this.cadena1.charAt(0);
            this.caracter2 = this.cadena1.charAt(2);
            
            this.figuraselecc1 = this.casillas[this.caracter1][this.caracter2];
            //console.log(this.turno + "turno actual");
            
            if(this.turno != this.figuraselecc1.color)
                return false;

            if(this.figuraselecc1.color == "N"){
                this.direct = this.figuraselecc1.directorioN;
            }
            else
                this.direct = this.figuraselecc1.directorioB;

            if(this.figuraselecc1 != ""){
                //let imagen = "pieza" + this.figuraselecc1.color;
                this.seleccion = this.figuraselecc1.recuperarImagen();
                //console.log(this.seleccion);
                this.borrar = elemento;
                this.cambiofig = false;
            }

            if(this.turno == "B"){
                let borrar1 = document.getElementById('turnoNegra');
                if(borrar1 !== null)
                    borrar1.parentNode.removeChild(borrar1);
                turnoB.innerHTML='<img id="turnoBlanca" style="display: block; margin: auto; " src="' + this.direct + this.seleccion +'" />'; 
            }

            if(this.turno == "N"){
                let borrar1 = document.getElementById('turnoBlanca');
                if(borrar1 !== null)
                    borrar1.parentNode.removeChild(borrar1);
                turnoN.innerHTML='<img id="turnoNegra" style="display: block; margin: auto; " src="' + this.direct + this.seleccion +'" />';
            }
            
            
            
            document.getElementById(this.cadena1).style.boxShadow = "inset 0 0 15px 10px #d1615d";
            
            this.sombreo("colocar");
            
        }
        //console.log(figura);  
        else{
            
            this.segmov = elemento;
            this.cadena2 = elemento.id;
            
            this.caracter3 = this.cadena2.charAt(0);
            this.caracter4 = this.cadena2.charAt(2);

            this.figuraselecc2 = this.casillas[this.caracter3][this.caracter4];
            

            if(this.comprobarMov(this.figuraselecc1.color, this.figuraselecc2.color,this.cadena1,this.cadena2)){
                if(this.casillas[this.caracter1][this.caracter2].movPos(this.cadena1,this.cadena2,this.figuraselecc2.color) && this.movimientolibre(this.caracter1,this.caracter2,this.caracter3,this.caracter4)){
                    let figuraMuerte = "pieza" + this.figuraselecc2.color;
                    this.muertes(this.figuraselecc2[figuraMuerte],this.figuraselecc2.color);

                    this.casillas[this.caracter1][this.caracter2] = "";
                    //console.log(this.figuraselecc2.nombre);
                    if(this.figuraselecc1 instanceof Peon && (this.caracter3 == 7 || this.caracter3 == 0) && this.figuraselecc2.nombre != "Rey"){ //promocionar peon
                        //console.log("peon llega al final");
                        
                            
                        let texto = document.createElement('div');
                        texto.className = "emergente";
                        texto.id = "emergente";
                        texto.innerHTML = `<p>Promociona a tu peón</p>`;
                        document.getElementById("promocion").appendChild(texto);

                        let torreSeleccionable = document.createElement('div');
                        torreSeleccionable.className= "boton torre";
                        torreSeleccionable.innerHTML = `<img style="display: block; margin: auto; margin-top: 13px;" src="${this.direct}torre${this.figuraselecc1.color}.png" />`;
                        torreSeleccionable.onclick = function(){Inicializar.promocionarPieza('Torre')};
                        document.getElementById("emergente").appendChild(torreSeleccionable);

                        let caballoSeleccionable = document.createElement('div');
                        caballoSeleccionable.className= "boton caballo";
                        caballoSeleccionable.innerHTML = `<img style="display: block; margin: auto; margin-top: 13px;" src="${this.direct}caballo${this.figuraselecc1.color}.png" />`;
                        caballoSeleccionable.onclick = function(){Inicializar.promocionarPieza('Caballo')};
                        document.getElementById("emergente").appendChild(caballoSeleccionable);

                        let alfilSeleccionable = document.createElement('div');
                        alfilSeleccionable.className= "boton alfil";
                        alfilSeleccionable.innerHTML = `<img style="display: block; margin: auto; margin-top: 13px;" src="${this.direct}alfil${this.figuraselecc1.color}.png" />`;
                        alfilSeleccionable.onclick = function(){Inicializar.promocionarPieza('Alfil')};
                        document.getElementById("emergente").appendChild(alfilSeleccionable);

                        let reinaSeleccionable = document.createElement('div');
                        reinaSeleccionable.className= "boton reina";
                        reinaSeleccionable.innerHTML = `<img style="display: block; margin: auto; margin-top: 13px;" src="${this.direct}reina${this.figuraselecc1.color}.png" />`;
                        reinaSeleccionable.onclick = function(){Inicializar.promocionarPieza('Reina')};
                        document.getElementById("emergente").appendChild(reinaSeleccionable);
                        
                        
                    }

                    else{    
                    this.casillas[this.caracter3][this.caracter4] = this.figuraselecc1; //mete el objeto
                    
                    //console.log(this.figuraselecc1);
                    
                    this.borrar.innerHTML = '';
                    document.getElementById(this.cadena2).innerHTML='<img style="display: block; margin: auto; margin-top: 13px;" src="' + this.direct + this.seleccion +'" />';
                    }

                    this.cambiofig = true;

                    if(this.turno == "N"){
                        this.jugadasN += 1;
                        this.jugadasVictoria = this.jugadasN;
                        //console.log("movimientos negras: " + this.jugadasN);
                        this.turno = "B";
                    }
                    else{      
                        this.jugadasB += 1; 
                        this.jugadasVictoria = this.jugadasB; 
                        //console.log("movimientos blancas: " + this.jugadasB);   
                        this.turno = "N";
                    }

                    this.muerterrey();
                    //console.log(this.blancasM);
                    this.archivar();
                    document.getElementById(this.cadena1).style.boxShadow = "";
                    this.sombreo("quitar");
                    //this.Continuar();
                }
            }
        }
    }

    sombreo(accion){
        if(this.figuraselecc1.nombre == "Peon"){
            this.sumres = 1;
            this.sumres2 = 2;
            this.posIni = 1;
            if(this.figuraselecc1.color == "N"){
                this.sumres = -1;
                this.sumres2 = -2;
                this.posIni = 6;
            }
            let parte1 = (Number(this.caracter1)+this.sumres).toString()+ "-";
            let posnew = parte1 + this.caracter2;
            let posnew2 = (Number(this.caracter1)+this.sumres2).toString()+ "-"+ this.caracter2;
            let posnewD = parte1 + (Number(this.caracter2)+1);
            let posnewI = parte1 + (Number(this.caracter2)-1);
            
            if(accion == "colocar"){
                //colores piezas casillas libres
                this.color1 = this.casillas[(Number(this.caracter1)+this.sumres).toString()][this.caracter2].color;
                if(Number(this.caracter1) >= 2 && this.figuraselecc1.color == "N")
                    this.color2 = this.casillas[(Number(this.caracter1)+this.sumres2).toString()][this.caracter2].color;
                if(Number(this.caracter1) <=5 && this.figuraselecc1.color == "B")
                    this.color2 = this.casillas[(Number(this.caracter1)+this.sumres2).toString()][this.caracter2].color;

                if(document.getElementById(posnewD) != null) //para ver si existe la casilla
                    this.color3 = this.casillas[(Number(this.caracter1)+this.sumres).toString()][posnewD.slice(2,3)].color;
                if(document.getElementById(posnewI) != null)
                    this.color4 = this.casillas[(Number(this.caracter1)+this.sumres).toString()][posnewI.slice(2,3)].color;
                //fin //colores piezas casillas libres

                let colorP = "B";
                if(this.figuraselecc1.color == "B")
                    colorP = "N";
                if(this.color1 == undefined)
                        document.getElementById(posnew).style.boxShadow = "inset 0 0 15px 10px #d1615d";
                if(this.caracter1 == this.posIni){
                    if(this.color2 == undefined && this.color1 == undefined)
                        document.getElementById(posnew2).style.boxShadow = "inset 0 0 15px 10px #d1615d";
                }
                if(this.color3 != undefined && this.color3 == colorP){
                    document.getElementById(posnewD).style.boxShadow = "inset 0 0 15px 10px #d1615d";   
                }
                if(this.color4 != undefined && this.color4 == colorP)
                    document.getElementById(posnewI).style.boxShadow = "inset 0 0 15px 10px #d1615d";

            }
            if(accion == "quitar"){
                document.getElementById(posnew).style.boxShadow = "";
                if(document.getElementById(posnew2) != null)
                    document.getElementById(posnew2).style.boxShadow = "";
                if(document.getElementById(posnewD) != null)
                    document.getElementById(posnewD).style.boxShadow = "";
                if(document.getElementById(posnewI) != null)
                    document.getElementById(posnewI).style.boxShadow = "";
            }
        }

        if(this.figuraselecc1.nombre == "Torre" || this.figuraselecc1.nombre == "Reina"){
            
            let posicioniniY = Number(this.caracter1);
            let posicioniniX = Number(this.caracter2);
            
            let posicionY = Number(this.caracter1);
            let posicionX = Number(this.caracter2);

            let id = "";
            let movpos = 1;
            

            if(accion == "colocar"){
                //arriba
                while(posicionY < 7){
                    posicionY += movpos;
                    if(this.casillas[posicionY][posicionX].nombre == undefined || this.casillas[posicionY][posicionX].color != this.figuraselecc1.color){
                        console.log(this.casillas[posicionY][posicionX].color);
                        console.log(this.figuraselecc1.color);
                        id = posicionY + '-' + posicionX;
                        document.getElementById(id).style.boxShadow = "inset 0 0 15px 10px #d1615d";
                        this.arrayPosi.push(id);
                        
                    }
                    if(this.casillas[posicionY][posicionX].nombre != undefined){
                        break;
                    }
                }
                posicionY = posicioniniY;
                while(posicionY > 0){
                    posicionY -= movpos;
                    if(this.casillas[posicionY][posicionX].nombre == undefined || this.casillas[posicionY][posicionX].color != this.figuraselecc1.color){
                        console.log(this.casillas[posicionY][posicionX].color);
                        console.log(this.figuraselecc1.color);
                        id = posicionY + '-' + posicionX;
                        document.getElementById(id).style.boxShadow = "inset 0 0 15px 10px #d1615d";
                        this.arrayPosi.push(id);
                        
                    }
                    if(this.casillas[posicionY][posicionX].nombre != undefined){
                        break;
                    }
                }
                posicionY = posicioniniY;
                while(posicionX < 7){
                    posicionX += movpos;
                    if(this.casillas[posicionY][posicionX].nombre == undefined || this.casillas[posicionY][posicionX].color != this.figuraselecc1.color){
                        console.log(this.casillas[posicionY][posicionX].color);
                        console.log(this.figuraselecc1.color);
                        id = posicionY + '-' + posicionX;
                        document.getElementById(id).style.boxShadow = "inset 0 0 15px 10px #d1615d";
                        this.arrayPosi.push(id);
                        
                    }
                    if(this.casillas[posicionY][posicionX].nombre != undefined){
                        break;
                    }
                }
                posicionX = posicioniniX;
                while(posicionX > 0){
                    posicionX -= movpos;
                    if(this.casillas[posicionY][posicionX].nombre == undefined || this.casillas[posicionY][posicionX].color != this.figuraselecc1.color){
                        console.log(this.casillas[posicionY][posicionX].color);
                        console.log(this.figuraselecc1.color);
                        id = posicionY + '-' + posicionX;
                        document.getElementById(id).style.boxShadow = "inset 0 0 15px 10px #d1615d";
                        this.arrayPosi.push(id);
                        
                    }
                    if(this.casillas[posicionY][posicionX].nombre != undefined){
                        break;
                    }
                }

            }

            if(accion == "quitar"){
                for(let i of this.arrayPosi){
                    document.getElementById(i).style.boxShadow = "";
                }
                this.arrayPosi = [];
            }
            
        }

        if(this.figuraselecc1.nombre == "Alfil" || this.figuraselecc1.nombre == "Reina"){
            let posicioniniY = Number(this.caracter1);
            let posicioniniX = Number(this.caracter2);
            
            let posicionY = Number(this.caracter1);
            let posicionX = Number(this.caracter2);
            
            let id = "";
            let movpos = 1;
            let posicionid = "";

            if(accion == "colocar"){
                
                while(document.getElementById((posicionY+1) + "-" + (posicionX+1)) != null){
                    posicionY += movpos;
                    posicionX += movpos;
                    if(this.casillas[posicionY][posicionX].nombre == undefined || this.casillas[posicionY][posicionX].color != this.figuraselecc1.color){
                        console.log(this.casillas[posicionY][posicionX].color);
                        console.log(this.figuraselecc1.color);
                        id = posicionY + '-' + posicionX;
                        document.getElementById(id).style.boxShadow = "inset 0 0 15px 10px #d1615d";
                        this.arrayPosi.push(id);
                        
                    }
                    if(this.casillas[posicionY][posicionX].nombre != undefined){
                        break;
                    }
                }
                posicionY = posicioniniY;
                posicionX = posicioniniX;
                while(document.getElementById((posicionY+1) + "-" + (posicionX-1)) != null){
                    posicionY += movpos;
                    posicionX -= movpos;
                    if(this.casillas[posicionY][posicionX].nombre == undefined || this.casillas[posicionY][posicionX].color != this.figuraselecc1.color){
                        console.log(this.casillas[posicionY][posicionX].color);
                        console.log(this.figuraselecc1.color);
                        id = posicionY + '-' + posicionX;
                        document.getElementById(id).style.boxShadow = "inset 0 0 15px 10px #d1615d";
                        this.arrayPosi.push(id);
                        
                    }
                    if(this.casillas[posicionY][posicionX].nombre != undefined){
                        break;
                    }
                }
                posicionY = posicioniniY;
                posicionX = posicioniniX;
                while(document.getElementById((posicionY-1) + "-" + (posicionX-1)) != null){
                    posicionY -= movpos;
                    posicionX -= movpos;
                    if(this.casillas[posicionY][posicionX].nombre == undefined || this.casillas[posicionY][posicionX].color != this.figuraselecc1.color){
                        console.log(this.casillas[posicionY][posicionX].color);
                        console.log(this.figuraselecc1.color);
                        id = posicionY + '-' + posicionX;
                        document.getElementById(id).style.boxShadow = "inset 0 0 15px 10px #d1615d";
                        this.arrayPosi.push(id);
                        
                    }
                    if(this.casillas[posicionY][posicionX].nombre != undefined){
                        break;
                    }
                }
                posicionY = posicioniniY;
                posicionX = posicioniniX;
                while(document.getElementById((posicionY-1) + "-" + (posicionX+1)) != null){
                    posicionY -= movpos;
                    posicionX += movpos;
                    if(this.casillas[posicionY][posicionX].nombre == undefined || this.casillas[posicionY][posicionX].color != this.figuraselecc1.color){
                        console.log(this.casillas[posicionY][posicionX].color);
                        console.log(this.figuraselecc1.color);
                        id = posicionY + '-' + posicionX;
                        document.getElementById(id).style.boxShadow = "inset 0 0 15px 10px #d1615d";
                        this.arrayPosi.push(id);
                        
                    }
                    if(this.casillas[posicionY][posicionX].nombre != undefined){
                        break;
                    }
                }
                posicionY = posicioniniY;
                posicionX = posicioniniX;
            }
            if(accion == "quitar"){
                for(let i of this.arrayPosi){
                    document.getElementById(i).style.boxShadow = "";
                }
                this.arrayPosi = [];
            }

        }
    }
    muerterrey(){
        if(this.blancasM.includes("reyB.png") || this.negrasM.includes("reyN.png")){
            let reina = "";

            if(this.blancasM.includes("reyB.png") == true){
                reina = "piezas/negras/reinaN.png";
            }  
            if(this.negrasM.includes("reyN.png") == true){
                reina = "piezas/blancas/reinaB.png";
            } 
            let bloqueo = document.createElement('div');
            bloqueo.id = "bloqueo";
            document.getElementById("promocion").appendChild(bloqueo);

            let texto = document.createElement('div');
            texto.className = "emergente";
            texto.id = "emergente";
            texto.innerHTML = `<p>Victoria en `+this.jugadasVictoria+` movimientos</p>`;
            texto.innerHTML += '<img style="display: block; margin: auto; margin-top: 13px;" src="' + reina +'" />';
            document.getElementById("bloqueo").appendChild(texto);

            document.getElementById('padrebotones').innerHTML='<button class="estilo botonOtro" type="button"   onclick="location.reload();">Volver al menú</button> ';
            
        }
    }

    promocionarPieza(objeto){
        
        let array = {pieza: objeto, color: this.figuraselecc1.color};
        this.figuraselecc1 = this.factoriaDePiezas(array);
        this.casillas[this.caracter3][this.caracter4] = this.figuraselecc1;

        this.borrar.innerHTML = '';

        document.getElementById(this.cadena2).innerHTML='<img style="display: block; margin: auto; margin-top: 13px;" src="' + this.direct + this.figuraselecc1.recuperarImagen() +'" />';
        let borrar1 = document.getElementById('emergente');
            borrar1.remove();

    }

    archivar(){
        //console.log(this.casillas);
        let almacenamiento = [];
        
        for(let posY in this.casillas){
            let array1 = this.casillas[posY];
            for(let posX in array1){
                let pieza = array1[posX];
                if(pieza != "") {
                    //console.log(pieza.color);
                    almacenamiento.push({posY:posY, posX: posX, pieza: pieza.nombre, color: pieza.color});
                    //console.log(almacenamiento);
                }
            }
        }
        
        this.guardar = JSON.stringify({vict:this.jugadasVictoria, movB: this.jugadasB, movN: this.jugadasN,turno:this.turno, partida:almacenamiento, muertasB:this.blancasM, muertasN:this.negrasM}); //codificamos
        //this.guardarnombre = JSON.stringify(this.nombrePartida);
       // console.log(this.guardarturno);

        //AJAX
        var peticion = new XMLHttpRequest();
        peticion.open('POST', 'guardarTablero.php'); /*con open le pedidmos mediante GET, que se conecte a esa pagina*/
        peticion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        peticion.send("datos=" + this.guardar  + "&nombre=" + this.nombrePartida);
        
        //peticion.send("datos=" + this.guardar);
    }

    Continuar(){
        this.nombrePartida = document.forms["formulario"]["fname"].value;
        if (this.nombrePartida == "")    
            return false;

        let datos = "";
        let parametros = '?buscado=' + this.nombrePartida;
        var peticion = new XMLHttpRequest();
        //establecer parámetros peticion
        peticion.open('GET', 'continuarpartida.php' + parametros) //carga esta pagina al clicar en CargarDatos
        //enviar peticion
        peticion.send();
        let objectoPrincipal = this;
        //gestionar respuesta
        peticion.onreadystatechange = function(){
            if(this.readyState == 4){
                if(this.responseText == ""){
                    let borrar1 = document.getElementById('buscarbd');
                    borrar1.parentNode.removeChild(borrar1);
                    document.getElementById('padrebotones').innerHTML='<button class="estilo botoni" type="button" id="start"  onclick="Inicializar.IntroducirNombre()">NEW GAME!</button> ';
                    document.getElementById('padrebotones').innerHTML+=' <button class="estilo botond" type="button" id="continue"  onclick="Inicializar.BuscarPartida()">CONTINUE</button>';
                    document.getElementById('padrebotones').innerHTML+= '<p id="parrafo_alerta">Partida no encontrada</p>';
                    return false
                }
            datos = JSON.parse(this.responseText);
            

            //console.log(this.responseText);    
            objectoPrincipal.blancasM = datos.muertasB;
            objectoPrincipal.negrasM = datos.muertasN;
            objectoPrincipal.jugadasB = datos.movB;
            objectoPrincipal.jugadasN = datos.movN;
            objectoPrincipal.turno = datos.turno;
            objectoPrincipal.jugadasVictoria = datos.vict;
            //datos.partida
            objectoPrincipal.casillas = [["","","","","","","",""],
                                         ["","","","","","","",""],
                                         ["","","","","","","",""],
                                         ["","","","","","","",""],
                                         ["","","","","","","",""],
                                         ["","","","","","","",""],
                                         ["","","","","","","",""],
                                         ["","","","","","","",""]];
        for(let ficha of datos.partida){
            objectoPrincipal.casillas[ficha.posY][ficha.posX] = objectoPrincipal.factoriaDePiezas(ficha);
            //console.log(ficha);
        }
        for(let muerta of datos.muertasN){
            muertasN.innerHTML+='<img style="display: block; margin: auto; margin-top: 13px;" src="piezas/negras/'+ muerta +'" />';
        }
        for(let muerta of datos.muertasB){
            muertasB.innerHTML+='<img style="display: block; margin: auto; margin-top: 13px;" src="piezas/blancas/'+ muerta +'" />';
        }
        //console.log(datos.partida);
        objectoPrincipal.ColocarPiezas();
        objectoPrincipal.muerterrey();
        
            }   
        };
    }

    comprobarMov(color1, color2,posicion1,posicion2){
        //console.log(color1);
        //console.log(color2);
        
        if(color1 == color2 ){
            this.cambiofig = true;
            document.getElementById(this.cadena1).style.boxShadow = "";
            this.sombreo("quitar");
            this.mover(this.segmov);
        }
        else
            return true;
    }

    movimientolibre(y1,x1,y2,x2){
        y1 = Number(y1);
        x1 = Number(x1);
        y2 = Number(y2);
        x2 = Number(x2);

        let movlong1 = y1-y2;
        let movlong2 = x1-x2;

        let movdiag1 = y1+x1;
        let movdiag2 = y2+x2;
        let movdiag3 = y1-x1;
        let movdiag4 = y2-x2;
        let contadorCaballo = 0;

        let ope = 1; //mov peon

        if(this.figuraselecc1.nombre == "Peon"){     
            if(this.figuraselecc1.color == "N")
                ope = -1;
            if(movlong1 == -2 || movlong1 == 2){
                if(this.casillas[y1+ope][x2] != "")
                    return false
            } 
        }

        if(this.seleccion.slice(0,-5) == "alfil" || this.seleccion.slice(0,-5) == "reina"){
            if(movdiag1 == movdiag2){
                if(y1>y2){
                    while((y1-1)>y2){
                        if(this.casillas[y1-1][x1+1] != "")
                            return false
                        y1--;
                        x1++;
                    }
                }
                if(y1<y2){
                    while((y1+1)<y2){
                        if(this.casillas[y1+1][x1-1] != "")
                            return false
                        y1++;
                        x1--;
                    }
                }
            }

            if(movdiag3 == movdiag4){
                if(y1<y2){
                    while((y1+1)<y2){
                        if(this.casillas[y1+1][x1+1] != "")
                            return false
                        y1++;
                        x1++;
                    }
                }
                if(y1>y2){
                    while((y1-1)>y2){
                        if(this.casillas[y1-1][x1-1] != "")
                            return false
                        y1--;
                        x1--;
                    }
                }
            }
        }

        if(this.seleccion.slice(0,-5) == "torre" || this.seleccion.slice(0,-5) == "reina"){
            if(y1==y2){
                if(movlong2 > 0){
                    while((x1-1) > x2){
                        if(this.casillas[y1][x1-1] != "")
                            return false
                        x1--;
                    }
                }
                if(movlong2 < 0){
                    while((x1+1) < x2){
                        if(this.casillas[y1][x1+1] != "")
                            return false
                        x1++;
                    }
                }
            }
            if(x1==x2){
                if(movlong1 > 0){
                    while((y1-1) > y2){
                        if(this.casillas[y1-1][x1] != "")
                            return false
                        y1--;
                    }
                }
                if(movlong1 < 0){
                    while((y1+1) < y2){
                        if(this.casillas[y1+1][x1] != "")
                            return false
                        y1++;
                    }
                }
            }
        }

        if(this.seleccion.slice(0,-5) == "caballo"){

            let verif1 = 0;
            let verif2 = 0;
            


            if((Math.abs(Number(y2) - Number(y1)) == 2) && (Math.abs(Number(x2) - Number(x1)) == 1)){
                let yuno = y1;
                let ydos = y2;
                let xuno = x1;
                
                while(yuno != ydos){
                    if(this.casillas[yuno+(movlong1/2*-1)][xuno] != "" && contadorCaballo == 1)
                            verif1++;
                    if(this.casillas[yuno+(movlong1/2*-1)][xuno] != "" && contadorCaballo < 1)
                        contadorCaballo++;

                yuno += (movlong1/2)*-1;
                }
            }

            if((Math.abs(Number(x2) - Number(x1)) == 2) && (Math.abs(Number(y2) - Number(y1)) == 1)){
                let yuno = y1;
                
                let xuno = x1;
                let xdos = x2;
                while(xuno != xdos){
                    if(this.casillas[yuno][xuno+(movlong2/2*-1)] != "" && contadorCaballo == 1)
                            verif1++;
                    if(this.casillas[yuno][xuno+(movlong2/2*-1)] != "" && contadorCaballo < 1)
                        contadorCaballo++;

                xuno += (movlong2/2)*-1;
                }
            }

            if((Math.abs(Number(x2) - Number(x1)) == 1) && (Math.abs(Number(y2) - Number(y1)) == 2)){
                contadorCaballo = 0;
                while(x1 != x2){
                    
                    if(this.casillas[y1][x1+(movlong2*-1)] != "")
                        contadorCaballo++;

                x1 += movlong2*-1;
                }

                while(y1 != y2+(movlong1/2)){
                    if(this.casillas[y1+(movlong1/2*-1)][x1] != "" && contadorCaballo == 1)
                            verif2++;
                y1+= (movlong1/2*-1);
                }

            }
            
            if((Math.abs(Number(y2) - Number(y1)) == 1) && (Math.abs(Number(x2) - Number(x1)) == 2)){
                contadorCaballo = 0;
                while(y1 != y2){
                    //console.log(y1+(movlong1*-1));
                    if(this.casillas[y1+(movlong1*-1)][x1] != "")
                        contadorCaballo++;

                y1 += (movlong1*-1);
                }

                while(x1 != x2+(movlong2/2)){
                    if(this.casillas[y1][x1+(movlong2/2*-1)] != "" && contadorCaballo == 1)
                            verif2++;
                x1+= (movlong2/2*-1);
                }

            }

            if(verif1 == 1 && verif2 == 1)
                return false
        }

        return true;
    }

    muertes(figura,direct){
        if(direct == "N"){
            this.negrasM.push(figura);
            muertasN.innerHTML+='<img style="display: block; margin: auto; margin-top: 13px;" src="' + this.figuraselecc2["directorioN"] + figura +'" />';
        }
        if(direct == "B"){
            this.blancasM.push(figura);
            muertasB.innerHTML+='<img style="display: block; margin: auto; margin-top: 13px;" src="' + this.figuraselecc2["directorioB"] + figura +'" />';
        }
    }
}

class Piezas{
    constructor(){
        this.directorioB = "piezas/blancas/";
        this.directorioN = "piezas/negras/";
    }
    recuperarImagen() {
        if(this.color == 'B') {
            return this.piezaB;
        }
        return this.piezaN;
    }

    figura(){

        if(this.color == "B")
            return this.directorioB + this.piezaB;
        if(this.color == "N")
            return this.directorioN + this.piezaN;  
    }

    movdiag(validar,y1,x1,y2,x2){
        if(y1<y2){
            if(x1>x2)
                return this.comprobdiag(validar,y1,x1,y2,x2);
            if(x1<x2){
                validar = false;
                return this.comprobdiag(validar,y1,x1,y2,x2);  
            }
        }
        if(y1>y2){
            if(x1>x2){
                validar = false;
                return this.comprobdiag(validar,y1,x1,y2,x2);
            }
            if(x1<x2)
                return this.comprobdiag(validar,y1,x1,y2,x2);
        }  
    }

    comprobdiag(validar,y1,x1,y2,x2){
        
            if(validar){
                if((Number(y1)+Number(x1)) == (Number(y2)+Number(x2)))
                    return true;
            }
            else{
                if((Number(y1)-Number(x1)) == (Number(y2)-Number(x2)))
                    return true;
            }
            return false;   
    }

    movlong(posini1,posini2,posIni1,posIni2){
        if(posini1 == posini2)
            return true
        if(posIni1 == posIni2)
            return true
    }
}

class Peon extends Piezas{
    constructor(color){
        super();
        this.color = color;
        this.piezaB = "peonB.png";
        this.piezaN = "peonN.png";
        this.desplazamiento = 1;
        this.posIni = "1";
        this.color2 = "N";
        this.nombre = "Peon";
        
        if(color == 'N') {
            this.desplazamiento = -1;
            this.posIni = "6";
            this.color2 = "B";
        }
    }

    movPos(posicion1,posicion2,color2){
            

        let posIni = posicion1.slice(0,1);
        let posnew = (Number(posIni)+ this.desplazamiento + posicion1.slice(1,3));
        let posnew2 = (Number(posIni)+ (this.desplazamiento * 2) + posicion1.slice(1,3));
        let posnewD = (Number(posIni)+ this.desplazamiento) + '-' + (Number(posicion1.slice(2,3))+1);
        let posnewI = (Number(posIni)+ this.desplazamiento) + '-' + (Number(posicion1.slice(2,3))-1);
        
        if(posIni == this.posIni && posicion2 == posnew && color2 == undefined){
            return true 
        }
        if(posicion2 == posnew2 && color2 == undefined){
            return true
        }
        if(posicion2 == posnew && color2 == undefined){
            return true;
        }
        if(color2 == this.color2 && (posicion2 == posnewD || posicion2 == posnewI)){
            return true;
        }
    }
}

class Torre extends Piezas{
    constructor(color){
        super();
        this.color = color;
        this.piezaB = "torreB.png";
        this.piezaN = "torreN.png";
        this.nombre = "Torre";
    } 

    movPos(posicion1,posicion2,color2){
        let c1 = posicion1.slice(0,1);
        let c2 = posicion1.slice(2,3);

        let c3 = posicion2.slice(0,1);
        let c4 = posicion2.slice(2,3);

        return this.movlong(c1,c3,c2,c4);
        

    }
}

class Caballo extends Piezas{
    constructor(color){
        super();
        this.color = color;
        this.piezaB = "caballoB.png";
        this.piezaN = "caballoN.png";
        this.nombre = "Caballo";
    }

    movPos(posicion1,posicion2,color2){
        let y1 = posicion1.slice(0,1);
        let x1 = posicion1.slice(2,3);

        let y2 = posicion2.slice(0,1);
        let x2 = posicion2.slice(2,3);
        
        if((Math.abs(Number(y2) - Number(y1)) == 2) && (Math.abs(Number(x2) - Number(x1)) == 1))
            return true

        if((Math.abs(Number(y2) - Number(y1)) == 1) && (Math.abs(Number(x2) - Number(x1)) == 2))
            return true
    }
}

class Alfil extends Piezas{
    constructor(color){
        super();
        this.color = color;
        this.piezaB = "alfilB.png";
        this.piezaN = "alfilN.png";
        this.nombre = "Alfil";
    }

    movPos(posicion1,posicion2,color2){
        let c1 = posicion1.slice(0,1);
        let c2 = posicion1.slice(2,3);

        let c3 = posicion2.slice(0,1);
        let c4 = posicion2.slice(2,3);
        let validar = true;

        return this.movdiag(validar,c1,c2,c3,c4); 
    }

}

class Reina extends Piezas{
    constructor(color){
        super();
        this.color = color;
        this.piezaB = "reinaB.png";
        this.piezaN = "reinaN.png";
        this.nombre = "Reina";
    }

    movPos(posicion1,posicion2,color2){
        let c1 = posicion1.slice(0,1);
        let c2 = posicion1.slice(2,3);

        let c3 = posicion2.slice(0,1);
        let c4 = posicion2.slice(2,3);
        let validar = true;
        
        
        
        if(this.movlong(c1,c3,c2,c4) || this.movdiag(validar,c1,c2,c3,c4)){
            return true
        }
        return false;
    }
}

class Rey extends Piezas{
    constructor(color){
        super();
        this.color = color;
        this.piezaB = "reyB.png";
        this.piezaN = "reyN.png";
        this.nombre = "Rey";
    }

    movPos(posicion1,posicion2,color2){
        let c1 = posicion1.slice(0,1);
        let c2 = posicion1.slice(2,3);

        let c3 = posicion2.slice(0,1);
        let c4 = posicion2.slice(2,3);
        
        if(((Math.abs(Number(c3) - Number(c1)) == 1) || Number(c3) == Number(c1)) && (Math.abs(Number(c4) - Number(c2)) == 1 || Number(c4) == Number(c2))) 
            return true;

    }
}

let Inicializar = new Tablero();
Inicializar.dibujarT();

