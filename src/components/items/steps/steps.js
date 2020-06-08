import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import "./steps.scss";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }

  return (
    <div>
      <div className="box-steps">
        <div className="steps-items">
          <span className={state.step === 1 ? "number active" : "number"}>
            1
          </span>
          <label>{t("step.categories")}</label>
        </div>
        <div className="steps-items">
          <span className={state.step === 2 ? "number active" : "number"}>
            2
          </span>
          <label>{t("step.description")}</label>
        </div>
        <div className="steps-items">
          <span className={state.step === 3 ? "number active" : "number"}>
            3
          </span>
          <label>{t("step.photos")}</label>
        </div>
        <div className="steps-items">
          <span className={state.step === 4 ? "number active" : "number"}>
            4
          </span>
          <label>{t("step.confirmation")}</label>
        </div>
      </div>
    </div>
  );
}

class Steps extends Component {
  render() {
    const { lang, step } = this.props;
    // if (auth.uid) return <Redirect to="/" />;
    return <MyComponent lang={lang} step={step}></MyComponent>;
  }
}

const mapStateToProps = state => ({
  lang: state.navar.lang,
  step: state.step.step
});

export default connect(mapStateToProps, null)(Steps);
