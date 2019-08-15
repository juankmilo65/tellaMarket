import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import {
  signInWithEmailAndPassword,
  singinGmail,
  singinFacebook
} from "./actions/signinActions";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }
  return (
    <div>
      <div className="container">
        <form onSubmit={state.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">
            {t("authentication.title")}
          </h5>
          <div className="input-field">
            <label htmlFor="email">{t("authentication.login.email")}</label>
            <input type="email" id="email" onChange={state.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">
              {t("authentication.login.password")}
            </label>
            <input
              type="password"
              id="password"
              onChange={state.handleChange}
            />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">
              {t("authentication.title")}
            </button>
            <button
              onClick={state.handleGmail}
              className="btn pink lighten-1 z-depth-0"
            >
              Google
            </button>
            <a
              className="btn pink lighten-1 z-depth-0"
              onClick={state.handlePhone}
            >
              {t("authentication.phoneTitle")}
            </a>
            <button
              onClick={state.handleFacebook}
              className="btn pink lighten-1 z-depth-0"
            >
              Facebook
            </button>
            <div className="red-text center">
              {state.authMessage === "" ? null : <p>{state.authMessage}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { props, state } = this;
    const { firebase } = props;
    const credentials = { ...state };
    const authData = {
      firebase,
      credentials
    };
    props.signInWithEmailAndPassword(authData);
  };

  handleGmail = e => {
    const { props } = this;
    e.preventDefault();
    const { firebase } = props;
    const authData = {
      firebase
    };
    props.singinGmail(authData);
  };

  handleFacebook = e => {
    const { props } = this;
    e.preventDefault();
    const { firebase } = props;
    const authData = {
      firebase
    };
    props.singinFacebook(authData);
  };

  handlePhone = () => {
    this.props.history.push("/phoneAuthentication");
  };

  render() {
    const { authMessage, auth, lang } = this.props;

    if (auth.uid) return <Redirect to="/" />;
    return (
      <MyComponent
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        handleGmail={this.handleGmail}
        handlePhone={this.handlePhone}
        handleFacebook={this.handleFacebook}
        authMessage={authMessage}
        lang={lang}
      />
    );
  }
}

const mapStateToProps = state => ({
  authMessage:
    state.signin.messages.length === 0 ? "" : state.signin.messages[0].text,
  type: state.signin.messages.length === 0 ? "" : state.signin.messages[0].type,
  auth: state.firebase.auth,
  lang: state.navar.lang
});

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    { signInWithEmailAndPassword, singinGmail, singinFacebook }
  )
)(SignIn);
