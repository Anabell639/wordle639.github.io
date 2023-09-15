const BUTTON = document.getElementById('guess-button');
let cantIntentos = 6
const API= "https://random-word-api.herokuapp.com/word?length=5"

fetch(API)
        .then((response)=> response.json())
        .then((response)=>{
            PALABRA=response[0].toUpperCase()
            console.log(response)
        }
)

function readGuess() {
  return document.getElementById('guess-input').value.toUpperCase()
}      

function pintarLetra (letra, color) {
  let span = document.createElement('span')
  span.className = 'letter'
  span.innerHTML = letra
  span.style.backgroundColor = color
  return span
}

function terminar (mensaje) {
  document.getElementById('guesses').innerHTML = mensaje
}

BUTTON.addEventListener('click', () => {
  const GRID = document.getElementById('grid')
  let INTENTO = readGuess()  
  const row = document.createElement('div')
  row.className = 'row'

  if (INTENTO == PALABRA) {
    terminar('<h1>GANASTE!</h1>')
  } else {
    for (let i in PALABRA) {
      if (PALABRA[i] === INTENTO[i]) {
        let cuadroLetra = pintarLetra(INTENTO[i], '#2a9d8f')
        row.appendChild(cuadroLetra)
      } else if (PALABRA.includes(INTENTO[i])) {
        let cuadroLetra = pintarLetra(INTENTO[i], '#e9c46a')
        row.appendChild(cuadroLetra)
      } else {
        let cuadroLetra = pintarLetra(INTENTO[i], 'rgb(82 89 92 / 81%)')
        row.appendChild(cuadroLetra)
      }
    }
    cantIntentos--
  }
  
  GRID.appendChild(row)
  if (cantIntentos == 0) {
    terminar('<h1>PERDISTE!</h1>')
  }
  });
