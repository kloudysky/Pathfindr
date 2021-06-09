import React, { Component } from "react";
import Node from "./node/Node";
import "./visualizer.css";

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
  }

  componentDidMount() {
    const nodes = [];
    for (let row = 0; row < 15; row++) {
      const currentRow = [];
      for (let column = 0; column < 50; column++) {
        currentRow.push([]);
      }
      nodes.push(currentRow);
    }
    this.setState({ nodes });
  }

  render() {
    const { nodes } = this.state;

    return (
      <div className="grid">
        {nodes.map((row, rowIdx) => {
          return (
            <div>
              {row.map((node, nodeIdx) => (
                <Node></Node>
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}
