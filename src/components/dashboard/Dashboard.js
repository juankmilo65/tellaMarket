import React, { Component } from "react";
import Notifications from "./Notification";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Carousel from "../commons/carousel/carousel";
import CarouselMultiple from "../commons/carousel/carouselMultiple";
import CarouselImage from "../commons/carousel/carouselImage";
import {
  getDashboardProductsPlanPremium,
  getDashboardProductsPlanPlus,
  getDashboardProductsPlanBasic
} from "../dashboard/actions/dashboardActions";
import logoWhite from "../commons/carousel/img/logo-white.png";
import imgproveedor from "../commons/carousel/img/imgprovedor.png";
import producto1 from "../commons/carousel/img/producto1.png";
import producto2 from "../commons/carousel/img/producto2.png";
import banner1 from "../commons/carousel/img/banner1.png";
import banner2 from "../commons/carousel/img/banner2.png";
import banner3 from "../commons/carousel/img/banner3.png";
import promo1 from "../commons/carousel/img/TellaNeedles.jpg";
import "./dashboard.scss";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }

  return (
    <div className="pd-top--130px">
      <div className="first-slider">
        <Carousel images={state.imagesMainBar} />
      </div>
      <div className="banner-small container">
        <div className="item-title">
          <span>{t("dashboard.bigOffers")}</span>
        </div>
        <CarouselMultiple items={state.imagesMultiBar} />
      </div>

      <div className="banner-small container">
        <CarouselImage images={state.imagesPromotion} />
      </div>

      <div className="provider">
        <div className="container">
          <div className="title-item--product">
            <label>
              {t("dashboard.new")} <span>{t("dashboard.suppliers")}</span>
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
                </a>
              </div>
            </div>
            <div className="box-provider--double">
              <div className="item-box--provider">
                <div className="item-box--text">
                  <label className="title-item--provider">
                    Suspendisse dignissim tristique
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
        <Notifications notifications={state.notifications} />
      </div>
      <div className="footer-menu">
        <div className="container">
          <div className="item-footer--menu">
            <img alt="witheLogo" src={state.logoWhite} />
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
              <a href="/">{t("dashboard.contact")}</a>
            </div>
          </div>
          <div className="item-footer--menu">
            <h2>{t("dashboard.categories")}</h2>
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
            <h2>{t("dashboard.support")}</h2>
            <div className="text-footer">
              <a href="/">Blog</a>
            </div>
            <div className="text-footer">
              <a href="/">FAQs</a>
            </div>
          </div>
          <div className="item-footer--menu">
            <h2>Subscríbete</h2>
            {/* <input type="text" value="" placeholder="Tu email aquí" /> */}
            <div className="text-footer">
              <a href="/">{t("dashboard.copyright")}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

class Dashboard extends Component {
  render() {
    const {
      getDashboardProductsPlanPremium,
      getDashboardProductsPlanPlus,
      firebase,
      lang
    } = this.props;
    let count = 1;
    const { notifications, itemsPremium, itemsPlus, itemsBasic } = this.props;
    const imagesMainBar = [];
    const imagesMultiBar = [];
    const imagesPromotion = [
      {
        imageUrl: promo1,
        redirectUrl: "http://www.tellaneedles.com"
      }
    ];

    // var obj = new Object();
    // obj["titlecategory"] = "Titulo Categoria";
    // obj["titleproduct"] = "Titulo Producto";
    // obj["valueprice"] = "$2000";
    // obj["description"] =
    //   "Description Test  Descripción del producto viverra at erat vel, mattis commodo magna. Vestibulum porta leo at augue hendrerit, nec consequat purus varius. Vivamus libero nunc, aliquet quis viverra.";
    // obj["email"] = "asdfgh@sdfghj.com";
    // obj["phone"] = "33333333";
    // obj["images"] = [
    //   {
    //     imageUrl:
    //       "https://coserencasa.com/wp-content/uploads/2019/03/maquina-coser-industrial-mesa.jpg"
    //   },
    //   {
    //     imageUrl:
    //       "https://firebasestorage.googleapis.com/v0/b/tellamachines.appspot.com/o/cepEmC7Y9g3pC744M8Le%2F755.jpg?alt=media&token=6d417912-67a3-4116-bf25-7072298128e8"
    //   }
    // ];
    // obj["image"] = banner1;
    // obj["id"] = 1;
    // obj["year"] = "2019-10-03";
    // imagesMainBar.push(obj);
    // imagesMultiBar.push(obj);

    // var obj = new Object();
    // obj["titlecategory"] = "Titulo Categoria";
    // obj["titleproduct"] = "Titulo Producto";
    // obj["valueprice"] = "$1000";
    // obj["year"] = "2019-10-03";
    // obj["description"] =
    //   "Description Test  Descripción del producto viverra at erat vel, mattis commodo magna. Vestibulum porta leo at augue hendrerit, nec consequat purus varius. Vivamus libero nunc, aliquet quis viverra.";
    // obj["email"] = "asdfgh@sdfghj.com";
    // obj["phone"] = "22222222";
    // obj["image"] = banner1;
    // obj["id"] = 2;
    // obj["images"] = [
    //   {
    //     imageUrl:
    //       "https://coserencasa.com/wp-content/uploads/2019/03/maquina-coser-industrial-mesa.jpg"
    //   },
    //   {
    //     imageUrl:
    //       "https://coserencasa.com/wp-content/uploads/2019/03/maquina-coser-industrial-mesa.jpg"
    //   }
    // ];
    // imagesMainBar.push(obj);
    // imagesMultiBar.push(obj);

    // if (itemsPremium.length === 0) {
    //   getDashboardProductsPlanPremium(firebase);
    // } else {
    //   itemsPremium.map(item => {
    //     var obj = new Object();
    //     obj["titlecategory"] =
    //       lang === "en"
    //         ? item.data.subcategory.subcategoryName
    //         : item.data.subcategory.subcategoryName;
    //     obj["titleproduct"] = item.data.productInformation.brand;
    //     obj["valueprice"] = item.data.productInformation.price;
    //     obj["description"] = item.data.productInformation.description;
    //     obj["email"] = item.data.productInformation.email;
    //     obj["phone"] = item.data.productInformation.phone;
    //     obj["image"] = item.data.images[0].imageUrl1;
    //     obj["id"] = item.id;
    //     obj["year"] = item.data.productInformation.year;
    //     imagesMainBar.push(obj);
    //   });
    // }

    if (itemsPlus.length === 0) {
      getDashboardProductsPlanPlus(firebase);
    } else {
      itemsPlus.map(item => {
        var obj = new Object();
        obj["titlecategory"] =
          lang === "en"
            ? item.data.subcategory.subcategoryName
            : item.data.subcategory.subcategoryName;
        obj["titleproduct"] = item.data.productInformation.brand;
        obj["valueprice"] = item.data.productInformation.price;
        obj["description"] = item.data.productInformation.description;
        obj["email"] = item.data.productInformation.email;
        obj["phone"] = item.data.productInformation.phone;
        obj["images"] = item.data.images;
        obj["id"] = item.id;
        obj["year"] = item.data.productInformation.year;
        obj["image"] = count === 1 ? banner1 : count === 2 ? banner2 : banner3;
        imagesMainBar.push(obj);
        imagesMultiBar.push(obj);

        count = count + 1;
      });

      // {
      //   imagesMainBar &&
      //     imagesMainBar.map(item => {
      //       imagesMultiBar.push(item);
      //     });
      // }
    }

    return (
      <MyComponent
        lang={lang}
        imagesMainBar={imagesMainBar}
        imagesMultiBar={imagesMultiBar}
        imagesPromotion={imagesPromotion}
        notifications={notifications}
        logoWhite={logoWhite}
      />
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
  connect(mapStateToProps, {
    getDashboardProductsPlanPremium,
    getDashboardProductsPlanPlus,
    getDashboardProductsPlanBasic
  }),
  firestoreConnect([
    { collection: "items", orderBy: ["createAt", "desc"] },
    { collection: "notifications", limit: 3, orderBy: ["time", "desc"] }
  ])
)(Dashboard);
