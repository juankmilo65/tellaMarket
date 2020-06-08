import React, { Component } from "react";
import CarouselImage from "../carousel/carouselImage";
import { Redirect } from "react-router-dom";
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
      <div className="row">
        {state.items &&
          state.items.map(item => {
            return (
              <div key={item.id} className="col-md-3">
                <div className="carrusel-small">
                  <CarouselImage images={item.images} item={item} />
                  <button
                    className="look"
                    onClick={() => state.setRedirect(item)}
                  >
                    <i className="material-icons">visibility</i>
                  </button>
                  <div className="item-banner-xs">
                    <div className="title-product">{item.titleproduct}</div>
                    {/* <div className="title-category">{item.titlecategory}</div> */}
                    <div className="value--price">{item.valueprice}</div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {state.renderRedirect()}
    </div>
  );
}

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
            pathname: "/itemDetail/" + this.state.selectedItem.id,
            state: {
              itemtemObjet: this.state.selectedItem
            }
          }}
        />
      );
    }
  };
  render() {
    const { items, lang } = this.props;
    return (
      <div>
        <MyComponent
          items={items}
          lang={lang}
          renderRedirect={this.renderRedirect}
          setRedirect={this.setRedirect}
        ></MyComponent>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lang: state.navar.lang
});

export default connect(mapStateToProps, null)(carouselMultiple);
