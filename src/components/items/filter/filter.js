import React, { Component } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import Select from "react-select";
import "./filter.scss";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }

  return (
    <div>
      <label>Aca van los filtros</label>
      <br />
      <label>Ordernar por</label>
      <Select options={state.filters.orderBy} />
      <br />
      <label>Categorias</label>
      {state.filters.categories != null &&
        state.filters.categories.map(item => {
          return (
            <div key={item.id}>
              <label>{item.category}</label>
            </div>
          );
        })}
      <br />
      <label>Precios</label>
      <label>{state.filters.prices.minimun}</label>
      <label>{state.filters.prices.maximun}</label>
      <br />

      <label>Año</label>
      {state.filters.years != null &&
        state.filters.years.map(item => {
          return (
            <div key={item.id}>
              <label>{item.year}</label>
            </div>
          );
        })}
      <label>Rango año</label>
      <label>{state.filters.yearRange.lastYear}</label>
      <label>{state.filters.yearRange.newYear}</label>
    </div>
  );
}

class Filter extends Component {
  render() {
    const { lang } = this.props;

    const filters = {
      orderBy: [
        { value: "1", label: "Ultimos Agregados" },
        { value: "2", label: "Cliente 5 estrellas" }
      ],
      categories: [
        { id: 1, category: "category 1" },
        { id: 1, category: "category 1" },
        { id: 1, category: "category 1" }
      ],
      prices: {
        minimun: "200",
        maximun: "50000"
      },
      years: [
        { id: 1, year: "1988" },
        { id: 3, year: "2002" },
        { id: 3, year: "2009" }
      ],
      yearRange: {
        lastYear: "1988",
        newYear: "2019"
      }
    };

    return <MyComponent lang={lang} filters={filters}></MyComponent>;
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  lang: state.navar.lang
});

export default connect(
  mapStateToProps,
  null
)(Filter);
