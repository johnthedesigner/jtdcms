import axios from "axios";

// Action type constants
export const actionTypes = {
  RECEIVE_TODO: "RECEIVE_TODO",
  RECEIVE_TODOS: "RECEIVE_TODOS",
  REQUEST_TODOS: "REQUEST_TODOS"
};

// Action creators
export const fetchTodos = () => {
  return dispatch => {
    dispatch(requestTodos());
    axios
      .get("http://localhost:3000/api/todos")
      .then(response => dispatch(receiveTodos(response.data)))
      .catch(error => console.log(error));
  };
};

const requestTodos = () => {
  return {
    type: actionTypes.REQUEST_TODOS
  };
};

const receiveTodos = data => {
  return {
    todos: data,
    type: actionTypes.RECEIVE_TODOS
  };
};

export const createTodo = todo => {
  return dispatch => {
    axios
      .post("http://localhost:3000/api/todos", todo)
      .then(response => {
        dispatch(receiveTodo(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

const receiveTodo = data => {
  return {
    todo: data,
    type: actionTypes.RECEIVE_TODO
  };
};

export const toggleTodo = (id, checked) => {
  return dispatch => {
    axios
      .patch(`http://localhost:3000/api/todos/${id}`, { checked: checked })
      .then(response => {
        dispatch(receiveTodo(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};
