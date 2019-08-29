import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import Select from "react-select";
import { setLanguage, hideHeader } from "./actions/navarActions";
import "./navbar.scss";
import logo from "../../images/Logo.svg";

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
    const { auth, profile, lang, hide, hideHeader } = this.props;
    const images = [logo];
    const hideHeaderLocal = window.location.pathname == "/signin" ? true : hide;
    hideHeader(hideHeaderLocal);
    const links = auth.uid ? (
      <SignedInLinks profile={profile} />
    ) : (
      <SignedOutLinks />
    );

    return (
      <div className="menu-tella">
        <nav className="nav-wrapper nav-tella">
          <div className="container-tella">
            {hideHeaderLocal ? (
              <div />
            ) : (
              <Link to="/" className="logo">
                <img src={logo} alt="Tella Market" />
              </Link>
            )}

            <div className="nav-right">
              {auth.isLoaded && links}
              <Select
                className="lenguage"
                styles={{
                  control: () => ({
                    // none of react-select's styles are passed to <Control />
                  })
                }}
                onChange={this.handleLanguage}
                options={options}
                value=""
                placeholder="Idioma"
                images={images}
              />
            </div>
          </div>
        </nav>
        {hideHeaderLocal ? (
          <div />
        ) : (
          <div className="search">
            <div className="container-tella">
              <div className="btn-submenu">
                <a href="">Categorias</a>
                <i className="material-icons">keyboard_arrow_down</i>
              </div>
              <div className="input-search">
                <input type="text" placeholder="Buscar" />
                <i className="material-icons">search</i>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    lang: state.navar.lang,
    hide: state.navar.hide
  };
};

export default connect(
  mapStateToProps,
  { setLanguage, hideHeader }
)(Navbar);
