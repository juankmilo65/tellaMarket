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
import "./signin.scss";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }
  return (
    <div className="container-login">
      <div className="logo">
      </div>
      <div className="tab-login">
        <a href="#" className="item-login--active">Iniciar Sesión</a>
        <a href="#" className="item-login--inactive">Crear Cuenta</a>
      </div>
        <form onSubmit={state.handleSubmit} className="login-form">
          {/* <h5 className=""> 
            {t("authentication.title")}
          </h5> */}
          <div className="item-login--form">
            <label htmlFor="email">{t("authentication.login.email")}</label>
            <div className="input-text input-icon">
              <i class="material-icons">person</i><input type="email" id="email" onChange={state.handleChange} />
            </div>
          </div>
          <div className="item-login--form">
            <label htmlFor="password">
              {t("authentication.login.password")}
            </label>
            <div className="input-text input-icon">
              <i class="material-icons">vpn_key</i>
              <input type="password" id="password" onChange={state.handleChange}/>
            </div>
          </div>
          <div className="item-login--btn">
            <span>¿Olvidaste tu contraseña?</span>
            <a href="" className="btn btn-go">Iniciar sesión</a>
          </div>
        </form>
        <div className="type-login">
          <a className="btn-networks facebook" onClick={state.handleFacebook}>
            Facebook
          </a>
          <a className="btn-networks google" onClick={state.handleGmail}>
            Google
          </a>
          <a className="btn-networks phone" onClick={state.handlePhone}>
            <i class="material-icons">phone_iphone</i>
            {t("authentication.phoneTitle")}
          </a>
          {/* <div className="">
              {state.authMessage === "" ? null : <p>{state.authMessage}</p>}
          </div> */}
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
