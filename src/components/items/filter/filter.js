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
    <div className="filter">
      <div className="order">
        <label className="title-filter">Ordernar por</label>
        <Select options={state.filters.orderBy} />
      </div>
      <div className="category">
        <label className="title-filter">Categoria</label>
        {state.filters.categories != null &&
          state.filters.categories.map(item => {
            return (
              <div className="item-category" key={item.id}>
                <label>{item.category}</label><span>(5)</span>
              </div>
            );
          })}
      </div>
      <div className="price">
        <label className="title-filter">Precios</label>
        {/* <div>
          <label>{state.filters.prices.minimun}</label>
        </div>
        <div>
          <label>{state.filters.prices.maximun}</label>
        </div> */}
        <div className="inputs-price">
          <input type="text" placeholder="Minimo"/>
          <span>-</span>
          <input type="text"  placeholder="Máximo"/>
          <a href=""><i className="material-icons">chevron_right</i></a>
        </div>
      </div>
      <div className="year">
        <label  className="title-filter">Año</label>
        {state.filters.years != null &&
          state.filters.years.map(item => {
            return (
              <div key={item.id} className="item-year">
                <label>{item.year}</label><span>(5)</span>
              </div>
            );
          })}
        <div className="d-flex mt-2">
          <select className="select-tella" name="select">
            <option value="value1" selected>Desde</option> 
            <option value="value2">2000</option>
            <option value="value3">2001</option>
          </select>
          <select className="select-tella" name="select">
            <option value="value1" selected>Hasta</option> 
            <option value="value2">2018</option>
            <option value="value3">2019</option>
          </select>
        </div>

        {/* <label>{state.filters.yearRange.lastYear}</label>
        <label>{state.filters.yearRange.newYear}</label> */}

      </div>
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
