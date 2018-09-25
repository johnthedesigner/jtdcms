import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import _ from "lodash";

import { actionTypes } from "./actions.js";

// Reducer
function reducer(state = { todos: {} }, action) {
  console.log(action.type, action);
  switch (action.type) {
    case actionTypes.RECEIVE_TODOS:
      return Object.assign(
        {},
        {
          todos: _.keyBy(action.todos, "id")
        }
      );
    case actionTypes.RECEIVE_TODO:
      console.log(action.todo);
      return Object.assign({}, state, {
        todos: { ...state.todos, ..._.keyBy([action.todo], "id") }
      });
    default:
      return state;
  }
}

// Store
const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
