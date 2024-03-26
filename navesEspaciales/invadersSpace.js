console.log("hola a todos");
game = {
    canvas: null,
    ctx: null,
    imagen: null,
    caratula: true,
    imagenEnemigo: null,
    teclaPulsada: null,
    tecla: [],
    colorBala: "cyan",
    colorBala2: "red",
    balas_array: new Array(),
    balasEnemigas_array: new Array(),
    enemigos_array: new Array(),
    disparo: false,
    puntos: 0,
    finJuego: false,
    intro: null,
    boing: null,
    disparoJugador: null,
    fin: null,
};

//cosntantes
const KEY_ENTER = 13;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const BARRA = 32;

//objetos
function Bala(x, y, w) {
    //console.log("funcion bala");
    this.x = x;
    this.y = y;
    this.w = w;
    this.dibujar = function () {
        //console.log("dibujar bala");
        //dibujar la balas_array (las que dispara el jugador)
        game.ctx.save();
        game.ctx.fillStyle = game.colorBala;
        game.ctx.fillRect(this.x, this.y, this.w, this.w);
        this.y = this.y - 4;
        game.ctx.restore();
    };

    //las balas que disparan los enemigos
    this.disparar = function () {
        game.ctx.save();
        game.ctx.fillStyle = game.colorBala2;
        game.ctx.fillRect(this.x, this.y, this.w, this.w);
        this.y = this.y + 4;
        game.ctx.restore();
    };
}

function Jugador(x) {
    this.x = x;
    this.y = 450;
    this.w = 50;
    this.h = 50;
    this.dibujar = function (x) {
        this.x = x;
        game.ctx.drawImage(game.imagen, this.x, this.y, this.w, this.h); //la imagen, ubicacion X, ubicacionY, tamañoX, tamañoY
    };
}

function Enemigo(x, y) {
    this.x = x;
    this.y = y;
    this.w = 35;
    this.veces = 0;
    this.dx = 10;
    this.ciclos = 0;
    this.num = 14;
    this.figura = true;
    this.vive = true;
    this.dibujar = function () {
        //retraso
        if (this.ciclos > 30) {
            //saltos
            if (this.veces > this.num) {
                this.dx *= -1;
                this.veces = 0;
                this.num = 28;
                this.y += 20;
                this.dx = this.dx > 0 ? this.dx++ : this.dx--;
            } else {
                this.x += this.dx;
            }
            this.veces++;
            this.ciclos = 0;
            this.figura = !this.figura;
        } else {
            this.ciclos++;
        }

        if (this.figura) {
            game.ctx.drawImage(
                game.imagenEnemigo,
                0,
                0,
                40,
                30,
                this.x,
                this.y,
                35,
                30
            );
        } else
            game.ctx.drawImage(
                game.imagenEnemigo,
                50,
                0,
                35,
                30,
                this.x,
                this.y,
                35,
                30
            );
    };
}

//funciones
const caratula = () => {
    let imagen = new Image();
    imagen.src = "cara2.webp";
    imagen.onload = () => {
        game.ctx.drawImage(imagen, 0, 0);
    };
};

const seleccionar = (e) => {
    if (game.caratula) {
        inicio();
    }
};

const inicio = () => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.caratula = false;
    //coineza despues de sacar la caratula
    game.jugador = new Jugador(0);
    game.x = game.canvas.width / 2;
    game.jugador.dibujar(game.x);
    animar();
};

var x = 100,
    y = 100;

const animar = () => {
    if (game.finJuego == false) {
        requestAnimationFrame(animar);
        verificar();
        pintar();
        colisiones();
    }
};

const colisiones = () => {
    let enemigo, bala;
    //console.log("colisiones");
    for (var i = 0; i < game.enemigos_array.length; i++) {
        //console.log("colisiones");
        for (var j = 0; j < game.balas_array.length; j++) {
            enemigo = game.enemigos_array[i];
            bala = game.balas_array[j];

            if (enemigo != null && bala != null) {
                //console.log("enemigo disparos");
                if (
                    bala.x > enemigo.x &&
                    bala.x < enemigo.x + enemigo.w &&
                    bala.y > enemigo.y &&
                    bala.y < enemigo.y + enemigo.w
                ) {
                    console.log("enemigo muerto");
                    enemigo.vive = false;
                    game.enemigos_array[i] = null;
                    game.balas_array[j] = null;
                    game.disparo = false;
                    game.puntos += 10;
                    game.boing.play();
                }
            }
        }
    }

    //colisiones de balas enemigas con la nave
    for (var j = 0; j < game.balasEnemigas_array.length; j++) {
        bala = game.balasEnemigas_array[j];
        //console.log(bala);
        if (bala != null) {
            //console.log("colision");
            if (
                bala.x > game.jugador.x &&
                bala.x < game.jugador.x + game.jugador.w &&
                bala.y > game.jugador.y &&
                bala.y < game.jugador.y + game.jugador.h
            ) {
                gameOver();
            }
        }
    }
};

const gameOver = () => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    console.log("termino el juego");
    game.finJuego = true;
    game.fin.play();
    game.balasEnemigas_array = [];
    game.enemigos_array = [];
    game.balas_array = [];
    mensaje("Fin del Juego", 100, 60);
    mensaje("Lograste " + game.puntos + " puntos", 220);
    if (game.puntos > 100 && game.puntos <= 200) {
        mensaje("casi lo logras", 340);
    } else if (game.puntos > 200) {
        mensaje("Felicitaciones", 340);
    } else {
        mensaje("vuelve  a intentar", 340);
    }
};

