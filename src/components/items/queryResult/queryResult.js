import React, { Component } from "react";
import Filter from "../filter/filter";
import ItemList from "../list/itemList";
import "./queryResult.scss";

class Query extends Component {
  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="container">
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
