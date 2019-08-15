import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { configureStore } from "./store/configureStore";
import FirebaseConfig from "./config/FirebaseConfig";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import "./i18n";

const storeConfigured = configureStore();

const rrfConfig = {
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  userProfile: "users",
  attachAuthIsReady: true
};

const rrfProps = {
  firebase: FirebaseConfig,
  config: rrfConfig,
  dispatch: storeConfigured.dispatch,
  createFirestoreInstance // Create firestore instead of craete it in fbConfig.js
};

ReactDOM.render(
  <Provider store={storeConfigured}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Suspense fallback="loading">
        <App />
      </Suspense>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
