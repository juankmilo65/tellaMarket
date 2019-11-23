import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Filter from "../filter/filter";
import ItemList from "../list/itemList";
import "./queryResult.scss";
import { connect } from "react-redux";
import { compose } from "redux";
import { getProductsByCategory } from "../queryResult/actions/queryResultActions";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
import PropTypes from "prop-types";
import "./App.css";

const searchClient = algoliasearch(
  "LOYYIQWO7O",
  "1ba2b0f2147ae9c9553f63c594e0feca"
);

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
    const { getProductsByCategory, items } = this.props;

    if (
      (items.length == 0 && this.state === null) ||
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
        <div className="container pd-top--130px">
          <div className="title-product">
            <h2>Producto y Categorías</h2>
            <label>Listado de productos</label>
          </div>
          <div className="ais-InstantSearch">
            <InstantSearch
              indexName="dev_tellamarket"
              searchClient={searchClient}
            >
              <div className="list-product">
                <div className="filter">
                  <ClearRefinements />
                  <div className="order">
                    <label className="title-filter">Ordernar por</label>
                    <RefinementList attribute="productInformation.model" />
                    <Configure hitsPerPage={8} />
                  </div>
                  <div className="category">
                    <label className="title-filter">Categoria</label>
                    <RefinementList attribute="productInformation.model" />
                    <Configure hitsPerPage={8} />
                  </div>
                  <div className="price">
                    <label className="title-filter">Precios</label>
                    <RefinementList attribute="productInformation.model" />
                    <Configure hitsPerPage={8} />
                  </div>
                  <div className="year">
                    <label className="title-filter">Año</label>
                    <RefinementList attribute="productInformation.model" />
                    <Configure hitsPerPage={8} />
                  </div>
                </div>
                <div className="list-products">
                  <Hits
                    hitComponent={hit => (
                      <Hit hit={hit} setRedirect={this.setRedirect} />
                    )}
                  />
                </div>
              </div>
              <Pagination />
            </InstantSearch>
          </div>
        </div>
        {this.renderRedirect()}
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
        <label class="title-product--list">
          {props.hit.productInformation.brand}
        </label>
        <div class="category-list">
          {props.hit.productInformation.description}
        </div>
        <div class="price-button--list">
          <div className="price-list">{props.hit.productInformation.price}</div>
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

// function Hit(props) {
//   return (
//     <div>
//       <img src={props.hit.image} align="left" alt={props.hit.name} />
//       <div className="hit-name">
//         <Highlight attribute="name" hit={props.hit} />
//       </div>
//       <div className="hit-description">
//         <Highlight attribute="description" hit={props.hit} />
//       </div>
//       <div className="hit-price">${props.hit.price}</div>
//     </div>
//   );
// }

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
