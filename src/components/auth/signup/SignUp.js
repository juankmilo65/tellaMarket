import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { signUpWithEmailAndPassword } from "./actions/signupActions";
import { useTranslation } from "react-i18next";
import "./singup.scss";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }

  return (
      <div className="container-login  pd-top--0">
        <form onSubmit={state.handleSubmit} className="login-form">
          {/* <h5 className="grey-text text-darken-3">{t("signup.title")}</h5> */}

          <div className="item-login--form">
            <label htmlFor="email">{t("signup.email")}</label>
            <div className="input-text input-icon">
              <i className="material-icons">person</i>
              <input type="email" id="email" onChange={state.handleChange} />
            </div>
          </div>
          <div className="item-login--form">
            <label htmlFor="password">{t("signup.password")}</label>
            <div className="input-text input-icon">
              <i className="material-icons">vpn_key</i>
              <input type="password" id="password" onChange={state.handleChange}/>
            </div>
          </div>

          <div className="item-login--form">
            <label htmlFor="firstName">{t("signup.firstName")}</label>
            <div className="input-text input-icon">
              <i className="material-icons">person</i>
              <input type="text" id="firstName" onChange={state.handleChange} />
            </div>
          </div>
          <div className="item-login--form">
           <label htmlFor="lastName">{t("signup.lastName")}</label>
            <div className="input-text input-icon">
              <i className="material-icons">person</i>
              <input type="text" id="lastName" onChange={state.handleChange} />
            </div>
          </div>
          <div className="item-login--btn justify-content-end">
            <button className="btn btn-go">
                {t("signup.title")}
              </button>
              <div className="red-text center">
                {state.authMessage ? <p>{state.authMessage}</p> : null}
              </div>
          </div>
        </form>
      </div>
  );
}

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: ""
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
    const newUser = { ...state };
    const newUserData = {
      firebase,
      newUser
    };
    props.signUpWithEmailAndPassword(newUserData);
  };
  render() {
    const { auth, authMessage, lang } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <MyComponent
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        authMessage={authMessage}
        lang={lang}
      />
    );
  }
}

const mapStateToProps = state => ({
  authMessage:
    state.signin.messages.length === 0 ? "" : state.signin.messages[0].text,
  auth: state.firebase.auth,
  lang: state.navar.lang
});

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    { signUpWithEmailAndPassword }
  )
)(SignUp);
