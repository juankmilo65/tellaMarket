import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import Spinner from "../../commons/spinner/Spinner";
import google from "../../../images/google.svg";
import facebook from "../../../images/facebook.svg";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { hideHeader } from "../../layout/actions/navarActions";
import {
  signInWithEmailAndPassword,
  singinSocial,
  cleanMessage
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
      {state.loading ? <Spinner /> : null}
      <form onSubmit={state.handleSubmit} className="login-form">
        <div className="item-login--form m-0">
          <label htmlFor="email">{t("authentication.login.email")}</label>
          <div className="input-text input-icon">
            <i className="material-icons">person</i>
            <input type="email" id="email" onChange={state.handleChange} />
          </div>
          <div className="error">
            {state.authMessage === "" ? null : (
              <p>{t("messages.errorLogin")}</p>
            )}
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
          {/*   <a href="/">¿Olvidaste tu contraseña?</a>*/}
          <button className="btns btn-go">{t("authentication.title")}</button>
        </div>
      </form>
      <div className="type-login">
        {state.fbContent}
        {state.googleConnect}
        {/* <button className="btn-networks phone" onClick={state.handlePhone}>
          <i className="material-icons">phone_iphone</i>
          {t("authentication.phoneTitle")}
        </button> */}
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
    picture: "",
    loading: false
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    this.setState({ loading: true });
    e.preventDefault();
    const { props, state } = this;
    var user = {
      Email: this.state.email,
      Password: this.state.password,
      LastLogin: new Date()
    };
    props.signInWithEmailAndPassword(user);
  };

  handlePhone = () => {
    //    this.props.history.push("/phoneAuthentication");
  };

  componentClicked = () => {
    console.log("clicked");
  };

  responseFacebook = response => {
    this.setState({ loading: true });
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
    this.setState({ loading: true });
    const { singinSocial, country } = this.props;
    var profile = {
      Name: response.profileObj.name,
      Provider: "Google",
      ProviderId: response.profileObj.googleId,
      Photo: response.profileObj.imageUrl,
      LastLogin: new Date(),
      Country: country,
      Email: response.profileObj.email,
      User: response.googleId,
      AccessToken: response.accessToken,
      Password: "N/A",
      Initials:
        response.profileObj.name.split(" ")[0].charAt(0) +
        response.profileObj.name.split(" ")[1].charAt(0)
    };
    singinSocial(profile);
  };

  render() {
    const { loading } = this.state;
    const {
      authMessage,
      auth,
      lang,
      header,
      hideHeader,
      cleanMessage
    } = this.props;
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
      this.setState({ loading: false });
      cleanMessage();
      hideHeader(header);
    } else if (loading) {
      this.setState({ loading: false });
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
        loading={loading}
      />
    );
  }
}

const mapStateToProps = state => ({
  authMessage: state.signin.message,
  lang: state.navar.lang,
  header: state.navar.header,
  auth: state.signin.auth,
  country: state.navar.country
});

export default connect(mapStateToProps, {
  signInWithEmailAndPassword,
  singinSocial,
  hideHeader,
  cleanMessage
})(SignIn);
