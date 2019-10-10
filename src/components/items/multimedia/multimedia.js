import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { DateTimePicker } from "react-widgets";
import { setProductInformation } from "../controlDataItem/actions/controlDataItemActions";
import { setStep } from "../../items/steps/actions/stepsActions";
import "./multimedia.scss";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }

  return (
    <div className="box-product mt-1 mb-1">
      <div className="title-box">
        <label>Cargar Archivos Multimedia</label>
        <div className="d-flex">
          <button className="btns btn-se mr-3">atras</button>
          <button className="btns btn-go">Siguiente</button>
        </div>
      </div>
      <div className="upload-image">
        <div className="box-group">
          <div className="box active">
            <i className="material-icons">add_photo_alternate</i>
            <span> Subir Archivos </span>
          </div>
          <div className="box">
            <i className="material-icons">add_photo_alternate</i>
            <span> Subir Archivos </span>
          </div>
          <div className="box">
            <i className="material-icons">add_photo_alternate</i>
            <span> Subir Archivos </span>
          </div>
          <div className="box">
            <i className="material-icons">add_photo_alternate</i>
            <span> Subir Archivos </span>
          </div>
          <div className="box">
            <i className="material-icons">add_photo_alternate</i>
            <span> Subir Archivos </span>
          </div>
        </div>
        <div className="box-upload">
          <span>También puedes arrastrar</span>
        </div>
      </div>
    </div>
  );
}

class Multimedia extends Component {
  handleBack = e => {
    const { setStep } = this.props;
    setStep(2);
  };

  handleNext = e => {
    const { setStep } = this.props;
    setStep(4);
  };

  render() {
    const { auth, lang, firebase } = this.props;
    return (
      <MyComponent
        lang={lang}
        countries={this.countries}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleBack={this.handleBack}
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
  { setProductInformation, setStep }
)(Multimedia);
