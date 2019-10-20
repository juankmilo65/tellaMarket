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
import plan1 from "../../commons/carousel/img/img-plan-1.svg";
import plan2 from "../../commons/carousel/img/img-plan-2.svg";
import plan3 from "../../commons/carousel/img/img-plan-3.svg";
import plan4 from "../../commons/carousel/img/img-plan-4.svg";
import plan5 from "../../commons/carousel/img/img-plan-5.svg";
import plan6 from "../../commons/carousel/img/img-plan-6.svg";
import plan7 from "../../commons/carousel/img/img-plan-7.svg";
import plan8 from "../../commons/carousel/img/img-plan-8.svg";

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
      <div className="business-plans">
        <div className="card-plans">
          <h2 htmlFor="productName">{t("plan.planOne.name")}</h2>
          <div className="price">
            <span className="sign">$</span>
            <span className="plan-value--price">{t("plan.planOne.price")}</span>
            <span className="month">Month</span>
          </div>
          <div>
            <img className="img-plan" src={plan1} />
            <img className="img-plan--hover" src={plan5} />
          </div>
          <div className="plan-description">
            <div className="item-description">
              <i class="material-icons i-normal">check_circle_outline</i>
              <i class="material-icons i-hover">check_circle</i>
              <span>{t("plan.planOne.features.featureA")}</span>
            </div>
            <div className="item-description">
              <i class="material-icons i-normal">check_circle_outline</i>
              <i class="material-icons i-hover">check_circle</i>
              <span>{t("plan.planOne.features.featureB")}</span>
            </div>
            <div className="item-description">
              <i class="material-icons i-normal">check_circle_outline</i>
              <i class="material-icons i-hover">check_circle</i>
              <span>{t("plan.planOne.features.featureC")}</span>
            </div>
          </div>
          <button className="btns btn-go btn-hover" onClick={() => state.handleSave(1)}>
            {t("buttons.SelectPlan")}
          </button>
        </div>
        <div className="card-plans">
          <h2 htmlFor="productName">{t("plan.planTwo.name")}</h2>
          <div className="price">
            <span className="sign">$</span>
            <span className="plan-value--price">{t("plan.planTwo.price")}</span>
            <span className="month">Month</span>
          </div>
          <div>
            <img className="img-plan" src={plan2} />
            <img className="img-plan--hover" src={plan6} />
          </div>
          <div className="plan-description">
            <div className="item-description">
            <i class="material-icons i-normal">check_circle_outline</i>
              <i class="material-icons i-hover">check_circle</i>
              <span>{t("plan.planTwo.features.featureA")}</span>
            </div>
            <div className="item-description">
              <i class="material-icons i-normal">check_circle_outline</i>
              <i class="material-icons i-hover">check_circle</i>
              <span>{t("plan.planTwo.features.featureB")}</span>
            </div>
            <div className="item-description">
              <i class="material-icons i-normal">check_circle_outline</i>
              <i class="material-icons i-hover">check_circle</i>
              <span>{t("plan.planTwo.features.featureC")}</span>
            </div>
          </div>
          <button className="btns btn-go btn-hover" onClick={() => state.handleSave(2)}>
            {t("buttons.SelectPlan")}
          </button>
        </div>
        <div className="card-plans">
          <h2 htmlFor="productName">{t("plan.planThree.name")}</h2>
          <div className="price">
            <span className="sign">$</span>
            <span className="plan-value--price">{t("plan.planThree.price")}</span>
            <span className="month">Month</span>
          </div>
          <div>
            <img className="img-plan" src={plan3} />
            <img className="img-plan--hover" src={plan7} />
          </div>
          <div className="plan-description">
            <div className="item-description">   
              <i class="material-icons i-normal">check_circle_outline</i>
              <i class="material-icons i-hover">check_circle</i>
              <span>{t("plan.planThree.features.featureA")}</span>
            </div>
            <div className="item-description">
              <i class="material-icons i-normal">check_circle_outline</i>
              <i class="material-icons i-hover">check_circle</i>
              <span>{t("plan.planThree.features.featureB")}</span>
            </div>
            <div className="item-description">
              <i class="material-icons i-normal">check_circle_outline</i>
              <i class="material-icons i-hover">check_circle</i>
              <span>{t("plan.planThree.features.featureC")}</span>
            </div>
          </div>
          <button className="btns btn-go btn-hover" onClick={() => state.handleSave(3)}>
            {t("buttons.SelectPlan")}
          </button>
        </div>
        <div className="card-plans">
          <h2 htmlFor="productName">{t("plan.planFour.name")}</h2>
          <div className="price">
            <span className="sign">$</span>
            <span className="plan-value--price">{t("plan.planFour.price")}</span>
            <span className="month">Month</span>
          </div>
          <div>
            <img className="img-plan" src={plan4} />
            <img className="img-plan--hover" src={plan8} />
          </div>
          <div className="plan-description">
            <div className="item-description">
              <i class="material-icons i-normal">check_circle_outline</i>
              <i class="material-icons i-hover">check_circle</i>
              <span>{t("plan.planFour.features.featureA")}</span>
            </div>
            <div className="item-description">
              <i class="material-icons i-normal">check_circle_outline</i>
              <i class="material-icons i-hover">check_circle</i>
              <span>{t("plan.planFour.features.featureB")}</span>
            </div>
            <div className="item-description">
              <i class="material-icons i-normal">check_circle_outline</i>
              <i class="material-icons i-hover">check_circle</i>
              <span>{t("plan.planFour.features.featureC")}</span>
            </div>
          </div>
          <button className="btns btn-go btn-hover" onClick={() => state.handleSave(4)}>
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
