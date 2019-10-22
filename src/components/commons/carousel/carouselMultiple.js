import React, { Component } from "react";
import CarouselImage from "../carousel/carouselImage";
import "./carousel.scss";

class carouselMultiple extends Component {
  render() {
    const { items } = this.props;
    return (
      <div>
        <div className="row">
          {items &&
            items.map(item => {
              return (
                <div key={item.id} className="col-md-3">
                  <div className="carrusel-small">
                    <CarouselImage images={item.images} />
                    <div className="item-banner-xs">
                      <div className="title-product">{item.titleproduct}</div>
                      <div className="title-category">{item.titlecategory}</div>
                      <div className="value--price">{item.valueprice}</div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default carouselMultiple;
