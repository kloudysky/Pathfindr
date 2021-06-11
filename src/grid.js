export const createGrid = (start, destination) => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(row, col, start, destination));
    }
    grid.push(currentRow);
  }
  return grid;
};

export const createWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const createNode = (row, col, start, destination) => {
  return {
    row,
    col,
    isStart: row === start[0] && col === start[1],
    isDestination: row === destination[0] && col === destination[1],
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};
