import _ from "lodash";
import moment from "moment";

// Standardize common shapes for parts of application state
export const stateShapes = {
  collection: {
    keys: [],
    status: "pending"
  },
  list: {}
};

// Define an initial state for app boot and reset
export const initialState = {
  todosById: stateShapes.list,
  todosList: stateShapes.collection,
  session: {},
  account: {},
  status: {}
};

// Get the name of a collection based on object type
export const collectionName = objectType => {
  return `${objectType}List`;
};
// Get the name of a normalized list based on object type
export const normalizedName = objectType => {
  return `${objectType}ById`;
};

// Status types for collections and items in state
const loadingStatus = {
  PENDING: "PENDING",
  READY: "READY"
};

// Managing the user's session
export const sessionUtils = {
  loggedIn: session => {
    if (!session.id) return false;
    let sessionExpiration = moment(session.created).add(session.ttl, "s");
    let currentTime = moment();
    let ttl = sessionExpiration.unix() - currentTime.unix();
    return session.id && ttl > 0;
  }
};

// denormalize collections into component props
export const mapStateUtils = {
  getCollection: (state, objectType) => {
    return _.map(state[collectionName(objectType)].keys, key => {
      return state[normalizedName(objectType)][key];
    });
  }
};

// Log all actions that hit our reducer
export const logAction = (action, state) => {
  if (process.env.NODE_ENV === "development") {
    console.group(action.type);
    console.log(action);
    // console.log(state);
    console.groupEnd();
  }
};

// Utilities for updating state in a stadardized way
export const reducerUtils = state => {
  // Clone state and use it in our reducerUtils methods
  const newState = _.cloneDeep(state);

  return {
    // Merge a normalized list of objects by id and update a list of ids to display
    mergeCollection: (list, objectType) => {
      newState[normalizedName(objectType)] = Object.assign(
        {},
        newState[normalizedName(objectType)],
        _.keyBy(list, "id")
      );
      newState[collectionName(objectType)].keys = _.keys(
        newState[normalizedName(objectType)]
      );
      // Give a collection 'ready' status
      newState[collectionName(objectType)].status = loadingStatus.READY;
      return newState;
    },

    // Update a single item
    mergeItem: (item, objectType) => {
      newState[normalizedName(objectType)][item.id] = item;
      newState[collectionName(objectType)].keys = _.keys(
        newState[normalizedName(objectType)]
      );
      return newState;
    },

    // Initiate a new session after logAction
    newSession: session => {
      newState.session = session;
      return newState;
    },

    // log out account
    logOut: () => {
      return _.cloneDeep(initialState);
    },

    // Update a status key
    updateStatus: (key, status) => {
      newState.status[key] = status;
      return newState;
    }
  };
};
