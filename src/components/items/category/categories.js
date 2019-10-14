import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { getDocuments } from "../../commons/data/actions/dataActions";
import { setSubcategory } from "../../items/controlDataItem/actions/controlDataItemActions";
import { setStep } from "../../items/steps/actions/stepsActions";
import Popup from "reactjs-popup";
import "./categories.scss";
import warning from "../../../images/triangle.svg"

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
                    {Object.keys(item.data[Object.keys(item.data)[0]])[0]}
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
                    {Object.keys(item.data[Object.keys(item.data)[0]])[0]}
                  </label>
                </div>
              );
            })}
        </div>
      </div>

      <Popup modal open={state.showModal} className="modal-alert">
        <img src={warning} className="img-alert"/>
        <h3 >
          ¡Error!
        </h3>
        <span className="text-alert">Seleccione una subcategoria</span>
      </Popup>
    </div>
  );
}

class Categories extends Component {
  state = {
    showModal: false
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

  render() {
    const {
      auth,
      lang,
      documentsEn,
      documentsEs,
      firebase,
      subcategory
    } = this.props;

    let spanishCategories = [];
    let englishCategories = [];
    let columnOne = [];
    let columnTwo = [];

    if (lang.value === "es") {
      if (documentsEs.length === 0) {
        this.props.getDocuments({ firebase, language: "es" });
      }
      if (documentsEs.length > 0) {
        documentsEs.forEach(doc => {
          if (
            !spanishCategories.includes(
              Object.keys(doc.data[Object.keys(doc.data)[0]])[0]
            )
          ) {
            spanishCategories.push(
              Object.keys(doc.data[Object.keys(doc.data)[0]])[0]
            );
          }
        });
        var pos = Math.ceil(documentsEs.length / 2);
        var quantity = documentsEs.length - pos;
        columnOne =
          documentsEs.length >= 0
            ? documentsEs.splice(pos, quantity)
            : documentsEs;

        if (columnOne.length !== documentsEs.length) {
          columnTwo = documentsEs.splice(0, pos);
        }
      }
    } else if (lang.value === "en") {
      if (documentsEn.length === 0) {
        this.props.getDocuments({ firebase, language: "en" });
      }

      if (documentsEn.length > 0) {
        documentsEn.forEach(doc => {
          if (
            !englishCategories.includes(
              Object.keys(doc.data[Object.keys(doc.data)[0]])[0]
            )
          ) {
            englishCategories.push(
              Object.keys(doc.data[Object.keys(doc.data)[0]])[0]
            );
          }
        });
        var pos = Math.ceil(documentsEn.length / 2) - 1;
        var quantity = documentsEn.length - pos + 1;
        columnOne =
          documentsEn.length >= 0
            ? documentsEn.splice(pos, quantity)
            : documentsEn;

        if (columnOne.length !== documentsEn.length) {
          columnTwo = documentsEn.splice(0, pos);
        }
      }
    }

    if (auth.uid) return <Redirect to="/" />;
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
          ></MyComponent>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  lang: state.navar.lang,
  documentsEn: state.data.documentsEn,
  documentsEs: state.data.documentsEs,
  subcategory: state.dataItem.subcategory
});

export default connect(
  mapStateToProps,
  {
    getDocuments,
    setSubcategory,
    setStep
  }
)(Categories);
