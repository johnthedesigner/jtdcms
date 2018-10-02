import { logAction, reducerUtils } from "./stateUtils";
import { actionTypes } from "./actions.js";

const stateShapes = {
  collection: {
    keys: [],
    status: "pending"
  },
  list: {}
};

const initialState = {
  todosById: stateShapes.list,
  todosList: stateShapes.collection
};

function reducer(state = initialState, action) {
  // Log each action that hits the reducer
  logAction(action, state);

  switch (action.type) {
    case actionTypes.REQUEST_TODOS:
      return reducerUtils(state).markListPending("todos");

    case actionTypes.RECEIVE_TODOS:
      return reducerUtils(state).mergeKeyedList(action.todos, "todos");

    case actionTypes.RECEIVE_TODO:
      return reducerUtils(state).mergeItem(action.todo, "todos");

    default:
      return state;
  }
}

export default reducer;
