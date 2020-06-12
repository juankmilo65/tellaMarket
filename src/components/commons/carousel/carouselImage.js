import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./carousel.scss";

class carouselImage extends Component {
  state = {
    index: 0,
  };
  handleSelect = (selectedIndex, e) => {
    this.setState({
      index: selectedIndex,
    });
  };
  render() {
    const { images } = this.props;
    let count = 0;
    return (
      <Carousel
        activeIndex={this.state.index}
        direction={this.state.direction}
        onSelect={this.handleSelect}
      >
        {images &&
          images.map((image) => {
            count = ++count;
            return (
              <Carousel.Item key={count}>
                {image.redirectUrl != undefined ? (
                  <a href={image.redirectUrl} target="_blank">
                    <img className="" src={image.imageUrl} alt=""></img>
                  </a>
                ) : (
                  <img src={image.imageUrl}></img>
                )}
              </Carousel.Item>
            );
          })}
      </Carousel>
    );
  }
}

export default carouselImage;
