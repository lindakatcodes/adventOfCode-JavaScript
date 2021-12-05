import * as h from "../helpers";

const data: string = await h.readData("./2021Inputs/day04input.txt");
const separatedData = h.splitOnSpaces(data);
const pickedNumbers = separatedData.splice(0, 1)[0].split(",");

interface Position {
  value: number;
  position: number[];
  marked: boolean;
}

interface Board {
  data: Position[][];
  winningNumber: number;
  movesToWin: number;
  score: number;
}

const boards = separatedData.map((value) => {
  const boardPreClean = h.strInput(value);
  const cleanedBoard: Board = {
    data: [],
    winningNumber: 0,
    movesToWin: 0,
    score: 0,
  };
  boardPreClean.map((boardLine, rowIndex) => {
    const boardValues: number[] = boardLine
      .trim()
      .split(/(?:\s+)/g)
      .map((val) => +val);
    const row: Position[] = [];
    for (let colIndex = 0; colIndex < boardValues.length; colIndex++) {
      const valuePosition: Position = {
        value: boardValues[colIndex],
        position: [rowIndex, colIndex],
        marked: false,
      };
      row.push(valuePosition);
    }
    cleanedBoard.data.push(row);
  });
  return cleanedBoard;
});

console.log(boards);

function checkBoard(board: Board) {
  // start looping over picked numbers
  for (let i = 0; i < pickedNumbers.length; i++) {
    const currentNumber = +pickedNumbers[i];
    // for each number, search each row in the board to see if that value exists
    // if so, get that position and mark it as marked
    board.data.forEach((row) => {
      const foundNumberPosition: Position | null =
        row.find((position) => position.value === currentNumber) ?? null;
      if (foundNumberPosition) {
        foundNumberPosition.marked = true;
        return;
      }
    });
    // if the index is > 5 (min needed to possible have a full bingo), call the check for bingo function
    let bingoFound: boolean = false;
    if (i >= 5) {
      bingoFound = checkForBingo(board);
    }
    // if we have a win, set the winning number, get the score, and break out of the function
    if (bingoFound) {
      board.winningNumber = currentNumber;
      board.movesToWin = i + 1;
      board.score = calculateSum(board) * currentNumber;
      if (board.movesToWin < lowestMovesToWin) {
        lowestMovesToWin = board.movesToWin;
      }
      if (board.movesToWin > highestMovesToWin) {
        highestMovesToWin = board.movesToWin;
      }
      return;
    }
  }
}

function checkForBingo(board: Board): boolean {
  let result: boolean = false;
  let columns: Position[][] = [[], [], [], [], []];
  // go over each row and see if all are marked
  board.data.forEach((row) => {
    let marks: number = 0;
    row.forEach((value) => {
      if (value.marked) {
        marks++;
      }
      columns[value.position[1]].push(value);
    });
    if (marks === 5) {
      result = true;
      return result;
    }
  });
  // go over each column and see if all are marked
  columns.forEach((col) => {
    let marks: number = 0;
    col.forEach((value) => {
      if (value.marked) {
        marks++;
      }
    });
    if (marks === 5) {
      result = true;
      return result;
    }
  });

  // return results
  return result;
}

function calculateSum(board: Board): number {
  let valuesToSum: number[] = [];
  // go over each row
  board.data.map((row) => {
    row.forEach((value) => {
      // if position is not marked, add value to running sum
      if (!value.marked) {
        valuesToSum.push(value.value);
      }
    });
  });
  // once all the rows have been checked, combine the numbers for the final answer
  const sum: number = valuesToSum.reduce((prev, next) => prev + next);
  return sum;
}

let lowestMovesToWin: number = pickedNumbers.length;
let highestMovesToWin: number = 0;

for (let i = 0; i < boards.length; i++) {
  checkBoard(boards[i]);
}

const firstWinningBoard: Board | undefined = boards.find(
  (board) => board.movesToWin === lowestMovesToWin
);
console.log(`Part 1: score for quickest board is ${firstWinningBoard?.score}`);

const lastWinningBoard: Board | undefined = boards.find(
  (board) => board.movesToWin === highestMovesToWin
);

console.log(`Part 2: score for slowest board is ${lastWinningBoard?.score}`);
