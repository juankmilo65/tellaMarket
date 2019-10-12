import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
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
        <label>{t("multimedia.title")}</label>
        <div className="d-flex">
          <button className="btns btn-se mr-3" onClick={state.handleBack}>
            {t("buttons.back")}
          </button>
          <button className="btns btn-go">{t("buttons.next")}</button>
        </div>
      </div>
      <div className="upload-image">
        <div className="box-group">
          <div className="box active">
            <i className="material-icons">add_photo_alternate</i>
            <span>{t("multimedia.uploadFiles")}</span>
            <input type="file" onChange={state.handleUpload}></input>
            <progress value={state.uploadValue} max="100"></progress>
          </div>
          <div className="box">
            <i className="material-icons">add_photo_alternate</i>
            <span>{t("multimedia.uploadFiles")}</span>
            <img width="320" src={state.picture}></img>
          </div>
          <div className="box">
            <i className="material-icons">add_photo_alternate</i>
            <span>{t("multimedia.uploadFiles")}</span>
          </div>
          <div className="box">
            <i className="material-icons">add_photo_alternate</i>
            <span>{t("multimedia.uploadFiles")}</span>
          </div>
          <div className="box">
            <i className="material-icons">add_photo_alternate</i>
            <span>{t("multimedia.uploadFiles")}</span>
          </div>
        </div>
        <div className="box-upload">
          <span>{t("multimedia.drag&drop")}</span>
        </div>
      </div>
    </div>
  );
}

class Multimedia extends Component {
  state = {
    uploadValue: 0,
    picture: ""
  };

  handleUpload = e => {
    e.preventDefault();

    const { props } = this;
    const { firebase } = props;
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref(`/galeria/${file.name}`);
    const task = storageRef.put(file);
    task.on(
      "state_changed",
      snapshot => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({
          ["uploadValue"]: percentage
        });
      },
      () => {
        this.setState({
          ["picture"]: task.snapshot.downloadURL
        });
      }
    );
  };

  handleBack = e => {
    const { setStep } = this.props;
    setStep(2);
  };

  handleNext = e => {
    const { setStep } = this.props;
    setStep(4);
  };

  render() {
    const { auth, lang } = this.props;
    return (
      <MyComponent
        lang={lang}
        countries={this.countries}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleBack={this.handleBack}
        uploadValue={this.state.uploadValue}
        picture={this.state.picture}
        handleUpload={this.handleUpload}
      ></MyComponent>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  lang: state.navar.lang
});

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    { setProductInformation, setStep }
  )
)(Multimedia);
