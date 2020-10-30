// Global animations
TweenMax.from("#players", { duration: 1.5, x: "-100%" })
TweenMax.from("#scores", { duration: 1.5, x: "-250%" })

// Global variables
const gridSize = 3
const cellSize = 100
const margin = 30
let xScore = 0
let oScore = 0

class TicTacToe {
  constructor() {
    // 2-dimensional array to store the id of each player, initially everything is null
    this.gameBoardState = new Array(gridSize).fill(null).map(column => new Array(gridSize).fill(null))
    // Player's turn; 1 = cross, 2 = circle
    this.turn = 1
    // Initially set game over to be false
    this.gameOver = false
    // Initially set filled squares to be 0
    this.filledSquares = 0
    // Display the turn
    this.displayMessage("X")
    // Diplay the X score
    this.displayXScore(xScore)
    // Display O score
    this.displayOScore(oScore)
    // Grid line
    this.line = this.line
    // Cross line one
    this.lineOne = this.lineOne
    // Cross line two
    this.lineTwo = this.lineTwo
    // Cross and circle
    this.symbol = this.symbol
  }

  // Create a straight line in SVG given its coordinates
  createSVGLine([x1, y1], [x2, y2]) {
    this.line = document.createElementNS("http://www.w3.org/2000/svg", "line")
    this.line.setAttribute("x1", x1)
    this.line.setAttribute("y1", y1)
    this.line.setAttribute("x2", x2)
    this.line.setAttribute("y2", y2)
    return this.line
  }

  // Create a cross symbol from two SVG lines given its intended size. The cross is centered on [0, 0]
  createSVGCross(size) {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g")
    this.lineOne = this.createSVGLine([-size, -size], [size, size])
    this.lineTwo = this.createSVGLine([-size, size], [size, -size])
    g.appendChild(this.lineOne)
    g.appendChild(this.lineTwo)
    return g
  }

  // Handle the click on the square
  handlePlayerTurn(gridX, gridY) {
    // If the game is  over or the square is already filled, do nothing
    if (this.gameOver || this.gameBoardState[gridX][gridY] !== null) {
      return
    }
    // Otherwise add the current player's symbol to that square
    this.symbol = this.playerSymbol(gridX, gridY)
    this.showBoard.appendChild(this.symbol)
    this.gameBoardState[gridX][gridY] = this.turn
    this.filledSquares++
    // Check if one of the players has won
    if (this.checkWinner()) {
      this.gameOver = true
      if (this.turn === 1) {
          xScore += 1
          this.displayMessage("X won!")
          this.displayXScore(xScore)
        } else {
          oScore += 1
          this.displayMessage("O won!")
          this.displayOScore(oScore)
      }
      // Check if all the squares are filled
    } else if (this.filledSquares === gridSize * gridSize) { 
      this.gameOver = true
      this.displayMessage("Draw!")
      // Switch the turn
    } else { 
      this.switchTurn()
    }
  }

  // Switch turn and display it
  switchTurn() {
    this.turn = this.turn % 2 + 1
    if (this.turn === 1) {
        this.displayMessage("X")
    } else {
        this.displayMessage("O")
    }
  }

  // Check win condition and return true
  checkWinner() {
    // Check rows
    if (this.gameBoardState[0].some((cell, i) => this.gameBoardState.every(row => row[i] === this.turn))) {
      return true
    }
    // Check columns
    if (this.gameBoardState.some(column => column.every(cell => cell === this.turn))) {
      return true
    }
    // Check the main diagonal
    if (this.gameBoardState.every((column, i) => this.gameBoardState[i][i] === this.turn)) {
      return true
    }
    // Check the other diagonal
    if (this.gameBoardState.every((column, i) => this.gameBoardState[i][gridSize - 1 - i] === this.turn)) {
      return true
    }
    // Otherwise return false
    return false
  }

  // Display the info message
  displayMessage(message) {
    document.getElementById("info").textContent = message
  }
  
  // Display the X score
  displayXScore(currentXScore) {
    document.getElementById("x-score").textContent = currentXScore
  }

  // Display the O score
  displayOScore(currentOScore) {
    document.getElementById("o-score").textContent = currentOScore
  }

}

