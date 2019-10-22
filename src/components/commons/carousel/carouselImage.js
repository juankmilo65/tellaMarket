import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./carousel.scss";

class carouselImage extends Component {
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
                  className="d-block w-100"
                  src={image.image}
                  alt="First slide"
                />
              </Carousel.Item>
            );
          })}
      </Carousel>
    );
  }
}

export default carouselImage;
