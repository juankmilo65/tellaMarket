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
import Autosuggest from "react-autosuggest";

const languages = [
  {
    name: "C",
    year: 1972,
  },
  {
    name: "Elm",
    year: 2012,
  },
];

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : languages.filter(
      (lang) => lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

const getSuggestionValue = (suggestion) => suggestion.name;

class Navbar extends Component {
  state = {
    redirect: false,
    idCategory: "",
    value: '',
    suggestions: [],
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
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
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: lang.value === "es" ? "Buscar" : "Search",
      value,
      onChange: this.onChange,
    };
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
                <div className="input-search">
                  <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                  />
                </div>
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
