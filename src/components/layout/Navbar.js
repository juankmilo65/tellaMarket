import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import Select from "react-select";
import { hideHeader } from "../layout/actions/navarActions";
import { setLanguage } from "./actions/navarActions";
import "./navbar.scss";
import logo from "../../images/Logo.svg";
import Autocomplete from "../commons/autocomplete/Autocomplete";

const options = [
  { label: "EN", value: "en" },
  { label: "ES", value: "es" },
  { label: "PT", value: "pt" }
];

class Navbar extends Component {
  handleChange = e => {};

  handleLanguage = e => {
    this.props.setLanguage(e);
  };

  render() {
    const { auth, profile, header, hideHeader } = this.props;
    const images = [logo];
    const hideHeaderLocal =
      header.isFomSignin && window.location.pathname === "/signin"
        ? false
        : !header.isFomSignin && window.location.pathname !== "/signin"
        ? header.hideHeader
        : true;

    header.hideHeader = hideHeaderLocal;
    hideHeader(header);

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

              <div class="dropdown">
                <button class="btn-submenu dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Categorias
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#">Clinical & Laboratory Equipment</a>
                  <a class="dropdown-item" href="#">Textile Laboratory equipment</a>
                  <a class="dropdown-item" href="#">Yarn manufacturing</a>
                  <a class="dropdown-item" href="#">Weaving machinery</a>
                  <a class="dropdown-item" href="#">Finishing and other press equipment</a>
                  
                </div>
              </div>
              <div className="input-search">
                <Autocomplete idInput="search" onChange={this.handleChange} />

                {/* <input type="text" placeholder="Buscar" /> */}
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
    header: state.navar.header
  };
};

export default connect(
  mapStateToProps,
  { setLanguage, hideHeader }
)(Navbar);
