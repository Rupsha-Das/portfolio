/**
 * Sudoku engine — pure logic, no UI.
 *
 * A board is 9x9 numbers; 0 means empty. Everything here is a pure
 * function so the game UI, persistence, and tests share one source of
 * truth. No backend, no login, nothing leaves the browser.
 */

export type Board = number[][];
export type Difficulty = "easy" | "medium" | "hard";

/** Givens per difficulty (cells pre-filled). */
export const GIVENS: Record<Difficulty, number> = {
  easy: 40,
  medium: 32,
  hard: 27,
};

export function emptyBoard(): Board {
  return Array.from({ length: 9 }, () => Array(9).fill(0));
}

export function cloneBoard(board: Board): Board {
  return board.map((row) => [...row]);
}

export function boardKey(board: Board): string {
  return board.map((row) => row.join("")).join("|");
}

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** True if placing n at (row, col) breaks no row/column/box rule. */
export function isValidPlacement(board: Board, row: number, col: number, n: number): boolean {
  if (n < 1 || n > 9) return false;
  for (let i = 0; i < 9; i++) {
    if (i !== col && board[row][i] === n) return false;
    if (i !== row && board[i][col] === n) return false;
  }
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if ((r !== row || c !== col) && board[r][c] === n) return false;
    }
  }
  return true;
}

/** True when every filled cell respects the rules (empties ignored). */
export function isValidBoard(board: Board): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const n = board[r][c];
      if (n === 0) continue;
      if (n < 1 || n > 9) return false;
      // Temporarily clear self so placement check ignores the cell itself.
      board[r][c] = 0;
      const ok = isValidPlacement(board, r, c, n);
      board[r][c] = n;
      if (!ok) return false;
    }
  }
  return true;
}

function findEmpty(board: Board): [number, number] | null {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) return [r, c];
    }
  }
  return null;
}

/** Solve in place; true when solvable. Mutates the passed board. */
export function solveBoard(board: Board): boolean {
  const empty = findEmpty(board);
  if (!empty) return true;
  const [row, col] = empty;
  for (const n of shuffled([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
    if (isValidPlacement(board, row, col, n)) {
      board[row][col] = n;
      if (solveBoard(board)) return true;
      board[row][col] = 0;
    }
  }
  return false;
}

/** Count solutions up to `cap` (early exit — used for uniqueness checks). */
export function countSolutions(board: Board, cap = 2): number {
  const empty = findEmpty(board);
  if (!empty) return 1;
  const [row, col] = empty;
  let count = 0;
  for (let n = 1; n <= 9; n++) {
    if (isValidPlacement(board, row, col, n)) {
      board[row][col] = n;
      count += countSolutions(board, cap - count);
      board[row][col] = 0;
      if (count >= cap) return count;
    }
  }
  return count;
}

/** A complete, rule-respecting board. */
export function generateSolution(): Board {
  const board = emptyBoard();
  solveBoard(board);
  return board;
}

export type Puzzle = {
  puzzle: Board;
  solution: Board;
  difficulty: Difficulty;
};

/**
 * Dig holes from a full board, keeping only removals that preserve a
 * unique solution. Bounded attempts so generation stays fast.
 */
export function generatePuzzle(difficulty: Difficulty): Puzzle {
  const solution = generateSolution();
  const puzzle = cloneBoard(solution);
  const target = GIVENS[difficulty];
  let givens = 81;
  const cells = shuffled(
    Array.from({ length: 81 }, (_, i) => [Math.floor(i / 9), i % 9] as [number, number])
  );
  for (const [row, col] of cells) {
    if (givens <= target) break;
    const backup = puzzle[row][col];
    puzzle[row][col] = 0;
    if (countSolutions(cloneBoard(puzzle), 2) !== 1) {
      puzzle[row][col] = backup; // restore — removal broke uniqueness
    } else {
      givens--;
    }
  }
  return { puzzle, solution, difficulty };
}

/** Keys "r-c" of every filled cell that conflicts with a peer. */
export function findConflicts(board: Board): Set<string> {
  const bad = new Set<string>();
  const markRun = (cells: [number, number][]) => {
    const seen = new Map<number, [number, number][]>();
    for (const [r, c] of cells) {
      const n = board[r][c];
      if (n === 0) continue;
      const list = seen.get(n) ?? [];
      list.push([r, c]);
      seen.set(n, list);
    }
    for (const list of seen.values()) {
      if (list.length > 1) {
        for (const [r, c] of list) bad.add(`${r}-${c}`);
      }
    }
  };
  for (let i = 0; i < 9; i++) {
    markRun(Array.from({ length: 9 }, (_, k) => [i, k] as [number, number]));
    markRun(Array.from({ length: 9 }, (_, k) => [k, i] as [number, number]));
  }
  for (let br = 0; br < 3; br++) {
    for (let bc = 0; bc < 3; bc++) {
      const cells: [number, number][] = [];
      for (let r = br * 3; r < br * 3 + 3; r++) {
        for (let c = bc * 3; c < bc * 3 + 3; c++) cells.push([r, c]);
      }
      markRun(cells);
    }
  }
  return bad;
}

/** True when the board is full AND every unit contains 1-9 exactly. */
export function isComplete(board: Board): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) return false;
    }
  }
  return findConflicts(board).size === 0;
}

/** Fresh working copy of the givens — reset behavior. */
export function resetBoard(initial: Board): Board {
  return cloneBoard(initial);
}

/** True when every non-zero entry of `puzzle` matches `solution`. */
export function matchesSolution(puzzle: Board, solution: Board): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (puzzle[r][c] !== 0 && puzzle[r][c] !== solution[r][c]) return false;
    }
  }
  return true;
}
