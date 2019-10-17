import React, { Component } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./itemList.scss";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }

  return (
    <div>
      <label>Aca va el listado de los filtros</label>

      {state.items != null &&
        state.items.map(item => {
          return (
            <div key={item.id}>
              <label>{item.name}</label>
              <label>{item.year}</label>
              <button onClick={state.setRedirect}>Ver mas</button>
            </div>
          );
        })}
      {state.renderRedirect()}
    </div>
  );
}

class ItemList extends Component {
  state = {
    redirect: false
  };
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/itemDetail" />;
    }
  };

  render() {
    const { lang } = this.props;

    const items = [
      {
        id: 1,
        name: "Item 1",
        year: "1998"
      },
      {
        id: 2,
        name: "Item 2",
        year: "2005"
      }
    ];
    return (
      <MyComponent
        lang={lang}
        setRedirect={this.setRedirect}
        renderRedirect={this.renderRedirect}
        items={items}
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
  null
)(ItemList);
