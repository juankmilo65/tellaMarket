import React from "react";
import ItemSummary from "../summary/itemSumary";
import { Link } from "react-router-dom";

const ItemList = ({ items }) => {
  return (
    <div>
      <div>
        {items &&
          items.map(item => {
            return (
              <Link to={"/project/" + item.id} key={item.id}>
                <ItemSummary item={item} />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default ItemList;
