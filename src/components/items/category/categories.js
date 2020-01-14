import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { setSubcategory } from "../../items/controlDataItem/actions/controlDataItemActions";
import { setStep } from "../../items/steps/actions/stepsActions";
import Popup from "reactjs-popup";
import "./categories.scss";
import warning from "../../../images/triangle.svg";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }
  return (
    <div className="box-product mt-1 mb-1">
      <div className="title-box">
        <label>{t("category.selectCategory")}</label>
        <button className="btns btn-go" onClick={state.handleSubmit}>
          {t("category.next")}
        </button>
      </div>

      <div className="d-flex">
        <div className="col-6 pt-4">
          {state.columnOne != null &&
            state.columnOne.map(item => {
              return (
                <div
                  key={item.id}
                  className="custom-control custom-radio radio-tella"
                >
                  <input
                    type="radio"
                    id={item.id}
                    name="customRadio"
                    className="custom-control-input"
                    onChange={state.handleSelectCheck}
                    checked={item.id === state.subcategory.categorySelectedId}
                  />
                  <label className="custom-control-label" htmlFor={item.id}>
                    {item.SubCategory}
                  </label>
                </div>
              );
            })}
        </div>
        <div className="col-6 pt-4">
          {state.columnTwo != null &&
            state.columnTwo.map(item => {
              return (
                <div
                  key={item.id}
                  className="custom-control custom-radio radio-tella"
                >
                  <input
                    type="radio"
                    id={item.id}
                    name="customRadio"
                    className="custom-control-input"
                    onChange={state.handleSelectCheck}
                    checked={item.id === state.subcategory.categorySelectedId}
                  />
                  <label className="custom-control-label" htmlFor={item.id}>
                    {item.SubCategory}
                  </label>
                </div>
              );
            })}
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
        <span className="text-alert">{t("errors.requeredCategory")}</span>
        <button className="btns btn-go" onClick={state.handleOkError}>
          {t("errors.ok")}
        </button>
      </Popup>
    </div>
  );
}

class Categories extends Component {
  state = {
    showModal: false,
    columnOne: [],
    columnTwo: []
  };

  handleOkError = e => {
    this.setState({
      ["showModal"]: false
    });
  };

  handleSelectCheck = e => {
    const { setSubcategory } = this.props;
    var obj = new Object();
    obj["categorySelectedId"] = e.target.id;
    obj["subcategoryName"] = e.target.labels[0].innerHTML;
    setSubcategory(obj);
  };

  handleSubmit = e => {
    const { setStep, subcategory } = this.props;
    if (
      Object.entries(subcategory).length === 0 &&
      subcategory.constructor === Object
    ) {
      this.setState({
        ["showModal"]: true
      });
    } else {
      setStep(2);
    }
  };

  handleList(list) {
    let columnOne = [];

    var pos = Math.ceil(list.length / 2) - 1;
    var quantity = list.length - pos + 1;
    columnOne = list.length >= 0 ? list.splice(pos, quantity) : list;

    this.setState({ ["columnOne"]: columnOne });

    if (columnOne.length !== list.length) {
      this.setState({ ["columnTwo"]: list.splice(0, pos) });
    }
  }

  render() {
    const {
      auth,
      lang,
      documentsEn,
      documentsEs,
      subcategory,
      getSubcategores,
      subcategories
    } = this.props;

    if (subcategories.length === 0) {
      getSubcategores();
    } else {
      this.handleList(subcategories);
    }

    const { columnOne, columnTwo } = this.state;

    if (!auth.uid) return <Redirect to="/" />;
    return (
      <div>
        {columnOne.length === 0 ? (
          <div></div>
        ) : (
          <MyComponent
            lang={lang}
            columnOne={columnOne}
            columnTwo={columnTwo}
            handleSelectCheck={this.handleSelectCheck}
            handleSubmit={this.handleSubmit}
            showModal={this.state.showModal}
            subcategory={subcategory}
            handleOkError={this.handleOkError}
          ></MyComponent>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  lang: state.navar.lang,
  subcategories: state.createmenu.subcategories
});

export default connect(mapStateToProps, {
  setSubcategory,
  setStep
})(Categories);
