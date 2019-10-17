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
        <label>Puede ser un titulo</label>
        <Filter />
        <ItemList />
      </div>
    );
  }
}

export default Query;
