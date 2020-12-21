const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
var numeronivel = document.getElementById('numero_nivel')
var txt_turno = document.getElementById('turnode')


class Juego {
  constructor() {
      this.inicializar()
      this.generarSecuencia()
      txt_turno.innerHTML = "MAQUINA"
      this.siguienteNivel()
  }

  inicializar() {
      this.elegirColor = this.elegirColor.bind(this)
      btnEmpezar.classList.add('hide')
      this.nivel = 7
      this.user = 0
      this.colores = {
          celeste,
          violeta,
          naranja,
          verde
      }
  }

  generarSecuencia() {
      this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
      console.log('Sec ', this.secuencia);
      
  }

   siguienteNivel() {
      if(this.nivel != 10)
      {
        numeronivel.innerHTML = this.nivel
        this.iluminarSecuencia()
        this.agregarEventosClick()
      }
      else
      {
        numeronivel.innerHTML = 'YOU WIN'
      }
  }

  transformarNumeroAColor(numero) {
      switch (numero) {
          case 0:
              return'celeste'
          case 1:
              return'violeta'
          case 2:
              return'naranja'
          case 3:
              return'verde'
      }
  }
  transformarColorANumero(color) {
    switch (color) {
        case "celeste":
          return 0;
        case "violeta":
          return 1;
        case "naranja":
          return 2;
        case "verde":
          return 3;
          default:
            console.log("NO ENTRA A NUNGUNO");
            break;
            
      }
}

  iluminarSecuencia() {
      for (let i = 0; i < this.nivel; i++) {
          const color = this.transformarNumeroAColor(this.secuencia[i])
          setTimeout(() =>
          {
            this.iluminarColor(color)
            if (i+1 == this.nivel) {
              setTimeout(() => {
                txt_turno.innerHTML = "USER"
              }, 700);
              //console.log("TERMINE");
            }
          }, 1000 * i)
          
      }  
  }

  iluminarColor(color) {
      this.colores[color].classList.add('light')
      setTimeout(() => this.apagarColor(color), 350)
  }

  apagarColor(color) {
      this.colores[color].classList.remove('light')
  }

  agregarEventosClick() {
      this.colores.celeste.addEventListener('click', this.elegirColor)
      this.colores.violeta.addEventListener('click', this.elegirColor)
      this.colores.naranja.addEventListener('click', this.elegirColor)
      this.colores.verde.addEventListener('click', this.elegirColor)
    
  }
  removeEventosClick() {
    this.colores.celeste.removeEventListener('click', this.elegirColor)
    this.colores.violeta.removeEventListener('click', this.elegirColor)
    this.colores.naranja.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
  
}

  elegirColor(ev) {

    this.iluminarColor(ev.toElement.dataset.color)
    let ttxtcolor = ev.toElement.dataset.color
    // console.log("SPY TIPO ", typeof ev.toElement.dataset.color);

    const numerocolor = this.transformarColorANumero(ttxtcolor)
    console.log("POS ",numerocolor)
    

    if(numerocolor == this.secuencia[this.user])
    {
      //console.log("VAS BIEN");
      this.user++
      
      if(this.user == this.nivel)
      {
        //console.log("SIGUENTE NOVEL");
      
        this.user = 0;
        this.nivel++
        this.removeEventosClick();
        setTimeout(() => {
          txt_turno.innerHTML = "MAQUINA"
          this.siguienteNivel()
          
        }, 1000);
        
      }
    }
    else{
      //console.log("PErDIsSTE");
      numeronivel.innerHTML = "YOU LOSS"
      this.user = 0;
      this.nivel = 1
    }
  }

}

const empezarJuego =()=> window.juego = new Juego()
