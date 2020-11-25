class Tablero{

    constructor(){
         
        this.piezas = new Piezas();

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
                    tablero.innerHTML +='<div style="background-color: white" id="' +  (x*2+1) + '-' + (i-1) +'" onclick="Inicializar.mover(this)" >'+(x*2+1) + '-' + (i-1)+'</div>';
                    tablero.innerHTML +='<div style="background-color: grey" id="' +  x*2 + '-' + (i-1) +'" onclick="Inicializar.mover(this)">'+x*2 + '-' + (i-1)+'</div>';
                    x--;
                }
            }
            else{
                let x = 3;
                while(x>=0){
                    tablero.innerHTML +='<div style="background-color: grey" id="' +  (x*2+1) + '-' + (i-1) +'" onclick="Inicializar.mover(this)">'+(x*2+1) + '-' + (i-1)+'</div>';
                    tablero.innerHTML +='<div style="background-color: white" id="' +  x*2 + '-' + (i-1) +'" onclick="Inicializar.mover(this)">'+x*2 + '-' + (i-1)+'</div>';
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
            

            if(this.comprobarMov(this.figuraselecc1.color, this.figuraselecc2.color)){
                if(this.casillas[this.caracter1][this.caracter2].mover(this.cadena1,this.cadena2,this.figuraselecc1.color)){
                    let figuraMuerte = "pieza" + this.figuraselecc2.color;
                    this.muertes(this.figuraselecc2[figuraMuerte],this.figuraselecc2.color);

                    this.casillas[this.caracter1][this.caracter2] = "";
                    console.log(this.casillas);
                    this.casillas[this.caracter3][this.caracter4] = this.figuraselecc1; //mete el objeto
                    
                    //console.log(this.blancasM);
                    //console.log(this.negrasM);

                    this.borrar.innerHTML = '';
                    document.getElementById(this.cadena2).innerHTML='<img style="display: block; margin: auto; margin-top: 13px;" src="' + this.direct + this.seleccion +'" />';
                    this.cambiofig = true;
                }
            }
        }
    }

    comprobarMov(elemento, elemento2){
        if(elemento == elemento2 ){
            this.cambiofig = true;
            this.mover(this.segmov);
        }
        else
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
}

class Peon extends Piezas{
    constructor(color){
        super();
        this.color = color;
        this.piezaB = "peonB.png";
        this.piezaN = "peonN.png";
    }

    mover(posicion1,posicion2,color){
        if(color == "B"){
            let posIni = posicion1.slice(0,1);
            let posnew = (Number(posIni)+1) + posicion1.slice(1,3);
            let posnew2 = (Number(posIni)+2) + posicion1.slice(1,3);
            //console.log(posIni);
            if(posIni == "1"){
                if(posicion2 == posnew || posicion2 == posnew2)
                return true
            }

            if(posicion2 == posnew)
                return true;
        }
        if(color == "N"){
            let posIni = posicion1.slice(0,1);
            let posnew = (Number(posIni)-1) + posicion1.slice(1,3);
            let posnew2 = (Number(posIni)-2) + posicion1.slice(1,3);
            //console.log(posIni);
            if(posIni == "6"){
                if(posicion2 == posnew || posicion2 == posnew2)
                return true
            }
            if(posicion2 == posnew)
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
    } 
}

class Caballo extends Piezas{
    constructor(color){
        super();
        this.color = color;
        this.piezaB = "caballoB.png";
        this.piezaN = "caballoN.png";
    }
}

class Alfil extends Piezas{
    constructor(color){
        super();
        this.color = color;
        this.piezaB = "alfilB.png";
        this.piezaN = "alfilN.png";
    }
}

class Reina extends Piezas{
    constructor(color){
        super();
        this.color = color;
        this.piezaB = "reinaB.png";
        this.piezaN = "reinaN.png";
    }
}

class Rey extends Piezas{
    constructor(color){
        super();
        this.color = color;
        this.piezaB = "reyB.png";
        this.piezaN = "reyN.png";
    }
}



let Inicializar = new Tablero();
Inicializar.dibujarT();
//Inicializar.Iniciar();
