import React, { Component } from "react";
import "./FrameAuth.scss";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../../../images/Logo.svg";
import { selectTab } from "../frame/actions/frameActions";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }
  return (
    <div>
      <div className="container-login">
        <Link onClick={state.handleLogo} className="logo">
          <img src={state.logo} alt="Tella Market" />
        </Link>
      </div>
      <div className="tab-login">
        <a
          id="login"
          onClick={state.handleTab}
          className={
            state.isLogin
              ? "item-tab--login active"
              : "item-tab--login inactive"
          }
        >
          {t("authentication.title")}
        </a>
        <a
          id="signup"
          onClick={state.handleTab}
          className={
            state.isLogin
              ? "item-tab--login inactive"
              : "item-tab--login active"
          }
        >
          {t("signup.title")}
        </a>
      </div>
    </div>
  );
}

class FrameAuth extends Component {
  handleTab = e => {
    const { props } = this;
    const isLogin = e.target.id == "login" ? true : false;
    props.selectTab(isLogin);
  };

  render() {
    const { lang, isLogin } = this.props;
    return (
      <MyComponent
        lang={lang}
        logo={logo}
        isLogin={isLogin}
        handleTab={this.handleTab}
      />
    );
  }
}

const mapStateToProps = state => ({
  lang: state.navar.lang,
  isLogin: state.frame.isLogin
});

export default connect(
  mapStateToProps,
  { selectTab }
)(FrameAuth);
