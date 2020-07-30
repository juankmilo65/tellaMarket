import React, { Component, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Range, getTrackBackground } from 'react-range';
import { useTranslation } from "react-i18next";
import "./queryResult.scss";
import "../filter/filter"
import { miniaturePath } from "../../../config/constants";
import UseRange from "../../commons/range/UseRange"
import { useSelector } from "react-redux";
import { useQuery } from '@apollo/client';
import { getProductsByCategory } from "../queryResult/actions/queryResultActions";
import { GET_SOUGHT_ITEMS } from "../../../graphQL/search/searchQueries"
import PropTypes from "prop-types";

function MyComponent(state) {
  const lang = useSelector(state => state.navar.lang);
  const { keyword } = useParams()
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const { t, i18n } = useTranslation();
  useQuery(GET_SOUGHT_ITEMS,
    {
      variables: { "keyword": keyword, "lang": lang.value, "order": "asc", "pageNumber": 1, "nPerPage": 2 },
      onCompleted: data => {
        setItems(data.getItemsPaginationAndFIltered.items);
        setCategories(data.getItemsPaginationAndFIltered.catalogsItems);
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
        <div className="row">
          <div className="col-2 filter">
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
              {categories &&
                categories.map(categorie =>
                  <label>{`${categorie._id.name} (${categorie.items})`}</label>
                )}
            </div>
            <div className="price">
              <label className="title-filter">{t("query.price")}</label>
              <UseRange />
            </div>
            <div className="year">
              <label className="title-filter">Localización</label>
              {/* <RefinementList attribute="productInformation.location" />
              <Configure hitsPerPage={8} /> */}
            </div>
          </div>
          <div className="col-9 list-products">
            <div className="refineQueryList">
              {/* <RefinementList
                attribute="subcategory.categorySelectedId"
                defaultRefinement={[state.idCategory]}
              /> */}
            </div>
            {
              items &&
              items.map((item) =>
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
                        {`$${item.price}`}
                      </div>
                      <button
                        className="btns btn-go"
                      // onClick={() => hit.setRedirect(props.hit)}
                      >
                        Ver mas</button>
                    </div>
                  </div>
                </div>
              )
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
    return (
      <div>
        <MyComponent
          setRedirect={this.setRedirect}
          renderRedirect={this.renderRedirect}
        ></MyComponent>
      </div>
    );
  }
}

export default Query;