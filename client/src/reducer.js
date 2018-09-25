import _ from "lodash";

import { actionTypes } from "./actions.js";

const initialState = {
  todosById: {},
  todoList: []
};

function reducer(state = initialState, action) {
  console.log(action.type, action);
  switch (action.type) {
    case actionTypes.RECEIVE_TODOS:
      return reducerUtils.mergeList(
        state,
        action.todos,
        "todosById",
        "todoList"
      );

    case actionTypes.RECEIVE_TODO:
      return reducerUtils.mergeItem(state, action.todo, "todosById");

    default:
      return state;
  }
}

// Utilities for merging data from API requests into the store
const reducerUtils = {
  // Merge a list of objects into the store keyed by id
  mergeList: (state, list, listKey, collectionKey) => {
    let objectToMerge = {};
    objectToMerge[listKey] = _.keyBy(list, "id");
    objectToMerge[collectionKey] = _.keys(list);
    return Object.assign({}, state, objectToMerge);
  },

  // Update a single item
  mergeItem: (state, item, listKey) => {
    let objectToMerge = {};
    objectToMerge[listKey] = Object.assign(
      {},
      state[listKey],
      _.keyBy([item], "id")
    );
    return Object.assign({}, state, objectToMerge);
  }
};

export default reducer;
