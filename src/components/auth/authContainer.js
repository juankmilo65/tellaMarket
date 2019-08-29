import React, { Component } from "react";
import { connect } from "react-redux";
import FrameAuth from "./frame/FrameAuth";
import SignUp from "./signup/SignUp";
import SignIn from "./signin/SignIn";

class AuthContainer extends Component {
  render() {
    const { isLogin } = this.props;
    return (
      <div>
        <FrameAuth />
        {isLogin ? <SignIn /> : <SignUp />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogin: state.frame.isLogin
});

export default connect(
  mapStateToProps,
  null
)(AuthContainer);
