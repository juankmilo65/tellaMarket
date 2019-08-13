import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import Select from "react-select";
import { setLanguage } from "./actions/navarActions";

const options = [
  { label: "EN", value: "en" },
  { label: "ES", value: "es" },
  { label: "PT", value: "pt" }
];

class Navbar extends Component {
  handleLanguage = e => {
    this.props.setLanguage(e);
  };

  render() {
    const { auth, profile, lang } = this.props;
    const links = auth.uid ? (
      <SignedInLinks profile={profile} />
    ) : (
      <SignedOutLinks />
    );
    return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <Link to="/" className="brand-logo">
            Tella Market
          </Link>
          {auth.isLoaded && links}
        </div>

        <Select
          styles={{
            control: () => ({
              // none of react-select's styles are passed to <Control />
              width: 200,
              height: 20
            })
          }}
          onChange={this.handleLanguage}
          options={options}
          value={lang}
        />
      </nav>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    lang: state.navar.lang
  };
};

export default connect(
  mapStateToProps,
  { setLanguage }
)(Navbar);
