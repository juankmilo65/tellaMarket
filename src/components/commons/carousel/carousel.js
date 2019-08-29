import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./carousel.scss";


class carousel extends Component {
  state = {
    index: 0,
    setIndex: 0,
    direction: null,
    setDirection: null
  };
  handleSelect = (selectedIndex, e) => {
    this.setState({
      setIndex: selectedIndex,
      index: selectedIndex,
      direction: e.direction,
      setDirection: e.direction
    });
  };
  render() {
    const { images } = this.props;
    return (
      <Carousel
        activeIndex={this.state.index}
        direction={this.state.direction}
        onSelect={this.handleSelect}
      >
        {images &&
          images.map(image => {
            return (
              <Carousel.Item>
                <img
                  className="d-block w-100 h-100"
                  src={image.image}
                  alt="First slide"
                />
                <div className="item-first-banner">
                  <div>
                    <div className="title-category">{image.titlecategory}</div>
                    <div className="product">{image.titleproduct}</div>
                    <div><span className="title-category">{image.price}</span><span className="value-price">{image.valueprice}</span></div>
                  </div>
                  <a className="btns btn-go">{image.textbtn}</a>
                </div>
                <Carousel.Caption>
                  {/* Mas propiedades */}
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
      </Carousel>
    );
  }
}

export default carousel;
