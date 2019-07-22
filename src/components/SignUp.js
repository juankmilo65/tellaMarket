import React from "react";
import { singup } from "./../reducers/accountActions";
import { withRouter } from "react-router";
import { connect } from "react-redux";

export function SingUp(props) {
  console.log("entro a singup");
  const { singup } = props;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3">
          <h1>Sign up</h1>
          <form onSubmit={singup}>
            <div className="form-group">
              <input
                className="form-control no-border"
                name="email"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control no-border"
                name="password"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="form-group">
              <button className="butn btn-primary col-sm-12" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default connect(
  state => state.account,
  { singup }
)(SingUp);
