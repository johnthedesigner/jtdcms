import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
  }

  handleTodoInput(e) {
    this.setState({
      newTodoInput: e.target.value
    });
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

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    todos: state.todos
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
