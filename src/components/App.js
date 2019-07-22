import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Dashboard from "./dashboard/Dashboard";
import ProjectDetail from "./projects/ProjectDetail";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import CreateProject from "./projects/CreateProject";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/project/:id" component={ProjectDetail} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/createproject" component={CreateProject} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(state => state)(App);
