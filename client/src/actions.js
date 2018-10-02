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

export const logIn = user => {
  return dispatch => {
    axios
      .post(`${apiRoot}/users/login`, user)
      .then(response => {
        dispatch(receiveSession(response.data, { username: user.username }));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const receiveSession = (session, user) => {
  return {
    session,
    user,
    type: actionTypes.RECEIVE_SESSION
  };
};

export const logOut = () => {
  return {
    type: actionTypes.LOG_OUT
  };
};

export const newUser = user => {
  return dispatch => {
    axios
      .post(`${apiRoot}/users`, user)
      .then(response => {
        // upon successful user creation, redirect to login page
        // TODO: Add redirect
      })
      .catch(error => {
        console.log(error);
      });
  };
};
