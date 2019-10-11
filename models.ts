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
    public parent: StateNode | null,
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
  private stateNodes: StateNode[] = [];
  private heuristic = Heuristic_ManhattanDistance;

  public constructor(
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
    this.stateNodes.push(node);
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
    for (let index = 0; index < this.stateNodes.length; index++) {
      if (this.cellsMatch(cell, this.stateNodes[index].cell)) {
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

  public updateFrontiersFrom(node: StateNode) {
    // valid neighbours are not blocked or outside the specified grid
    const neighbourCells: GridCell[] = this.getValidNeighbourCellsOf(node);

    for (const cell of neighbourCells) {
      const cellIndex = this.getStateIndexOf(cell);

      if (cellIndex === -1) {
        // if cell does not exist in state
        const newNode: StateNode = this.constructNewNode(cell, node);

        this.addNodeToState(newNode);
      } else {
        // if cell is already in state
        const visited = this.stateNodes[cellIndex].visited;

        if (!visited) {
          const newNode: StateNode = this.constructNewNode(cell, node);

          if (newNode.F_value < this.stateNodes[cellIndex].F_value) {
            this.stateNodes[cellIndex] = newNode;
          }
        }
      }
    }
  }

  public findMinCostFrontier(): StateNode | null {
    let minCostNode: StateNode | null = null;

    // all nodes in state are automatically non-blocked and have a valid cell as these checks are performed prior to adding nodes to the state
    for (const node of this.stateNodes) {
      if (!node.visited) {
        if (minCostNode === null || node.F_value < minCostNode.F_value) {
          minCostNode = node;
        }
      }
    }

    return minCostNode;
  }

  public explore(node: StateNode) {
    node.visited = true;
  }

  public getShortestPath(): GridCell[] | null {
    let destinationNodeIndexInState = -1;
    for (let index = 0; index < this.stateNodes.length; index++) {
      if (
        this.cellsMatch(this.stateNodes[index].cell, this.destinationNode.cell)
      ) {
        destinationNodeIndexInState = index;
        break;
      }
    }

    if (
      destinationNodeIndexInState === -1 ||
      !this.stateNodes[destinationNodeIndexInState].visited
    ) {
      return null;
    }

    const pathCells: GridCell[] = [];
    let currentNode: StateNode = this.stateNodes[destinationNodeIndexInState];

    while (currentNode.parent !== null) {
      pathCells.push(currentNode.cell);
      currentNode = currentNode.parent;
    }
    pathCells.push(this.sourceNode.cell);

    return pathCells.reverse();
  }
}
