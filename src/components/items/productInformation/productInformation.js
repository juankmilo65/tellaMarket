import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { DateTimePicker } from "react-widgets";
import { setProductInformation } from "../controlDataItem/actions/controlDataItemActions";
import { setStep } from "../../items/steps/actions/stepsActions";
import "./productInformation.scss";
import { of } from "rxjs";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }

  const pStyle = {
    color: "red"
  };

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
            <label htmlFor="productName">
              {t("productInformation.productName")}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={t("productInformation.machineNamePlaceHolder")}
              id="productName"
              onChange={state.handleChange}
              value={state.state.productName}
            />
            {state.state.errors.productName === true ? (
              <p style={pStyle}>{t("errors.requiredField")}</p>
            ) : (
              <p></p>
            )}
          </div>
        </div>
        <div className="item-form">
          <div className="form-group input-tella">
            <label htmlFor="brand">{t("productInformation.brand")}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t("productInformation.referencePlaceHolder")}
              id="brand"
              onChange={state.handleChange}
              value={state.state.brand}
            />
            {state.state.errors.brand === true ? (
              <p style={pStyle}>{t("errors.requiredField")}</p>
            ) : (
              <p></p>
            )}
          </div>
          <div className="form-group input-tella">
            <label htmlFor="model">{t("productInformation.model")}</label>
            <input
              id="model"
              type="text"
              className="form-control"
              placeholder={t("productInformation.modelPlaceHolder")}
              onChange={state.handleChange}
              value={state.state.model}
            />
            {state.state.errors.model === true ? (
              <p style={pStyle}>{t("errors.requiredField")}</p>
            ) : (
              <p></p>
            )}
          </div>
        </div>
        <div className="item-form">
          <div className="form-group input-tella input-icon">
            <label htmlFor="year">{t("productInformation.year")}</label>
            <input
              type="date"
              id="year"
              className="form-control"
              onChange={state.handleChange}
              value={state.state.year}
            />
            {/* <i className="material-icons icon-calendar">today</i> */}
            {state.state.errors.year === true ? (
              <p style={pStyle}>{t("errors.requiredField")}</p>
            ) : (
              <p></p>
            )}
          </div>
          <div className="form-group input-tella">
            <label htmlFor="conservationState">
              {t("productInformation.conservationState")}
            </label>
            {state.lang.value === "en" ? (
              <select
                className="form-control"
                id="conservationState"
                onChange={state.handleChange}
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
                onChange={state.handleChange}
                value={state.state.conservationState}
              >
                <option value="-1">-</option>
                <option value="1">Nuevo</option>
                <option value="2">Usado</option>
              </select>
            )}
            {state.state.errors.conservationState === true ? (
              <p style={pStyle}>{t("errors.requiredField")}</p>
            ) : (
              <p></p>
            )}
          </div>
          <div className="form-group input-tella">
            <label htmlFor="location">{t("productInformation.location")}</label>
            <select
              className="form-control"
              id="location"
              onChange={state.handleChange}
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
              <p style={pStyle}>{t("errors.requiredField")}</p>
            ) : (
              <p></p>
            )}
          </div>
        </div>
        <div className="item-form">
          <div className="form-group input-tella">
            <label htmlFor="description">
              {t("productInformation.description")}
            </label>
            <textarea
              id="description"
              type="text"
              className="form-control"
              rows="3"
              placeholder={t("productInformation.descriptionPlaceHolder")}
              onChange={state.handleChange}
              value={state.state.description}
            ></textarea>
            {state.state.errors.description === true ? (
              <p style={pStyle}>{t("errors.requiredField")}</p>
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
    productName: "",
    brand: "",
    year: "",
    model: "",
    conservationState: "",
    location: "",
    locationId: "",
    description: "",
    errors: {
      productName: false,
      brand: false,
      year: false,
      model: false,
      conservationState: false,
      location: false
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
      description
    } = this.state;
    const error = {};

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
    this.setState({
      ["errors"]: error
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

    const { errors } = this.state;

    this.validateError();

    if (errors.productName === "") {
      const { setStep } = this.props;
      this.handleSetProductInformation();
      setStep(3);
    }
  };

  handleSetProductInformation = () => {
    const { setProductInformation } = this.props;
    const {
      productName,
      brand,
      year,
      model,
      conservationState,
      location,
      locationId,
      description
    } = this.state;

    var obj = new Object();
    obj["productName"] = productName;
    obj["brand"] = brand;
    obj["year"] = year;
    obj["model"] = model;
    obj["conservationState"] = conservationState;
    obj["location"] = location;
    obj["locationId"] = locationId;
    obj["description"] = description;

    setProductInformation(obj);
  };

  handleChange = e => {
    const { errors } = this.state;

    Object.keys(errors).map(error => {
      if (error === e.target.id) {
        errors[error] = false;
      }
    });

    if (e.target.labels[0].innerHTML === "Location") {
      let text = this.countries.find(c => c.id.toString() === e.target.value)
        .country;
      this.setState({ [e.target.id]: text });
      this.setState({ ["locationId"]: e.target.value }, function() {
        this.handleSetProductInformation();
      });
    } else if (e.target.value === "-1") {
      this.setState({
        [e.target.id]: ""
      });
    } else {
      this.setState({ ["errors"]: errors });
      this.setState({ [e.target.id]: e.target.value }, function() {
        this.handleSetProductInformation();
      });
    }
  };

  render() {
    const { auth, lang, firebase, productInformation } = this.props;

    Object.keys(productInformation).map(info => {
      if (this.state[info] !== productInformation[info]) {
        this.setState({ [info]: productInformation[info] });
      }
    });

    return (
      <MyComponent
        lang={lang}
        countries={this.countries}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleBack={this.handleBack}
        state={this.state}
      ></MyComponent>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  lang: state.navar.lang,
  productInformation: state.dataItem.productInformation
});

export default connect(
  mapStateToProps,
  { setProductInformation, setStep }
)(ProductInformation);
