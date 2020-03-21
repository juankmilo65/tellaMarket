import React, { Component } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./itemList.scss";

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
                    € {item.data.productInformation.price} 
                  </div>
                  <button
                    className="btns btn-go"
                    onClick={() => state.setRedirect(item.data)}
                  >
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
      const { lang } = this.props;
      var obj = new Object();
      obj["titlecategory"] =
        lang === "en"
          ? this.state.selectedItem.subcategory.subcategoryName
          : this.state.selectedItem.subcategory.subcategoryName;
      obj["titleproduct"] = this.state.selectedItem.productInformation.brand;
      obj["valueprice"] = this.state.selectedItem.productInformation.price;
      obj[
        "description"
      ] = this.state.selectedItem.productInformation.description;
      obj["email"] = this.state.selectedItem.productInformation.email;
      obj["phone"] = this.state.selectedItem.productInformation.phone;
      obj["images"] = this.state.selectedItem.images;
      obj["year"] = this.state.selectedItem.productInformation.year;

      return (
        <Redirect
          to={{
            pathname: "/itemDetail",
            state: {
              itemtemObjet: obj
            }
          }}
        />
      );
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

export default connect(mapStateToProps, null)(ItemList);
