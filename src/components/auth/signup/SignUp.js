import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import {
  signUpWithEmailAndPassword,
  setNullUserCreatedValue
} from "./actions/signupActions";
import Spinner from "../../commons/spinner/Spinner";
import success from "../../../images/success.svg";
import error from "../../../images/error.svg";
import { useTranslation } from "react-i18next";
import { hideHeader } from "../../layout/actions/navarActions";
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
      <Popup
        modal
        open={state.showModal}
        closeOnDocumentClick={false}
        className="modal-alert"
      >
        <img src={state.iconModal} className="img-alert" />

        {state.redirectButton ? (
          <div>
            <h3>{t("messages.congratulation")}</h3>
            <span className="text-alert">{t("messages.userCreated")}</span>
          </div>
        ) : (
          <div>
            <h3>{t("messages.error")}</h3>
            <span className="text-alert">{t("messages.userExist")}</span>
          </div>
        )}

        {state.redirectButton ? (
          <button className="btns btn-go" onClick={state.handleOk}>
            {t("messages.ok")}
          </button>
        ) : (
          <button className="btns btn-go" onClick={state.hideModal}>
            {t("messages.ok")}
          </button>
        )}
      </Popup>
      {state.renderRedirect()}
    </div>
  );
}

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    loading: false,
    showModal: false,
    messageModal: "",
    iconModal: "",
    redirectButton: null
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  hideModal = e => {
    this.setState({ showModal: false });
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

  renderRedirect = () => {
    if (this.state.redirect) {
      const { hideHeader } = this.props;
      const header = {
        isFomSignin: true,
        hideHeader: false
      };

      hideHeader(header);
      return <Redirect to="/" />;
    }
  };

  handleOk = () => {
    this.setState({ redirect: true });
  };

  render() {
    const {
      userCreated,
      authMessage,
      lang,
      setNullUserCreatedValue
    } = this.props;
    const { loading } = this.state;

    if (userCreated === "Created") {
      setNullUserCreatedValue();
      this.setState({
        showModal: true,
        loading: false,
        messageModal: "Ok",
        iconModal: success,
        redirectButton: true
      });
    } else if (userCreated === "Exist") {
      setNullUserCreatedValue();
      this.setState({
        showModal: true,
        loading: false,
        messageModal: "Error",
        iconModal: error,
        redirectButton: false
      });
    }

    return (
      <MyComponent
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        authMessage={authMessage}
        lang={lang}
        loading={loading}
        showModal={this.state.showModal}
        renderRedirect={this.renderRedirect}
        hideModal={this.hideModal}
        handleOk={this.handleOk}
        messageModal={this.state.messageModal}
        iconModal={this.state.iconModal}
        redirectButton={this.state.redirectButton}
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
  setNullUserCreatedValue,
  hideHeader
})(SignUp);
