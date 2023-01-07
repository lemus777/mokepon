const botonMascotaJugador = document.getElementById('boton-mascota');
botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);

const botonReiniciar =document.getElementById('boton-reiniciar');
botonReiniciar.addEventListener('click', reiniciarJuego);

const spanMascotaJugador = document.getElementById('mascota-jugador');
const spanMascotaEnemiga = document.getElementById('mascota-enemigo');

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');

const spanVictoriasJugador = document.getElementById('vidas-jugador');
const spanVictoriasEnemigo = document.getElementById('vidas-enemigo');

const sectionMensajes = document.getElementById('resultado');
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');

const sectionReiniciar = document.getElementById('reiniciar');
const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const contenedorAtaques = document.getElementById('contenedorAtaques');
const botonCombate = document.getElementById('boton-combate');


const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');

let jugadorId = null;
let enemigoId = null;
let mokepones = [];
let mokeponesEnemigos = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let inputLangostelvis;
let inputPydos;
let inputTucapalma;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let mascotaJugador;
let mascotaJugadorObjeto;
let botonFuego;
let botonAgua;
let botonTierra;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let lienzo = mapa.getContext('2d');
let intervalo;
let mapaBackground = new Image
mapaBackground.src = './assets/mokemap.png';
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 350;

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20;
}

alturaQueBuscamos = anchoDelMapa * 600 / 800;

mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png');
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png');
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png');
let langostelvis = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 5, './assets/langostelvis.png');
let pydos = new Mokepon('Pydos', './assets/mokepons_mokepon_pydos_attack.png', 5, './assets/pydos.png');
let tucapalma = new Mokepon('Tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 5, './assets/tucapalma.png');

const HIPODOGE_ATAQUES = [
    { nombre: '💧', id: 'boton-agua' }, // el id es el que se usa en el html en el botón de ese ataque
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' }
];

const CAPIPEPO_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' }
];

const RATIGUEYA_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' }
];

const LANGOSTELVIS_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' }
];

const PYDOS_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' }
];

const TUCAPALMA_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' }
];

hipodoge.ataques.push(...HIPODOGE_ATAQUES); // al usar los tres puntos nos trae el contenido del arreglo, no el arreglo como tal
capipepo.ataques.push(...CAPIPEPO_ATAQUES);
ratigueya.ataques.push(...RATIGUEYA_ATAQUES);
langostelvis.ataques.push(...LANGOSTELVIS_ATAQUES);
pydos.ataques.push(...PYDOS_ATAQUES);
tucapalma.ataques.push(...TUCAPALMA_ATAQUES);

mokepones.push(hipodoge,capipepo,ratigueya,langostelvis,pydos,tucapalma);

mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
    `
    contenedorTarjetas.innerHTML += opcionDeMokepones;

    inputHipodoge = document.getElementById('Hipodoge');
    inputCapipepo = document.getElementById('Capipepo');
    inputRatigueya = document.getElementById('Ratigueya');
    inputLangostelvis = document.getElementById('Langostelvis');
    inputPydos = document.getElementById('Pydos');
    inputTucapalma = document.getElementById('Tucapalma');

})

unirseAlJuego();

function seleccionarMascotaJugador() {
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id;
        mascotaJugador = inputHipodoge.id;
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id;
        mascotaJugador = inputCapipepo.id;
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id;
        mascotaJugador = inputRatigueya.id;
    } else if (inputLangostelvis.checked) {
        spanMascotaJugador.innerHTML = inputLangostelvis.id;
        mascotaJugador = inputLangostelvis.id;
    } else if (inputPydos.checked) {
        spanMascotaJugador.innerHTML = inputPydos.id;
        mascotaJugador = inputPydos.id;
    } else if (inputTucapalma.checked) {
        spanMascotaJugador.innerHTML = inputTucapalma.id;
        mascotaJugador = inputTucapalma.id;
    }else {
        alert('Selecciona una mascota');
        return // en caso de no seleccionar mascota interrumpe aquí la funcion, de modo que lo que queda por debajo no se ejecuta
    }

    sectionSeleccionarMascota.style.display = 'none';

    seleccionarMokepon(mascotaJugador);

    extraerAtaques(mascotaJugador);
    sectionVerMapa.style.display = 'flex';
    iniciarMapa();
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://192.168.1.143:8080/mokepon/${jugadorId}`, { // ruta a la que haremos la petición
        method: 'post', // tipo de petición, es un post porque queremos darle información al servidor
        headers: { // aqui declaramos el tipo de información, será un json
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ // pasamos a string el json que contiene la declaración de nuestra seleccion
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques;
    for (let i=0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
        }
    }
    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
            <button id=${ataque.id} class='boton-de-ataque BAtaque'>${ataque.nombre}</button>
        ` // hemos generado una segunda clase BAtaque que usaremos para que todos los botones funcionen
        contenedorAtaques.innerHTML += ataquesMokepon;
    })
    botonFuego = document.getElementById('boton-fuego');
    botonAgua = document.getElementById('boton-agua');
    botonTierra = document.getElementById('boton-tierra');
    botones = document.querySelectorAll('.BAtaque'); // en el array botones metemos todos los elementos con la clase BAtaque
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO');
                console.log(ataqueJugador);
                boton.style.background = '#112f58';
                boton.disabled = true;
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA');
                console.log(ataqueJugador);
                boton.style.background = '#112f58';
                boton.disabled = true;
            } else {
                ataqueJugador.push('TIERRA');
                console.log(ataqueJugador);
                boton.style.background = '#112f58';
                boton.disabled = true;
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques();
            }
        })
    })
}

function enviarAtaques() {
    fetch(`http://192.168.1.143:8080/mokepon/${jugadorId}/ataques`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    intervalo = setInterval(obtenerAtaques, 50);
}

