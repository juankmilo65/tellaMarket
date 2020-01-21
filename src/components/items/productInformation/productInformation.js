import React, { Component, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  setProductInformation,
  translation
} from "../controlDataItem/actions/controlDataItemActions";
import { apiServices } from "../../../config/constants";
import { default as NumberFormat } from "react-number-format";
import { setStep } from "../../items/steps/actions/stepsActions";
import $ from "jquery";
import "bootstrap-datepicker/dist/js/bootstrap-datepicker.js";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.css";
import "./productInformation.scss";
import { Currency } from "../../../config/currency";
import { getRates } from "../../commons/select/actions/ratesActions";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }

  return (
    <div className="box-product mt-1 mb-1">
      <form onSubmit={state.handleSubmit}>
        <div className="title-box">
          <label>{t("productInformation.title")}</label>
          <div className="d-flex">
            <button className="btns btn-se mr-3" onClick={state.handleBack}>
              {t("productInformation.back")}
            </button>
            <button className="btns btn-go">
              {t("productInformation.next")}
            </button>
          </div>
        </div>

        <div className="item-form">
          <div className="form-group input-tella">
            <label htmlFor="productName" className="is-required">
              {t("productInformation.productName")}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={t("productInformation.machineNamePlaceHolder")}
              id="productName"
              onChange={state.handleChangeTest}
              value={state.state.productName}
            />
            {state.state.errors.productName === true ? (
              <p className="text-required">{t("errors.requiredField")}</p>
            ) : (
              <p></p>
            )}
          </div>
        </div>
        <div className="item-form">
          <div className="form-group input-tella">
            <label htmlFor="brand" className="is-required">
              {t("productInformation.brand")}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={t("productInformation.referencePlaceHolder")}
              id="brand"
              onChange={state.handleChangeTest}
              value={state.state.brand}
            />
            {state.state.errors.brand === true ? (
              <p className="text-required">{t("errors.requiredField")}</p>
            ) : (
              <p></p>
            )}
          </div>
          <div className="form-group input-tella">
            <label htmlFor="model" className="is-required">
              {t("productInformation.model")}
            </label>
            <input
              id="model"
              type="text"
              className="form-control"
              placeholder={t("productInformation.modelPlaceHolder")}
              onChange={state.handleChangeTest}
              value={state.state.model}
            />
            {state.state.errors.model === true ? (
              <p className="text-required">{t("errors.requiredField")}</p>
            ) : (
              <p></p>
            )}
          </div>
          <div className="form-group input-tella">
            <label htmlFor="currency" className="is-required">
              {t("productInformation.currency")}
            </label>
            <select
              className="form-control"
              id="currency"
              onChange={state.handleChangeTest}
              value={state.state.currencyId}
            >
              <option key="-" value="-1">
                -
              </option>
              {state.currencies.map(currency => {
                return (
                  <option key={currency.currency} value={currency.currency}>
                    {currency.symbol} {currency[state.lang.value]}
                  </option>
                );
              })}
            </select>
            {state.state.errors.currency === true ? (
              <p className="text-required">{t("errors.requiredField")}</p>
            ) : (
              <p></p>
            )}
          </div>

          <div className="form-group input-tella">
            <label htmlFor="price" className="is-required">
              {t("productInformation.price")}
            </label>
            <NumberFormat
              className="form-control"
              id="price"
              thousandSeparator={true}
              value={state.state.price}
              onChange={state.handleChangeTest}
            />
            {state.state.errors.price === true ? (
              <p className="text-required">{t("errors.requiredField")}</p>
            ) : (
              <p></p>
            )}
          </div>
        </div>

        <div className="item-form">
          <div className="form-group input-tella input-icon">
            <label htmlFor="year" className="is-required">
              {t("productInformation.year")}
            </label>
            <input
              type="text"
              id="year"
              className="form-control"
              //onChangeCapture={state.handleChangeTest}
              // onChange={state.handleChangeTest}
              defaultValue={state.state.year}
              autoComplete="off"
            />
            {/* <i className="material-icons icon-calendar">today</i> */}
            {state.state.errors.year === true ? (
              <p className="text-required">{t("errors.requiredField")}</p>
            ) : (
              <p></p>
            )}
          </div>
          <div className="form-group input-tella">
            <label htmlFor="conservationState" className="is-required">
              {t("productInformation.conservationState")}
            </label>
            {state.lang.value === "en" ? (
              <select
                className="form-control"
                id="conservationState"
                onChange={state.handleChangeTest}
                value={state.state.conservationState}
              >
                <option value="-1">-</option>
                <option value="1">New</option>
                <option value="2">Secondhand</option>
              </select>
            ) : (
              <select
                className="form-control"
                id="conservationState"
                onChange={state.handleChangeTest}
                value={state.state.conservationState}
              >
                <option value="-1">-</option>
                <option value="1">Nuevo</option>
                <option value="2">Usado</option>
              </select>
            )}
            {state.state.errors.conservationState === true ? (
              <p className="text-required">{t("errors.requiredField")}</p>
            ) : (
              <p></p>
            )}
          </div>
          <div className="form-group input-tella">
            <label htmlFor="location" className="is-required">
              {t("productInformation.location")}
            </label>
            <select
              className="form-control"
              id="location"
              onChange={state.handleChangeTest}
              value={state.state.locationId}
            >
              {state.countries.map(country => {
                return (
                  <option key={country.id} value={country.id}>
                    {country.country}
                  </option>
                );
              })}
            </select>
            {state.state.errors.location === true ? (
              <p className="text-required">{t("errors.requiredField")}</p>
            ) : (
              <p></p>
            )}
          </div>
        </div>
        <div className="item-form">
          <div className="form-group input-tella">
            <label htmlFor="phone" className="is-required">
              {t("productInformation.phone")}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={t("productInformation.phonePlaceholder")}
              id="phone"
              onChange={state.handleChangeTest}
              value={state.state.phone}
            />
            {state.state.errors.phone === true ? (
              <p className="text-required">{t("errors.requiredField")}</p>
            ) : (
              <p></p>
            )}
          </div>
          <div className="form-group input-tella">
            <label htmlFor="email" className="is-required">
              {t("productInformation.email")}
            </label>
            <input
              id="email"
              type="text"
              className="form-control"
              placeholder={t("productInformation.emailPlaceholder")}
              onChange={state.handleChangeTest}
              value={state.state.email}
            />
            {state.state.errors.email === true ? (
              <p className="text-required">{t("errors.requiredField")}</p>
            ) : (
              <p></p>
            )}
          </div>
        </div>

        <div className="item-form">
          <div className="form-group input-tella">
            <label htmlFor="description" className="is-required">
              {t("productInformation.description")}
            </label>
            <textarea
              id="description"
              type="text"
              className="form-control"
              rows="3"
              placeholder={t("productInformation.descriptionPlaceHolder")}
              onChange={state.handleChangeTest}
              value={state.state.description}
            ></textarea>
            {state.state.errors.description === true ? (
              <p className="text-required">{t("errors.requiredField")}</p>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

class ProductInformation extends Component {
  state = {
    rates: null,
    comeback: false,
    productName: "",
    brand: "",
    year: "",
    model: "",
    conservationState: "",
    location: "",
    locationId: "",
    description: "",
    price: "",
    currency: "",
    currencyId: "",
    phone: "",
    email: "",
    errors: {
      productName: false,
      brand: false,
      year: false,
      model: false,
      conservationState: false,
      location: false,
      currency: false,
      price: false,
      description: false,
      phone: false,
      email: false
    }
  };

  validateError = () => {
    const {
      productName,
      brand,
      year,
      model,
      conservationState,
      location,
      description,
      currency,
      price,
      phone,
      email
    } = this.state;
    const error = {
      productName: false,
      brand: false,
      year: false,
      model: false,
      conservationState: false,
      location: false,
      description: false,
      currency: false,
      price: false,
      phone: false,
      email: false
    };

    if (email === "") {
      error.email = true;
    }
    if (phone === "") {
      error.phone = true;
    }
    if (price === "") {
      error.price = true;
    }
    if (productName === "") {
      error.productName = true;
    }
    if (brand === "") {
      error.brand = true;
    }
    if (year === "") {
      error.year = true;
    }
    if (model === "") {
      error.model = true;
    }
    if (conservationState === -1 || conservationState === "") {
      error.conservationState = true;
    }
    if (description === -1 || description === "") {
      error.description = true;
    }
    if (location === "-" || location === "") {
      error.location = true;
    }
    if (currency === "-" || currency === "") {
      error.currency = true;
    }

    this.setState({ ["errors"]: error }, function() {
      const { errors } = this.state;

      if (
        errors.productName === false &&
        errors.brand === false &&
        errors.year === false &&
        errors.model === false &&
        errors.conservationState === false &&
        errors.location === false &&
        errors.description === false &&
        errors.currency === false &&
        errors.price === false &&
        errors.phone === false &&
        errors.email === false
      ) {
        const { setStep } = this.props;
        this.handleSetProductInformation();
        setStep(3);
      }
    });
  };

  countries = [
    { id: -1, country: "-" },
    { id: 1, country: "Afganistan" },
    { id: 2, country: "Albania" },
    { id: 3, country: "Alemania" },
    { id: 4, country: "Andorra" },
    { id: 5, country: "Angola" },
    { id: 6, country: "Antartida" },
    { id: 7, country: "Antigua y Barbuda" },
    { id: 8, country: "Arabia Saudi" },
    { id: 9, country: "Argelia" },
    { id: 10, country: "Argentina" },
    { id: 11, country: "Armenia" },
    { id: 12, country: "Australia" },
    { id: 13, country: "Austria" },
    { id: 14, country: "Azerbaiyan" },
    { id: 15, country: "Bahamas" },
    { id: 16, country: "Bahrain" },
    { id: 17, country: "Bangladesh" },
    { id: 18, country: "Barbados" },
    { id: 19, country: "Belgica" },
    { id: 20, country: "Belice" },
    { id: 21, country: "Benin" },
    { id: 22, country: "Bermudas" },
    { id: 23, country: "Bielorrusia" },
    { id: 24, country: "Birmania Myanmar" },
    { id: 25, country: "Bolivia" },
    { id: 26, country: "Bosnia y Herzegovina" },
    { id: 27, country: "Botswana" },
    { id: 28, country: "Brasil" },
    { id: 29, country: "Brunei" },
    { id: 30, country: "Bulgaria" },
    { id: 31, country: "Burkina Faso" },
    { id: 32, country: "Burundi" },
    { id: 33, country: "Butan" },
    { id: 34, country: "Cabo Verde" },
    { id: 35, country: "Camboya" },
    { id: 36, country: "Camerun" },
    { id: 37, country: "Canada" },
    { id: 38, country: "Chad" },
    { id: 39, country: "Chile" },
    { id: 40, country: "China" },
    { id: 41, country: "Chipre" },
    { id: 42, country: "Colombia" },
    { id: 43, country: "Comores" },
    { id: 44, country: "Congo" },
    { id: 45, country: "Corea del Norte" },
    { id: 46, country: "Corea del Sur" },
    { id: 47, country: "Costa de Marfil" },
    { id: 48, country: "Costa Rica" },
    { id: 49, country: "Croacia" },
    { id: 50, country: "Cuba" },
    { id: 51, country: "Dinamarca" },
    { id: 52, country: "Dominica" },
    { id: 53, country: "Djibouti" },
    { id: 54, country: "Ecuador" },
    { id: 55, country: "Egipto" },
    { id: 56, country: "El Salvador" },
    { id: 57, country: "El Vaticano" },
    { id: 58, country: "Emiratos arabes Unidos" },
    { id: 59, country: "Eritrea" },
    { id: 60, country: "Eslovaquia" },
    { id: 61, country: "Eslovenia" },
    { id: 62, country: "España" },
    { id: 63, country: "Estados Unidos" },
    { id: 64, country: "Estonia" },
    { id: 65, country: "Etiopia" },
    { id: 66, country: "Filipinas" },
    { id: 67, country: "Finlandia" },
    { id: 68, country: "Fiji" },
    { id: 69, country: "Francia" },
    { id: 70, country: "Gabon" },
    { id: 71, country: "Gambia" },
    { id: 72, country: "Georgia" },
    { id: 73, country: "Ghana" },
    { id: 74, country: "Gibraltar" },
    { id: 75, country: "Granada" },
    { id: 76, country: "Grecia" },
    { id: 77, country: "Guam" },
    { id: 78, country: "Guatemala" },
    { id: 79, country: "Guinea" },
    { id: 80, country: "Guinea Ecuatorial" },
    { id: 81, country: "Guinea Bissau" },
    { id: 82, country: "Guyana" },
    { id: 83, country: "Haiti" },
    { id: 84, country: "Honduras" },
    { id: 85, country: "Hungria" },
    { id: 86, country: "India" },
    { id: 87, country: "Indian Ocean" },
    { id: 88, country: "Indonesia" },
    { id: 89, country: "Iran" },
    { id: 90, country: "Iraq" },
    { id: 91, country: "Irlanda" },
    { id: 92, country: "Islandia" },
    { id: 93, country: "Israel" },
    { id: 94, country: "Italia" },
    { id: 95, country: "Jamaica" },
    { id: 96, country: "Japon" },
    { id: 97, country: "Jersey" },
    { id: 98, country: "Jordania" },
    { id: 99, country: "Kazajstan" },
    { id: 101, country: "Kenia" },
    { id: 102, country: "Kirguistan" },
    { id: 103, country: "Kiribati" },
    { id: 104, country: "Kuwait" },
    { id: 105, country: "Laos" },
    { id: 106, country: "Lesoto" },
    { id: 107, country: "Letonia" },
    { id: 108, country: "Libano" },
    { id: 109, country: "Liberia" },
    { id: 110, country: "Libia" },
    { id: 111, country: "Liechtenstein" },
    { id: 112, country: "Lituania" },
    { id: 113, country: "Luxemburgo" },
    { id: 114, country: "Macedonia" },
    { id: 115, country: "Madagascar" },
    { id: 116, country: "Malasia" },
    { id: 117, country: "Malawi" },
    { id: 118, country: "Maldivas" },
    { id: 119, country: "Mali" },
    { id: 120, country: "Malta" },
    { id: 121, country: "Marruecos" },
    { id: 122, country: "Mauricio" },
    { id: 123, country: "Mauritania" },
    { id: 124, country: "Mexico" },
    { id: 125, country: "Micronesia" },
    { id: 126, country: "Moldavia" },
    { id: 127, country: "Monaco" },
    { id: 128, country: "Mongolia" },
    { id: 129, country: "Montserrat" },
    { id: 130, country: "Mozambique" },
    { id: 131, country: "Namibia" },
    { id: 132, country: "Nauru" },
    { id: 133, country: "Nepal" },
    { id: 134, country: "Nicaragua" },
    { id: 135, country: "Niger" },
    { id: 136, country: "Nigeria" },
    { id: 137, country: "Noruega" },
    { id: 138, country: "Nueva Zelanda" },
    { id: 139, country: "Oman" },
    { id: 140, country: "Paises Bajos" },
    { id: 141, country: "Pakistan" },
    { id: 142, country: "Palau" },
    { id: 143, country: "Panama" },
    { id: 144, country: "Papua Nueva Guinea" },
    { id: 145, country: "Paraguay" },
    { id: 146, country: "Peru" },
    { id: 147, country: "Polonia" },
    { id: 148, country: "Portugal" },
    { id: 149, country: "Puerto Rico" },
    { id: 150, country: "Qatar" },
    { id: 151, country: "Reino Unido" },
    { id: 152, country: "Republica Centroafricana" },
    { id: 153, country: "Republica Checa" },
    { id: 154, country: "Republica Democratica del Congo" },
    { id: 155, country: "Republica Dominicana" },
    { id: 156, country: "Ruanda" },
    { id: 157, country: "Rumania" },
    { id: 158, country: "Rusia" },
    { id: 159, country: "Sahara Occidental" },
    { id: 160, country: "Samoa" },
    { id: 161, country: "San Cristobal y Nevis" },
    { id: 162, country: "San Marino" },
    { id: 163, country: "San Vicente y las Granadinas" },
    { id: 164, country: "Santa Lucia" },
    { id: 165, country: "Santo Tome y Principe" },
    { id: 166, country: "Senegal" },
    { id: 167, country: "Seychelles" },
    { id: 168, country: "Sierra Leona" },
    { id: 169, country: "Singapur" },
    { id: 170, country: "Siria" },
    { id: 171, country: "Somalia" },
    { id: 172, country: "Southern Ocean" },
    { id: 173, country: "Sri Lanka" },
    { id: 174, country: "Swazilandia" },
    { id: 175, country: "Sudafrica" },
    { id: 176, country: "Sudan" },
    { id: 177, country: "Suecia" },
    { id: 178, country: "Suiza" },
    { id: 179, country: "Surinam" },
    { id: 180, country: "Tailandia" },
    { id: 181, country: "Taiwan" },
    { id: 182, country: "Tanzania" },
    { id: 183, country: "Tayikistan" },
    { id: 184, country: "Togo" },
    { id: 185, country: "Tokelau" },
    { id: 186, country: "Tonga" },
    { id: 187, country: "Trinidad y Tobago" },
    { id: 188, country: "Tunez" },
    { id: 189, country: "Turkmekistan" },
    { id: 190, country: "Turquia" },
    { id: 191, country: "Tuvalu" },
    { id: 192, country: "Ucrania" },
    { id: 193, country: "Uganda" },
    { id: 194, country: "Uruguay" },
    { id: 195, country: "Uzbekistan" },
    { id: 196, country: "Vanuatu" },
    { id: 197, country: "Venezuela" },
    { id: 198, country: "Vietnam" },
    { id: 199, country: "Yemen" },
    { id: 200, country: "Zambia" },
    { id: 201, country: "Zimbabue" }
  ];

  handleBack = e => {
    const { setStep } = this.props;
    this.handleSetProductInformation();
    setStep(1);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.validateError();
  };

  handleSetProductInformation = async () => {
    const { setProductInformation, translation, rates } = this.props;
    const {
      productName,
      brand,
      year,
      model,
      conservationState,
      location,
      locationId,
      currencyId,
      description,
      currency,
      phone,
      email
    } = this.state;

    let spanishDescription = "";
    let englishDescription = "";
    //let currentCurrencyInDollars = rates[currencyId];
    const currentValue = document
      .getElementById("price")
      .value.split(",")
      .join("");
    // const currentValueInDollars = Math.round(
    //   currentValue / currentCurrencyInDollars
    // );
    // var prices = new Object();

    // Object.keys(rates).map(rate => {
    //   let value = rates[rate];

    //   prices[rate] = currentValueInDollars * value;
    // });

    englishDescription = await this.handleTranslate("es", "en", description);
    spanishDescription = await this.handleTranslate("en", "es", description);

    var obj = new Object();
    obj["productName"] = productName;
    obj["brand"] = brand;
    obj["year"] = year;
    obj["model"] = model;
    obj["conservationState"] = conservationState;
    obj["location"] = location;
    obj["locationId"] = locationId;
    obj["currencyId"] = currencyId;
    obj["spanishDescription"] = spanishDescription;
    obj["englishDescription"] = englishDescription;
    obj["description"] = englishDescription + "|" + spanishDescription;
    obj["currency"] = currency;
    obj["price"] = currentValue;
    obj["internationalPrices"] = currentValue;
    //obj["internationalPrices"] = prices;
    obj["phone"] = phone;
    obj["email"] = email;

    setProductInformation(obj);

    this.setState({ comeback: true });
  };

  handleChangeTest = e => {
    const { lang } = this.props;
    if (document.getElementById(e.target.id).value !== "") {
      const { errors } = this.state;
      errors[e.target.id] = false;
      this.setState({ ["errors"]: errors });
    }

    if (
      e.target.labels !== undefined &&
      (e.target.labels[0].innerHTML === "Local currency" ||
        e.target.labels[0].innerHTML === "Moneda local")
    ) {
      if (e.target.value === "-1") {
        this.setState({ [e.target.id]: "-" });
        this.setState({ ["currencyId"]: "-1" });
      } else {
        let symbol = Currency.find(
          c => c.currency.toString() === e.target.value
        ).symbol;
        let currencyName = Currency.find(
          c => c.currency.toString() === e.target.value
        )[lang.value];
        this.setState({ [e.target.id]: symbol + " " + currencyName });
        this.setState({ ["currencyId"]: e.target.value });
      }
    }
    if (
      e.target.labels !== undefined &&
      (e.target.labels[0].innerHTML === "Location" ||
        e.target.labels[0].innerHTML === "Localización")
    ) {
      let text = this.countries.find(c => c.id.toString() === e.target.value)
        .country;
      this.setState({ [e.target.id]: text });
      this.setState({ ["locationId"]: e.target.value });
    } else if (document.getElementById(e.target.id).value === "-1") {
      this.setState({ [e.target.id]: "" });
    } else {
      this.setState({
        [e.target.id]: document.getElementById(e.target.id).value
      });
    }
  };

  async handleTranslate(originalLanguaje, newLanguaje, text) {
    return await fetch(
      apiServices +
        "/trastalion?originalLanguaje=" +
        originalLanguaje +
        "&newLanguaje=" +
        newLanguaje +
        "&texto=" +
        text,
      {
        mode: "cors",
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8"
        })
      }
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        return data;
      });
  }

  componentDidMount() {
    var _ = this;
    $("#year")
      .datepicker({
        format: "yyyy",
        viewMode: "years",
        minViewMode: "years",
        autoclose: true,
        maxDate: "+1M +10D"
      })
      .on("change", function() {
        var obj = {
          target: { id: "year" }
        };

        _.handleChangeTest(obj);
      });

    const { getRates, rates } = _.props;

    if (rates === null) {
      getRates();
    }
  }

  render() {
    const { comeback } = this.state;
    const {
      auth,
      lang,
      productInformation,
      setProductInformation
    } = this.props;

    Object.keys(productInformation).map(info => {
      if (this.state[info] !== productInformation[info]) {
        this.setState({ [info]: productInformation[info] });
      }
    });

    if (Object.keys(productInformation).length > 0) {
      var obj = new Object();
      setProductInformation(obj);
    }

    return (
      <MyComponent
        currencies={Currency}
        lang={lang}
        countries={this.countries}
        handleChange={this.handleChange}
        handleChangePrice={this.handleChangePrice}
        handleChangeTest={this.handleChangeTest}
        handleSubmit={this.handleSubmit}
        handleBack={this.handleBack}
        state={this.state}
      ></MyComponent>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.signin.auth,
  lang: state.navar.lang,
  productInformation: state.dataItem.productInformation,
  //rates: state.rate.rates,
  translation: state.dataItem.translation
});

export default connect(mapStateToProps, {
  setProductInformation,
  translation,
  setStep,
  getRates
})(ProductInformation);
