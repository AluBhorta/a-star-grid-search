import { GridCell, StateNode, SearchState } from "./models";

/**
 *  A* seach algorithm for finding shortest path in a 2 dimensional grid.
 *
 * @param totalRows The number of rows in the grid
 * @param totalCols The number of columns in the grid
 * @param source The source grid cell
 * @param destination The destination grid cell
 * @param blockedCells The array of grid cells that are blocked i.e. cannot be visited
 *
 * @returns shortest path: The array of grid cells representing the shortest path from source to destination
 */
function AStarGridSearch(
  totalRows: number,
  totalCols: number,
  source: GridCell,
  destination: GridCell,
  blockedCells: GridCell[] = []
): GridCell[] {
  // TODO: return error if src and dest in blockedCells

  // init currentNode as src, and set visited as true
  const sourceNode = new StateNode(source, null, false, true);  
  const destinationNode = new StateNode(destination, null, false);
  
  // init new search state with sourceNode
  const searchState = new SearchState(sourceNode, totalRows, totalCols, blockedCells);
  
  let currentNode: StateNode = sourceNode
  let minCostNode: StateNode
  do {
    searchState.updateFrontiersFrom(currentNode);

    minCostNode = searchState.findMinCostFrontier();
    if (minCostNode.matches(destinationNode)) {
      break;
    }
    
    searchState.explore(minCostNode);
    
    currentNode = minCostNode;

    // TODO: implement a state.hasUnexploredNeighbours instead of while(true)
  } while (true);

  return searchState.getShortestPath(sourceNode, destinationNode);
}