import _ from "lodash";
import moment from "moment";

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
    let sessionExpiration = moment(session.created).add(session.ttl, "s");
    let currentTime = moment();
    let ttl = sessionExpiration.unix() - currentTime.unix();
    return session.id && ttl > 0;
  }
};

// Utilities for updating state in a stadardized way
export const reducerUtils = state => {
  // Clone state and use it in our reducerUtils methods
  const newState = _.cloneDeep(state);

  return {
    // Give a collection pending status
    markItemPending: (id, objectType) => {
      newState[normalizedName(objectType)][id] = Object.assign(
        {},
        newState[normalizedName(objectType)][id],
        { status: loadingStatus.PENDING }
      );
      return newState;
    },

    // Give a collection pending status
    markListPending: objectType => {
      newState[collectionName(objectType)].status = loadingStatus.PENDING;
      return newState;
    },

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
    newSession: (session, user) => {
      newState.session = session;
      newState.user = user;
      return newState;
    },

    // log out user
    logOut: () => {
      newState.session = {};
      newState.user = {};
      return newState;
    }
  };
};

export const mapStateUtils = {
  getCollection: (state, objectType) => {
    return _.map(state[collectionName(objectType)].keys, key => {
      return state[normalizedName(objectType)][key];
    });
  }
};

// Log all actions that hit our reducer
export const logAction = (action, state) => {
  console.group(action.type);
  console.log(action);
  // console.log(state);
  console.groupEnd();
};
