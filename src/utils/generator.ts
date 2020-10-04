import { Difficulties } from "../models/difficulties";
import { Operations } from "../models/operations";

export function generateNumber(diff) {
  return Math.floor(Math.random() * diff);
}

export function generateQuestion(
  difficulty: Difficulties,
  operation: Operations
): { terms: number[]; answer: number } {
  let terms = [];

  terms = [...terms, generateNumber(difficulty)];
  terms = [...terms, generateNumber(difficulty)];

  if (difficulty > Difficulties.easy && operation === Operations.add) {
    for (let i = 2; i < difficulty.toString().length; i++) {
      terms = [...terms, generateNumber(difficulty)];
    }
  }

  if (difficulty === Difficulties.easy) {
    // sort turns
    terms = [...terms.sort().reverse()];
  }

  let answer;
  switch (operation) {
    case Operations.divide:
      let [divisor, quotient] = terms;
      divisor = divisor == 0 ? 1 : divisor;
      let dividend = terms.reduce((acc, i) => acc * i);
      terms = [divisor, dividend];
      answer = quotient;
      break;
    case Operations.multiply:
      answer = terms.reduce((acc, i) => acc * i);
      break;
    case Operations.subtract:
      answer = terms.reduce((acc, i) => acc - i);
      break;
    default:
      answer = terms.reduce((acc, i) => acc + i);
      break;
  }

  if (operation !== Operations.divide) {
    let [last, ...rest] = terms.reverse();
    terms = [...rest.reverse(), `${operation}${last}`];
  }
  return {
    terms,
    answer,
  };
}
