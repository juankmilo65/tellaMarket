import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
//import signinReducer from "../components/auth/signin/reducers/signinReducers";
import signoutReducer from "../components/auth/signout/reducers/signoutReducers";
import signupReducer from "../components/auth/signup/reducers/signupReducers";
import listItemReducer from "../components/items/list/reducers/listItemReducers";
import navarReducer from "../components/layout/reducers/navarReducers";
import phoneAuthenticationReducer from "../components/auth/phoneAuthentication/reducers/phoneAuthenticationReducers";
import fileUploadReducers from "../components/commons/fileUpload/reducers/fileReducers";
import frameReducers from "../components/auth/frame/reducers/frameReducers";
import createmenuReducers from "../components/administration/menu/reducers/CreatemenuReducers";
import dataReducers from "../components/commons/data/reducers/dataReducers";
import stepReducer from "../components/items/steps/reducer/stepsReducers";
import controlDataItemReducers from "../components/items/controlDataItem/reducer/controlDataItemReducers";
import dashboardReducers from "../components/dashboard/reducers/dashboardReducers";
import queryResultReducers from "../components/items/queryResult/reducers/queryResultReducers";
import selectReducers from "../components/commons/select/reducers/selectReducers";
import categoriesReducers from "../components/commons/select/reducers/categoriesReducers";
import currencyReducers from "../components/commons/select/reducers/currencyReducers";
import ratesReducers from "../components/commons/select/reducers/ratesReducers";
import itemDetailReducers from "../components/items/detail/reducers/itemDetailReducers";
//import signinEpics from "../components/auth/signin/epics/signinEpics";
import signoutEpics from "../components/auth/signout/epics/signoutEpics";
import signupEpics from "../components/auth/signup/epics/signupEpics";
import navarEpics from "../components/layout/epics/navarEpics";
import phoneAuthenticationEpics from "../components/auth/phoneAuthentication/epics/phoneAuthenticationEpics";
import fileUploadEpics from "../components/commons/fileUpload/epics/fileUploadEpics";
import frameEpics from "../components/auth/frame/epics/frameEpics";
import createMenuEpics from "../components/administration/menu/epics/createMenuEpics";
import dataEpics from "../components/commons/data/epics/dataEpics";
import stepEpics from "../components/items/steps/epics/stepsEpics";
import controlDataItemEpics from "../components/items/controlDataItem/epics/controlDataItemEpics";
import dashboardEpics from "../components/dashboard/epics/dashboardEpics";
import queryResultEpics from "../components/items/queryResult/epics/queryResultEpics";
import selectEpics from "../components/commons/select/epics/selectEpics";
import categoriesEpics from "../components/commons/select/epics/categoriesEpics";
import currencyEpics from "../components/commons/select/epics/currencyEpics";
import rateEpics from "../components/commons/select/epics/ratesEpics";
import itemDetailsEpics from "../components/items/detail/epics/itemDetailEpics";
import FirebaseConfig from "./../config/FirebaseConfig";

export function configureStore() {
  const rootEpic = combineEpics(
    // signinEpics,
    signoutEpics,
    signupEpics,
    navarEpics,
    phoneAuthenticationEpics,
    fileUploadEpics,
    frameEpics,
    createMenuEpics,
    dataEpics,
    stepEpics,
    controlDataItemEpics,
    dashboardEpics,
    queryResultEpics,
    selectEpics,
    categoriesEpics,
    currencyEpics,
    rateEpics,
    itemDetailsEpics
  );

  const epicMiddleware = createEpicMiddleware();
  const rootReducer = combineReducers({
    //signin: signinReducer,
    signout: signoutReducer,
    signup: signupReducer,
    listItems: listItemReducer,
    navar: navarReducer,
    phoneAuthentication: phoneAuthenticationReducer,
    fileUpload: fileUploadReducers,
    frame: frameReducers,
    createmenu: createmenuReducers,
    data: dataReducers,
    step: stepReducer,
    dataItem: controlDataItemReducers,
    dashboard: dashboardReducers,
    queryResult: queryResultReducers,
    select: selectReducers,
    categories: categoriesReducers,
    currency: currencyReducers,
    rate: ratesReducers,
    itemDetail: itemDetailReducers
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
