import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";
import "./index.css";
// import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import _ from "lodash";

import { actionTypes, fetchTodos, createTodo, toggleTodo } from "./actions.js";

// React component
class TodoList extends React.Component {
  componentDidMount() {
    this.props.fetchTodos();
  }

  render() {
    const { todos } = this.props;

    const TodoItem = props => {
      let { checked, id, name } = props.todo;
      const itemStyles = checked ? { textDecoration: "line-through" } : null;
      return (
        <label style={itemStyles}>
          <input
            className={checked ? "checked" : "unchecked"}
            type="checkbox"
            checked={checked}
            onChange={() => this.props.toggleTodo(id, !checked)}
          />
          <span>{name}</span>
        </label>
      );
    };

    return (
      <div>
        {_.map(todos, todo => {
          return (
            <div key={todo.id}>
              <TodoItem todo={todo} />
            </div>
          );
        })}
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.object.isRequired
};

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

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    fetchTodos: () => dispatch(fetchTodos()),
    toggleTodo: (id, checked) => dispatch(toggleTodo(id, checked))
  };
}

// Connected Component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
