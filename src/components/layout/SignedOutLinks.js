import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }
  return (
    <div>
      <li>
        <NavLink to="/signin">{t("authentication.title")}</NavLink>
      </li>

      <li>
        <NavLink to="/" />
      </li>
    </div>
  );
}

class SignedOutLinks extends Component {
  render() {
    const { lang } = this.props;
    return (
      <ul className="right">
        <MyComponent lang={lang} />
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.navar.lang
  };
};

export default connect(
  mapStateToProps,
  null
)(SignedOutLinks);
