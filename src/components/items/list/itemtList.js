import React from "react";
import ItemSummary from "../summary/itemSumary";
import { Link } from "react-router-dom";

const ItemList = ({ items }) => {
  return (
    <div className="project-list selection">
      {items &&
        items.map(item => {
          return (
            <Link to={"/project/" + item.id} key={item.id}>
              <ItemSummary item={item} />
            </Link>
          );
        })}
    </div>
  );
};

export default ItemList;
