import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { useTranslation } from "react-i18next";
import { DateTimePicker } from "react-widgets";
import { setProductInformation } from "../controlDataItem/actions/controlDataItemActions";
import { setStep } from "../../items/steps/actions/stepsActions";
import axios from "axios";
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
          <button className="btns btn-go" onClick={state.handleSubmit}>
            {t("buttons.next")}
          </button>
        </div>
      </div>
      <div className="upload-image">
        <div className="box-group">
          <label class="box active custom-file-upload">
            <input type="file" onChange={state.handleUpload} />
            <i className="material-icons">add_photo_alternate</i>
            <span>{t("multimedia.uploadFiles")}</span>
          </label>

          {state.selectedFiles != null &&
            state.selectedFiles.map(file => {
              return (
                <div key={file.id} className="box">
                  <span>
                    <img src={file.preview}></img>
                  </span>
                </div>
              );
            })}
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
    picture: "",
    selectedFiles: [],
    previews: []
  };
  handleSubmit = () => {
    const fd = new FormData();
    fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
    axios
      .post(
        "https://us-central1-tellamachines.cloudfunctions.net/uploadFile",
        fd
      )
      .then(res => {
        console.log(res);
      });
  };

  handleUpload = e => {
    e.preventDefault();
    let images = [];

    let objImage = {
      id: 0,
      image: "",
      preview: ""
    };

    const { selectedFiles } = this.state;

    if (selectedFiles.length === 0) {
      objImage.id = images.length === 0 ? 0 : images[images.length - 1].id + 1;
      objImage.image = e.target.files[0];
      objImage.preview = URL.createObjectURL(e.target.files[0]);

      images.push(objImage);
    } else {
      selectedFiles.map(image => {
        images.push(image);
      });

      objImage.id = images.length === 0 ? 0 : images[images.length - 1].id + 1;
      objImage.image = e.target.files[0];
      objImage.preview = URL.createObjectURL(e.target.files[0]);

      images.push(objImage);
    }

    this.setState({ selectedFiles: images });
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
        selectedFiles={this.state.selectedFiles}
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
