let matrix = [0, 0, 0];
matrix[0] = [0, 0, 0];
matrix[1] = [0, 0, 0];
matrix[2] = [0, 0, 0];

let turnPlayer = 1;
let turn = 1;
let win = false;
let spaces = document.getElementsByClassName("space");

function checkLines(i, j) {
	let hor = 0;
	let ver = 0;
	let dia1 = 0;
	let dia2 = 0;

	for (let k = 0; k <= 2; k++) {
		hor = matrix[i][k] == turnPlayer ? hor + 1 : hor;
		ver = matrix[k][j] == turnPlayer ? ver + 1 : ver;

		if (i == j) {
			dia1 = matrix[k][k] == turnPlayer ? dia1 + 1 : dia1;
		}

		if (Math.abs(i - j) == 2) {
			dia2 = matrix[k][Math.abs(k - 2)] == turnPlayer ? dia2 + 1 : dia2;
		}

		if (ver == 3 || hor == 3 || dia1 == 3 || dia2 == 3) return true;
	}
	return false;
}

function play(evt) {

  evt.target.removeEventListener("click", play, false);

	const pos = evt.target.id.substr(-1);
	evt.target.classList.remove("fa-circle");
	evt.target.classList.add(turnPlayer == 1 ? "fa-times-circle" : "fa-dot-circle");
	matrix[Math.floor(pos / 3)][pos % 3] = turnPlayer;

	if (turn >= 4) {
		if (checkLines(Math.floor(pos / 3), pos % 3)) {
			alert("El jugador " + turnPlayer + " ganó la partida :D");
      win = true;

      for (let i = 0; i < 9; i++) {
        spaces[i].removeEventListener("click", play, false);
      }
		}
	}

	if (turn == 9 && !win) {
		alert("WOW! Ha ocurrido un empate :O");
	}

	turnPlayer = turnPlayer == 1 ? turnPlayer + 1 : turnPlayer - 1;
	turn++;
}

function reset() {
	turn = 1;
  win = false;

  for (let i = 0; i < 9; i++) {
    spaces[i].addEventListener("click", play, false);
  }

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

for (let i = 0; i < 9; i++) {
	spaces[i].addEventListener("click", play, false);
}

document.getElementById("reset").addEventListener("click", reset, false);
