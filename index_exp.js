//Matrix 3x3
let matrix = [0, 0, 0];
matrix[0] = [0, 0, 0];
matrix[1] = [0, 0, 0];
matrix[2] = [0, 0, 0];

//Turno de Jugador
let turnPlayer = 1;

//Turno de Partida
let turn = 1;

//Conjunto de Cards
let spaces = document.getElementsByClassName("space");

//Función para verificar ganador
function checkLines(i, j) {
	let hor = 0;
	let ver = 0;
	let dia1 = 0;
	let dia2 = 0;

  //Cantidad de acertados necesarios para ganar
	for (let k = 0; k <= 2; k++) {

    //Verificar horizontalmente por medio del último turno
		hor = matrix[i][k] == turnPlayer ? hor + 1 : hor;

    //Verificar vertical por medio del último turno
		ver = matrix[k][j] == turnPlayer ? ver + 1 : ver;

    //Diagonal [0,0]
		if (i == j) {
			dia1 = matrix[k][k] == turnPlayer ? dia1 + 1 : dia1;
		}

    //Diagonal [0,2]
		if (Math.abs(i - j) == 2) {
			dia2 = matrix[k][Math.abs(k - 2)] == turnPlayer ? dia2 + 1 : dia2;
		}

    //Si se cumple alguno 
		if (ver == 3 || hor == 3 || dia1 == 3 || dia2 == 3) return true;
	}
	return false;
}

function play(evt) {

  //Extraer id de la card
	const pos = evt.target.id.substr(-1);

  //Quitar clase fa-circle
	evt.target.classList.remove("fa-circle");

  //Dependiendo el turno colocar O ó X
	evt.target.classList.add(turnPlayer == 1 ? "fa-times-circle" : "fa-dot-circle");

  //Actualizar posicion de matriz con el valor del turno del jugador (1 o 2)
	matrix[Math.floor(pos / 3)][pos % 3] = turnPlayer;

  //Si se dan más de 4 turnos, compruebe posible win
	if (turn >= 4) {

    //Verifique lineas de la última jugada
		if (checkLines(Math.floor(pos / 3), pos % 3)) {
			alert("El jugador " + turnPlayer + " ganó la partida :D");
		}
	}

  //Si se dan 9 turnos, es un empate
  if(turn == 9){
    alert("WOW! Ha ocurrido un empate :O");
  }

  //Cambie de 1 => 2, 2 => 1
	turnPlayer = turnPlayer == 1 ? turnPlayer + 1 : turnPlayer - 1;

  //Actualice el turno
	turn++;
}

//Reset Tablero
function reset() {
	turn = 1;
	for (let i = 0; i < 9; i++) {
		spaces[i].classList.remove("fa-times-circle");
		spaces[i].classList.remove("fa-dot-circle");
		spaces[i].classList.add("fa-circle");
	}

	matrix = [0, 0, 0];
	matrix[0] = [0, 0, 0];
	matrix[1] = [0, 0, 0];
	matrix[2] = [0, 0, 0];
}

//Adicione el addEventListener a cada card
for (let i = 0; i < 9; i++) {
	spaces[i].addEventListener("click", play, false);
}

//Adicione el reset al botón
document.getElementById("reset").addEventListener("click", reset, false);
