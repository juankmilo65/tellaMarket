import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import {
  phoneAuthentication,
  codeAuthentication
} from "../phoneAuthentication/actions/phoneAuthenticationActions";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }
  if (state.confirmResult === null) {
    return (
      <div>
        <div>
          <form onSubmit={state.handlePhoneAuthentication}>
            <div className="group">
              <input
                type="text"
                id="phoneNumber"
                onChange={state.handleChange}
                required
              />
              <span className="bar" />
              <label />
            </div>
            <button className="btns btn-go">
              {t("authentication.phone.requestCode")}
            </button>
            <p id="recaptcha-container" />
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <form onSubmit={state.handleCodeAuthentication}>
          <div className="group">
            <input
              type="text"
              id="codeInput"
              onChange={state.handleChange}
              required
            />
            <span className="bar" />
            <label>{t("authentication.phone.code")}</label>
          </div>
          <button className="btns btn-go">
            {t("authentication.phone.login")}
          </button>
        </form>
      </div>
    );
  }
}

class PhoneAuthentication extends Component {
  state = {
    user: null,
    message: "",
    codeInput: "",
    phoneNumber: "+7", //9150245986
    confirmResult: null
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handlePhoneAuthentication = e => {
    const { props, state } = this;
    e.preventDefault();
    const { firebase } = props;
    const data = { ...state };
    const appVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container"
    );
    const recoveryData = {
      firebase,
      data,
      appVerifier
    };
    props.phoneAuthentication(recoveryData);
  };

  handleCodeAuthentication = e => {
    const { props, state } = this;
    e.preventDefault();
    const { firebase, confirmResult } = props;
    const data = { ...state };

    const recoveryData = {
      firebase,
      confirmResult,
      data
    };
    props.codeAuthentication(recoveryData);
  };

  render() {
    const { auth, lang, confirmResult } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <MyComponent
        handlePhoneAuthentication={this.handlePhoneAuthentication}
        handleCodeAuthentication={this.handleCodeAuthentication}
        handleChange={this.handleChange}
        lang={lang}
        confirmResult={confirmResult}
      />
    );
  }
}

const mapStateToProps = state => ({
  authMessage:
    state.signin.messages.length === 0 ? "" : state.signin.messages[0].text,
  type: state.signin.messages.length === 0 ? "" : state.signin.messages[0].type,
  auth: state.firebase.auth,
  confirmResult: state.phoneAuthentication.confirmResult,
  lang: state.navar.lang,
  confirmResult: state.phoneAuthentication.confirmResult
});

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    { phoneAuthentication, codeAuthentication }
  )
)(PhoneAuthentication);
