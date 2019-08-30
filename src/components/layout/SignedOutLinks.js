import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { hideHeader } from "./actions/navarActions";
import { Redirect } from "react-router-dom";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }

  return (
    <div className="user">
      <li>
        <button onClick={state.handleSignin}>
          {t("authentication.title")}
        </button>
      </li>
      <li>
        <NavLink to="/" />
      </li>
    </div>
  );
}

class SignedOutLinks extends Component {
  state = {
    redirect: false
  };

  handleSignin = () => {
    const { props } = this;
    props.hideHeader(true);
    //this.setState({ redirect: true });
  };

  render() {
    const { lang, hide } = this.props;

    return (
      <div>
        {hide ? (
          <Redirect to={"/signin"} />
        ) : (
          <ul className="right">
            <MyComponent lang={lang} handleSignin={this.handleSignin} />
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.navar.lang,
    hide: state.navar.hide
  };
};

export default connect(
  mapStateToProps,
  { hideHeader }
)(SignedOutLinks);
