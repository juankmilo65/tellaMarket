import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { useTranslation } from "react-i18next";
import { setStep } from "../../items/steps/actions/stepsActions";
import axios from "axios";
import "./plans.scss";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }

  return (
    <div className="box-product mt-1 mb-1">
      <div className="title-box">
        <div className="d-flex">
          <button onClick={state.handleBack}>Back</button>
        </div>
      </div>
      <div className="title-box">
        <div className="d-flex">
          <button onClick={state.handleSave}>CreateItem</button>
        </div>
      </div>
    </div>
  );
}

class Plans extends Component {
  state = {};
  handleSave = () => {
    const { dataItem } = this.props;

    const fd = new FormData();
    fd.append(
      "image",
      dataItem.selectedFiles[0],
      dataItem.selectedFiles[0].name
    );
    axios
      .post(
        "https://us-central1-tellamachines.cloudfunctions.net/uploadFile",
        fd
      )
      .then(res => {
        console.log(res);
      });
  };

  handleBack = e => {
    const { setStep } = this.props;
    setStep(3);
  };

  render() {
    const { auth, lang } = this.props;
    return (
      <MyComponent
        lang={lang}
        handleBack={this.handleBack}
        handleSave={this.handleSave}
      ></MyComponent>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  lang: state.navar.lang,
  dataItem: state.dataItem.productInformation
});

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    { setStep }
  )
)(Plans);
