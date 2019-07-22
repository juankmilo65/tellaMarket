import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { reduxFirestore } from "redux-firestore";
import { reactReduxFirebase } from "react-redux-firebase";
//import { authReducer } from "./reducers/authReducer";
import projectReducer from "./reducers/projectReducer";
import firebaseEpic from "./../epics/FireBaseEpics";
import FirebaseConfig from "./../config/FirebaseConfig";
//import { fetchBeersEpic } from "./../epics/fetchBeers";

export function configureStore() {
  const rootEpic = combineEpics(firebaseEpic); // aca iria la epica de firebase

  const epicMiddleware = createEpicMiddleware();
  //console.log(projectReducer);
  const rootReducer = combineReducers({
    //auth: authReducer,
    project: projectReducer
  });
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(epicMiddleware),
      reduxFirestore(FirebaseConfig),
      reactReduxFirebase(FirebaseConfig)
    )
  );

  epicMiddleware.run(rootEpic);
  return store;
}
