import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Steps from "../steps/steps";
import Categories from "../category/categories";
import ProductInformation from "../productInformation/productInformation";
import Multimedia from "../multimedia/multimedia";
import Plans from "../plans/plans";
import "./createItem.scss";

class CreateItem extends Component {
  render() {
    const { auth, step } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container pd-top--130px pb-4">
        <div className="title-product">
          <h2>Vende con Nosotros</h2>
          <label>Edición Producto</label>
        </div>
        <Steps />
        {step === 1 ? (
          <Categories />
        ) : step === 2 ? (
          <ProductInformation />
        ) : step === 3 ? (
          <Multimedia />
        ) : step === 4 ? (
          <Plans />
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    step: state.step.step
  };
};

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    null
  )
)(CreateItem);
