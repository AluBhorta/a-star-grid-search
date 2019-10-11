import { GridCell, StateNode, SearchState } from "./models";

/**
 *  A* seach algorithm for finding shortest path in a 2 dimensional grid.
 *
 * @param totalRows The total number of rows in the grid
 * @param totalCols The total number of columns in the grid
 * @param sourceCell The source GridCell
 * @param destinationCell The destination GridCell
 * @param blockedCells The array of GridCells that are blocked i.e. cannot be visited
 * @param rowStepCost Cost of each step across rows
 * @param colStepCost Cost of each step across columns
 *
 * N.B: a GridCell is of type: { rowNumber: number, colNumber: number }
 *
 * @returns shortest path: The array of GridCells representing the shortest path (if it exists) from source to destination
 */
export function AStarGridSearch(
  totalRows: number,
  totalCols: number,
  sourceCell: GridCell,
  destinationCell: GridCell,
  blockedCells: GridCell[] = [],
  rowStepCost: number = 1,
  colStepCost: number = 1
): GridCell[] | null {
  // TODO: return error if src or dest in blockedCells

  // init currentNode as src, and set visited as true
  const sourceNode = new StateNode(sourceCell, null, false, true, 0);
  const destinationNode = new StateNode(destinationCell, null, false);

  // init new search state with sourceNode
  const searchState = new SearchState(
    sourceNode,
    destinationNode,
    totalRows,
    totalCols,
    blockedCells,
    rowStepCost,
    colStepCost
  );

  let currentNode: StateNode | null = sourceNode;
  let minCostNode: StateNode | null;

  let shortestPathExists: boolean = false;

  while (true) {
    searchState.updateFrontiersFrom(currentNode);

    minCostNode = searchState.findMinCostFrontier();

    if (minCostNode === null) {
      // signifies no unvisited nodes in state
      break;
    }

    searchState.explore(minCostNode);

    // TODO: find point of best yield
    if (minCostNode.matches(destinationNode)) {
      shortestPathExists = true;
      break;
    }

    currentNode = minCostNode;
  }

  if (shortestPathExists) {
    return searchState.getShortestPath();
  }
  return null; // signifies that no path exists
}
