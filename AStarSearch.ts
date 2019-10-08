import { GridCell, StateNode, SearchState } from "./models";

/**
 *  A* seach algorithm for finding shortest path in a 2 dimensional grid.
 *
 * @param totalRows The total number of rows in the grid
 * @param totalCols The total number of columns in the grid
 * @param source The source GridCell
 * @param destination The destination GridCell
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
  source: GridCell,
  destination: GridCell,
  blockedCells: GridCell[] = [],
  rowStepCost: number = 1,
  colStepCost: number = 1
): GridCell[] {
  // TODO: return error if src or dest in blockedCells

  // init currentNode as src, and set visited as true
  const sourceNode = new StateNode(source, null, false, true);
  const destinationNode = new StateNode(destination, null, false);

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

  let currentNode: StateNode = sourceNode;
  let minCostNode: StateNode;

  let shortestPathExists: boolean = false;
  do {
    searchState.updateFrontiersFrom(currentNode);

    minCostNode = searchState.findMinCostFrontier();

    searchState.explore(minCostNode);

    // TODO: find point of best yield
    if (minCostNode.matches(destinationNode)) {
      shortestPathExists = true;
      break;
    }

    currentNode = minCostNode;

    // } while (true);
  } while (searchState.hasUnexploredFrontiers());

  if (shortestPathExists) {
    return searchState.getShortestPath();
  }
  return null;
}
