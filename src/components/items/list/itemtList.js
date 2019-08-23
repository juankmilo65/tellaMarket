import React from "react";
import ItemSummary from "../summary/itemSumary";
import { Link } from "react-router-dom";
import data from "./data";
import Card from "../../commons/carusel/carusel";
import "../../../styles/Card.css";

const state = {
  properties: data.properties,
  property: data.properties[0]
};

const nextProperty = e => {
  const newIndex = state.property.index + 1;
  state.property = data.properties[newIndex];
};

const prevProperty = e => {
  const newIndex = state.property.index - 1;
  state.property = data.properties[newIndex];
};

const ItemList = ({ items }) => {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <button
        onClick={nextProperty}
        disabled={state.property.index === data.properties.length - 1}
      >
        Next
      </button>
      <button onClick={prevProperty} disabled={state.property.index === 0}>
        Prev
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="page">
        <div className="col">
          <div className={`cards-slider active-slide-${state.property.index}`}>
            <div
              className="cards-slider-wrapper"
              style={{
                transform: `translateX(-${state.property.index *
                  (100 / state.properties.length)}%)`
              }}
            >
              {state.properties.map(property => (
                <Card key={property._id} property={property} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
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
