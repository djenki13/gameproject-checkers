/* --- Game initial data --- */

const board = [
    null, 0, null, 1, null, 2, null, 3, null, 4, null, 5, null, 6,
    null, 7, null, 8, null, 9, null, 10, null, 11, null, 12, null, 13,
    null, 14, null, 15, null, 16, null, 17, null, 18, null, 19, null, 20,
    null, 21, null, 22, null, 23, null
]

// DOM references

const cells = document.querySelectorAll("td");
let redPieces = document.querySelectorAll("p");
let blackPieces = document.querySelectorAll("span");
const redTurnText = document.querySelectorAll(".redTurnText");
const blackTurnText = document.querySelectorAll(".blackTurnText");
const divider = document.querySelector("#divider");

// Player properties

let turn = true;
let redScore = 12;
let blackScore = 12;
let playerPieces;

// Selected piece properties

let selectedPiece = {
    pieceID: -1,
    indexBoardPiece: 1,
    isKing: false,
    spaceSeven: false,
    spaceNine: false,
    spaceFourteen: false,
    spaceEighteen: false,
    minusSpaceSeven: false,
    minusSpaceNine: false,
    minusSpaceFourteen: false,
    minusSpaceEighteen: false, 
}

// Event listeners

function pieceEventListeners() {
    if (turn) {
        for (let i = 0; i < redPieces.length; i++) {
            redPieces[i].addEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blackPieces.length; i++) {
            blackPieces[i].addEventListener("click", getPlayerPieces)
        }
    }
}

// Players' piece count

function getPlayerPieces() {
    if (turn) {
        playerPieces = redPieces;
    } else {
        playerPieces = blackPieces;
    }
    removeCellonclick();
    resetBorders();
}

// Remove moves from last selected piece

function removeCellsonClick () {
    for (let i=0; i < cells.length; i++) {
        cells[i].removeAttribute("onClick");
    }
}

// Reset borders

function resetBorders() {
    for (let i=0; i < playerPieces.length; i++) {
        playerPieces[i].style.border = "1px solid white";
    }
    resetSelectedPieceProperties();
    getSelectedPiece();
}

// Reset selected piece properties

function resetSelectedPieceProperties() {
    selectedPiece.pieceID = -1;
    selectedPiece.pieceID = -1;
    selectedPiece.isKing = false;
    selectedPiece.spaceSeven = false;
    selectedPiece.spaceNine = false;
    selectedPiece.spaceFourteen = false;
    selectedPiece.spaceEighteen = false;
    selectedPiece.minusSpaceNine = false;
    selectedPiece.minusSpaceSeven = false;
    selectedPiece.minusSpaceFourteen = false;
    selectedPiece.minusSpaceEighteen = false;
}

// Get ID and index of board cell

function getSelectedPiece() {
    selectedPiece.pieceID = parseInt(event.target.ID);
    selectedPiece.indexBoardPiece = findPiece(selectedPiece.pieceID);
    isPieceKing();
}

// Is piece a king?

function isPieceKing() {
    if (document.getElementById(selectedPiece.pieceID).classList.contains("king")) {
        selectedPiece.isKing = true;
    } else {
        selectedPiece.isKing = false;
    }
    getAvailableSpaces();
}

// Allow selected piece to move

function getAvailableSpaces() {
    if (board[selectedPiece.indexBoardPiece+7] === null &&
        cells[selectedPiece.indexBoardPiece+7].classList.contains("emptySpace") !==true) {
            selectedPiece.spaceSeven = true;
        }
    if (board[selectedPiece.indexBoardPiece+9] === null &&
        cells[selectedPiece.indexBoardPiece+9].classList.contains("emptySpace") !==true) {
            selectedPiece.spaceNine = true;
        }
    if (board[selectedPiece.indexBoardPiece-7] === null &&
        cells[selectedPiece.indexBoardPiece-7].classList.contains("emptySpace") !== true) {
            selectedPiece.minusSpaceSeven = true;
        }
    if (board[selectedPiece.indexBoardPiece-9] === null &&
        cells[selectedPiece.indexBoardPiece-9].classList.contains("emptySpace") !== true) {
            selectedPiece.minusSpaceNine = true;
        }
    checkPossibleJumpSpaces();
}

