import React, { Component } from "react";
import CarouselImage from "../carousel/carouselImage";
import "./carousel.scss";

class carouselMultiple extends Component {
  render() {
    const { images } = this.props;
    let idCorrousel = 0;
    return (
      <div>
        <div className="row">
          {images &&
            images.map(image => {
              idCorrousel++;
              return (
                <div key={idCorrousel} className="col-md-3">
                  <div className="carrusel-small">
                    <CarouselImage images={image} />
                    <div className="item-banner-xs">
                      <div className="title-product">titulo</div>
                      <div className="title-category">categoria</div>
                      <div className="value--price">123</div>
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
