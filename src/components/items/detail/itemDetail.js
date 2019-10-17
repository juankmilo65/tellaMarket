import React, { Component } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import "./itemDetail.scss";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <label>Aca va el dettale del producto</label>
    </div>
  );
}

class ItemDetail extends Component {
  render() {
    const { lang } = this.props;
    return <MyComponent lang={lang}></MyComponent>;
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  lang: state.navar.lang
});

export default connect(
  mapStateToProps,
  null
)(ItemDetail);
