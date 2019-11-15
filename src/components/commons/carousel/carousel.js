import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import "./carousel.scss";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }
  return (
    <div>
      <Carousel
        activeIndex={state.state.index}
        direction={state.state.direction}
        onSelect={state.handleSelect}
      >
        {state.images &&
          state.images.map(image => {
            return (
              <Carousel.Item key={image.id}>
                <img
                  className="d-block img-first--slider"
                  src={image.image}
                  alt="First slide"
                />
                <div className="item-first-banner">
                  <div>
                    <div className="title-category">{image.titlecategory}</div>
                    <div className="product">{image.titleproduct}</div>
                    <div>
                      <span id={image.id} className="value-price">
                        {image.valueprice} USD
                      </span>
                    </div>
                  </div>
                  <a href="/" className="btns btn-go">
                    {t("dashboard.checkNow")}
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
    </div>
  );
}

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
    const { images, lang } = this.props;

    return (
      <div>
        <MyComponent
          images={images}
          state={this.state}
          handleSelect={this.handleSelect}
          lang={lang}
        ></MyComponent>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lang: state.navar.lang
});

export default connect(
  mapStateToProps,
  null
)(carousel);
