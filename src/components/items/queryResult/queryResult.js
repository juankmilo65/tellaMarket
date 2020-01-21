import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./queryResult.scss";
import { connect } from "react-redux";
import { getProductsByCategory } from "../queryResult/actions/queryResultActions";
import {
  InstantSearch,
  Hits,
  Pagination,
  ClearRefinements,
  RefinementList,
  Configure,
  SortBy
} from "react-instantsearch-dom";
//import algoliasearch from "algoliasearch/lite";
import PropTypes from "prop-types";

// const searchClient = algoliasearch(
//   "LOYYIQWO7O",
//   "1ba2b0f2147ae9c9553f63c594e0feca"
// );

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }
  return (
    <div>
      <div className="container pd-top--130px">
        <div className="title-product">
          <h2>{t("query.products&categories")}</h2>
          <label>{t("query.productList")}</label>
        </div>
        {/* <div className="ais-InstantSearch">
          <InstantSearch
            indexName="dev_tellamarket"
            searchClient={state.searchClient}
          > */}
        <div className="list-product">
          <div className="filter">
            <ClearRefinements
              translations={{
                reset: t("query.clean")
              }}
            />
            <div className="order">
              <label className="title-filter">{t("query.sort")}</label>
              <SortBy
                defaultRefinement="dev_tellamarket"
                items={[
                  {
                    value: "dev_tellamarket",
                    label: "Default"
                  },
                  {
                    value: "dev_tellamarket_asc",
                    label: "Price Asc"
                  },
                  {
                    value: "dev_tellamarket_desc",
                    label: "Price Des"
                  }
                ]}
              />
              <Configure hitsPerPage={8} />
            </div>
            <div className="category">
              <label className="title-filter">{t("query.category")}</label>
              <RefinementList attribute="subcategory.subcategoryName" />
              <Configure hitsPerPage={8} />
            </div>
            <div className="price">
              <label className="title-filter">{t("query.brand")}</label>
              <RefinementList attribute="productInformation.brand" />
              <Configure hitsPerPage={8} />
            </div>
            <div className="year">
              <label className="title-filter">Localización</label>
              <RefinementList attribute="productInformation.location" />
              <Configure hitsPerPage={8} />
            </div>
          </div>
          <div className="list-products">
            <div className="refineQueryList">
              <RefinementList
                attribute="subcategory.categorySelectedId"
                defaultRefinement={[state.idCategory]}
              />
            </div>
            <Hits
              hitComponent={hit => (
                <Hit
                  hit={hit}
                  lang={state.lang.value}
                  setRedirect={state.setRedirect}
                />
              )}
            />
          </div>
        </div>
        <div className="center">
          <div className="pagination">
            <Pagination totalPages={5} />
          </div>
        </div>
        {/* </InstantSearch> 
        </div>*/}
      </div>
      {state.renderRedirect()}
    </div>
  );
}

class Query extends Component {
  state = {
    redirect: false,
    selectedItem: {}
  };
  setRedirect = item => {
    this.setState({
      redirect: true
    });
    this.setState({
      selectedItem: item
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      const { lang } = this.props;
      var obj = new Object();
      obj["titlecategory"] =
        lang === "en"
          ? this.state.selectedItem.subcategory.subcategoryName
          : this.state.selectedItem.subcategory.subcategoryName;
      obj["titleproduct"] = this.state.selectedItem.productInformation.brand;
      obj["valueprice"] = this.state.selectedItem.productInformation.price;
      obj[
        "description"
      ] = this.state.selectedItem.productInformation.description;
      obj["email"] = this.state.selectedItem.productInformation.email;
      obj["phone"] = this.state.selectedItem.productInformation.phone;
      obj["images"] = this.state.selectedItem.images;
      obj["year"] = this.state.selectedItem.productInformation.year;
      return (
        <Redirect
          to={{
            pathname: "/itemDetail",
            state: {
              itemtemObjet: obj
            }
          }}
        />
      );
    }
  };

  render() {
    const { idCategory } = this.props.location.state;
    const { getProductsByCategory, items, lang } = this.props;

    if (
      (items.length === 0 && this.state === null) ||
      (this.state !== null &&
        this.state.idCat !== null &&
        this.state.idCat !== idCategory)
    ) {
      this.setState(
        {
          idCat: idCategory
        },
        () => {
          getProductsByCategory(idCategory);
        }
      );
    }

    return (
      <div>
        <MyComponent
          lang={lang}
          //searchClient={searchClient}
          idCategory={idCategory}
          setRedirect={this.setRedirect}
          renderRedirect={this.renderRedirect}
        ></MyComponent>
      </div>
    );
  }
}

function Hit(hit) {
  const props = hit.hit;
  return (
    <div className="item-product--list">
      <div className="img-list">
        <img
          src={props.hit.images[0].imageUrl}
          align="left"
          alt={props.hit.productInformation.productName}
        />
      </div>
      <div className="info-product--list">
        <label className="title-product--list">
          {props.hit.productInformation.brand}
        </label>
        <div className="category-list">
          {hit.lang === "es"
            ? props.hit.productInformation.spanishDescription
            : props.hit.productInformation.englishDescription}
        </div>
        <div className="price-button--list">
          <div className="price-list">
            ${props.hit.productInformation.price}
          </div>
          <button
            className="btns btn-go"
            onClick={() => hit.setRedirect(props.hit)}
          >
            Ver mas
          </button>
        </div>
      </div>
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  lang: state.navar.lang,
  items: state.queryResult.items
});

export default connect(mapStateToProps, {
  getProductsByCategory
})(Query);
