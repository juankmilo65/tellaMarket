import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import signinReducer from "../components/auth/signin/reducers/signinReducers";
import signoutReducer from "../components/auth/signout/reducers/signoutReducers";
import signupReducer from "../components/auth/signup/reducers/signupReducers";
import createItemReducers from "../components/items/create/reducers/createItemReducers";
import listItemReducer from "../components/items/list/reducers/listItemReducers";
import createItemEpics from "../components/items/create/epics/createItemEpics";
import signinEpics from "../components/auth/signin/epics/signinEpics";
import signoutEpics from "../components/auth/signout/epics/signoutEpics";
import signupEpics from "../components/auth/signup/epics/signupEpics";

import FirebaseConfig from "./../config/FirebaseConfig";

export function configureStore() {
  const rootEpic = combineEpics(
    createItemEpics,
    signinEpics,
    signoutEpics,
    signupEpics
  );

  const epicMiddleware = createEpicMiddleware();
  const rootReducer = combineReducers({
    signin: signinReducer,
    signout: signoutReducer,
    signup: signupReducer,
    createItem: createItemReducers,
    listItems: listItemReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
  });
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(epicMiddleware),
      reduxFirestore(FirebaseConfig)
    )
  );

  epicMiddleware.run(rootEpic);
  return store;
}
