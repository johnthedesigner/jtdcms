import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";

import ConditionalRedirect from "../ConditionalRedirect";
import { mapStateUtils, sessionUtils } from "../stateUtils";
import {
  fetchTodos,
  createTodo,
  requestStatusTypes,
  toggleTodo
} from "../actions.js";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodoInput: ""
    };
    this.addTodo = this.addTodo.bind(this);
    this.handleTodoInput = this.handleTodoInput.bind(this);
  }

  componentDidMount() {
    // If the user is authenticated, fetch the user's todos
    let { accountId, fetchTodos, token } = this.props;
    if (token && accountId) fetchTodos(token, accountId);
  }

  addTodo(e) {
    e.preventDefault();
    this.props.createTodo(
      { name: this.state.newTodoInput, accountId: this.props.accountId },
      this.props.accountId,
      this.props.token
    );
    this.setState({ newTodoInput: "" });
  }

  handleTodoInput(e) {
    this.setState({
      newTodoInput: e.target.value
    });
  }

  render() {
    const TodoItem = props => {
      let { checked, id, name } = props.todo;
      const itemStyles = checked ? { textDecoration: "line-through" } : null;
      return (
        <label style={itemStyles}>
          <input
            className={checked ? "checked" : "unchecked"}
            type="checkbox"
            checked={checked}
            onChange={() =>
              this.props.toggleTodo(
                id,
                !checked,
                this.props.token,
                this.props.accountId
              )
            }
          />
          <span>{name}</span>
        </label>
      );
    };

    return (
      <div>
        <ConditionalRedirect
          condition={!sessionUtils.loggedIn(this.props.session)}
          redirectTo="/login"
        />
        <div>
          <button
            onClick={() =>
              this.props.fetchTodos(this.props.token, this.props.accountId)
            }
            disabled={this.props.status[requestStatusTypes.LOADING_TODOS]}
          >
            Fetch Todos
          </button>
        </div>
        <form
          onSubmit={this.addTodo}
          disabled={this.props.status[requestStatusTypes.LOADING_TODOS]}
        >
          <div>
            <input
              type="text"
              onChange={this.handleTodoInput}
              value={this.state.newTodoInput}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={this.props.status[requestStatusTypes.CREATING_TODO]}
            >
              Add Todo
            </button>
          </div>
        </form>
        {_.map(this.props.todos, todo => {
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
  session: PropTypes.object,
  todos: PropTypes.array.isRequired,
  token: PropTypes.string,
  accountId: PropTypes.string,
  status: PropTypes.object
};

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    session: state.session,
    todos: mapStateUtils.getCollection(state, "todos"),
    token: state.session.id,
    accountId: state.session.userId,
    status: state.status
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    createTodo: (todo, accountId, token) =>
      dispatch(createTodo(todo, accountId, token)),
    fetchTodos: (token, accountId) => dispatch(fetchTodos(token, accountId)),
    toggleTodo: (id, checked, token, accountId) =>
      dispatch(toggleTodo(id, checked, token, accountId))
  };
}

// Connected Component
const TodoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default TodoContainer;
