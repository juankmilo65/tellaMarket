import React, { Component } from "react";
import loading from "../../../images/tellamarket.gif";
import "./Spinner.css";

class Spinner extends Component {
  render() {
    return (
      <div id="cover-spin">
        <img id="img-gif" src={loading} alt="Loading TellaMarket" />
      </div>
    );
  }
}

export default Spinner;
