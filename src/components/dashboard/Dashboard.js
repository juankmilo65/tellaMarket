import React, { Component } from "react";
import Notifications from "./Notification";
//import ItemList from "../items/list/itemtList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Carousel from "../commons/carousel/carousel";
import CarouselMultiple from "../commons/carousel/carouselMultiple";
import banner1 from "../commons/carousel/img/banner1.png";
import banner2 from "../commons/carousel/img/banner2.png";
import banner3 from "../commons/carousel/img/banner3.png";
import bannerXs1 from "../commons/carousel/img/banner-xs-1.png";
import bannerXs2 from "../commons/carousel/img/banner-xs-2.png";
import bannerXs3 from "../commons/carousel/img/banner-xs-3.png";
import bannerXs4 from "../commons/carousel/img/banner-xs-4.png";
import logoWhite from "../commons/carousel/img/logo-white.png";
import "./dashboard.scss";

class Dashboard extends Component {
  render() {
    const { notifications } = this.props;
    const imagesMainBar = [
      {
        titlecategory: "maquinas & equipos",
        titleproduct: " The New Standar Tufting Machinery",
        price: "Desde",
        valueprice: "$2000.00",
        textbtn: "consultar ahora",
        image: banner1,
        id: 1
      },
      {
        titlecategory: "maquinas & equipos",
        titleproduct: " The New Standar Tufting Machinery",
        price: "Desde",
        valueprice: "$2000.00",
        textbtn: "consultar ahora",
        image: banner2,
        id: 2
      },
      {
        titlecategory: "maquinas & equipos",
        titleproduct: " The New Standar Tufting Machinery",
        price: "Desde",
        valueprice: "$2000.00",
        textbtn: "consultar ahora",
        image: banner3,
        id: 3
      }
      //, { mas imagenes}
    ];

    const imagesMultiBar = [
      [
        {
          image: bannerXs1,
          titleproduct: "Guardar 30 gal. Hazardous Location Drum Vacuum Kits",
          category: "Categoría 1",
          valueprice: "$892.00",
          id: 1
        },
        {
          image: bannerXs1,
          titleproduct: "Guardar 30 gal. Hazardous Location Drum Vacuum Kits",
          category: "Categoría 1",
          valueprice: "$892.00",
          id: 2
        },
        {
          image: bannerXs1,
          titleproduct: "Guardar 30 gal. Hazardous Location Drum Vacuum Kits",
          category: "Categoría 1",
          valueprice: "$892.00",
          id: 3
        }
      ],
      [
        {
          image: bannerXs2,
          titleproduct: "MULLER MARTINI Italiana 370",
          category: "Textile and Leather Machinery ",
          valueprice: "$932.00",
          id: 1
        },
        {
          image: bannerXs2,
          titleproduct: "MULLER MARTINI Italiana 370",
          category: "Textile and Leather Machinery ",
          valueprice: "$932.00",
          id: 2
        },
        {
          image: bannerXs2,
          titleproduct: "MULLER MARTINI Italiana 370",
          category: "Textile and Leather Machinery ",
          valueprice: "$932.00",
          id: 3
        }
      ],
      [
        {
          image: bannerXs3,
          titleproduct: "Wohlenberg 185 Cut-Tec, Guillotine",
          category: "Categoría tres",
          valueprice: "$230.00",
          id: 1
        },
        {
          image: bannerXs3,
          titleproduct: "Wohlenberg 185 Cut-Tec, Guillotine",
          category: "Categoría tres",
          valueprice: "$230.00",
          id: 2
        },
        {
          image: bannerXs3,
          titleproduct: "Wohlenberg 185 Cut-Tec, Guillotine",
          category: "Categoría tres",
          valueprice: "$230.00",
          id: 3
        }
      ],
      [
        {
          image: bannerXs4,
          titleproduct: "Kama TS 105, Automatic Die Cutter",
          category: "Categoría cuatro",
          valueprice: "$503.00",
          id: 1
        },
        {
          image: bannerXs4,
          titleproduct: "Kama TS 105, Automatic Die Cutter",
          category: "Categoría cuatro",
          valueprice: "$503.00",
          id: 2
        },
        {
          image: bannerXs4,
          titleproduct: "Kama TS 105, Automatic Die Cutter",
          category: "Categoría cuatro",
          valueprice: "$503.00",
          id: 3
        },
        {
          image: bannerXs4,
          titleproduct: "Kama TS 105, Automatic Die Cutter",
          category: "Categoría cuatro",
          valueprice: "$503.00",
          id: 4
        }
      ]
    ];

    return (
      <div className="pd-top--130px">

        <div className="first-slider">
          <Carousel images={imagesMainBar} />
        </div>
        <div className="banner-small container">
          <div className="item-title"><span>Grandes Ofertas</span></div>
          <CarouselMultiple images={imagesMultiBar} />
        </div>
        {/* <div>
          <ItemList items={items} />
        </div> */}
        <div className="provider">
          <div className="container">
            <div className="title-item--product"><label>Nuevos <span>proveedores</span></label></div>

          </div>
        </div>
        <div>
          <Notifications notifications={notifications} />
        </div>
        <div className="footer-menu">
          <div className="container">
            <div className="item-footer--menu">
              <img alt="witheLogo" src={logoWhite} />
              <div className="text-footer">
                <span>+61 3 8376 6284</span>
              </div>
              <div className="text-footer">
                <span>info@tellamarket.com</span>
              </div>
              {/* <div className="social-network">
                <image src="" className="facebook" />
                <image src="" className="google" />
              </div> */}
            </div>
            <div className="item-footer--menu">
              <h2>Nosotros</h2>
              <div className="text-footer">
                <a href="/">Tella Market</a>
              </div>
              <div className="text-footer">
                <a href="/">Contato</a>
              </div>
              <div className="text-footer">
                <a href="/">Trabaje con nosotros</a>
              </div>
              <div className="text-footer">
                <a href="/">Proveedores</a>
              </div>
            </div>
            <div className="item-footer--menu">
              <h2>Categorias</h2>
              <div className="text-footer">
                <a href="/">Industrias</a>
              </div>
              <div className="text-footer">
                <a href="/">Construcción</a>
              </div>
              <div className="text-footer">
                <a href="/">Confecciones</a>
              </div>
              <div className="text-footer">
                <a href="/">Descuentos</a>
              </div>
            </div>

            <div className="item-footer--menu">
              <h2>Soporte</h2>
              <div className="text-footer">
                <a href="/">Blog</a>
              </div>
              <div className="text-footer">
                <a href="/">FAQs</a>
              </div>
              <div className="text-footer">
                <a href="/">Seguimiento de Order</a>
              </div>
              <div className="text-footer">
                <a href="/">Devoluciones</a>
              </div>
            </div>
            <div className="item-footer--menu">
              <h2>Subscríbete</h2>
              {/* <input type="text" value="" placeholder="Tu email aquí" /> */}
              <div className="text-footer">
                <a href="/">Todos los derechos reservados Tella Market</a>
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
