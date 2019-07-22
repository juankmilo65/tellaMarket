import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { appReducer } from "./reducers/appReducer";

import { combineEpics, createEpicMiddleware } from "redux-observable";
import { fetchBeersEpic } from "./epics/fetchBeers";
import { beersReducers } from "./reducers/beersReducers";
import { configReducer } from "./reducers/configReducer";
import { accountReducers } from "./reducers/accountReducers";

export function configureStore() {
  const rootEpic = combineEpics(fetchBeersEpic); // aca iria la epica de firebase

  const epicMiddleware = createEpicMiddleware();

  const rootReducer = combineReducers({
    app: appReducer,
    beers: beersReducers,
    config: configReducer,
    account: accountReducers
  });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );

  epicMiddleware.run(rootEpic);

  return store;
}
