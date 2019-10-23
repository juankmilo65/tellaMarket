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
    <div>
      <li>
        <button className="user" onClick={state.handleSignin}>
          {t("authentication.title")}
        </button>
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
    const header = {
      isFomSignin: false,
      hideHeader: true
    };
    this.setState({ redirect: true });
    props.hideHeader(header);
  };

  render() {
    const { lang, header } = this.props;

    return (
      <div>
        {this.state.redirect && header.hideHeader ? (
          <Redirect to={"/signin"} />
        ) : header.hideHeader ? (
          <div />
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
    header: state.navar.header
  };
};

export default connect(
  mapStateToProps,
  { hideHeader }
)(SignedOutLinks);