// Selected piece jump moves

function checkPossibleJumpSpaces() {
    if (turn) {
        if (board[selectedPiece.indexBoardPiece+14] === null
        && cells[selectedPiece.indexBoardPiece+14].classList.contains("emptySpace") !== true
        && board[selectedPiece.indexBoardPiece+7]>=12) {
            selectedPiece.spaceFourteen = true;
        }
        if (board[selectedPiece.indexBoardPiece+18] === null
        && cells[selectedPiece.indexBoardPiece+18].classList.contains("emptySpace") !== true
        && board[selectedPiece.indexBoardPiece+9] >= 12) {
            selectedPiece.spaceEighteen = true;
        }
        if (board[selectedPiece.indexBoardPiece-14] === null
        && cells[selectedPiece.indexBoardPiece-14].classList.contains("emptySpace") !== true
        && board[selectedPiece.indexBoardPiece-7] >= 12) {
            selectedPiece.minusSpaceFourteen = true;
        }
        if (board[selectedPiece.indexBoardPiece-18] === null
        && cells[selectedPiece.indexBoardPiece-18].classList.contains("emptySpace") !==true
        && board[selectedPiece.indexBoardPiece-9] >= 12) {
            selectedPiece.minusSpaceEighteen = true;
        }
    } else {
        if (board[selectedPiece.indexBoardPiece+14] === null
        && cells[selectedPiece.indexBoardPiece+14].classList.contains("emptySpace") !==true
        && board[selectedPiece.indexBoardPiece+7] < 12 && board[selectedPiece.indexBoardPiece+7] !==null) {
        selectedPiece.spaceFourteen = true;
        }
        if (board[selectedPiece.indexBoardPiece+18] === null
        && cells [selectedPiece.indexBoardPiece+18].classList.contains("emptySpace") !==true
        && board[selectedPiece.indexBoardPiece+9] <12 && board[selectedPiece.indexBoardPiece+9] !==null) {
        selectedPiece.spaceEighteen = true;
        }
        if (board[selectedPiece.indexBoardPiece-14] === null
        && cells[selectedPiece.indexBoardPiece-14].classList.contains("emptySpace") !== true
        && board[selectedPiece.indexBoardPiece-7] < 12
        && board[selectedPiece.indexBoardPiece-7] !== null) {
        selectedPiece.minusSpaceFourteen = true;
        }
        if (board[selectedPiece.indexBoardPiece-18] === null
        && cells[selectedPiece.indexBoardPiece-18].classList.contains("emptySpace") !== true
        && board[selectedPiece.indexBoardPiece-9] < 12
        && board[selectedPiece.indexBoardPiece-9] !== null) {
        selectedPiece.minusSpaceEighteen = true;
        }
    }
    checkPieceParameters();
}

// Restrict movement for king pieces

function checkPieceParameters() {
    if (selectedPiece.isKing) {
        givePieceBorder();
    } else {
        if (turn) {
            selectedPiece.minusSpaceSeven = false;
            selectedPiece.minusSpaceNine = false;
            selectedPiece.minusSpaceFourteen = false;
            selectedPiece.minusSpaceEighteen = false;
        } else {
            selectedPiece.spaceSeven = false;
            selectedPiece.spaceNine = false;
            selectedPiece.spaceFourteen = false;
            selectedPiece.spaceEighteen = false;
        }
        givePieceBorder();
    }
}

// Show user piece is movable with blue highlight

function givePieceBorder() {
    if (selectedPiece.spaceSeven || selectedPiece.spaceNine || selectedPiece.spaceFourteen || selectedPiece.spaceEighteen
    || selectedPiece.minusSpaceSeven || selectedPiece.minusSpaceNine || selectedPiece.minusSpaceFourteen || selectedPiece.minusSpaceEighteen) {
        document.getElementById(selectedPiece.pieceID).style.border = "3px solid blue";
        giveCellsCLick();
    } else {
        return;
    }
}