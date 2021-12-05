import * as h from "../helpers";

const data: string = await h.readData("./2021Inputs/day04input.txt");
const separatedData = h.splitOnSpaces(data);
const pickedNumbers = separatedData.splice(0, 1)[0].split(",");
// const boards = [];
const winningMoveCounts: number[] = [];

interface bingoPlace {
  position: number[];
  marked: boolean;
}

interface Board {
  data: string[];
  winningNumber: number;
  score: number;
  movesToWin: number;
}

const boards = separatedData.map((value) => {
  const cleanedBoard = h.strInput(value).map((boardLine) => {
    return boardLine.split(/(?:\s+)/g).map((val) => +val);
  });
  return cleanedBoard;
});

console.log(boards);

// interface BoardData {
//   [index: string]: number[];
//   row1: number[];
//   row2: number[];
//   row3: number[];
//   row4: number[];
//   row5: number[];
//   col1: number[];
//   col2: number[];
//   col3: number[];
//   col4: number[];
//   col5: number[];
// }

// interface BoardCounts {
//   [index: string]: number;
//   row1Picked: number;
//   row2Picked: number;
//   row3Picked: number;
//   row4Picked: number;
//   row5Picked: number;
//   col1Picked: number;
//   col2Picked: number;
//   col3Picked: number;
//   col4Picked: number;
//   col5Picked: number;
// }

// separatedData.forEach((value: string, index: number) => {
//   let currentBoard: Board = {
//     data: {
//       row1: [],
//       row2: [],
//       row3: [],
//       row4: [],
//       row5: [],
//       col1: [],
//       col2: [],
//       col3: [],
//       col4: [],
//       col5: [],
//     },
//     winningNumber: 0,
//     score: 0,
//     movesToWin: 0,
//   };
//   if (index !== 0) {
//     const cleanedBoard = h.strInput(value);
//     cleanedBoard.forEach((boardLine, lineIndex) => {
//       const row = boardLine
//         .split(/(\d+)/g)
//         .map((val) => +val)
//         .filter((val) => val !== 0);
//       const rowName = `row${lineIndex + 1}`;
//       currentBoard.data[rowName] = row;
//       for (let i = 0; i < row.length; i++) {
//         let colName = `col${i + 1}`;
//         currentBoard.data[colName].push(row[i]);
//       }
//     });
//     boards.push(currentBoard);
//   }
// });

// function checkBoards() {
//   boards.forEach((board: Board) => {
//     let movesToWin: number = pickedNumbers.length;
//     for (let i = 0; i < pickedNumbers.length; i++) {
//       if (board.winningNumber > 0) return;
//       let currentNumber = +pickedNumbers[i];
//       for (const line in board.data) {
//         const lineData = board.data[line];
//         if (lineData.includes(currentNumber)) {
//           const removePos = lineData.indexOf(currentNumber);
//           lineData.splice(removePos, 1);
//         }
//         if (lineData.length === 0) {
//           // found a winning line
//           if (i + 1 < movesToWin) {
//             winningMoveCounts.push(i + 1);
//             board.winningNumber = currentNumber;
//             board.movesToWin = i + 1;
//             calculateScore(board, currentNumber, line);
//           }
//         }
//       }
//     }
//   });
// }

// function calculateScore(
//   board: Board,
//   winningNumber: number,
//   lineType: string
// ): void {
//   let sum: number = 0;
//   for (const line in board.data) {
//     const lineData = board.data[line];
//     if (lineType.includes("row")) {
//       if (lineData.length && line.includes("row")) {
//         const lineTotal = lineData.reduce((prev, curr): number => prev + curr);
//         sum += lineTotal;
//       }
//     } else {
//       if (lineData.length && line.includes("col")) {
//         const lineTotal = lineData.reduce((prev, curr): number => prev + curr);
//         sum += lineTotal;
//       }
//     }
//   }
//   board.score = sum * winningNumber;
// }

// checkBoards();
// console.log(boards);
// const shortestMoves = winningMoveCounts.reduce((prev, curr): number => {
//   return prev < curr ? prev : curr;
// });
// console.log(shortestMoves, winningMoveCounts);
// const fastestBoard: Board = boards.find(
//   (board) => board.movesToWin === shortestMoves
// );
// console.log(`Part 1: ${fastestBoard.score}`);
