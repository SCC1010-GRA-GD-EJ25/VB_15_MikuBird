let imagenFondo
let imagenInicio
let personaje
let pared
let x = 0
let posY = 100
let dY = 3
let estado = 0 //0: menú; 1: jugando; 2: gameOver
let wallX = []
let wallY = []
let puntaje = 0
let puntajeMax = 0
let recordAnterior = 0

function preload() {
  // put preload code here
  imagenFondo = loadImage("./images/fondojuego00.png")
  imagenInicio = loadImage("./images/fondoinicio00.jpg")
  personaje = loadImage("./images/miku00.gif")
  pared = loadImage("./images/pared.png")
}

function setup() {
  // put setup code here
  createCanvas(1000,512)
  noCursor()
}

function draw() {
  // put d(rawing code here
  if (estado === 1) {
    imageMode(CORNER)
    background(255)
    image(imagenFondo,x,0)
    image(imagenFondo, x + imagenFondo.width, 0)
    x = x - 5
    dY = dY + 1
    posY = posY + dY
    if (x <= -imagenFondo.width) {
      x = 0
    }
    //Obstáculos
    for (let i=0; i<wallX.length; i++) {
      imageMode(CENTER)
      image(pared,wallX[i],wallY[i]-500)
      image(pared,wallX[i],wallY[i]+500)

      if (wallX[i] < 0) {
        wallX[i] = width
        wallY[i] = random(200,300)
      }

      //Puntaje
      if (wallX[i] === 100) {
        puntaje = puntaje + 1
        puntajeMax = max(puntajeMax,puntaje)
      }

      wallX[i] = wallX[i] - 5  //Para que se muevan los obstáculos

    }

    //Personaje
    image(personaje, 100, posY,60,60)
    text("Puntaje: " + puntaje, width/2-60,30)
  } else if (estado === 0) {
    cursor()
    image(imagenInicio, 0, 0,450,600)
    textSize(24)
    fill(255)
    text("Puntaje Máximo " + puntajeMax, 600, 100)
    text("Haga clic para comenzar", 600, 200)
  }
}

function mousePressed() {
  //posY = 100
  if (estado === 0) {
    estado = 1
    posY = 100
    x = 0
    dY = 3
    wallX = [500, 800,1100]
    wallY[0] = random(200,300)
    wallY[1] = random(200,300)
    wallY[2] = random(200,300)
    puntaje = 0
    recordAnterior = puntajeMax
    noCursor()
  }
  dY = -15
}
