import _ from "lodash";

import { actionTypes } from "./actions.js";

const initialState = {
  todosById: {},
  todoList: []
};

function reducer(state = initialState, action) {
  console.log(action.type, action, state);

  switch (action.type) {
    case actionTypes.RECEIVE_TODOS:
      return reducerUtils(state).mergeKeyedList(action.todos, "todosById");

    case actionTypes.RECEIVE_TODO:
      return reducerUtils(state).mergeItem(action.todo, "todosById");

    default:
      return state;
  }
}

// Utilities for updating state without passing in state each time
const reducerUtils = state => {
  return {
    // Merge a list of objects into the store keyed by id
    mergeKeyedList: (list, listKey) => {
      let mergeListState = Object.assign({}, state);
      let updatedList = Object.assign(
        {},
        mergeListState[listKey],
        _.keyBy(list, "id")
      );
      mergeListState[listKey] = updatedList;
      return mergeListState;
    },

    // Update a single item
    mergeItem: (item, listKey) => {
      let mergeItemState = Object.assign({}, state);
      mergeItemState[listKey][item.id] = item;
      return mergeItemState;
    }
  };
};

export default reducer;
