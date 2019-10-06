export function Heuristic_ManhattanDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}
