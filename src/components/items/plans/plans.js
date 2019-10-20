import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { useTranslation } from "react-i18next";
import { setStep } from "../../items/steps/actions/stepsActions";
import { createItem } from "../../items/controlDataItem/actions/controlDataItemActions";
import Popup from "reactjs-popup";
import { Redirect } from "react-router-dom";
import warning from "../../../images/triangle.svg";
import "./plans.scss";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }

  return (
    <div className="box-product mt-1 mb-1">
      <div className="title-box">
        <label>{t("plan.title")}</label>
        <div className="d-flex">
          <button className="btns btn-se mr-3" onClick={state.handleBack}>
            {t("productInformation.back")}
          </button>
        </div>
      </div>

      <div className="d-flex">
        <div className="col-6 pt-4">
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planOne.name")}
            </label>
          </div>
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planOne.price")}
            </label>
          </div>
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planOne.features.featureA")}
            </label>
          </div>
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planOne.features.featureB")}
            </label>
          </div>
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planOne.features.featureC")}
            </label>
          </div>
          <button onClick={() => state.handleSave(1)}>
            {t("buttons.SelectPlan")}
          </button>
        </div>
        <div className="col-6 pt-4">
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planTwo.name")}
            </label>
          </div>
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planTwo.price")}
            </label>
          </div>
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planTwo.features.featureA")}
            </label>
          </div>
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planTwo.features.featureB")}
            </label>
          </div>
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planTwo.features.featureC")}
            </label>
          </div>
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planTwo.features.featureD")}
            </label>
          </div>
          <button onClick={() => state.handleSave(2)}>
            {t("buttons.SelectPlan")}
          </button>
        </div>
        <div className="col-6 pt-4">
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planThree.name")}
            </label>
          </div>
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planThree.price")}
            </label>
          </div>
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planThree.features.featureA")}
            </label>
          </div>
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planThree.features.featureB")}
            </label>
          </div>
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planThree.features.featureC")}
            </label>
          </div>
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planThree.features.featureD")}
            </label>
          </div>
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planThree.features.featureE")}
            </label>
          </div>
          <button onClick={() => state.handleSave(3)}>
            {t("buttons.SelectPlan")}
          </button>
        </div>
        <div className="col-6 pt-4">
          x
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planFour.name")}
            </label>
          </div>
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planFour.price")}
            </label>
          </div>
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planFour.features.featureA")}
            </label>
          </div>
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planFour.features.featureB")}
            </label>
          </div>
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planFour.features.featureC")}
            </label>
          </div>
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planFour.features.featureD")}
            </label>
          </div>
          <div className="custom-control">
            <label htmlFor="productName" className="is-required">
              {t("plan.planFour.features.featureE")}
            </label>
          </div>
          <button onClick={() => state.handleSave(4)}>
            {t("buttons.SelectPlan")}
          </button>
        </div>
      </div>
      <Popup
        modal
        open={state.showModal}
        closeOnDocumentClick={false}
        className="modal-alert"
      >
        <img src={warning} className="img-alert" />
        <h3>¡Error!</h3>
        <span className="text-alert">{t("messages.createItem")}</span>
        <button className="btns btn-go" onClick={state.handleOk}>
          {t("errors.ok")}
        </button>
      </Popup>
      {state.renderRedirect()}
    </div>
  );
}

class Plans extends Component {
  state = { showModal: false, redirect: false };
  handleSave = id => {
    const { subcategory, productInformation, multimedia } = this.props;
    const { createItem } = this.props;

    var obj = new Object();
    obj["productInformation"] = {
      planId: id,
      subcategory,
      productInformation,
      creationDate: new Date()
    };
    obj["multimedia"] = multimedia;

    createItem(obj);
    // this.setState({
    //   ["showModal"]: true
    // });
  };

  handleBack = e => {
    const { setStep } = this.props;
    setStep(3);
  };

  handleOk = () => {
    this.setState({ redirect: true });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  render() {
    const { auth, lang, authMessage, result } = this.props;
    const { showModal } = this.state;

    if (result === "Ok" && showModal === false) {
      this.setState({
        ["showModal"]: true
      });
    }

    return (
      <MyComponent
        lang={lang}
        handleBack={this.handleBack}
        handleSave={this.handleSave}
        renderRedirect={this.renderRedirect}
        handleOk={this.handleOk}
        showModal={this.state.showModal}
      ></MyComponent>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  lang: state.navar.lang,
  subcategory: state.dataItem.subcategory,
  productInformation: state.dataItem.productInformation,
  multimedia: state.dataItem.multimedia,
  authMessage:
    state.signin.messages.length === 0 ? "" : state.signin.messages[0].text,
  result: state.dataItem.result
});

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    { setStep, createItem }
  )
)(Plans);
