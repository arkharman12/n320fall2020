// class deconstruction for TicTacToe

class TicTacToe {
    constructor() {
        this.gameBoardState = [[ ]]
        this.displayBoard = showBoard()
        this.playerTurn = 0 // 0 will be X and 1 will be 0
        this.filledBoard = 0
        this.displayMessage("Message goes here")
        this.gameOver = false
    }

    showBoard() {
        // display the board code goes here
    }

    handlePlayerTurn() {
        if (this.gameOver || this.gameBoardState[x][y] != null) {
            return
        }

        if(this.checkWinner()) {
            // stop the game code goes here
        } else if(this.filledBoard == 9) {
            // stop the game code goes eher
        } else {
            // keep the game running code goes here
        }
    }

    playerSymbol() {
        if(this.playerTurn == 0) {
            // make X on the board goes here
        } else {
            // make the O on the board goes here
        }
    }

    switchTurn() {
        if (this.playerTurn == 0) {
            // X turn code goes here
        } else {
            // 0 turn goes here
        }
    }

    checkWinner() {
        // check rows code goes here
        // check columns code goes here
        // check 1st diagonal code goes here
        // check 2nd diagonal code goes here
        // otherwise return false
    }

    displayMessage(message) {
        // if X won code goes here
        // if 0 won code goes here
    }
}

let aTicTacToe = new TicTacToe()