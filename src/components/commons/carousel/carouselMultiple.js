import React, { Component } from "react";
import CarouselImage from "../carousel/carouselImage";
import { Redirect } from "react-router-dom";
import "./carousel.scss";

class carouselMultiple extends Component {
  state = {
    redirect: false,
    selectedItem: {}
  };

  setRedirect = item => {
    this.setState({
      redirect: true
    });
    this.setState({
      selectedItem: item
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/itemDetail",
            state: {
              itemtemObjet: this.state.selectedItem
            }
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
                        onClick={() => this.setRedirect(item)}
                      >
                        Ver mas
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {this.renderRedirect()}
      </div>
    );
  }
}

export default carouselMultiple;
