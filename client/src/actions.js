import axios from "axios";

// Action type constants
export const actionTypes = {
  HANDLE_ERROR: "HANDLE_ERROR",
  LOG_OUT: "LOG_OUT",
  RECEIVE_SESSION: "RECEIVE_SESSION",
  RECEIVE_TODO: "RECEIVE_TODO",
  RECEIVE_TODOS: "RECEIVE_TODOS",
  REQUEST_TODOS: "REQUEST_TODOS",
  STATUS_UPDATE: "STATUS_UPDATE"
};

export const requestStatusTypes = {
  CREATING_ACCOUNT: "CREATING_ACCOUNT",
  CREATING_TODO: "CREATING_TODO",
  LOADING_TODOS: "LOADING_TODOS",
  LOGGING_IN: "LOGGING_IN",
  TOGGLING_TODO: "TOGGLING_TODO"
};

// TODO: use environment variables for this instead
const apiRoot = "http://localhost:3000/api";

// Action creators
export const fetchTodos = (token, accountId) => {
  return dispatch => {
    dispatch(updateStatus(requestStatusTypes.LOADING_TODOS, true));
    axios
      .get(`${apiRoot}/accounts/${accountId}/todos?access_token=${token}`)
      .then(response => {
        dispatch(receiveTodos(response.data));
        dispatch(updateStatus(requestStatusTypes.LOADING_TODOS, false));
      })
      .catch(error => {
        dispatch(handleError(requestStatusTypes.LOADING_TODOS, error));
        dispatch(updateStatus(requestStatusTypes.LOADING_TODOS, false));
      });
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
    dispatch(updateStatus(requestStatusTypes.CREATING_TODO, true));
    axios
      .post(
        `${apiRoot}/accounts/${accountId}/todos?access_token=${token}`,
        todo
      )
      .then(response => {
        dispatch(receiveTodo(response.data));
        dispatch(updateStatus(requestStatusTypes.CREATING_TODO, false));
      })
      .catch(error => {
        dispatch(handleError(requestStatusTypes.CREATING_TODO, error));
        dispatch(updateStatus(requestStatusTypes.CREATING_TODO, false));
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
    dispatch(updateStatus(requestStatusTypes.TOGGLING_TODO, true));
    axios
      .put(
        `${apiRoot}/accounts/${accountId}/todos/${id}?access_token=${token}`,
        {
          checked: checked
        }
      )
      .then(response => {
        dispatch(receiveTodo(response.data));
        dispatch(updateStatus(requestStatusTypes.TOGGLING_TODO, false));
      })
      .catch(error => {
        dispatch(handleError(requestStatusTypes.TOGGLING_TODO, error));
        dispatch(updateStatus(requestStatusTypes.TOGGLING_TODO, false));
      });
  };
};

export const logIn = account => {
  return dispatch => {
    dispatch(updateStatus(requestStatusTypes.LOGGING_IN, true));
    axios
      .post(`${apiRoot}/accounts/login?include=user`, account)
      .then(response => {
        dispatch(receiveSession(response.data));
        dispatch(updateStatus(requestStatusTypes.LOGGING_IN, false));
      })
      .catch(error => {
        dispatch(handleError(requestStatusTypes.LOGGING_IN, error));
        dispatch(updateStatus(requestStatusTypes.LOGGING_IN, false));
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
    dispatch(updateStatus(requestStatusTypes.CREATING_ACCOUNT, true));
    axios
      .post(`${apiRoot}/accounts`, account)
      .then(response => {
        // upon successful user creation, redirect to login page
        // TODO: Add redirect
        dispatch(updateStatus(requestStatusTypes.CREATING_ACCOUNT, false));
      })
      .catch(error => {
        dispatch(handleError(requestStatusTypes.CREATING_ACCOUNT, error));
        dispatch(updateStatus(requestStatusTypes.CREATING_ACCOUNT, false));
      });
  };
};

export const updateStatus = (key, status) => {
  return {
    type: actionTypes.STATUS_UPDATE,
    key,
    status
  };
};

export const handleError = (actionType, error) => {
  const response = error.response ? error.response : null;

  return dispatch => {
    if (response) {
      console.log(response.status);

      // If we get an unauthorized error, reset the session
      switch (response.code) {
        case 401:
          dispatch(logOut());
          break;

        default:
          return true;
      }
    }
  };
};
