//game creates the new gameboard object will be called later.

var game = new Gameboard;
function Gameboard(){
	    
	//constructor for the gameboard.
        this.ship = new Ship;
	//adds a column and a row to the board.
	this.boardSize = 7;
	this.numShips = 4;
        this.shipLength = [2,3,3,4];
	this.shipsSunk = 0;

	
	this.fire = function(guess) {
                   for (var i = 0; i < game.numShips; i++) {
                           var ship = this.ship.ships[i];
                           var index = ship.locations.indexOf(guess);
 
                           // here's an improvement! Check to see if the ship
                           // has already been hit, message the user, and return true.
                           if (ship.hits[index] === "hit") {
                                   view.displayMessage("Oops, you already hit that location!");
                                   return true;
                           } else if (index >= 0) {
                                   ship.hits[index] = "hit";
                                   view.displayHit(guess);
                                   view.displayMessage("HIT!");
 
                                   if (this.isSunk(ship)) {
                                           view.displayMessage("You sank my battleship!");
                                           this.shipsSunk++;
                                   }
                                   return true;
                          }
                  }
                  view.displayMiss(guess);
                  view.displayMessage("You missed.");
                 return false;
          };
	

 
         this.isSunk = function(ship) {
                 for (var i = 0; i < this.shipLength; i++)  {
                         if (ship.hits[i] !== "hit") {
                                 return false;
                 }
                 }
             return true;
         };
         
	this.generateShipLocations = function() {
		var locations;
                    for (var i = 0; i < this.numShips; i++) {
                            do {
                                    locations = this.generateShip(this.shipLength[i]);
                            } while (this.collision(locations));
                            this.ship.ships[i].locations = locations;
                    }
                
		console.log("Ships array: ");
		console.log(this.ship.ships);
	};

	//creates random locations for the ships.
	this.generateShip = function(length) {
		var direction = Math.floor(Math.random() * 2);
		var row, col;
		if (direction === 1) { // horizontal
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength[this.shipLength.indexOf(length)] + 1));
		} else { // vertical
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength[this.shipLength.indexOf(length)] + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}
                
                
		var newShipLocations = [];
		for (var i = 0; i < length; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;
	};
	this.collision = function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ship.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	};
    
            guesses: 0;
        this. processGuess = function(guess) {
		var location = parseGuess(guess);
		if (location) {
			this.guesses++;
			var hit = this.fire(location);
			if (hit && this.shipsSunk === this.numShips) {
					view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
			}
		}
	};
};


function Ship () {
    //contains randomly generated locations and the amount of hits per ship.
    this.ships = [
                { locations: [], hits: ["", ""] },
                { locations: [], hits: ["", "", ""] },
                { locations: [], hits: ["", "", ""] },
                { locations: [], hits: ["", "", "", ""] }
         ];
       
        
}


 function parseGuess(guess) {
	//add h to the alphabet for the user to be able to use the new row.
	var alphabet = ["A", "B", "C", "D", "E", "F", "G","H"];
	if (guess === null || guess.length !== 2) {
		alert("Oops, please enter a letter and a number on the board.");
	} else {
		var firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);
		
		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that isn't on the board.");
		} else if (row < 0 || row >= this.boardSize ||
		           column < 0 || column >= this.boardSize) {
			alert("Oops, that's off the board!");
		} else [ {locations: [], hits: ["", "", "", ""] },
                 {locations: [], hits: ["", "", "", ""] },
          ];
 

			return row + column;
		}
	return null;
	}
	

         
var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},
	displayHit: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},
	displayMiss: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	}
}; 
// helper function to parse a guess from the user
// event handlers
function handleFireButton() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value.toUpperCase();
	game.processGuess(guess);
	guessInput.value = "";
}
function handleKeyPress(e) {
	var fireButton = document.getElementById("fireButton");
	// in IE9 and earlier, the event object doesn't get passed
	// to the event handler correctly, so we use window.event instead.
	e = e || window.event;
	if (e.keyCode === 13) {
		fireButton.click();
		return false;
	}
}
         window.onload = init;
        function init() {
	// Fire! button onclick handler
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;
	// handle "return" key press
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;
       // place the ships on the game board.
	//calls back gameboard class and generates random ship locations.
	game.generateShipLocations();
       
    }
