import React, { Component } from "react";
import CarouselImage from "../carousel/carouselImage";
import { Redirect } from "react-router-dom";
import "./carousel.scss";

class carouselMultiple extends Component {
  state = {
    redirect: false
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/itemDetail",
            state: { id: "123" }
          }}
        />
      );
    }
  };
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

                      <button
                        className="btns btn-go"
                        onClick={this.setRedirect}
                      >
                        Ver mas
                      </button>
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
