import React, { Component, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./queryResult.scss";
import { miniaturePath } from "../../../config/constants";
import { useSelector } from "react-redux";
import { useQuery } from '@apollo/client';
import { getProductsByCategory } from "../queryResult/actions/queryResultActions";
import { GET_SOUGHT_ITEMS } from "../../../graphQL/search/searchQueries"
// import {
//   Hits,
//   Pagination,
//   ClearRefinements,
//   RefinementList,
//   Configure,
//   SortBy
// } from "react-instantsearch-dom";
//import algoliasearch from "algoliasearch/lite";
import PropTypes from "prop-types";

// const searchClient = algoliasearch(
//   "LOYYIQWO7O",
//   "1ba2b0f2147ae9c9553f63c594e0feca"
// );

function MyComponent(state) {
  //const { searchText } = this.props.location.state;
  const lang = useSelector(state => state.navar.lang);
  const { keyword } = useParams()
  const [items, setItems] = useState([]);
  const { t, i18n } = useTranslation();
  console.log(GET_SOUGHT_ITEMS);
  useQuery(GET_SOUGHT_ITEMS,
    {
      variables: { "keyword": keyword, "lang": lang.value },
      onCompleted: data => {
        setItems(data)
      },
    }
  );

  if (i18n.language !== lang.value) {
    i18n.changeLanguage(lang.value);
  }
  return (
    <div>
      <div className="container pd-top--130px">
        <div className="title-product">
          <h2>{t("query.products&categories")}</h2>
          <label>{t("query.productList")}</label>
        </div>

        <div className="list-product">
          <div className="filter">
            {/* <ClearRefinements
              translations={{
                reset: t("query.clean")
              }}
            /> */}
            <div className="order">
              <label className="title-filter">{t("query.sort")}</label>
              {/* <SortBy
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
              <Configure hitsPerPage={8} /> */}
            </div>
            <div className="category">
              <label className="title-filter">{t("query.category")}</label>
              {/* <RefinementList attribute="subcategory.subcategoryName" />
              <Configure hitsPerPage={8} /> */}
            </div>
            <div className="price">
              <label className="title-filter">{t("query.brand")}</label>
              {/* <RefinementList attribute="productInformation.brand" />
              <Configure hitsPerPage={8} /> */}
            </div>
            <div className="year">
              <label className="title-filter">Localización</label>
              {/* <RefinementList attribute="productInformation.location" />
              <Configure hitsPerPage={8} /> */}
            </div>
          </div>
          <div className="list-products">
            <div className="refineQueryList">
              {/* <RefinementList
                attribute="subcategory.categorySelectedId"
                defaultRefinement={[state.idCategory]}
              /> */}
            </div>
            {
              items.getCatalogsStandardPremiumItemPlan &&
              items.getCatalogsStandardPremiumItemPlan.map((categories) =>
                categories.filteredItems.map(item =>
                  <div className="item-product--list">
                    <div className="img-list">
                      <img
                        src={`${miniaturePath}${item.image}`}
                        align="left"
                        alt={item.name}
                      />
                    </div>
                    <div className="info-product--list">
                      <label className="title-product--list">
                        {item.name}
                      </label>
                      <div className="category-list">
                        {item.description}
                      </div>
                      <div className="price-button--list">
                        <div className="price-list">
                          $0000
                        </div>
                        <button
                          className="btns btn-go"
                        // onClick={() => hit.setRedirect(props.hit)}
                        >
                          Ver mas</button>
                      </div>
                    </div>
                  </div>

                ))
            }

          </div>
        </div>

        <div className="center">
          <div className="pagination">
            {/* <Pagination totalPages={5} /> */}
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

    const { getProductsByCategory, lang } = this.props;

    return (
      <div>
        <MyComponent
          lang={lang}
          //searchClient={searchClient}
          // idCategory={idCategory}
          setRedirect={this.setRedirect}
          renderRedirect={this.renderRedirect}
        ></MyComponent>
      </div>
    );
  }
}

export default Query;