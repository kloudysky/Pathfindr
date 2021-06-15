import React, { Component } from "react";
import "./navbar.css";

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      algorithm: "dijkstra",
    };
  }

  handleAlgorithm() {}

  render() {
    return (
      <div className="navbar">
        <div className="dropdown">
          <button class="dropbtn">Algorithm</button>
          <div class="dropdown-content">
            <a href="#" value="BFS" onClick={() => this.handleAlgorithm()}>
              Breadth First Search
            </a>
            <a href="#" value="DFS" onClick={() => this.handleAlgorithm()}>
              Depth First Search
            </a>
            <a href="#" value="Bijkstra" onClick={() => this.handleAlgorithm()}>
              Dijkstra
            </a>
          </div>
        </div>
        <button
          class="findbtn"
          onClick={() => this.props.onFindDestination(this.state.algorithm)}
        >{`Use ${this.state.algorithm}`}</button>
        <button onClick={() => this.props.onResetGrid()} class="findbtn">
          Reset
        </button>
      </div>
    );
  }
}

export default NavBar;
