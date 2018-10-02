import axios from "axios";

// Action type constants
export const actionTypes = {
  LOG_OUT: "LOG_OUT",
  RECEIVE_SESSION: "RECEIVE_SESSION",
  RECEIVE_TODO: "RECEIVE_TODO",
  RECEIVE_TODOS: "RECEIVE_TODOS",
  REQUEST_TODOS: "REQUEST_TODOS"
};

// TODO: use environment variables for this instead
const apiRoot = "http://localhost:3000/api";

// Action creators
export const fetchTodos = () => {
  return dispatch => {
    dispatch(requestTodos());
    axios
      .get(`${apiRoot}/todos`)
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
      .post(`${apiRoot}/todos`, todo)
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
      .patch(`${apiRoot}/todos/${id}`, { checked: checked })
      .then(response => {
        dispatch(receiveTodo(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const logIn = params => {
  return dispatch => {
    axios
      .post(`${apiRoot}/users/login`)
      .then(response => {
        dispatch(receiveSession(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const receiveSession = data => {
  return {
    session: data,
    type: actionTypes.RECEIVE_SESSION
  };
};

export const logOut = () => {
  return {
    type: actionTypes.LOG_OUT
  };
};
