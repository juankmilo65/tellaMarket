import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  signUpWithEmailAndPassword,
  setNullUserCreatedValue
} from "./actions/signupActions";
import Spinner from "../../commons/spinner/Spinner";
import { useTranslation } from "react-i18next";
import "./singup.scss";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }

  return (
    <div className="container-login mb-3">
      {state.loading ? <Spinner /> : null}
      <form onSubmit={state.handleSubmit} className="login-form">
        {/* <h5 className="grey-text text-darken-3">{t("signup.title")}</h5> */}

        <div className="item-login--form m-0">
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
            <input
              type="password"
              id="password"
              onChange={state.handleChange}
            />
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
          <button className="btns btn-go">{t("signup.title")}</button>
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
    lastName: "",
    loading: false
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { props, state } = this;
    const { country } = props;
    const { loading } = state;
    if (loading === false) {
      this.setState({ loading: true });
      const newUserData = {
        Name: state.firstName + " " + state.lastName,
        Provider: "email",
        ProviderId: 0,
        Photo: "-",
        LastLogin: new Date(),
        Country: country,
        Email: state.email,
        User: "N/A",
        AccessToken: "N/A",
        Password: state.password,
        Initials:
          state.firstName.split(" ")[0].charAt(0) +
          state.lastName.split(" ")[0].charAt(0)
      };

      props.signUpWithEmailAndPassword(newUserData);
    }
  };
  render() {
    const {
      userCreated,
      authMessage,
      lang,
      setNullUserCreatedValue
    } = this.props;
    const { loading } = this.state;

    if (userCreated) {
      setNullUserCreatedValue();
      return <Redirect to="/" />;
    }

    return (
      <MyComponent
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        authMessage={authMessage}
        lang={lang}
        loading={loading}
      />
    );
  }
}

const mapStateToProps = state => ({
  authMessage:
    state.signin.messages.length === 0 ? "" : state.signin.messages[0].text,
  userCreated: state.signup.userCreated,
  lang: state.navar.lang,
  country: state.navar.country
});

export default connect(mapStateToProps, {
  signUpWithEmailAndPassword,
  setNullUserCreatedValue
})(SignUp);
