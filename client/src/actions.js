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
export const fetchTodos = (token, accountId) => {
  return dispatch => {
    dispatch(requestTodos());
    axios
      .get(`${apiRoot}/accounts/${accountId}/todos?access_token=${token}`)
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

export const createTodo = (todo, accountId, token) => {
  return dispatch => {
    axios
      .post(
        `${apiRoot}/accounts/${accountId}/todos?access_token=${token}`,
        todo
      )
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

export const toggleTodo = (id, checked, token, accountId) => {
  return dispatch => {
    axios
      .put(
        `${apiRoot}/accounts/${accountId}/todos/${id}?access_token=${token}`,
        {
          checked: checked
        }
      )
      .then(response => {
        dispatch(receiveTodo(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const logIn = account => {
  return dispatch => {
    axios
      .post(`${apiRoot}/accounts/login?include=user`, account)
      .then(response => {
        dispatch(receiveSession(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const receiveSession = session => {
  return {
    session,
    type: actionTypes.RECEIVE_SESSION
  };
};

export const logOut = () => {
  return {
    type: actionTypes.LOG_OUT
  };
};

export const newAccount = account => {
  return dispatch => {
    axios
      .post(`${apiRoot}/accounts`, account)
      .then(response => {
        // upon successful user creation, redirect to login page
        // TODO: Add redirect
      })
      .catch(error => {
        console.log(error);
      });
  };
};
