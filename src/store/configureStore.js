import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

//import { authReducer } from "./reducers/authReducer";
import projectReducer from "./reducers/projectReducer";
import firebaseEpic from "./../epics/FireBaseEpics";
import FirebaseConfig from "./../config/FirebaseConfig";

export function configureStore() {
  const rootEpic = combineEpics(firebaseEpic);

  const epicMiddleware = createEpicMiddleware();
  const rootReducer = combineReducers({
    //auth: authReducer,
    project: projectReducer,
    firestore: firestoreReducer
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
