import { Heuristic_ManhattanDistance } from "./heuristics";

export type GridCell = {
  rowNumber: number;
  colNumber: number;
};

/**
 *
 * N.B: node.F_value = node.C_value + node.H_value
 */
export class StateNode {
  constructor(
    public cell: GridCell,
    public parent: StateNode,
    public blocked: boolean,
    public visited: boolean = false,
    public C_value: number = -1,
    public H_value: number = -1,
    public F_value: number = -1
  ) {}

  matches(node: StateNode) {
    return (
      this.cell.rowNumber === node.cell.rowNumber &&
      this.cell.colNumber === node.cell.colNumber
    );
  }
}

/**
 *
 */
export class SearchState {
  private state: StateNode[] = [];
  private heuristic = Heuristic_ManhattanDistance;

  constructor(
    private source: StateNode,
    private totalRows: number,
    private totalCols: number,
    private blockedCells: GridCell[],
    private horizontalCost: number,
    private verticalCost: number
  ) {
    if (!source.visited) {
      source.visited = true;
    }
    this.addNode(source);
  }

  private addNode(node: StateNode) {
    this.state.push(node);
  }

  updateFrontiersFrom(node: StateNode) {
    throw new Error("Method not implemented.");
  }

  findMinCostFrontier(): StateNode {
    throw new Error("Method not implemented.");
  }

  explore(minCostNode: StateNode) {
    throw new Error("Method not implemented.");
  }

  getShortestPathTo(destinationNode: StateNode): GridCell[] {
    throw new Error("Method not implemented.");
  }
}
