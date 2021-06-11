import React, { Component } from "react";
import "./navbar.css";

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      algorithm: "dijkstra",
    };
  }
  render() {
    return (
      <div className="navbar">
        <div className="dropdown">
          <button class="dropbtn">Algorithm</button>
          <div class="dropdown-content">
            <a href="#">Dijkstra</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
        <button class="findbtn">{`Use ${this.state.algorithm}`}</button>
        <button onClick={() => this.props.resetGrid()} class="findbtn">
          Reset
        </button>
      </div>
    );
  }
}

export default NavBar;
