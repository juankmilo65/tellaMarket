import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import data from "./data";
import Card from "../../commons/carusel/card";
import "../carusel/styles/Card.css";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }
  return (
    <div>
      <button
        onClick={state.handleNextProperty}
        disabled={state.property.index === data.properties.length - 1}
      >
        Next
      </button>
      <button
        onClick={state.handlePrevProperty}
        disabled={state.property.index === 0}
      >
        Prev
      </button>

      <div className="page">
        <div className="col">
          <div
            className={
              state.main
                ? `cards-slider active-slide-${state.property.index}`
                : `cards-slider active-slide-${state.property.index}`
            }
          >
            <div
              className={
                state.main
                  ? "cards-main-slider-wrapper"
                  : "cards-slider-wrapper"
              }
              style={{
                transform: `translateX(-${state.property.index *
                  (100 / state.properties.length)}%)`
              }}
            >
              {state.properties.map(property => (
                <Card
                  key={property._id}
                  property={property}
                  main={state.main}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

class Carrusel extends Component {
  state = {
    properties: data.properties,
    property: data.properties[0]
  };

  handleNextProperty = () => {
    const newIndex = this.state.property.index + 1;
    this.setState({
      property: data.properties[newIndex]
    });
  };

  handlePrevProperty = () => {
    const newIndex = this.state.property.index - 1;
    this.setState({
      property: data.properties[newIndex]
    });
  };

  render() {
    const { auth, lang, main } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <MyComponent
        handleNextProperty={this.handleNextProperty}
        handlePrevProperty={this.handlePrevProperty}
        property={this.state.property}
        properties={this.state.properties}
        lang={lang}
        main={main}
      />
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
    null
  )
)(Carrusel);
