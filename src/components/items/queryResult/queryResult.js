import React, { Component, useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./queryResult.scss";
import "../filter/filter"
import { miniaturePath } from "../../../config/constants";
import UseRange from "../../commons/range/UseRange"
import UsePagination from "../../commons/pagination/UsePagination"
import { useSelector } from "react-redux";
import { useQuery } from '@apollo/client';
import { GET_SOUGHT_ITEMS } from "../../../graphQL/search/searchQueries"
import { initialQuantitiyPerPage } from "../../../config/constants"

function MyComponent(state) {
  const lang = useSelector(state => state.navar.lang);
  const { keyword } = useParams()
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pricesRange, setPricesRange] = useState({ min: 0, max: 0 });
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState();
  const [itemsPerPage, setItemsPerPage] = useState(initialQuantitiyPerPage);
  const [pageSizes, setPageSizes] = useState([]);
  const [locations, setLocations] = useState([]);
  const { t, i18n } = useTranslation();
  useQuery(GET_SOUGHT_ITEMS,
    {
      variables: { "keyword": keyword, "lang": lang.value, "order": "asc", "pageNumber": page, "nPerPage": itemsPerPage },
      onCompleted: data => {
        setItems(data.getItemsPaginationAndFIltered.items);
        setCategories(data.getItemsPaginationAndFIltered.catalogsItems);
        setPricesRange(data.getItemsPaginationAndFIltered.pricesRange[0]);
        setLocations(data.getItemsPaginationAndFIltered.quantityLocation);
        setPageInfo(data.getItemsPaginationAndFIltered.pageInfo[0]);
      },
    }
  );

  const handlePageSizeChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setPage(1);
  };

  useEffect(() => {
    var list = [];
    if (pageSizes.length === 0 && pageInfo !== undefined) {

      for (let index = initialQuantitiyPerPage; index < pageInfo.count; index = index + initialQuantitiyPerPage) {
        list.push(index);
      }
      list.push(pageInfo.count);
      setPageSizes(list);
    }
  }, [pageInfo])

  const setCurrentPageCallBack = (page) => {
    setPage(page);
  }

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
            <div className="order">
              <label className="title-filter">{t("query.sort")}</label>
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
              {
                pricesRange.max > 0 ?
                  <UseRange minValue={pricesRange.min} maxValue={pricesRange.max} step={10} />
                  : <div />
              }
            </div>
            <div className="year">
              <label className="title-filter">{t("query.location")}</label>
              {locations &&
                locations.map(location =>
                  <label>{`${location._id.location} (${location.quantity})`}</label>)}
            </div>
          </div>
          <div className="col-9 list-products">
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
          <div className="rightPagination">
            {"Items per Page: "}
            <select onChange={handlePageSizeChange} value={itemsPerPage}>
              {pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {
              pageInfo === undefined ?
                <div /> :
                <UsePagination pagesQuantities={Math.ceil(pageInfo.count / itemsPerPage)} setCurrentPageCallBack={setCurrentPageCallBack} />
            }
          </div>
        </div>

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