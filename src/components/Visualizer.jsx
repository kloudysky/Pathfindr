import React, { Component } from "react";
import Node from "./node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { createGrid, createWall, changeStart } from "../grid";
import NavBar from "./navbar/NavBar";
import "./visualizer.css";

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseDown: false,
      startRow: 10,
      startCol: 15,
      destinationRow: 10,
      destinationCol: 35,
      mouseDownOnStart: false,
      mouseDownOnDestination: false,
      pathFound: false,
    };
  }

  componentDidMount() {
    const { startRow, startCol, destinationRow, destinationCol } = this.state;
    const start = [startRow, startCol];
    const destination = [destinationRow, destinationCol];
    const grid = createGrid(start, destination);
    this.setState({ grid });
  }

  animateDijkstraPath(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
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

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
        document.getElementById(
          `node-figure-${node.row}-${node.col}`
        ).className = "node-figure node-shortest-path";
      }, 50 * i);
      this.setState({ pathFound: true });
    }
  }

  resetNodes(grid) {
    grid.forEach((row, rowIdx) => {
      row.forEach((node, nodeIdx) => {
        if (node.isStart === false && node.isDestination === false) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node";
          document.getElementById(
            `node-figure-${node.row}-${node.col}`
          ).className = "node-figure";
        } else if (node.isStart === true) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node";
          document.getElementById(
            `node-figure-${node.row}-${node.col}`
          ).className = "node-figure node-start";
        } else if (node.isDestination === true) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node";
          document.getElementById(
            `node-figure-${node.row}-${node.col}`
          ).className = "node-figure node-finish";
        }
      });
    });
  }

  handleFindDestination(algorithm) {
    const { grid, startRow, startCol, destinationRow, destinationCol } =
      this.state;
    const startNode = grid[startRow][startCol];
    const destinationNode = grid[destinationRow][destinationCol];

    switch (algorithm) {
      case "dijkstra":
        const visitedNodesInOrder = dijkstra(grid, startNode, destinationNode);
        const nodesInShortestPathOrder =
          getNodesInShortestPathOrder(destinationNode);
        this.animateDijkstraPath(visitedNodesInOrder, nodesInShortestPathOrder);
        break;
      default:
        break;
    }
  }

  handleMouseDown(row, col) {
    if (this.state.pathFound === false) {
      if (row === this.state.startRow && col === this.state.startCol) {
        this.setState({ mouseDownOnStart: true });
      } else if (
        row === this.state.destinationRow &&
        col === this.state.destinationCol
      ) {
        this.setState({ mouseDownOnDestination: true });
      } else {
        const grid = createWall(this.state.grid, row, col);
        this.setState({ grid, mouseDown: true });
      }
    } else {
      this.handleResetGrid();
    }
  }

  handleMouseEnter(row, col) {
    const currentGrid = this.state.grid;
    if (this.state.mouseDown) {
      const grid = createWall(currentGrid, row, col);
      this.setState({ grid });
    } else if (this.state.mouseDownOnStart) {
      const grid = changeStart(
        currentGrid,
        this.state.startRow,
        this.state.startCol,
        row,
        col,
        "start"
      );
      this.setState({ grid, startRow: row, startCol: col });
    } else if (this.state.mouseDownOnDestination) {
      const grid = changeStart(
        currentGrid,
        this.state.destinationRow,
        this.state.destinationCol,
        row,
        col,
        "destination"
      );
      this.setState({ grid, destinationRow: row, destinationCol: col });
    }
  }

  handleMouseUp() {
    this.setState({
      mouseDown: false,
      mouseDownOnStart: false,
      mouseDownOnDestination: false,
    });
  }

  handleResetGrid() {
    console.log("hello");
    this.setState({
      grid: [],
      mouseDown: false,
      startRow: 10,
      startCol: 15,
      destinationRow: 10,
      destinationCol: 35,
      mouseDownOnStart: false,
      mouseDownOnDestination: false,
      pathFound: false,
    });
    const start = [10, 15];
    const destination = [10, 35];
    const grid = createGrid(start, destination);
    this.resetNodes(grid);
    this.setState({ grid });
  }

  render() {
    const { grid } = this.state;

    return (
      <>
        <NavBar
          onFindDestination={(algo) => this.handleFindDestination(algo)}
          onResetGrid={() => this.handleResetGrid()}
        />
        {/* <button onClick={() => this.findDestination("dijkstra")}>
          Visualize Dijkstra's Algorithm
        </button> */}
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
