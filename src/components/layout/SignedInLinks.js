import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { signOut } from "../auth/signout/actions/signoutActions";
import { useTranslation } from "react-i18next";
import MenuSelect from "../commons/select/menuLogin";
import "./navbar.scss";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }

  return (
    <div>
      <MenuSelect initials={state.initials}></MenuSelect>
    </div>
  );
}

class SignedInLinks extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { props } = this;
    const { firebase } = props;
    const fireBase = {
      firebase
    };

    props.signOut(fireBase);
  };

  render() {
    const { lang } = this.props;

    return (
      <ul className="right">
        <MyComponent
          handleSubmit={this.handleSubmit}
          initials={this.props.profile.initials}
          lang={lang}
        />
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.navar.lang
  };
};

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    { signOut }
  )
)(SignedInLinks);