class Board extends TicTacToe {
  constructor(gameDiv, boardSize, svg, board, rect, lineOne, lineTwo, showBoard) {
    super(gameDiv, boardSize, svg, board, rect, showBoard)
    // Main game div
    this.gameDiv = gameDiv
    // Board size = 300
    this.boardSize = boardSize
    // Svg
    this.svg = svg
    // Full board
    this.board = board
    // Each rectangle in the board
    this.rect = rect
    // Vertical grid lines
    this.gridLineOne = this.gridLineOne
    // Horizontal grid lines
    this.gridLineTwo = this.gridLineTwo
    // Initialize the board view
    this.showBoard = this.initializeBoard()
    // Figure out which grid square was clicked on each turn, and handle that turn
    this.showBoard.addEventListener("click", (e) => {
      const gridX = Math.floor((e.pageX - margin) / cellSize)
      const gridY = Math.floor((e.pageY - margin) / cellSize)
      this.handlePlayerTurn(gridX, gridY)
    })
  }

  // Initialize the SVG board, including the grid lines
  initializeBoard() {
    this.gameDiv = document.getElementById("game")
    // This line will empty the game div and prevent cloning
    this.gameDiv.textContent = ""
    this.boardSize = gridSize * cellSize
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    this.svg.setAttribute("width", this.boardSize + margin * 2)
    this.svg.setAttribute("height", this.boardSize + margin * 2)
    this.gameDiv.appendChild(this.svg)
    this.board = document.createElementNS("http://www.w3.org/2000/svg", "g")
    this.board.setAttribute("transform", "translate(" + margin + "," + margin + ")")
    this.svg.appendChild(this.board)
    this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    this.rect.setAttribute("width", this.boardSize)
    this.rect.setAttribute("height", this.boardSize)
    this.rect.setAttribute("fill", "white")
    this.board.appendChild(this.rect)

    // Draw the grid
    for (let i = 1; i < gridSize; i++) {
      this.gridLineOne = this.createSVGLine([cellSize * i, 0], [cellSize * i, this.boardSize])
      this.gridLineTwo = this.createSVGLine([0, cellSize * i], [this.boardSize, cellSize * i])
      this.gridLineOne.setAttribute("class", "grid-v")
      this.board.appendChild(this.gridLineOne)
      this.gridLineTwo.setAttribute("class", "grid-h")
      this.board.appendChild(this.gridLineTwo)
    }

    // Grid animations
    TweenMax.from(".grid-v", { duration: 1.5, y: "-200%" })
    TweenMax.from(".grid-h", { duration: 1.5, y: "200%" })

    return this.board
  }

}

class Symbol extends Board {
  constructor(offset, symbolSize, g, cross, circle) {
    super(offset, symbolSize, g, cross, circle)
    // Symbol offset = 50
    this.offset = offset
    // Symbol size = 20
    this.symbolSize = symbolSize
    // g element
    this.g = g
    // Cross symbol
    this.cross = cross
    // Cirlc symbol
    this.circle = circle
  }

  // Create SVG symbol for each player
  playerSymbol(gridX, gridY) {
    this.offset = cellSize / 2
    this.symbolSize = cellSize / 5
    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g")
    this.g.setAttribute("transform", "translate(" + (gridX * cellSize + this.offset) + "," + (gridY * cellSize + this.offset) + ")")
    this.g.setAttribute("class", "player" + this.turn)
    // 1 = cross
    if (this.turn === 1) {
      this.cross = this.createSVGCross(this.symbolSize)
      this.g.appendChild(this.cross)
      // 2 = circle
    } else {
      this.circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      this.circle.setAttribute("r", this.symbolSize)
      this.g.appendChild(this.circle)
    }
    return this.g
  }
}

// Initialize the game
let myGame = new TicTacToe()
// Initialize the board
let gameBoard = new Board()
// Initialize the winner
let gameWinner = new Symbol()

// Grab the reset button
let restartBtn = document.getElementById("btn")
restartBtn.addEventListener("click", () => {
  // Remove the old board
  let svgEl = document.querySelector("svg")
  svgEl.remove()
  // Add the new board
  myGame = new TicTacToe()
  gameBoard = new Board()
  gameWinner = new Symbol()
})




