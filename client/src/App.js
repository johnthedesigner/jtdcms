import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HeaderContainer from "./Header";
import HelloWorld from "./views/HelloWorld";
import LoginContainer from "./views/LoginContainer";
import RegisterContainer from "./views/RegisterContainer";
import TodoContainer from "./views/TodoContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <HeaderContainer />
            <div>
              <Route exact path="/" component={HelloWorld} />
              <Route exact path="/login" component={LoginContainer} />
              <Route exact path="/register" component={RegisterContainer} />
              <Route exact path="/todos" component={TodoContainer} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
