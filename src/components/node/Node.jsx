import React, { Component } from "react";
import "./node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      col,
      isDestination,
      isStart,
      isWall,
      isVisited,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;

    const nodePositionClass = isStart
      ? "node-start"
      : isDestination
      ? "node-finish"
      : isVisited
      ? "node-visited"
      : isWall
      ? "node-wall"
      : "";

    const nodeOutterClass = isWall
      ? "node-wall"
      : isVisited
      ? "node-outter-visted"
      : "";

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${nodeOutterClass}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      >
        <div
          className={`node-figure ${nodePositionClass}`}
          id={`node-figure-${row}-${col}`}
        ></div>
      </div>
    );
  }
}
