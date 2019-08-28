import React, { Component } from "react";
import Carousel from "../carousel/carousel";

class carouselMultiple extends Component {
  render() {
    const { images } = this.props;
    return (
      <div>
        <div className="row">
          {images &&
            images.map(image => {
              return (
                <div className="col-md-3">
                  <Carousel images={image} />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default carouselMultiple;
