// 1. CHECK - Set up board
// 2. User should be able to click on a box and mark the square (with user's mark)
// --put an onclick directly on the square
// --addEventListener
// --create a markSquare function
// 3. If it's X's turn, but X in, if it's O's turn, put O in.
// --keep track of whose turn it is
// 4. Not that we know whose turn it is, when markSquare gets called, put their symbol in and change whose turn it is
// 5. We need to check to see if someone won

// Initialize whoseTUrn at player 1 (or X)
var whoseTurn = 1;

var squares = document.getElementsByClassName("square");
for (let i = 0; i < squares.length; i++){
	// console.log(squares[i]);
	squares[i].addEventListener("click", function(event){ // This event triggers when user clicks on square
		// console.log("User clicked on a square!")
		markSquare(this);
	});
}

function markSquare(currentSquare){
	if ((currentSquare.innerHTML == "X") || (currentSquare.innerHTML == "O")){
		// console.log("This square is taken");
		squareResult = "Sorry, this square is taken.";
	}else if (whoseTurn == 1){
		currentSquare.innerHTML = "X";
		whoseTurn = 2;
		squareResult = ""
	}else{
		currentSquare.innerHTML = "O";
		whoseTurn = 1;
		squareResult = ""
	}
	var messageElement = document.getElementById("message");
	messageElement.innerHTML = squareResult;
}