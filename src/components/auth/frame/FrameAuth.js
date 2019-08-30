import React, { Component } from "react";
import "./FrameAuth.scss";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import logo from "../../../images/Logo.svg";
import { selectTab } from "../frame/actions/frameActions";
import { hideHeader } from "../../layout/actions/navarActions";
// import { Redirect } from "react-router-dom";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }
  return (
    <div>
      <div className="container-login">
        <div onClick={state.handleLogo} className="logo">
          <img src={state.logo} alt="Tella Market" />
        </div>
      </div>
      <div className="tab-login">
        <div
          id="login"
          onClick={state.handleTab}
          className={
            state.isLogin
              ? "item-tab--login active"
              : "item-tab--login inactive"
          }
        >
          {t("authentication.title")}
        </div>
        <div
          id="signup"
          onClick={state.handleTab}
          className={
            state.isLogin
              ? "item-tab--login inactive"
              : "item-tab--login active"
          }
        >
          {t("signup.title")}
        </div>
      </div>
    </div>
  );
}

class FrameAuth extends Component {
  handleTab = e => {
    const { props } = this;
    const isLogin = e.target.id === "login" ? true : false;
    props.selectTab(isLogin);
  };

  handleLogo = () => {
    const { props } = this;
    props.hideHeader(false);
    //this.props.history.push("/");
  };

  render() {
    const { lang, isLogin } = this.props;
    return (
      <MyComponent
        lang={lang}
        logo={logo}
        isLogin={isLogin}
        handleTab={this.handleTab}
        handleLogo={this.handleLogo}
      />
    );
  }
}

const mapStateToProps = state => ({
  lang: state.navar.lang,
  isLogin: state.frame.isLogin,
  hide: state.navar.hide
});

export default connect(
  mapStateToProps,
  { selectTab, hideHeader }
)(FrameAuth);
