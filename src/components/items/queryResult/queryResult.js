import React, { Component } from "react";
import Filter from "../filter/filter";
import ItemList from "../list/itemList";
import "./queryResult.scss";
import { connect } from "react-redux";
import { compose } from "redux";
import { getProductsByCategory } from "../queryResult/actions/queryResultActions";

class Query extends Component {
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
          <div className="list-product">
            <Filter />
            <ItemList items={items} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  lang: state.navar.lang,
  items: state.queryResult.items
});

export default connect(mapStateToProps, {
  getProductsByCategory
})(Query);
