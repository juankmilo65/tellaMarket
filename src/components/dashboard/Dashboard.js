import React, { Component } from "react";
import Notifications from "./Notification";
import ItemList from "../items/list/itemtList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Carousel from "../commons/carousel/carousel";
import CarouselMultiple from "../commons/carousel/carouselMultiple";
import banner1 from "../commons/carousel/banner1.png";
import banner2 from "../commons/carousel/banner2.png";
import banner3 from "../commons/carousel/banner3.png";
import bannerXs1 from "../commons/carousel/banner-xs-1.png";
import bannerXs2 from "../commons/carousel/banner-xs-2.png";
import bannerXs3 from "../commons/carousel/banner-xs-3.png";
import bannerXs4 from "../commons/carousel/banner-xs-4.png";
import logoWhite from "../commons/carousel/logo-white.png";
import "./dashboard.scss";

class Dashboard extends Component {
  render() {
    const { items, auth, notifications } = this.props;
    const imagesMainBar = [
      { image: banner1 },
      {
        image: banner2
      },
      {
        image: banner3
        //Mas propiedades
      }
      //, { mas imagenes}
    ];

    const imagesMultiBar = [
      [
        {
          image: bannerXs1,
          text: "Primer texto Ejemplo 4444" //Mas propiedades
        },
        { image: bannerXs1 },
        { image: bannerXs1 }
      ],
      [{ image: bannerXs2 }, { image: bannerXs2 }, { image: bannerXs2 }],
      [{ image: bannerXs3 }, { image: bannerXs3 }, { image: bannerXs3 }],
      [{ image: bannerXs4 }, { image: bannerXs4 }, { image: bannerXs4 }]
    ];

    return (
      <div>
        <div className="container">
          <div className="first-slider">
            <Carousel images={imagesMainBar} />
          </div>
          <br />
          <br />
          <br />
          <div>
            <CarouselMultiple images={imagesMultiBar} />
          </div>
          <div>
            <ItemList items={items} />
          </div>
          <div>
            <Notifications notifications={notifications} />
          </div>
        </div>

        <div className="footer-menu">
          <div className="container">
            <div className="item-footer--menu">
              <img src={logoWhite} />
              <div className="text-footer">
                <span>+61 3 8376 6284</span>
              </div>
              <div className="text-footer">
                <span>info@tellamarket.com</span>
              </div>
              <div className="social-network">
                <image src="" className="facebook" />
                <image src="" className="google" />
              </div>
            </div>
            <div className="item-footer--menu">
              <h2>Nosotros</h2>
              <div className="text-footer">
                <a href="">Tella Market</a>
              </div>
              <div className="text-footer">
                <a href="">Contato</a>
              </div>
              <div className="text-footer">
                <a href="">Trabaje con nosotros</a>
              </div>
              <div className="text-footer">
                <a href="">Proveedores</a>
              </div>
            </div>
            <div className="item-footer--menu">
              <h2>Categorias</h2>
              <div className="text-footer">
                <a href="">Industrias</a>
              </div>
              <div className="text-footer">
                <a href="">Construcción</a>
              </div>
              <div className="text-footer">
                <a href="">Confecciones</a>
              </div>
              <div className="text-footer">
                <a href="">Descuentos</a>
              </div>
            </div>

            <div className="item-footer--menu">
              <h2>Soporte</h2>
              <div className="text-footer">
                <a href="">Blog</a>
              </div>
              <div className="text-footer">
                <a href="">FAQs</a>
              </div>
              <div className="text-footer">
                <a href="">Seguimiento de Order</a>
              </div>
              <div className="text-footer">
                <a href="">Devoluciones</a>
              </div>
            </div>
            <div className="item-footer--menu">
              <h2>Subscríbete</h2>
              <input type="text" value="" placeholder="Tu email aquí" />
              <div className="text-footer">
                <a href="">Todos los derechos reservados Tella Market</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.firestore.ordered.items,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    profile: state.firebase.profile
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "items", orderBy: ["createAt", "desc"] },
    { collection: "notifications", limit: 3, orderBy: ["time", "desc"] }
  ])
)(Dashboard);
