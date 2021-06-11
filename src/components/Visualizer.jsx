import React, { Component } from "react";
import Node from "./node/Node";
import { dijkstra } from "../algorithms/dijkstra";
import { createGrid, createWall } from "../grid";
import NavBar from "./navbar/NavBar";
import "./visualizer.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const DESTINATION_NODE_ROW = 10;
const DESTINATION_NODE_COL = 35;

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseDown: false,
    };
  }

  componentDidMount() {
    const start = [START_NODE_ROW, START_NODE_COL];
    const destination = [DESTINATION_NODE_ROW, DESTINATION_NODE_COL];
    const grid = createGrid(start, destination);
    this.setState({ grid });
  }

  animateDijkstraPath(visitedNodesInOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        // setTimeout(() => {
        //   this.animateShortestPath(nodesInShortestPathOrder);
        // }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-outter-visted";
        document.getElementById(
          `node-figure-${node.row}-${node.col}`
        ).className = "node-figure node-visited";
      }, 10 * i);
    }
  }

  animatePath(algorithm) {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const destinationNode = grid[DESTINATION_NODE_ROW][DESTINATION_NODE_COL];

    switch (algorithm) {
      case dijkstra:
        const visitedNodesInOrder = dijkstra(grid, startNode, destinationNode);
        // const nodesInShortestPathOrder = getNodesInShortestPathOrder(destinationNode);
        this.animateDijkstraPath(visitedNodesInOrder);
        break;
      default:
        break;
    }
  }

  handleMouseDown(row, col) {
    const grid = createWall(this.state.grid, row, col);
    this.setState({ grid, mouseDown: true });
  }

  handleMouseEnter(row, col) {
    if (this.state.mouseDown) {
      const grid = createWall(this.state.grid, row, col);
      this.setState({ grid });
    }
  }

  handleMouseUp() {
    this.setState({ mouseDown: false });
  }

  render() {
    const { grid } = this.state;

    return (
      <>
        <NavBar />
        <button onClick={() => this.animatePath(dijkstra)}>
          Visualize Dijkstra's Algorithm
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {
                    row,
                    col,
                    isDestination,
                    isStart,
                    isWall,
                    isVisited,
                  } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isDestination={isDestination}
                      isStart={isStart}
                      isWall={isWall}
                      row={row}
                      isVisited={isVisited}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
