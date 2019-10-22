import React, { Component } from "react";
import Notifications from "./Notification";
//import ItemList from "../items/list/itemtList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Carousel from "../commons/carousel/carousel";
import CarouselMultiple from "../commons/carousel/carouselMultiple";
import { getDashboardProductsPlanPremium } from "../dashboard/actions/dashboardActions";
import banner1 from "../commons/carousel/img/banner1.png";
import banner2 from "../commons/carousel/img/banner2.png";
import banner3 from "../commons/carousel/img/banner3.png";
import bannerXs1 from "../commons/carousel/img/banner-xs-1.png";
import bannerXs2 from "../commons/carousel/img/banner-xs-2.png";
import bannerXs3 from "../commons/carousel/img/banner-xs-3.png";
import bannerXs4 from "../commons/carousel/img/banner-xs-4.png";
import logoWhite from "../commons/carousel/img/logo-white.png";
import imgproveedor from "../commons/carousel/img/imgprovedor.png";
import producto1 from "../commons/carousel/img/producto1.png";
import producto2 from "../commons/carousel/img/producto2.png";
import "./dashboard.scss";

class Dashboard extends Component {
  render() {
    const { getDashboardProductsPlanPremium, firebase, lang } = this.props;
    const { notifications, itemsPremium } = this.props;
    const imagesMainBar = [];

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

    if (itemsPremium.length === 0) {
      getDashboardProductsPlanPremium(firebase);
    } else {
      itemsPremium.map(item => {
        var obj = new Object();
        obj["titlecategory"] =
          lang === "en"
            ? item.data.subcategory.subcategoryName
            : item.data.subcategory.subcategoryName;
        obj["titleproduct"] = item.data.productInformation.brand;
        obj["valueprice"] = item.data.productInformation.price;
        obj["image"] = item.data.images[0].imageUrl1;
        obj["id"] = item.id;

        imagesMainBar.push(obj);
      });
    }

    return (
      <div className="pd-top--130px">
        <div className="first-slider">
          <Carousel images={imagesMainBar} />
        </div>
        <div className="banner-small container">
          <div className="item-title">
            <span>Grandes Ofertas</span>
          </div>
          <CarouselMultiple images={imagesMultiBar} />
        </div>
        {/* <div>
          <ItemList items={items} />
        </div> */}
        <div className="provider">
          <div className="container">
            <div className="title-item--product">
              <label>
                Nuevos <span>proveedores</span>
              </label>
            </div>
            <div className="content-provider">
              <div className="box-provider--big">
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        className="d-block"
                        src={imgproveedor}
                        alt="First slide"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        className="d-block"
                        src={imgproveedor}
                        alt="Second slide"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        className="d-block"
                        src={imgproveedor}
                        alt="Third slide"
                      />
                    </div>
                  </div>
                  <a
                    className="carousel-control-prev"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
              <div className="box-provider--double">
                <div className="item-box--provider">
                  <div className="item-box--text">
                    <label className="title-item--provider">
                      Suspendisse dignissim tristique{" "}
                    </label>
                    <span className="description-item--provider">
                      Fusce vel nibh sollicitudin
                    </span>
                    <button className="btns btn-se">cotizar</button>
                  </div>
                  <div className="item-box--img">
                    <img className="d-block" src={producto1} alt="" />
                  </div>
                </div>
                <div className="item-box--provider">
                  <div className="item-box--text">
                    <label className="title-item--provider">
                      Integer vehicula |pellentesque
                    </label>
                    <span className="description-item--provider">
                      Integer ac metus eu sapien placerat
                    </span>
                    <button className="btns btn-se">cotizar</button>
                  </div>
                  <div className="item-box--img">
                    <img className="d-block" src={producto2} alt="" />
                  </div>
                </div>
              </div>
            </div>
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
    lang: state.navar.lang,
    notifications: state.firestore.ordered.notifications,
    profile: state.firebase.profile,
    itemsPremium: state.dashboard.itemsPremium,
    itemsPlus: state.dashboard.itemsPlus,
    itemsBasic: state.dashboard.itemsBasic
  };
};

export default compose(
  connect(
    mapStateToProps,
    { getDashboardProductsPlanPremium }
  ),
  firestoreConnect([
    { collection: "items", orderBy: ["createAt", "desc"] },
    { collection: "notifications", limit: 3, orderBy: ["time", "desc"] }
  ])
)(Dashboard);
