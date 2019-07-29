import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { signOut } from "./../../store/actions/authActions";

class SignedInLinks extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { props } = this;
    const { firebase } = props;
    const fireBase = {
      firebase
    };

    props.signOut(fireBase);
  };
  render() {
    return (
      <ul className="right">
        <li>
          <NavLink to="/createproject">New Item</NavLink>
        </li>
        <li>
          <a onClick={this.handleSubmit}>Log Out</a>
        </li>
        <li>
          <NavLink to="/" className="btn btn-floating pink lighten-1">
            NN
          </NavLink>
        </li>
        <li>
          <NavLink to="/" />
        </li>
      </ul>
    );
  }
}

export default compose(
  firebaseConnect(),
  connect(
    null,
    { signOut }
  )
)(SignedInLinks);
