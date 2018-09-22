import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";
import axios from "axios";
import "./index.css";
// import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import _ from "lodash";

// React component
class TodoList extends React.Component {
  componentDidMount() {
    this.props.fetchTodos();
  }

  render() {
    const { todos } = this.props;
    return (
      <div>
        {_.map(todos, (todo, index) => {
          return <p key={index}>{todo.name}</p>;
        })}
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired
};

// Actions
const actionTypes = {
  RECEIVE_TODOS: "RECEIVE_TODOS"
};
const fetchTodos = () => {
  return dispatch => {
    axios
      .get("http://localhost:3000/api/todos")
      .then(response => {
        dispatch(receiveTodos(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};
const receiveTodos = data => {
  return {
    todos: data,
    type: actionTypes.RECEIVE_TODOS
  };
};

// Reducer
function reducer(state = { todos: [] }, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_TODOS:
      return Object.assign(
        {},
        {
          todos: action.todos
        }
      );
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
    fetchTodos: () => dispatch(fetchTodos())
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
