import React, { Component } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import "./itemDetail.scss";
import { getItem } from "./actions/itemDetailActions";
import Popup from "reactjs-popup";
import warning from "../../../images/triangle.svg";
import { Redirect } from "react-router-dom";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }

  return (
    <div className="container pd-top--130px">
      <div className="info-product">
        <div className="d-flex">
          <div className="img-info--product col-6">
            <img
              className="img-big"
              src={state.itemtemObjet.images[0].imageUrl}
            />
            <div className="img-slider">
              {state.itemtemObjet.images &&
                state.itemtemObjet.images.map(image => {
                  return (
                    <div>
                      <img src={image.imageUrl} />
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="col-5">
            <div>
              <label className="title-product--list">
                {state.itemtemObjet.titleproduct}
              </label>
            </div>
            <div className="price-list"> {state.itemtemObjet.valueprice}</div>
            <div className="hr"></div>
            <div className="info-product--description">
              <span>{state.itemtemObjet.description}</span>
              <ul>
                {/* <li>
                  <span>7 x 5.5 x 7.5 in</span>
                </li>
                <li>
                  <span>Planta suculenta no incluida</span>
                </li>
                <li>
                  <span>
                    Adecuado para plantas que miden 2-4 pulgadas de diámetro.
                  </span>
                </li> */}
              </ul>
            </div>
            <div className="contact-seller">
              <div className="button-icon">
                <button
                  className={
                    state.auth.User != undefined
                      ? "btns btn-go"
                      : "btns btn-go disable"
                  }
                  onClick={
                    state.auth.User != undefined
                      ? state.handleDetails
                      : state.handleShowMessage
                  }
                >
                  {t("itemDetal.contact")}
                </button>
                {/* <i className="material-icons unlike">favorite_border</i>*/}
                <i className="material-icons like">favorite</i>
              </div>

              {state.showDetails && (
                <div className="detail-product">
                  <div>
                    <label>Phone:</label>
                    <span className="cl-green">{state.itemtemObjet.phone}</span>
                  </div>
                  <div>
                    <label>Email:</label>
                    <span className="cl-green">{state.itemtemObjet.email}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="detail-product">
              <div>
                <label>{t("itemDetal.availability")}:</label>
                <span className="cl-green">{t("itemDetal.stok")}</span>
              </div>
              <div>
                <label>{t("itemDetal.categories")}:</label>
                <span>{state.itemtemObjet.titlecategory}</span>
              </div>
              <div>
                <label>{t("itemDetal.year")}:</label>
                <span>{state.itemtemObjet.year}</span>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="description-product">
          <ul class="nav" id="myTab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active"
                id="home-tab"
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Descripción
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="profile-tab"
                data-toggle="tab"
                href="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Información adicional
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="contact-tab"
                data-toggle="tab"
                href="#contact"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
              >
                Revisión
              </a>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <p>
                Soporte de planta moderno de mediados de siglo, inspirado en la
                década de 1950 … este hermoso soporte de planta de estilo de
                mediados de siglo es la pieza de decoración perfecta para
                cualquier habitación. Hecho de madera de origen local. Los
                soportes han sido sometidos a pruebas de resistencia a más de
                100 libras para garantizar que pueda soportar el peso de incluso
                su amigo más pesado de plantas.
              </p>
              <p>
                Ancho: seleccione el ancho del menú desplegable en función del
                tamaño de su maceta (por ejemplo, si tiene una maceta de 12 “,
                ordene el ancho de 12” a medida que agregamos un cuarto de
                pulgada para que tenga algo de margen de maniobra). Tenga en
                cuenta que el grano y el color de la madera variarán
                ligeramente. Todos nuestros productos están hechos a mano, no
                son producidos en masa. Es lo que hace que cada soporte sea
                único.
              </p>
              <p>
                Las imágenes utilizadas en la lista son una representación del
                artículo y no cuentan con el artículo exacto que se enviará. Si
                tiene alguna pregunta con respecto a este artículo, presione el
                botón “Hacer una pregunta” y nos pondremos en contacto con usted
                dentro de 24 horas
              </p>
            </div>
            <div
              class="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <p>
                Soporte de planta moderno de mediados de siglo, inspirado en la
                década de 1950 … este hermoso soporte de planta de estilo de
                mediados de siglo es la pieza de decoración perfecta para
                cualquier habitación. Hecho de madera de origen local. Los
                soportes han sido sometidos a pruebas de resistencia a más de
                100 libras para garantizar que pueda soportar el peso de incluso
                su amigo más pesado de plantas.
              </p>
            </div>
            <div
              class="tab-pane fade"
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              <p>
                Soporte de planta moderno de mediados de siglo, inspirado en la
                década de 1950 … este hermoso soporte de planta de estilo de
                mediados de siglo es la pieza de decoración perfecta para
                cualquier habitación. Hecho de madera de origen local. Los
                soportes han sido sometidos a pruebas de resistencia a más de
                100 libras para garantizar que pueda soportar el peso de incluso
                su amigo más pesado de plantas.
              </p>
            </div>
          </div>
        </div> */}
      </div>
      <Popup
        modal
        open={state.showModal}
        closeOnDocumentClick={false}
        className="modal-alert"
      >
        <img src={warning} className="img-alert" />
        <h3>{t("messages.createAccount")}</h3>
        <button className="btns btn-go" onClick={state.handleOk}>
          {t("messages.ok")}
        </button>
      </Popup>
      {/* {state.renderRedirect()} */}
    </div>
  );
}

class ItemDetail extends Component {
  state = {
    showModal: false,
    showDetails: false,
    redirect: false
  };

  handleDetails = () => {
    this.setState({ showDetails: true });
  };

  handleShowMessage = () => {
    this.setState({
      ["showModal"]: true
    });
  };

  handleOk = () => {
    // this.setState({ redirect: true });
    this.setState({ showModal: false });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/signin" />;
    }
  };

  render() {
    const { lang, auth, match, item, currency } = this.props;
    let itemtemObjet = null;
    if (this.props.location.state !== undefined) {
      itemtemObjet = this.props.location.state.itemtemObjet;
    } else {
      const {
        match: { param },
        getItem
      } = this.props;

      if (item === null) {
        getItem(match.params.itemId);
      } else {
        {
          itemtemObjet = {
            images: item.images,
            titlecategory:
              lang === "en"
                ? item.subcategory.subcategoryName
                : item.subcategory.subcategoryName,
            titleproduct: item.productInformation.brand,
            valueprice:
              currency +
              " " +
              item.productInformation.internationalPrices[currency],
            description:
              lang.value === "es"
                ? item.productInformation.spanishDescription
                : item.productInformation.englishDescription,
            email: item.productInformation.email,
            phone: item.productInformation.phone,
            images: item.images,
            id: match.params.itemId,
            year: item.productInformation.year
          };
        }
      }
    }

    return (
      <div>
        {itemtemObjet === null ? (
          <div />
        ) : (
          <MyComponent
            lang={lang}
            itemtemObjet={itemtemObjet}
            handleDetails={this.handleDetails}
            showDetails={this.state.showDetails}
            handleShowMessage={this.handleShowMessage}
            showModal={this.state.showModal}
            auth={auth}
            handleOk={this.handleOk}
            renderRedirect={this.renderRedirect}
          ></MyComponent>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.signin.auth,
  lang: state.navar.lang,
  item: state.itemDetail.item,
  currency: state.currency.currency
});

export default connect(mapStateToProps, { getItem })(ItemDetail);
