import { GridCell, StateNode, SearchState } from "./models";

/**
 *  A* seach algorithm for finding shortest path in a 2 dimensional grid.
 *
 * @param totalRows The total number of rows in the grid
 * @param totalCols The total number of columns in the grid
 * @param source The source GridCell
 * @param destination The destination GridCell
 * @param blockedCells The array of GridCells that are blocked i.e. cannot be visited
 * @param horizontalCost Cost of a horizontal move
 * @param verticalCost Cost of a vertical move
 *
 * N.B: a GridCell is of type: { rowNumber: number, colNumber: number }
 * 
 * @returns shortest path: The array of GridCells representing the shortest path (if it exists) from source to destination 
 */
export function AStarGridSearch(
  totalRows: number,
  totalCols: number,
  source: GridCell,
  destination: GridCell,
  blockedCells: GridCell[] = [],
  horizontalCost: number = 1,
  verticalCost: number = 1
): GridCell[] {
  // TODO: return error if src and dest in blockedCells

  // init currentNode as src, and set visited as true
  const sourceNode = new StateNode(source, null, false, true);
  const destinationNode = new StateNode(destination, null, false);

  // init new search state with sourceNode
  const searchState = new SearchState(
    sourceNode,
    totalRows,
    totalCols,
    blockedCells,
    horizontalCost,
    verticalCost
  );

  let currentNode: StateNode = sourceNode;
  let minCostNode: StateNode;
  do {
    searchState.updateFrontiersFrom(currentNode);

    minCostNode = searchState.findMinCostFrontier();
    // TODO: find point of best yield
    if (minCostNode.matches(destinationNode)) {
      break;
    }

    searchState.explore(minCostNode);

    currentNode = minCostNode;

    // TODO: implement a state.hasUnexploredNeighbours instead of while(true)
  } while (true);

  // TODO: return path if destinationNode was explored
  return searchState.getShortestPathTo(destinationNode);
}
