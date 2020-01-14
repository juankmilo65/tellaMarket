import React, { Component } from "react";
import { connect } from "react-redux";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Dashboard from "./dashboard/Dashboard";
import ProjectDetail from "./items/detail/itemDetail";
import AuthContainer from "./auth/authContainer";
import SignUp from "./auth/signup/SignUp";
import CreateItem from "./items/create/createItem";
import PhoneAuthentication from "./auth/phoneAuthentication/PhoneAuthentication";
import PrivacyPolicy from "./footer/privacyPolicy";
import CreateMenu from "./administration/menu/createMenu";
import Query from "./items/queryResult/queryResult";
import ItemDetail from "./items/detail/itemDetail";
import "bootstrap-4-react";
class App extends Component {
  render() {
    // const { auth } = this.props;
    //if (auth.isLoaded) {
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
            <Route path="/query" component={Query} />
            <Route path="/itemDetail/:itemId" component={ItemDetail} />
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
    //}
    //return null;
  }
}

const mapStateToProps = state => ({
  //auth: state.firebase.auth
});

export default connect(mapStateToProps)(App);
