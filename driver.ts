import { GridCell } from "./models";
import { AStarGridSearch } from "./AStarSearch";

const totalRows = 5,
  totalCols = 6,
  source: GridCell = { rowNumber: 2, colNumber: 0 },
  destination: GridCell = { rowNumber: 2, colNumber: 3 },
  blockedCells: GridCell[] = [
    { rowNumber: 1, colNumber: 1 },
    { rowNumber: 1, colNumber: 2 },
    { rowNumber: 2, colNumber: 2 },
    { rowNumber: 2, colNumber: 4 },
    { rowNumber: 3, colNumber: 1 },
    { rowNumber: 2, colNumber: 4 }
  ],
  rowStepCost = 2,
  colStepCost = 1;

const path = AStarGridSearch(
  totalRows,
  totalCols,
  source,
  destination,
  blockedCells,
  rowStepCost,
  colStepCost
);

if (path === null) {
  console.log(`No path from source to destination exists, unfortunately. :( `);
} else {
  console.log(`The Path from source to destination is:\n`, path);
}
