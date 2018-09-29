import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

import { fetchTodos, createTodo, toggleTodo } from "../actions.js";

const TodoItem = props => {
  let { checked, id, name } = props.todo;
  const itemStyles = checked ? { textDecoration: "line-through" } : null;
  return (
    <label style={itemStyles}>
      <input
        className={checked ? "checked" : "unchecked"}
        type="checkbox"
        checked={checked}
        onChange={() => props.toggleTodo(id, !checked)}
      />
      <span>{name}</span>
    </label>
  );
};

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

  shouldComponentUpdate(nextProps) {
    console.log("nextProps: ", nextProps);
    return true;
  }

  addTodo(e) {
    e.preventDefault();
    this.props.createTodo({ name: this.state.newTodoInput });
    this.setState({ newTodoInput: "" });
  }

  handleTodoInput(e) {
    this.setState({
      newTodoInput: e.target.value
    });
  }

  render() {
    console.log("render TodoContainer");

    return (
      <div>
        <div>
          <p>
            <Link to="/">Back to Hello World</Link>
          </p>
        </div>
        <div>
          <button onClick={this.props.fetchTodos}>Fetch Todos</button>
        </div>
        <form onSubmit={this.addTodo}>
          <div>
            <input
              type="text"
              onChange={this.handleTodoInput}
              value={this.state.newTodoInput}
            />
          </div>
          <div>
            <button type="submit">Add Todo</button>
          </div>
        </form>
        {_.map(this.props.todosById, todo => {
          return (
            <div key={todo.id}>
              <TodoItem todo={todo} toggleTodo={this.props.toggleTodo} />
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
  console.log("mapStateToProps", state);
  return {
    todosById: _.cloneDeep(state.todosById)
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
