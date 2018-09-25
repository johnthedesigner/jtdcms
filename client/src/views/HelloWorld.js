import React, { Component } from "react";
import { Link } from "react-router-dom";

class HelloWorld extends Component {
  render() {
    return (
      <div>
        <h1>Hello world.</h1>
        <p>
          <Link to="/todos">Todo List</Link>
        </p>
      </div>
    );
  }
}

export default HelloWorld;
