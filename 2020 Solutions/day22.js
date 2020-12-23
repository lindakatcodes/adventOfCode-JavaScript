import { createRequire } from 'module';
import * as h from '../helpers.js';

const require = createRequire(import.meta.url);
const fs = require('fs');

const data = fs.readFileSync('./2020 Solutions/inputs/day22input.txt').toString();

const playerInit = h.splitOnSpaces(data);

const p1Deck = h.numInput(playerInit[0]).slice(1);
const p2Deck = h.numInput(playerInit[1]).slice(1);

let winner = [];

// part 1 - regular combat rules
while (p1Deck.length > 0 && p2Deck.length > 0) {
  const p1Plays = p1Deck.shift();
  // console.log(p1Plays);
  const p2Plays = p2Deck.shift();
  // console.log(p2Plays);

  if (p1Plays > p2Plays) {
    p1Deck.push(p1Plays, p2Plays);
  } else {
    p2Deck.push(p2Plays, p1Plays);
  }
  // console.log(p1Deck, p2Deck);

  if (p1Deck.length === 0) {
    winner = [...p2Deck];
  }
  if (p2Deck.length === 0) {
    winner = [...p1Deck];
  }
}

const winScore1 = winner.reduce((acc, card, cardIdx) => {
  const cardTotal = card * (winner.length - cardIdx);
  // console.log(cardTotal);
  return acc + cardTotal;
}, 0);

console.log(winScore1);

winner = [];
const p1Deck2 = h.numInput(playerInit[0]).slice(1);
const p2Deck2 = h.numInput(playerInit[1]).slice(1);

// part 2 - recursive combat rules
let game = 1;

function playGame(p1Cards, p2Cards) {
  // console.log(`starting game ${game}`);
  const p1History = [];
  const p2History = [];
  while (p1Cards.length > 0 && p2Cards.length > 0) {
    // if a previous round had the same cards in the same order for the same player, game instantly ends with a win for p1
    if (p1History.includes(p1Cards.join('')) || p2History.includes(p2Cards.join(''))) {
      return 1;
    }
    p1History.push(p1Cards.join(''));
    p2History.push(p2Cards.join(''));

    // otherwise, each person plays the top card
    const p1Play = p1Cards.shift();
    const p2Play = p2Cards.shift();

    // if both players have at least as many cards remaining as the card they drew, play a subgame
    if (p1Cards.length >= p1Play && p2Cards.length >= p2Play) {
      // subgame is played with a copy of cards equal to the number on the current play
      const p1Copy = p1Cards.slice(0, p1Play);
      const p2Copy = p2Cards.slice(0, p2Play);
      game++;
      const gameWin = playGame(p1Copy, p2Copy);
      if (gameWin === 1) {
        p1Cards.push(p1Play, p2Play);
      } else {
        p2Cards.push(p2Play, p1Play);
      }
    } else {
      // otherwise, highest card wins
      // eslint-disable-next-line no-lonely-if
      if (p1Play > p2Play) {
        p1Cards.push(p1Play, p2Play);
      } else {
        p2Cards.push(p2Play, p1Play);
      }
    }
    if (p1Cards.length === 0) {
      return 2;
    }
    if (p2Cards.length === 0) {
      return 1;
    }
  }
}

const gameWinner = playGame(p1Deck2, p2Deck2);
if (gameWinner === 1) {
  winner.push(...p1Deck2);
} else {
  winner.push(...p2Deck2);
}

const winScore2 = winner.reduce((acc, card, cardIdx) => {
  const cardTotal = card * (winner.length - cardIdx);
  // console.log(cardTotal);
  return acc + cardTotal;
}, 0);

console.log(winScore2);
