import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import signinReducer from "../components/auth/signin/reducers/signinReducers";
import signoutReducer from "../components/auth/signout/reducers/signoutReducers";
import signupReducer from "../components/auth/signup/reducers/signupReducers";
import createItemReducers from "../components/items/create/reducers/createItemReducers";
import listItemReducer from "../components/items/list/reducers/listItemReducers";
import navarReducer from "../components/layout/reducers/navarReducers";
import phoneAuthenticationReducer from "../components/auth/phoneAuthentication/reducers/phoneAuthenticationReducers";
import fileUploadReducers from "../components/commons/fileUpload/reducers/fileReducers";
import cardReducers from "../components/commons/carusel/reducers/cardReducers";
import createItemEpics from "../components/items/create/epics/createItemEpics";
import signinEpics from "../components/auth/signin/epics/signinEpics";
import signoutEpics from "../components/auth/signout/epics/signoutEpics";
import signupEpics from "../components/auth/signup/epics/signupEpics";
import navarEpics from "../components/layout/epics/navarEpics";
import phoneAuthenticationEpics from "../components/auth/phoneAuthentication/epics/phoneAuthenticationEpics";
import fileUploadEpics from "../components/commons/fileUpload/epics/fileUploadEpics";
import cardEpics from "../components/commons/carusel/epics/cardEpics";

import FirebaseConfig from "./../config/FirebaseConfig";

export function configureStore() {
  const rootEpic = combineEpics(
    createItemEpics,
    signinEpics,
    signoutEpics,
    signupEpics,
    navarEpics,
    phoneAuthenticationEpics,
    fileUploadEpics,
    cardEpics
  );

  const epicMiddleware = createEpicMiddleware();
  const rootReducer = combineReducers({
    signin: signinReducer,
    signout: signoutReducer,
    signup: signupReducer,
    createItem: createItemReducers,
    listItems: listItemReducer,
    navar: navarReducer,
    phoneAuthentication: phoneAuthenticationReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    fileUpload: fileUploadReducers,
    card: cardReducers
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
