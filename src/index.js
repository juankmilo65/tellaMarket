import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { configureStore } from "./store/configureStore";
import FirebaseConfig from "./config/FirebaseConfig";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider, authIsReady } from "react-redux-firebase";

const storeConfigured = configureStore();

const rrfConfig = {
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  userProfile: "users",
  attachAuthIsReady: false
};

const rrfProps = {
  firebase: FirebaseConfig,
  config: rrfConfig,
  dispatch: storeConfigured.dispatch,
  createFirestoreInstance // Create firestore instead of craete it in fbConfig.js
};

//authIsReady(storeConfigured).then(() => {
ReactDOM.render(
  <Provider store={storeConfigured}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
//});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
