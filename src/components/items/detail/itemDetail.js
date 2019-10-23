import React, { Component } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import "./itemDetail.scss";
import info1 from "../../commons/carousel/img/img-info1.svg";
import info2 from "../../commons/carousel/img/img-info2.svg";
import info3 from "../../commons/carousel/img/img-info3.svg";
import info4 from "../../commons/carousel/img/img-info4.svg";
import info5 from "../../commons/carousel/img/img-info5.svg";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }

  return (
    <div className="container pd-top--130px">
      <div className="info-product">
        <div className="d-flex">
          <div className="img-info--product col-7">
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
            <div className="button-icon">
              <button className="btns btn-go">{t("itemDetal.contact")}</button>
              {/* <i className="material-icons unlike">favorite_border</i>*/}
              <i className="material-icons like">favorite</i>
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
                <span>{state.itemtemObjet.valueprice}</span>
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
    </div>
  );
}

class ItemDetail extends Component {
  render() {
    const { lang } = this.props;
    const { itemtemObjet } = this.props.location.state;
    return <MyComponent lang={lang} itemtemObjet={itemtemObjet}></MyComponent>;
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
