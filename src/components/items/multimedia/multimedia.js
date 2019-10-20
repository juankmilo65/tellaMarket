import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { useTranslation } from "react-i18next";
import { setMultimedia } from "../controlDataItem/actions/controlDataItemActions";
import { setStep } from "../../items/steps/actions/stepsActions";
import Popup from "reactjs-popup";
import warning from "../../../images/triangle.svg";
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
          <button className="btns btn-go" onClick={state.handleNext}>
            {t("buttons.next")}
          </button>
        </div>
      </div>
      <div className="upload-image">
        <div className="box-group">
          <label className="box active custom-file-upload">
            <input type="file" onChange={state.handleUpload} />
            <i className="material-icons">add_photo_alternate</i>
            <span>{t("multimedia.uploadFiles")}</span>
          </label>

          {state.selectedFiles != null &&
            state.selectedFiles.map(file => {
              return (
                <div key={file.id} className="box">
                  <button
                    className="remove"
                    onClick={() => state.handleRemoveImage(file.id)}
                  >
                    <i className="material-icons">close</i>
                  </button>
                  <span className="img-preview">
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
      <Popup
        modal
        open={state.showModal}
        closeOnDocumentClick={false}
        className="modal-alert"
      >
        <img src={warning} className="img-alert" />
        <h3>¡Error!</h3>
        <span className="text-alert">{t("errors.numberOfPhotos")}</span>
        <button className="btns btn-go" onClick={state.handleOkError}>
          {t("errors.ok")}
        </button>
      </Popup>
    </div>
  );
}

class Multimedia extends Component {
  state = {
    showModal: false,
    columnOne: [],
    uploadValue: 0,
    picture: "",
    selectedFiles: [],
    previews: []
  };
  handleNext = e => {
    const { selectedFiles } = this.state;
    const { setStep, setMultimedia } = this.props;

    if (selectedFiles.length < 4) {
      this.setState({
        ["showModal"]: true
      });
    } else {
      setMultimedia(this.state.selectedFiles);
      setStep(4);
    }
  };

  handleOkError = e => {
    this.setState({
      ["showModal"]: false
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

  handleRemoveImage = id => {
    const { selectedFiles } = this.state;
    const newImageList = this.remove(selectedFiles, id);
    this.setState({ ["selectedFiles"]: newImageList });
  };

  remove(array, id) {
    return array.filter(el => el.id !== id);
  }
  render() {
    const { auth, lang, multimedia } = this.props;
    if (
      this.state["selectedFiles"].length === 0 &&
      multimedia.length !== undefined
    ) {
      this.setState({ ["selectedFiles"]: multimedia });
    }

    return (
      <MyComponent
        lang={lang}
        countries={this.countries}
        handleChange={this.handleChange}
        handleNext={this.handleNext}
        handleBack={this.handleBack}
        uploadValue={this.state.uploadValue}
        picture={this.state.picture}
        handleUpload={this.handleUpload}
        selectedFiles={this.state.selectedFiles}
        handleOkError={this.handleOkError}
        showModal={this.state.showModal}
        handleRemoveImage={this.handleRemoveImage}
      ></MyComponent>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  lang: state.navar.lang,
  multimedia: state.dataItem.multimedia
});

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    { setMultimedia, setStep }
  )
)(Multimedia);
