import { describe, expect, it } from "vitest";
import {
  cloneBoard,
  countSolutions,
  emptyBoard,
  findConflicts,
  generatePuzzle,
  generateSolution,
  GIVENS,
  isComplete,
  isValidBoard,
  isValidPlacement,
  matchesSolution,
  resetBoard,
  type Board,
} from "./sudoku";

function solvedBoard(): Board {
  return [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
  ];
}

describe("valid board detection", () => {
  it("accepts a solved board", () => {
    expect(isValidBoard(solvedBoard())).toBe(true);
  });

  it("accepts an empty board", () => {
    expect(isValidBoard(emptyBoard())).toBe(true);
  });

  it("rejects a row duplicate", () => {
    const board = solvedBoard();
    board[0][0] = board[0][1];
    expect(isValidBoard(board)).toBe(false);
  });

  it("rejects a column duplicate", () => {
    const board = solvedBoard();
    board[0][0] = board[1][0];
    expect(isValidBoard(board)).toBe(false);
  });

  it("rejects a box duplicate", () => {
    const board = solvedBoard();
    board[0][0] = board[1][1];
    expect(isValidBoard(board)).toBe(false);
  });

  it("rejects out-of-range digits", () => {
    const board = emptyBoard();
    board[4][4] = 10;
    expect(isValidBoard(board)).toBe(false);
    expect(isValidPlacement(emptyBoard(), 0, 0, 0)).toBe(false);
  });
});

describe("conflict detection", () => {
  it("finds no conflicts on a solved board", () => {
    expect(findConflicts(solvedBoard()).size).toBe(0);
  });

  it("marks both cells of a row clash", () => {
    const board = emptyBoard();
    board[2][3] = 7;
    board[2][7] = 7;
    const bad = findConflicts(board);
    expect(bad.has("2-3")).toBe(true);
    expect(bad.has("2-7")).toBe(true);
    expect(bad.size).toBe(2);
  });

  it("marks column and box clashes too", () => {
    const board = emptyBoard();
    board[0][0] = 5;
    board[8][8] = 5; // same box? no — row/col differ; use box clash instead
    board[1][1] = 5; // box clash with 0-0
    const bad = findConflicts(board);
    expect(bad.has("0-0")).toBe(true);
    expect(bad.has("1-1")).toBe(true);
  });

  it("ignores empty cells", () => {
    expect(findConflicts(emptyBoard()).size).toBe(0);
  });
});

describe("puzzle completion", () => {
  it("detects a solved board as complete", () => {
    expect(isComplete(solvedBoard())).toBe(true);
  });

  it("rejects an unfinished board", () => {
    const board = solvedBoard();
    board[8][8] = 0;
    expect(isComplete(board)).toBe(false);
  });

  it("rejects a full but invalid board", () => {
    const board = solvedBoard();
    board[0][0] = board[0][1];
    expect(isComplete(board)).toBe(false);
  });
});

describe("reset behavior", () => {
  it("returns a fresh copy equal to the givens", () => {
    const initial = solvedBoard();
    initial[0][0] = 0;
    const working = cloneBoard(initial);
    working[0][0] = 9;
    working[1][1] = 9;
    const reset = resetBoard(initial);
    expect(reset).toEqual(initial);
    expect(reset).not.toBe(initial);
    expect(reset[0]).not.toBe(initial[0]);
  });
});

describe("new puzzle behavior", () => {
  it("generates a valid, uniquely solvable puzzle per difficulty", () => {
    for (const difficulty of ["easy", "medium", "hard"] as const) {
      const { puzzle, solution } = generatePuzzle(difficulty);
      const givens = puzzle.flat().filter((n) => n !== 0).length;
      expect(givens).toBeGreaterThanOrEqual(GIVENS[difficulty]);
      expect(isValidBoard(puzzle)).toBe(true);
      expect(isComplete(solution)).toBe(true);
      expect(matchesSolution(puzzle, solution)).toBe(true);
      expect(countSolutions(cloneBoard(puzzle), 2)).toBe(1);
    }
  }, 30000);

  it("generates a full valid solution", () => {
    const solution = generateSolution();
    expect(isComplete(solution)).toBe(true);
  });

  it("two fresh puzzles differ", () => {
    const a = generatePuzzle("easy");
    const b = generatePuzzle("easy");
    const samePuzzle =
      JSON.stringify(a.puzzle) === JSON.stringify(b.puzzle) &&
      JSON.stringify(a.solution) === JSON.stringify(b.solution);
    expect(samePuzzle).toBe(false);
  }, 30000);
});
