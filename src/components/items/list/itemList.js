import React, { Component } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./itemList.scss";
import producto1 from "../../commons/carousel/img/producto1.png";
import producto2 from "../../commons/carousel/img/producto2.png";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }

  return (
    <div className="list-products">
      {state.items != null &&
        state.items.map(item => {
          return (
            <div className="item-product--list" key={item.id}>
              <div className="img-list">
                <img src={item.data.images[0].imageUrl} />
              </div>
              <div className="info-product--list">
                <label className="title-product--list">
                  {item.data.productInformation.productName}
                </label>
                <div className="category-list">
                  {item.data.subcategory.subcategoryName}
                </div>
                <div className="category-list">
                  {item.data.productInformation.year}
                </div>
                <div className="price-button--list">
                  <div className="price-list">
                    {item.data.productInformation.price} USD
                  </div>
                  <button className="btns btn-go" onClick={state.setRedirect}>
                    Ver mas
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      {state.renderRedirect()}
    </div>
  );
}

class ItemList extends Component {
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
      return <Redirect to="/itemDetail" />;
    }
  };

  render() {
    const { lang, items } = this.props;

    return (
      <MyComponent
        lang={lang}
        setRedirect={this.setRedirect}
        renderRedirect={this.renderRedirect}
        items={items}
      ></MyComponent>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  lang: state.navar.lang
});

export default connect(
  mapStateToProps,
  null
)(ItemList);
