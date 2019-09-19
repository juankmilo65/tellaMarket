import React, { Component } from "react";
import { connect } from "react-redux";
import Carousel from "react-bootstrap/Dropdown";
import { setLanguage } from "../../layout/actions/navarActions";
import spain from "../../../images/spanish.jpeg";

const options = [
  { label: "EN", value: "en" },
  { label: "ES", value: "es" },
  { label: "PT", value: "pt" }
];

class dropdown extends Component {
  handleLanguage = e => {
    this.props.setLanguage(e);
  };
  render() {
    const { lang } = this.props;

    return (
      <select
        onChange={this.handleLanguage}
        className={
          lang === "en"
            ? "<img src=" + { spain } + "/> English"
            : '<span className="flag-icon flag-icon-mx"></span> Español'
        }
        data-width="fit"
      >
        <option
          id="es"
          data-content='<span className="flag-icon flag-icon-us"></span> English'
        >
          English
        </option>
        <option
          id="en"
          data-content='<span className="flag-icon flag-icon-mx"></span> Español'
        >
          Español
        </option>
      </select>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.navar.lang
  };
};

export default connect(
  mapStateToProps,
  { setLanguage }
)(dropdown);
