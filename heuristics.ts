import { GridCell } from "./models";

export function Heuristic_ManhattanDistance(
  src: GridCell,
  target: GridCell,
  rowStepCost: number = 1,
  ColStepCost: number = 1
) {
  return (
    (Math.abs(src.rowNumber - target.rowNumber) * rowStepCost) +
    (Math.abs(src.colNumber - target.colNumber) * ColStepCost)
  );
}
