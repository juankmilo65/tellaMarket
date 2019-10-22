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
              <Carousel.Item key={image.id}>
                <img
                  className="d-block w-100 img-small"
                  src={image.image}
                  alt="First slide"
                />
                <div className="item-first-banner">
                  <div>
                    <div className="title-category">{image.titlecategory}</div>
                    <div className="product">{image.titleproduct}</div>
                    <div>
                      <span id={image.id} className="title-category">
                        {image.price}
                      </span>
                      <span id={image.id} className="value-price">
                        {image.valueprice}
                      </span>
                    </div>
                  </div>
                  <a href="/" className="btns btn-go">
                    Consultar ahora
                  </a>
                </div>
                <div className="item-banner-xs">
                  <div className="title-product">{image.titleproduct}</div>
                  <div className="title-category">{image.category}</div>
                  <div className="value--price">{image.valueprice}</div>
                </div>
                <Carousel.Caption>{/* Mas propiedades */}</Carousel.Caption>
              </Carousel.Item>
            );
          })}
      </Carousel>
    );
  }
}

export default carousel;
