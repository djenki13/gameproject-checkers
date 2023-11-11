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