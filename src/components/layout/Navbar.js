import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import { hideHeader, setCategories } from "../layout/actions/navarActions";
import { getCatalog } from "../administration/menu/actions/createMenuActions";
import "./navbar.scss";
import logo from "../../images/Logo.svg";
import ControlledOpenSelect from "../commons/select/select";
import Categories from "../commons/select/categoriesMenu";
import { hamburgerMenu } from "./scripts/scripts";
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';

import UseAutocompleteField from "../commons/autocomplete/UseAutocompleteField"

class Navbar extends Component {
  state = {
    redirect: false,
    idCategory: "",
  };

  setRedirect = (idCategory) => {
    this.setState({
      redirect: true,
    });
    this.setState({
      idCategory: idCategory,
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/query",
            state: {
              idCategory: this.state.idCategory,
            },
          }}
        />
      );
    }
  };

  componentDidMount() {
    const { catalogs, getCatalog, setCategories } = this.props;
    if (catalogs.length === 0) {
      getCatalog();
    }
  }
  render() {
    const {
      auth,
      lang,
      header,
      hideHeader,
      catalogs,
      setCategories,
    } = this.props;
    let list = [];

    let isDiferent = false;
    const hideHeaderLocal =
      header.isFomSignin && window.location.pathname === "/signin"
        ? false
        : !header.isFomSignin && window.location.pathname !== "/signin"
          ? header.hideHeader
          : header.isFomSignin && window.location.pathname === "/"
            ? false
            : true;

    Object.keys(header).map((obj) => {
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

    if (lang.value === "en") {
      catalogs.map((catalog) => {
        var obj = new Object();
        obj["id"] = catalog.Id;
        obj["Category"] = catalog.Catalog.split("|")[0];
        list.push(obj);
      });
      setCategories(list);
    }

    if (lang.value === "es") {
      catalogs.map((catalog) => {
        var obj = new Object();
        obj["id"] = catalog.Id;
        obj["Category"] = catalog.Catalog.split("|")[1];
        list.push(obj);
      });
      setCategories(list);
    }

    const links =
      auth != null && auth.User && window.location.pathname !== "/signin" ? (
        <SignedInLinks profile={auth} />
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

            <div className="nav-right" id="myTopnav">
              {/* {auth.isLoaded && links} */}
              {links}
              <ControlledOpenSelect></ControlledOpenSelect>
              <a className="icon" onClick={() => hamburgerMenu()}>
                <i className="fa fa-bars"></i>
              </a>
            </div>
          </div>
        </nav>
        {hideHeaderLocal ? (
          <div />
        ) : (
            <div className="search">
              <div className="container-tella">
                <div className="dropdown">
                  <Categories categories={list}></Categories>
                </div>
                <UseAutocompleteField type="autocompleteIndex" />
              </div>
            </div>
          )}
        {this.renderRedirect()}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.signin.auth,
    lang: state.navar.lang,
    header: state.navar.header,
    catalogs: state.createmenu.catalogs,
  };
};

export default connect(mapStateToProps, {
  hideHeader,
  getCatalog,
  setCategories,
})(Navbar);
