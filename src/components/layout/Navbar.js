import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import { hideHeader } from "../layout/actions/navarActions";
import { getDocuments } from "../commons/data/actions/dataActions";
import "./navbar.scss";
import logo from "../../images/Logo.svg";
import Autocomplete from "../commons/autocomplete/Autocomplete";
import ControlledOpenSelect from "../commons/select/select";

class Navbar extends Component {
  state = {
    redirect: false,
    idCategory: ""
  };
  handleChange = e => {};

  setRedirect = idCategory => {
    this.setState({
      redirect: true
    });
    this.setState({
      idCategory: idCategory
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/query",
            state: {
              idCategory: this.state.idCategory
            }
          }}
        />
      );
    }
  };

  render() {
    const {
      auth,
      lang,
      profile,
      header,
      hideHeader,
      documentsEn,
      documentsEs,
      firebase
    } = this.props;
    let list = [];
    const images = [logo];
    let isDiferent = false;
    const hideHeaderLocal =
      header.isFomSignin && window.location.pathname === "/signin"
        ? false
        : !header.isFomSignin && window.location.pathname !== "/signin"
        ? header.hideHeader
        : header.isFomSignin && window.location.pathname === "/"
        ? false
        : true;

    Object.keys(header).map(obj => {
      if (obj == "hideHeader") {
        if (header[obj] != hideHeaderLocal) {
          isDiferent = true;
        }
      }
    });

    header.hideHeader = hideHeaderLocal;
    if (isDiferent) {
      hideHeader(header);
    }

    if (lang.value === "es") {
      if (documentsEs.length === 0) {
        this.props.getDocuments({ firebase, language: "es" });
      }
    } else if (lang.value === "en") {
      if (documentsEn.length === 0) {
        this.props.getDocuments({ firebase, language: "en" });
      }
    }

    list = lang.value === "en" ? documentsEn : documentsEs;

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
              <ControlledOpenSelect></ControlledOpenSelect>
            </div>
          </div>
        </nav>
        {hideHeaderLocal ? (
          <div />
        ) : (
          <div className="search">
            <div className="container-tella">
              <div className="dropdown">
                <button
                  className="btn-submenu dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Categorias
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  {list &&
                    list.map(category => {
                      return (
                        <div key={category.id}>
                          <a
                            className="dropdown-item"
                            onClick={() => this.setRedirect(category.id)}
                          >
                            {
                              Object.keys(
                                category.data[Object.keys(category.data)[0]]
                              )[0]
                            }
                          </a>
                        </div>
                      );
                    })}
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
        {this.renderRedirect()}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    lang: state.navar.lang,
    header: state.navar.header,
    documentsEn: state.data.documentsEn,
    documentsEs: state.data.documentsEs
  };
};

export default connect(
  mapStateToProps,
  { hideHeader, getDocuments }
)(Navbar);
