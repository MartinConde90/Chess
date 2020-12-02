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

        this.guardar = "";

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
                    tablero.innerHTML +='<div class="B" style="background-color: white" id="' +  (x*2+1) + '-' + (i-1) +'" onclick="Inicializar.mover(this)" >'+(x*2+1) + '-' + (i-1)+'</div>';
                    tablero.innerHTML +='<div class="N" style="background-color: grey" id="' +  x*2 + '-' + (i-1) +'" onclick="Inicializar.mover(this)">'+x*2 + '-' + (i-1)+'</div>';
                    x--;
                }
            }
            else{
                let x = 3;
                while(x>=0){
                    tablero.innerHTML +='<div class="N" style="background-color: grey" id="' +  (x*2+1) + '-' + (i-1) +'" onclick="Inicializar.mover(this)">'+(x*2+1) + '-' + (i-1)+'</div>';
                    tablero.innerHTML +='<div class="B" style="background-color: white" id="' +  x*2 + '-' + (i-1) +'" onclick="Inicializar.mover(this)">'+x*2 + '-' + (i-1)+'</div>';
                    x--;
                }
            }
            i++;
        }
    }

    Iniciar(){
        let borrar = document.getElementById('start');
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
    }

    mover(elemento){
        
        if(this.cambiofig == true){

            this.cadena1 = elemento.id;
            this.caracter1 = this.cadena1.charAt(0);
            this.caracter2 = this.cadena1.charAt(2);
            
            this.figuraselecc1 = this.casillas[this.caracter1][this.caracter2];
            console.log(this.turno + "turno actual");
            
            if(this.turno != this.figuraselecc1.color)
                return false;

            if(this.figuraselecc1.color == "N"){
                this.direct = this.figuraselecc1.directorioN;
            }
            else
                this.direct = this.figuraselecc1.directorioB;

            if(this.figuraselecc1 != ""){
                let imagen = "pieza" + this.figuraselecc1.color;
                this.seleccion = this.figuraselecc1[imagen];
                
                this.borrar = elemento;
                this.cambiofig = false;
            }
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
                    console.log(this.casillas);
                    this.casillas[this.caracter3][this.caracter4] = this.figuraselecc1; //mete el objeto
                    
                    this.archivar();
                    //console.log(this.blancasM);
                    //console.log(this.negrasM);

                    this.borrar.innerHTML = '';
                    document.getElementById(this.cadena2).innerHTML='<img style="display: block; margin: auto; margin-top: 13px;" src="' + this.direct + this.seleccion +'" />';
                    this.cambiofig = true;

                    
                    if(this.turno == "N")
                        this.turno = "B";
                    else
                        this.turno = "N";
                        
                    //console.log(this.turno + "cambio turno");
                }
            }
        }
    }

    archivar(){
        this.guardar = JSON.stringify(this.casillas);
            //console.log(this.guardar);

            //AJAX
            var peticion = new XMLHttpRequest();
            peticion.open('POST', 'guardarTablero.php'); /*con open le pedidmos mediante GET, que se conecte a esa pagina*/
            peticion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            peticion.send("datos=" + this.guardar);
    }

    comprobarMov(color1, color2,posicion1,posicion2){
        console.log(color1);
        console.log(color2);
        
        if(color1 == color2 ){
            this.cambiofig = true;
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
                    console.log(y1+(movlong1*-1));
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

            if(posIni == this.posIni && (posicion2 == posnew || posicion2 == posnew2)){
                return true
            }
            if(posicion2 == posnew)
                return true;
            
            if(color2 == this.color2 && (posicion2 == posnewD || posicion2 == posnewI))
                return true;
        }

}

class Torre extends Piezas{
    constructor(color){
        super();
        this.color = color;
        this.piezaB = "torreB.png";
        this.piezaN = "torreN.png";
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
//Inicializar.Iniciar();
