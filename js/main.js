
/* Existen varias formas para que se ejecute correctamente el js:
    1ra. es poner el script abajo de todo el html justo antes de cerrar el body.

    2da. es escuchar cuando el navegador haya cargado todo el html, para ello usamos la función: window.addEventListener() que recibe dos parametros el primero es 'load' entre comillas y el segundo parametro es la funcion que va a alvergar lo que estamos pidiendo o cargando del html como por ejemplo un botton al cual lo estamos llamando con un document.getElementById.
        ejemplo: window.addEventListener('load', iniciar) -> iniciar es el nombre de la función

    Otra forma de hacerlo es agregando el atributo defer a la etiqueta script en html:  <script defer src="./js/main.js"></script>
*/

let ataqueJugador = ''
let ataqueDelEnemigo = ''

let vidasJugador = 3
let vidasEnemigo = 3


function iniciar(){
    let seccionReiniciar   = document.getElementById('btn-reiniciar')
    seccionReiniciar.style.display = 'none'

    let seccionAtaque = document.getElementById('select-ataque')
    seccionAtaque.style.display = 'none'

    let btnSelect   = document.getElementById('btn-select')
    btnSelect.addEventListener('click', selectMascota)

    let btnFuego    = document.getElementById('btn-fuego')
    btnFuego.addEventListener('click', ataqueFuego)

    let btnAgua     = document.getElementById('btn-agua')
    btnAgua.addEventListener('click', ataqueAgua)

    let btnTierra   = document.getElementById('btn-tierra')
    btnTierra.addEventListener('click', ataqueTierra)
    vidas()

    let reiniciar   = document.getElementById('btn-reiniciar')
    reiniciar.addEventListener('click', reiniciarJuego)
}

// Funcion que señala cuntas vidas tiene el jugador o el enemigo y las muestra
function vidas(){
    let vidaJugador = document.getElementById('vidaJugador')
    let vidaEnemigo = document.getElementById('vidaEnemigo')
    vidaJugador.innerHTML = vidasJugador
    vidaEnemigo.innerHTML = vidasEnemigo
}

