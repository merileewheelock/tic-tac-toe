// 1. CHECK - Set up board
// 2. User should be able to click on a box and mark the square (with user's mark)
// --put an onclick directly on the square
// --addEventListener
// --create a markSquare function
// 3. If it's X's turn, but X in, if it's O's turn, put O in.
// --keep track of whose turn it is
// 4. Not that we know whose turn it is, when markSquare gets called, put their symbol in and change whose turn it is
// 5. We need to check to see if someone won

// Initialize whoseTurn at player 1 (or X)

// squareOptions = ["A1", "B1", "C1", "A2", "B2", "C2", "A3", "B3", "C3"];
// randomSquare = Math.floor(Math.random() * 8);
// console.log(randomSquare);

var whoseTurn = 1;
var player1Squares = [];
var player2Squares = [];
var completedSquares = [];
var winningCombos = [
	["A1", "B1", "C1"], // Row1
	["A2", "B2", "C2"], // Row2
	["A3", "B3", "C3"], // Row3
	["A1", "A2", "A3"], // Column1
	["B1", "B2", "B3"], // Column2
	["C1", "C2", "C3"], // Column3
	["A1", "B2", "C3"], // Diag1
	["A3", "B2", "C1"], // Diag2
]
var gameDone = false;
var onePlayerGame = true;

var player1Wins = 0;
var player2Wins = 0;

var numberOfPlayersMessageElement = document.getElementById("numberOfPlayers");

function vsComputer(){
	onePlayerGame = true;
	numberOfPlayersMessageElement.innerHTML = "Player 1 vs Computer";
	console.log("One player");
}

function twoPlayer(){
	onePlayerGame = false;
	numberOfPlayersMessageElement.innerHTML = "Player 1 vs Player 2";
	console.log("Two players");
}


var squares = document.getElementsByClassName("square");
	for (let i = 0; i < squares.length; i++){
		console.log(squares[i].className);
		// console.log(squares[i]);
		squares[i].addEventListener("click", function(event){ // This event triggers when user clicks on square
			// console.log("User clicked on a square!")
			if(!gameDone){
				markSquare(this);
			}
		});
	}


function markSquare(currentSquare){
	// console.log(currentSquare.id);
	squareResult = ""
	var messageElement = document.getElementById("message");
	messageElement.innerHTML = squareResult;
	if ((currentSquare.innerHTML == "X") || (currentSquare.innerHTML == "O")){
		// console.log("This square is taken");
		squareResult = "Sorry, this square is taken.";
	}else if(gameDone == true){
		squareResult = "Someone has already won the game!";
	}else if (whoseTurn == 1){
		currentSquare.innerHTML = "X";
		whoseTurn = 2;
		squareResult = "";
		player1Squares.push(currentSquare.id);
		completedSquares.push(currentSquare.id);
		checkWin(player1Squares,1);
		if(onePlayerGame){
			computerMove(currentSquare);
		}
	}else{
		currentSquare.innerHTML = "O";
		whoseTurn = 1;
		squareResult = "";
		player2Squares.push(currentSquare.id);
		checkWin(player2Squares,2);
	}
	// console.log(player1Squares);
	// console.log(player2Squares);
}

function computerMove(currentSquare){
	squareFound = false;
	// find a random square - call markSquare
	// see if that square is empty
	// if it is, send it to that square
	// if it's not, keep looking (while loop)
	rand = Math.floor(Math.random() * 9);
	while (squareFound == false) {
		rand = Math.floor(Math.random() * 9);
		if ((squares[rand].innerHTML != "X") && (squares[rand].innerHTML != "O")) {
			squareFound = true;
			markSquare(squares[rand]);
			player2Squares.push(squares[rand]);
			completedSquares.push(currentSquare.id);
		}else if (completedSquares.length == squares.length){
			break;
		}
	}
}


function checkWin(currentPlayersSquares, whoJustWent){
	// Outter Loop (winning combos)
	for (let i = 0; i < winningCombos.length; i++){
		// Inner Loop (Square inside inning combo)
		var squareCount = 0;
		for (let j = 0; j < winningCombos[i].length; j++){
			var winningSquare = winningCombos[i][j];
			// Does the player have this square?
			if(currentPlayersSquares.indexOf(winningSquare) > -1){
				// The index is > -1, which means the player has this square.
				// We don't care when it happened, we just care that it happened.
				squareCount++;
			}
		}
		// If square count is 3 ,then the user had all 3 j's in this i
		if (squareCount == 3){
			// console.log("Player " + whoJustWent + " won the game!");
			// Stop checking i's, the game is over
			gameOver(whoJustWent, winningCombos[i]);
			// break;
		}
	}
}

function gameOver(whoJustWon,winningCombo){
	var endMessage = "Congratulations to player " + whoJustWon; + "! You win!" //" You won with " + winningCombo;
	document.getElementById("message").innerHTML = endMessage;
	for (let i = 0; i < winningCombo.length; i++){
		document.getElementById(winningCombo[i]).className += " winning-square"; // Need space due to concatenating
	}
	gameDone = true;
}


function reset(){
	var squares = document.getElementsByClassName("square");
	// console.log(squares);
	for (let i = 0; i < squares.length; i++){
		squares[i].innerHTML = "&nbsp;";
		squares[i].className = "square";
	}
	// squareCount = 0;
	gameDone = false;
	player1Squares = [];
	player2Squares = [];
	completedSquares = [];
	whoseTurn = 1;
}