const mensaje = (cadena, y, tamano = 40) => {
    let medio = game.canvas.width / 2;
    game.ctx.save();
    game.ctx.fillStyle = "green";
    game.ctx.strokeStyle = "blue";
    game.ctx.textBaseline = "top";
    game.ctx.font = "bold " + tamano + "px Courier";
    game.ctx.textAlign = "center";
    game.ctx.fillText(cadena, medio, y);
    game.ctx.restore();
};

const verificar = () => {
    //control del defensor

    if (game.tecla[KEY_RIGHT]) game.x += 10;
    if (game.tecla[KEY_LEFT]) game.x -= 10;

    //verificar limites de nave
    if (game.x > game.canvas.width - 40) game.x = game.canvas.width - 40;
    if (game.x < 0) game.x = 10;

    //disparo propio
    if (game.tecla[BARRA]) {
        if (game.disparo == false) {
            console.log("barra");
            game.balas_array.push(
                new Bala(game.jugador.x + 20, game.jugador.y - 3, 10)
            );
            game.tecla[BARRA] = false;
            game.disparo = true;
            game.disparoJugador.play();
        }
    }

    //disparo enemigo
    if (Math.random() > 0.96) {
        dispararEnemigo();
    }

    //x += 2; //esto es para probar el movimiento
    //if (x > game.canvas.width) x = 0;
};

//funcones para que disparan solos los del frente
const dispararEnemigo = () => {
    var ultimos = new Array();
    for (var i = game.enemigos_array.length - 1; i > 0; i--) {
        if (game.enemigos_array[i] != null) {
            ultimos.push(i);
            //console.log("ultimos.lenght " + ultimos.length);
        }
        if (ultimos.length >= 10) break;
    }

    d = ultimos[Math.floor(Math.random() * 10)];

    game.balasEnemigas_array.push(
        new Bala(
            game.enemigos_array[d].x + game.enemigos_array[d].w / 2,
            game.enemigos_array[d].y,
            5
        )
    );

    //console.log("balasEnemigas_array.lenght " + game.balasEnemigas_array.length);
    if (game.balasEnemigas_array.length >= 40) {
        game.balasEnemigas_array.length = 0;
    }
};

const pintar = () => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.jugador.dibujar(game.x);

    score();

    //mover las balas
    for (var i = 0; i < game.balas_array.length; i++) {
        //console.log("mover balas");
        if (game.balas_array[i] != null) {
            game.balas_array[i].dibujar();
            if (game.balas_array[i].y < 0) {
                game.disparo = false;
                game.balas_array[i] = null;
            }
        }
    }

    //balas enemigas
    for (i = 0; i < game.balasEnemigas_array.length; i++) {
        if (game.balasEnemigas_array[i] != null) {
            game.balasEnemigas_array[i].disparar();
            if (game.balasEnemigas_array[i].y > game.canvas.height)
                game.balasEnemigas_array[i] = null;
        }
    }

    //enemigos
    for (i = 0; i < game.enemigos_array.length; i++) {
        if (game.enemigos_array[i] != null) {
            game.enemigos_array[i].dibujar();
        }
    }

    // esto es para probar funcionamiento
    //game.ctx.fillStyle = "red";
    //game.ctx.beginPath();
    //game.ctx.arc(x, y, 5, 0, 2 * Math.PI);
    //game.ctx.fill();
};

//puntaje
const score = () => {
    game.ctx.save();
    game.ctx.fillStyle = "white";
    game.ctx.font = "bold 20px Courier";
    game.ctx.fillText("Puntaje: " + game.puntos, 10, 20);
    game.ctx.restore();
};

//listeners
//se presiona una tecla
document.addEventListener("keydown", function (e) {
    game.teclaPulsada = e.keyCode;
    game.tecla[e.keyCode] = true;
});
//se suelta una tecla
document.addEventListener("keyup", function (e) {
    game.tecla[e.keyCode] = false;
});

window.requestAnimationFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(calback, 17);
        }
    );
})();

window.onload = function () {
    game.canvas = document.getElementById("canvas");
    if (game.canvas && game.canvas.getContext) {
        game.ctx = canvas.getContext("2d");
        if (game.ctx) {
            ////sonidos
            //game.boing = document.getElementById("boing");
            //game.disparoJugador = document.getElementById("disparo");
            //game.intro = document.getElementById("intro");
            //game. = document.getElementById("fin");
            game.boing = new Audio("sonidos/boing.mp3");
            //game.boing.play();
            game.disparoJugador = new Audio("sonidos/disparo.mp3");
            //game.disparoJugador.play();
            game.intro = new Audio("sonidos/intro.mp3");
            game.intro.play();
            game.fin = new Audio("sonidos/gameOver.mp3");
            //game.fin.play();

            game.imagen = new Image();
            game.imagen.src = "nave.png";

            //crear enemigos
            game.imagenEnemigo = new Image();
            game.imagenEnemigo.src = "invader.fw.png";
            game.imagenEnemigo.onload = function () {
                for (var i = 0; i < 5; i++) {
                    for (var j = 0; j < 10; j++) {
                        game.enemigos_array.push(
                            new Enemigo(100 + 40 * j, 30 + 45 * i) //crea un enemigo, j las columnas, i las filas
                        );
                    }
                }
            };

            caratula();
            game.canvas.addEventListener("click", seleccionar, false);
        }
    }
};