// Funcion que da un número aleatorio entre 1 y 3
function random(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

// Funcion que según el número aleatorio dado lo asigna a una mascota para la eleccion del enemigo
function selectEnemigo(){
    let eleccionEnemigo = random(1,3)
    let mascotaEnemi = document.getElementById('nameMascotaEnemi')

    if(eleccionEnemigo == 1){
        mascotaEnemi.innerHTML = 'Ratigueya'
    }else if(eleccionEnemigo == 2){
        mascotaEnemi.innerHTML = 'Pejelagarto'
    }else if(eleccionEnemigo == 3){
        mascotaEnemi.innerHTML = 'Dragonfly'
    }else{
        alert('No selecciono ninguna mascota')
    }
}

// Funcion para que el jugador elija la mascota
function selectMascota(){
    // con el signo dolar se puede remplazar el document.getElementById para que se vea mas claro el codigo, es solo algo estetico.

    let seccionMascota = document.getElementById('select-pet')
    seccionMascota.style.display = 'none'

    let seccionAtaque = document.getElementById('select-ataque')
    seccionAtaque.style.display = 'block'

    const $ = selector => document.getElementById(selector)

    let ratigueya       = $('ratigueya')
    let pejelagarto     = $('pejelagarto')
    let dragonfly       = $('dragonfly')

    let spanNameMascota = $('nameMascota')

    if(pejelagarto.checked){
        spanNameMascota.innerHTML = 'Pejelagarto'
    }else if(ratigueya.checked){
        spanNameMascota.innerHTML = 'Ratigueya'
    }else if(dragonfly.checked){
        spanNameMascota.innerHTML = 'Dragonfly'
    }else{
        alert('No seleccinaste nada')
    }

    selectEnemigo()
}

// Funcion que según el número aleatorio dado lo asigna a un ataque a la mascota del enemigo
function ataqueEnemigo(){
    let ataqueE = random(1,3)

    if(ataqueE == 1){
        let msjF        = document.getElementById('msjAtaqueEnemigo')
        msjF.innerHTML  = 'Fuego'
        ataqueDelEnemigo= 'Fuego'
    }else if(ataqueE == 2) {
        let msjA        = document.getElementById('msjAtaqueEnemigo')
        msjA.innerHTML  = 'Agua'
        ataqueDelEnemigo= 'Agua'
    }else{
        let msjT        = document.getElementById('msjAtaqueEnemigo')
        msjT.innerHTML  = 'Tierra'
        ataqueDelEnemigo= 'Tierra'
    }
}

/* ------ ------ ------ ------ */
//funciones para eliegir el ataque del jugador
function ataqueFuego(){
    let msjF        = document.getElementById('msjAtaqueJugador')
    msjF.innerHTML  = 'Fuego'
    ataqueJugador   = 'Fuego'
    ataqueEnemigo()
    combate()
}

function ataqueAgua(){
    let msjA        = document.getElementById('msjAtaqueJugador')
    msjA.innerHTML  = 'Agua'
    ataqueJugador   = 'Agua'
    ataqueEnemigo()
    combate()
}

function ataqueTierra(){
    let msjT        = document.getElementById('msjAtaqueJugador')
    msjT.innerHTML  = 'Tierra'
    ataqueJugador   = 'Tierra'
    ataqueEnemigo()
    combate()
}
/* ------ ------ ------ ------ */

function combate(){
    if(ataqueJugador == ataqueDelEnemigo){
        let MensajeEmpate   = document.getElementById('mensajeResultado')

        let msjEmpate       = document.createElement('h2')
        msjEmpate.innerHTML = 'Empataste'
        MensajeEmpate.appendChild(msjEmpate)

    }else if(ataqueJugador == 'Fuego'   && ataqueDelEnemigo == 'Tierra'){
        mensajeVictoria()
        vidasEnemigo = vidasEnemigo - 1
        vidas()

    }else if(ataqueJugador == 'Tierra'  && ataqueDelEnemigo == 'Agua'){
        mensajeVictoria()
        vidasEnemigo = vidasEnemigo - 1
        vidas()


    }else if(ataqueJugador == 'Agua'    && ataqueDelEnemigo == 'Fuego'){
        mensajeVictoria()
        vidasEnemigo = vidasEnemigo - 1
        vidas()

    }else{
        let MensajePerdida   = document.getElementById('mensajeResultado')

        let msjPerdida       = document.createElement('h2')
        msjPerdida.innerHTML = `Perdiste! el enemigo ganó con ${ataqueDelEnemigo}`
        MensajePerdida.appendChild(msjPerdida)
        vidasJugador = vidasJugador - 1
        vidas()
    }

    if(vidasEnemigo == 0 ){
        let mensajeVictoria = document.getElementById('mensajeCero')
        let msjVictoria = document.createElement('h2')
        mensajeVictoria.innerHTML = 'El enemigo ya no tiene vidas, ganaste!!!'
        mensajeVictoria.appendChild(msjVictoria)
        deshabilitar()
        //alert('Te quedan 0 vidas, el enemigo gano')
    }else if(vidasJugador == 0) {
        let mensajePerdida = document.getElementById('mensajeCero')
        let msjPerdida = document.createElement('h2')
        mensajePerdida.innerHTML = 'Te quedan 0 vidas, el enemigo gano'
        mensajePerdida.appendChild(msjPerdida)
        deshabilitar()
        //alert('El enemigo ya no tiene vidas, ganaste!!!')
    }
}

function deshabilitar(){
    let btnFuego    = document.getElementById('btn-fuego')
    btnFuego.disabled = true

    let btnAgua     = document.getElementById('btn-agua')
    btnAgua.disabled = true

    let btnTierra   = document.getElementById('btn-tierra')
    btnTierra.disabled = true

    let seccionReiniciar   = document.getElementById('btn-reiniciar')
    seccionReiniciar.style.display = 'block'
}

// document.createElement() crea nuevos atributos HTML
//appendChild() nos ayuda a insertar los elementos creados con createElement() dentro de elementos en HTML

function mensajeVictoria(){
    let mensajeDeVictoria = document.getElementById('mensajeResultado')

    let msjVictoria = document.createElement('h2')
    msjVictoria.innerHTML = `GANSTE!! 🎉 con ${ataqueJugador}`
    mensajeDeVictoria.appendChild(msjVictoria)

}

function reiniciarJuego() {
    //location proporciona informacion de la URL actual de donde estamos ubicados
    // redload es un metodo que recarga la pagina actual.
    location.reload()
}

window.addEventListener('load', iniciar)


