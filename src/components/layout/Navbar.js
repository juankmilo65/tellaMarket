import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import Select from "react-select";
import { setLanguage } from "./actions/navarActions";
import "./navbar.scss";
import logo from "../../images/logo.svg"

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
    const images = [logo]
    const links = auth.uid ? (
      <SignedInLinks profile={profile} />
    ) : (
      <SignedOutLinks />
    );
    return (
      <div>
        <nav className="nav-wrapper nav-tella">
          <div className="container-tella">

            <Link to="/" className="logo">
              <img src={logo} alt="Tella Market" />
            </Link>
            {auth.isLoaded && links}
            <Select
              styles={{
                control: () => ({
                  // none of react-select's styles are passed to <Control />
                })
              }}
              onChange={this.handleLanguage}
              options={options}
              value={lang}
              images={images}
              />
          </div>
        </nav>
        <div className="search">
          <div className="container-tella">
            <div className="btn-submenu">
              <a href="#">Categorias</a>
              <i class="material-icons">keyboard_arrow_down</i>
            </div>
            <div className="input-search">
              <input type="text" placeholder="Buscar"/>
              <i class="material-icons">search</i>
            </div>
          </div>
        </div>
      </div>
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
