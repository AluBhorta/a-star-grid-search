# A\* Grid Search

A* search implmentation in Typescript using an object oriented approach. Works for any (n * m) sized grid.

## Usage

Run demo on [repl.it](https://repl.it/@AluBhorta/A-star-search-demo-TS).

Or

Run locally after cloning this repo. You must have **Typescript** & **Nodejs** installed.

- Update the parameters: (totalRows, totalCols, source, destination, blockedCells, rowStepCost,colStepCost) in driver.ts

- Compile _driver.ts_ using typescript compiler

  ```bash
  tsc driver.ts -m commonjs
  ```

- run compiled _driver.js_ in node
  ```bash
  node driver.js
  ```

## License

MIT
