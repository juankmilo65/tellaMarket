import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../auth/signout/actions/signoutActions";
import { signInSuccess } from "../../components/auth/signin/actions/signinActions";
import { useTranslation } from "react-i18next";
import MenuSelect from "../commons/select/menuLogin";
import CurrencySelect from "../commons/select/currency";
import "./navbar.scss";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }

  return (
    <div>
      {/* <CurrencySelect></CurrencySelect> */}
      <MenuSelect profile={state.profile}></MenuSelect>
    </div>
  );
}

class SignedInLinks extends Component {
  render() {
    const { lang } = this.props;
    return (
      <ul className="right">
        <MyComponent profile={this.props.profile} lang={lang} />
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.navar.lang
  };
};

export default connect(mapStateToProps, { signOut, signInSuccess })(
  SignedInLinks
);
