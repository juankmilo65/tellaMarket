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
import algoliasearch from "algoliasearch/lite";
import ControlledOpenSelect from "../commons/select/select";
import Categories from "../commons/select/categoriesMenu";
import {
  InstantSearch,
  Configure,
  Highlight,
  connectAutoComplete
} from "react-instantsearch-dom";
import Autosuggest from "react-autosuggest";
const searchClient = algoliasearch(
  "LOYYIQWO7O",
  "1ba2b0f2147ae9c9553f63c594e0feca"
);

class Hits extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", hits: [] };
  }

  componentWillReceiveProps(props) {
    this.setState({ hits: props.hits });
  }
  render() {
    const { hits, currentRefinement, refine, lang } = this.props;
    return (
      <Autosuggest
        suggestions={this.state.hits}
        multiSection={false}
        onSuggestionSelected={(event, { suggestion, suggestionValue }) => {
          console.log("Suggestion:", suggestion);
          console.log("Suggestion value:", suggestionValue);
        }}
        onSuggestionsFetchRequested={({ value }) => refine(value)}
        onSuggestionsClearRequested={() => this.setState({ hits: [] })}
        getSuggestionValue={hit => hit.productInformation.productName}
        renderSuggestion={hit => (
          <div className="hit">
            <div>
              <span>
                <Highlight
                  attribute="productInformation.productName"
                  hit={hit}
                />
                <h3>{hit.subcategory.subcategoryName}</h3>
              </span>
            </div>
          </div>
        )}
        inputProps={{
          placeholder: lang.value === "es" ? "Buscar" : "Search",
          value: this.state.value,
          onChange: (event, { newValue, method }) => {
            this.setState({ value: newValue });
          }
        }}
        renderSectionTitle={section => section.index}
        getSectionSuggestions={section => section.hits}
      />
    );
  }
}

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
                <Categories categories={list}></Categories>
              </div>
              <div className="input-search">
                <InstantSearch
                  searchClient={searchClient}
                  indexName="dev_tellamarket"
                >
                  <AutoComplete />
                  <Configure hitsPerPage={10} />
                </InstantSearch>
                {/* <input type="text" placeholder="Buscar" /> */}
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

const AutoComplete = connect(mapStateToProps, null)(connectAutoComplete(Hits));

export default connect(mapStateToProps, { hideHeader, getDocuments })(Navbar);