function obtenerAtaques() {
    fetch(`http://192.168.1.143:8080/mokepon/${enemigoId}/ataques`)
    .then(function(res) {
        if(res.ok) {
            res.json()
                .then(function({ ataques }) {
                    if(ataques.length === 5) {
                        ataqueEnemigo = ataques;
                        combate()
                    }
                })
        }
    })
}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemiga.innerHTML = enemigo.nombre;
    ataquesMokeponEnemigo = enemigo.ataques;
    secuenciaAtaque(); // la llamamos aqui porque una vez dedicida la mascota enemiga todos los botones están creados
}

function ataqueAleatorioEnemigo() {
    ataquesAleatorios = ataquesMokeponEnemigo.sort(() => Math.random()-0.5);
    console.log('ataques del enemigo aleatorios ' + ataquesAleatorios);
    for (let i=0; i<ataquesAleatorios.length; i++) {
        switch (ataquesAleatorios[i].nombre) {
            case '🔥':
                ataqueEnemigo.push('FUEGO');
                break;
            case '💧':
                ataqueEnemigo.push('AGUA');
                break;
            default:
                ataqueEnemigo.push('TIERRA');
                break;
        }
    }
    console.log('ataques del enemigo ' + ataqueEnemigo);
    //iniciarPelea();
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate();
        botonCombate.style.display = 'none';
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p'); // 'p' porque queremos crear un parrafo <p>
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal;
    
    sectionReiniciar.style.display = 'flex';
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
    clearInterval(intervalo);

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index);
            crearMensaje('EMPATE 😒');
        } else if ((ataqueJugador[index] == 'FUEGO' && ataqueEnemigo[index] == 'TIERRA') || (ataqueJugador[index] == 'AGUA' && ataqueEnemigo[index] == 'FUEGO') || (ataqueJugador[index] == 'TIERRA' && ataqueEnemigo[index] == 'AGUA')) {
            indexAmbosOponente(index, index);
            crearMensaje('VICTORIA 🎉');
            victoriasJugador++;
            spanVictoriasJugador.innerHTML = victoriasJugador;
        } else {
            indexAmbosOponente(index, index);
            crearMensaje('DERROTA 😭');
            victoriasEnemigo++;
            spanVictoriasEnemigo.innerHTML = victoriasEnemigo;
        }
    }
     
    revisarVictorias();
}

function revisarVictorias() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal('EMPATE')
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal('FELICIDADES! Has ganado el combate! 😺');
    } else {
        crearMensajeFinal('Lo siento, has perdido 😿');
    }
}

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function pintarCanvas() {
    
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
    lienzo.clearRect(0,0,mapa.width,mapa.height);
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon();

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);

    mokeponesEnemigos.forEach(function(mokepo) {
        mokepo.pintarMokepon();
        revisarColision(mokepo);
    })
}

function enviarPosicion(x, y) {
    fetch(`http://192.168.1.143:8080/mokepon/${jugadorId}/posicion`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res) {
        if (res.ok) {
            res.json()
            .then(function({ enemigos }) {
                console.log(enemigos);
                let mokeponEnemigo = null;
                mokeponesEnemigos = enemigos.map(function(enemigo) {
                    const mokeponNombre = enemigo.mokepon.nombre || '';
                    switch(mokeponNombre) {
                        case 'Hipodoge':
                            mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png', enemigo.id);
                            break;
                        case 'Capipepo':
                            mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png', enemigo.id);
                            break;
                        case 'Ratigueya':
                            mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png', enemigo.id);
                            break;
                        case 'Langostelvis':
                            mokeponEnemigo = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 5, './assets/langostelvis.png', enemigo.id);
                            break;
                        case 'Pydos':
                            mokeponEnemigo = new Mokepon('Pydos', './assets/mokepons_mokepon_pydos_attack.png', 5, './assets/pydos.png', enemigo.id);
                            break;
                        case 'Tucapalma':
                            mokeponEnemigo = new Mokepon('Tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 5, './assets/tucapalma.png', enemigo.id);
                            break;
                        default:
                            break;
                    }
                    mokeponEnemigo.x = enemigo.x;
                    mokeponEnemigo.y = enemigo.y;

                    return mokeponEnemigo;
                })
            })
        }
    })
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5;
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5;
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5;
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5;
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0;
    mascotaJugadorObjeto.velocidadY = 0;
}

function sePresionoUnaTecla(event) {
    switch(event.key) {
        case 'ArrowUp':
            moverArriba();
            break;
        case 'ArrowDown':
            moverAbajo();
            break;
        case 'ArrowLeft':
            moverIzquierda();
            break;
        case 'ArrowRight':
            moverDerecha();
            break;
        default:
            break;
    }
}

function obtenerObjetoMascota() {
    for (let i=0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i];
        }
    }
}

function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50);
    window.addEventListener('keydown', sePresionoUnaTecla);
    window.addEventListener('keyup', detenerMovimiento);
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.alto;
    const derechaEnemigo = enemigo.x + enemigo.ancho;
    const izquierdaEnemigo = enemigo.x;

    const arribaMascota = mascotaJugadorObjeto.y;
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
    const izquierdaMascota = mascotaJugadorObjeto.x;

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return;
    } 
    detenerMovimiento();
    clearInterval(intervalo);
    console.log('se detectó una colision');
    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex';
    sectionVerMapa.style.display = 'none';
    seleccionarMascotaEnemigo(enemigo);
}

function unirseAlJuego() {
    fetch('http://192.168.1.143:8080/unirse')
    .then(function(res) {
        if (res.ok) {
            res.text()
            .then(function(respuesta) {
                console.log(respuesta);
                jugadorId = respuesta
            })
        }
    })
}



