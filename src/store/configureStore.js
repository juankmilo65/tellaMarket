import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import projectReducer from "./reducers/projectReducer";
import authReducer from "./reducers/authReducer";
import itemEpics from "../epics/itemEpics";
import authEpics from "../epics/authEpics";
import FirebaseConfig from "./../config/FirebaseConfig";

export function configureStore() {
  const rootEpic = combineEpics(itemEpics, authEpics);

  const epicMiddleware = createEpicMiddleware();
  const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
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
