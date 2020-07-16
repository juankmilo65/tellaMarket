import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { configureStore } from "./store/configureStore";
import { ApolloProvider } from '@apollo/client';
import apolloClient from './config/ApolloSetup'
import "./i18n";

const storeConfigured = configureStore();


ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Provider store={storeConfigured}>
      <Suspense fallback="loading">
        <App />
      </Suspense>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
