export function bfs(grid, startNode, targetNode) {
  const visitedNodesSorted = [];
  startNode.distance = 0;
  let queue = getUnvisitedNeighbors(startNode, grid);
  updatequeue(startNode, grid);
  while (!!queue.length) {
    console.log("queue", queue);
    console.log("visited", visitedNodesSorted);
    const childNode = queue.shift();
    console.log("child node", childNode);
    if (childNode.isWall) continue;
    childNode.isVisited = true;
    visitedNodesSorted.push(childNode);
    if (childNode === targetNode) return visitedNodesSorted;
    updatequeue(childNode, grid);
    queue.push(getUnvisitedNeighbors(childNode, grid));
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function updatequeue(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

export function getChildrenInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
