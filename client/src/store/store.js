import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userReducer,
  allUserReducer,
  userDetailsReducer,
  profileReducer,
} from "../reducers/userReducer.js";
const reducer = combineReducers({
  user: userReducer,
  allUsers: allUserReducer,
  userDetails: userDetailsReducer,
  profile: profileReducer,
});

const middleware = [thunk];
let initalState = {};

const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
