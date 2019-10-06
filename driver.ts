import { GridCell } from "./models";
import { AStarGridSearch } from "./AStarSearch";

const row = 5,
  col = 5,
  src: GridCell = { colNumber: 0, rowNumber: 0 },
  dest: GridCell = { colNumber: 4, rowNumber: 4 },
  blocked: GridCell[] = [
    { colNumber: 1, rowNumber: 2 },
    { colNumber: 2, rowNumber: 1 },
    { colNumber: 2, rowNumber: 2 }
  ];

const path = AStarGridSearch(row, col, src, dest, blocked);
console.log(path);
