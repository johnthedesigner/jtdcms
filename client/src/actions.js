import axios from "axios";

// Action type constants
export const actionTypes = {
  RECEIVE_TODO: "RECEIVE_TODO",
  RECEIVE_TODOS: "RECEIVE_TODOS"
};

// API Utils
const endpoints = {
  TODOS: "http://localhost:3000/api/todos",
  TODO: id => {
    return `http://localhost:3000/api/todos/${id}`;
  }
};

// Action creators
export const fetchTodos = () => {
  return dispatch => {
    axios
      .get(endpoints.TODOS)
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

export const createTodo = todo => {
  return dispatch => {
    axios
      .post(endpoints.TODOS, todo)
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
      .patch(endpoints.TODO(id), { checked: checked })
      .then(response => {
        dispatch(receiveTodo(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};
