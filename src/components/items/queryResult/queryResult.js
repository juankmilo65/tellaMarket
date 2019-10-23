import React, { Component } from "react";
import Filter from "../filter/filter";
import ItemList from "../list/itemList";
import "./queryResult.scss";

class Query extends Component {
  render() {
    return (
      <div>
        <div className="container pd-top--130px">
          <div className="title-product">
            <h2>Producto y Categorías</h2>
            <label>Listado de productos</label>
          </div>
          <div className="list-product">
            <Filter />
            <ItemList />
          </div>
        </div>

      </div>
      
    );
  }
}

export default Query;
