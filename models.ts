import { Heuristic_ManhattanDistance } from "./heuristics";

export type GridCell = {
  rowNumber: number;
  colNumber: number;
};

/**
 *
 * TODO: Describe what a StateNode means
 * N.B: node.F_value = node.C_value + node.H_value
 */
export class StateNode {
  constructor(
    public cell: GridCell,
    public parent: StateNode,
    public blocked: boolean = false,
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
 * TODO: Describe what a SearchState means
 */
export class SearchState {
  private state: StateNode[] = [];
  private heuristic = Heuristic_ManhattanDistance;

  constructor(
    private sourceNode: StateNode,
    private destinationNode: StateNode,
    private totalRows: number,
    private totalCols: number,
    private blockedCells: GridCell[],
    private rowStepCost: number,
    private colStepCost: number
  ) {
    if (!sourceNode.visited) {
      sourceNode.visited = true;
    }
    this.addNodeToState(sourceNode);
  }

  private addNodeToState(node: StateNode) {
    this.state.push(node);
  }

  updateFrontiersFrom(node: StateNode) {
    const neighbourCells: GridCell[] = this.getValidNeighbourCellsOf(node);

    for (const cell of neighbourCells) {
      const cellIndex = this.getStateIndexOf(cell);

      if (cellIndex === -1) {
        // if cell does not exist in state
        const newNode: StateNode = this.constructNewNode(cell, node);

        this.addNodeToState(newNode);
      } else {
        // if cell is already in state
        const visited = this.state[cellIndex].visited;

        if (!visited) {
          const newNode: StateNode = this.constructNewNode(cell, node);

          if (newNode.F_value < this.state[cellIndex].F_value) {
            this.state[cellIndex] = newNode;
          }
        }
      }
    }
  }

  private constructNewNode(cell: GridCell, parentNode: StateNode): StateNode {
    const newNode = new StateNode(cell, parentNode);

    // calc C_value
    const stepCost =
      parentNode.cell.rowNumber === newNode.cell.rowNumber
        ? this.colStepCost
        : this.rowStepCost;

    newNode.C_value = parentNode.C_value + stepCost;

    // calc H_value
    newNode.H_value = this.heuristic(
      newNode.cell,
      this.destinationNode.cell,
      this.rowStepCost,
      this.colStepCost
    );

    // cal F_val
    newNode.F_value = newNode.C_value + newNode.H_value;

    return newNode;
  }

  private getValidNeighbourCellsOf(node: StateNode): GridCell[] {
    const possibleNeighbourCells: GridCell[] = [
      { rowNumber: node.cell.rowNumber + 1, colNumber: node.cell.colNumber },
      { rowNumber: node.cell.rowNumber, colNumber: node.cell.colNumber + 1 },
      { rowNumber: node.cell.rowNumber - 1, colNumber: node.cell.colNumber },
      { rowNumber: node.cell.rowNumber, colNumber: node.cell.colNumber - 1 }
    ];

    const validNeighbourCells: GridCell[] = [];

    for (const cell of possibleNeighbourCells) {
      if (cell.rowNumber >= 0 && cell.rowNumber < this.totalRows) {
        if (cell.colNumber >= 0 && cell.colNumber < this.totalCols) {
          // if cell within grid
          let cellInBlocked = false;
          for (const blockedCell of this.blockedCells) {
            if (this.cellsMatch(blockedCell, cell)) {
              // if cell in blocked
              cellInBlocked = true;
              break;
            }
          }

          if (!cellInBlocked) {
            validNeighbourCells.push(cell);
          }
        }
      }
    }

    return validNeighbourCells;
  }

  private getStateIndexOf(cell: GridCell): number {
    for (let index = 0; index < this.state.length; index++) {
      if (this.cellsMatch(cell, this.state[index].cell)) {
        return index;
      }
    }

    // return -1 if cell ain't in state
    return -1;
  }

  private cellsMatch(cell1: GridCell, cell2: GridCell) {
    return (
      cell1.rowNumber === cell2.rowNumber && cell1.colNumber === cell2.colNumber
    );
  }

  findMinCostFrontier(): StateNode {
    throw new Error("Method not implemented.");
  }

  explore(minCostNode: StateNode) {
    throw new Error("Method not implemented.");
  }

  hasUnexploredFrontiers(): boolean {
    throw new Error("Method not implemented.");
  }

  getShortestPath(): GridCell[] {
    throw new Error("Method not implemented.");
    // should return the path, path-length if path exists, error/warning otherwise
  }
}
