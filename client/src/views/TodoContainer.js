import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

import { fetchTodos, createTodo, toggleTodo } from "../actions.js";

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
    this.props.fetchTodos();
  }

  addTodo() {
    this.props.createTodo({ name: this.state.newTodoInput });
    this.setState({ newTodoInput: "" });
  }

  handleTodoInput(e) {
    this.setState({
      newTodoInput: e.target.value
    });
  }

  render() {
    const { todosById } = this.props;

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
        <div>
          <p>
            <Link to="/">Back to Hello World</Link>
          </p>
        </div>
        <div>
          <input
            type="text"
            onChange={this.handleTodoInput}
            value={this.state.newTodoInput}
          />
        </div>
        <div>
          <button onClick={this.addTodo}>Add Todo</button>
        </div>
        {_.map(todosById, todo => {
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
  todosById: PropTypes.object.isRequired
};

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    todosById: state.todosById
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    createTodo: todo => dispatch(createTodo(todo)),
    fetchTodos: () => dispatch(fetchTodos()),
    toggleTodo: (id, checked) => dispatch(toggleTodo(id, checked))
  };
}

// Connected Component
const TodoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default TodoContainer;
