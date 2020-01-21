import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import google from "../../../images/google.svg";
import facebook from "../../../images/facebook.svg";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { hideHeader } from "../../layout/actions/navarActions";
import {
  signInWithEmailAndPassword,
  singinSocial
} from "./actions/signinActions";
import { socialAuth } from "../../../config/constants";

import "./signin.scss";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }
  return (
    <div className="container-login pd-top--0">
      <form onSubmit={state.handleSubmit} className="login-form">
        <div className="item-login--form m-0">
          <label htmlFor="email">{t("authentication.login.email")}</label>
          <div className="input-text input-icon">
            <i className="material-icons">person</i>
            <input type="email" id="email" onChange={state.handleChange} />
          </div>
        </div>
        <div className="item-login--form">
          <label htmlFor="password">{t("authentication.login.password")}</label>
          <div className="input-text input-icon">
            <i className="material-icons">vpn_key</i>
            <input
              type="password"
              id="password"
              onChange={state.handleChange}
            />
          </div>
        </div>
        <div className="item-login--btn">
          <a href="/">¿Olvidaste tu contraseña?</a>
          <button className="btns btn-go">Iniciar sesión</button>
        </div>
      </form>
      <div className="type-login">
        {state.fbContent}
        {state.googleConnect}
        <button className="btn-networks phone" onClick={state.handlePhone}>
          <i className="material-icons">phone_iphone</i>
          {t("authentication.phoneTitle")}
        </button>
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
    password: "",
    user: {},
    disabled: "",
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: ""
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

  handlePhone = () => {
    //    this.props.history.push("/phoneAuthentication");
  };

  componentClicked = () => {
    console.log("clicked");
  };

  responseFacebook = response => {
    if (response.status != undefined || response.status != "unknown") {
      const { singinSocial, country } = this.props;
      var profile = {
        Name: response.name,
        Provider: "Facebook",
        ProviderId: response.id,
        Photo: response.picture.data.url,
        LastLogin: new Date(),
        Country: country,
        Email: response.email,
        User: response.userID,
        AccessToken: response.accessToken,
        Password: "N/A",
        Initials:
          response.name.split(" ")[0].charAt(0) +
          response.name.split(" ")[1].charAt(0)
      };
      singinSocial(profile);
    }
  };

  responseGoogle = response => {
    const { singinSocial, country } = this.props;
    var profile = {
      Name: response.profileObj.name,
      Provider: "Google",
      ProviderId: response.profileObj.googleId,
      Photo: response.profileObj.imageUrl,
      LastLogin: new Date(),
      Country: country,
      Email: response.profileObj.email,
      User: response.El,
      AccessToken: response.accessToken,
      Password: "N/A",
      Initials:
        response.profileObj.name.split(" ")[0].charAt(0) +
        response.profileObj.name.split(" ")[1].charAt(0)
    };
    singinSocial(profile);
  };

  render() {
    const { authMessage, auth, lang, header, hideHeader } = this.props;
    const images = [facebook, google];
    let fbContent;
    let googleConnect;

    fbContent = (
      <FacebookLogin
        appId={socialAuth.facebookApplicationId}
        autoLoad={false}
        callback={this.responseFacebook}
        fields="name,email,picture"
        cssClass="btn-networks facebook"
        icon="fa-facebook-official"
        textButton=".  Facebook"
      />
    );
    googleConnect = (
      <GoogleLogin
        clientId={socialAuth.googleApplicationId}
        render={renderProps => (
          <button
            className="btn-networks google"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <img src={images[1]} alt="Tella Market" /> <span>Google</span>
          </button>
        )}
        buttonText="Login"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    );

    if (auth != null && auth.User && header.isFomSignin === false) {
      const header = {
        isFomSignin: true,
        hideHeader: false
      };

      hideHeader(header);
    }

    if (auth != null && auth.User) return <Redirect to="/" />;
    return (
      <MyComponent
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        handleGmail={this.handleGmail}
        handlePhone={this.handlePhone}
        handleFacebook={this.handleFacebook}
        authMessage={authMessage}
        lang={lang}
        fbContent={fbContent}
        googleConnect={googleConnect}
      />
    );
  }
}

const mapStateToProps = state => ({
  authMessage:
    state.signin.messages.length === 0 ? "" : state.signin.messages[0].text,
  type: state.signin.messages.length === 0 ? "" : state.signin.messages[0].type,
  lang: state.navar.lang,
  header: state.navar.header,
  auth: state.signin.auth,
  country: state.navar.country
});

export default connect(mapStateToProps, {
  signInWithEmailAndPassword,
  singinSocial,
  hideHeader
})(SignIn);
