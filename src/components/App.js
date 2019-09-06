import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Dashboard from "./dashboard/Dashboard";
import ProjectDetail from "./items/detail/itemDetail";
import AuthContainer from "./auth/AuthContainer";
import SignUp from "./auth/signup/SignUp";
import CreateItem from "./items/create/createItem";
import PhoneAuthentication from "./auth/phoneAuthentication/PhoneAuthentication";
import PrivacyPolicy from "./footer/privacyPolicy";
import CreateMenu from "./administration/menu/createMenu";
import "bootstrap-4-react";

class App extends Component {
  render() {
    const { auth } = this.props;
    if (auth.isLoaded) {
      return (
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/project/:id" component={ProjectDetail} />
              <Route path="/signin" component={AuthContainer} />
              <Route path="/signup" component={SignUp} />
              <Route path="/createItem" component={CreateItem} />
              <Route path="/createMenu" component={CreateMenu} />
              <Route
                exact
                path="/phoneAuthentication"
                component={PhoneAuthentication}
              />
              <Route exact path="/privacyPolicy" component={PrivacyPolicy} />
            </Switch>
          </div>
        </BrowserRouter>
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(App);
