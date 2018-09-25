import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import TodoContainer from "./views/TodoContainer";
import HelloWorld from "./views/HelloWorld";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={HelloWorld} />
            <Route exact path="/todos" component={TodoContainer} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
