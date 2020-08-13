import React, { Component } from "react";
import Notifications from "./Notification";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import Spinner from "../commons/spinner/Spinner";
import FileUpload from "../commons/fileUpload/fileUpload";
import Carousel from "../commons/carousel/carousel";
import CarouselMultiple from "../commons/carousel/carouselMultiple";
import CarouselImage from "../commons/carousel/carouselImage";
import {
  getPromoDashboard,
  getPremiumHeaderImage,
} from "../dashboard/actions/dashboardActions";
import { cleanItems } from "../items/controlDataItem/actions/controlDataItemActions";
import { setStep } from "../items/steps/actions/stepsActions";
import { getProductsByPlan } from "../items/queryResult/actions/queryResultActions";
import logoWhite from "../commons/carousel/img/logo-white.png";
import imgproveedor from "../commons/carousel/img/imgprovedor.png";
import producto1 from "../commons/carousel/img/producto1.png";
import producto2 from "../commons/carousel/img/producto2.png";
import cloneDeep from "clone-deep";
import { miniaturePath, headersPath } from "../../config/constants";

import "./dashboard.scss";

function MyComponent(state) {
  const { t, i18n } = useTranslation();
  if (i18n.language !== state.lang.value) {
    i18n.changeLanguage(state.lang.value);
  }

  return (
    <div className="pd-top--130px">
      {state.loading ? <Spinner /> : null}

      <div className="first-slider">
        <Carousel images={state.imagesMainBar} />
      </div>
      <div className="banner-small container">
        <div className="item-title">
          <span>{t("dashboard.bigOffers")}</span>
          <FileUpload></FileUpload>
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
  state = {
    loading: true,
  };

  componentDidMount() {
    const {
      getPromoDashboard,
      getPremiumHeaderImage,
      getProductsByPlan,
      cleanItems,
      setStep,
    } = this.props;

    getPromoDashboard("promotionimages");
    getPremiumHeaderImage("promotionheaders");
    getProductsByPlan([1, 2, 3]);
    cleanItems();
    setStep(1);
    console.log(miniaturePath);
  }

  createList(listItems, itemsPlan, finalListItems) {
    const listCloned = cloneDeep(listItems);
    listCloned.map((item) => {
      itemsPlan.push(item);
    });

    itemsPlan.map((item) => {
      finalListItems.push(item);
    });
  }

  render() {
    const { loading } = this.state;
    const {
      lang,
      notifications,
      currency,
      imagesPromo,
      imagesHeader,
      itemsByPlan,
    } = this.props;
    const imagesMainBar = [];
    const imagesMultiBar = [];
    const imagesPromotion = [];
    const itemsPremiumPlan = [];
    const itemsPlusPlan = [];
    const itemsFreePlan = [];
    const finalListItems = [];

    console.log(miniaturePath);

    //Premiun plan
    if (itemsPremiumPlan.length === 0 && itemsByPlan.length > 0) {
      this.createList(
        itemsByPlan.filter((x) => x.Idplan === 3),
        itemsPremiumPlan,
        finalListItems
      );
    }
    //plus plan
    if (itemsPlusPlan.length === 0 && itemsByPlan.length > 0) {
      this.createList(
        itemsByPlan.filter((x) => x.Idplan === 2),
        itemsPlusPlan,
        finalListItems
      );
    }

    //free plan
    if (itemsFreePlan.length === 0 && itemsByPlan.length > 0) {
      this.createList(
        itemsByPlan.filter((x) => x.Idplan === 1),
        itemsFreePlan,
        finalListItems
      );
    }

    if (finalListItems.length > 0) {
      finalListItems.map((item) => {
        var listImagesPerItem = [];
        item.Images.split(",").map((image) => {
          if (image !== "") {
            listImagesPerItem.push({
              imageUrl: miniaturePath + image,
            });
          }
        });
        imagesMultiBar.push({
          titleproduct: item.Titleproduct,
          valueprice:
            item.Valueprice == 0
              ? lang.value === "en"
                ? "Consult"
                : "A Consultar"
              : "€ " + item.Valueprice,
          id: item.Id,
          idPlan: item.Idplan,
          images: listImagesPerItem,
        });
      });
    }

    var itemBasicInformation = [];
    itemsPremiumPlan.map((premium) => {
      imagesHeader.map((image) => {
        if (premium.Id === image.idItem) {
          premium["Name"] = image.Name;
          itemBasicInformation.push(premium);
        }
      });
    });

    if (itemsPremiumPlan != undefined && itemsPremiumPlan.length > 0) {
      if (imagesHeader != undefined && imagesHeader.length > 0) {
        itemBasicInformation.map((item) => {
          imagesMainBar.push({
            titlecategory:
              lang.value === "en"
                ? item.Titlecategory.split("|")[0]
                : item.Titlecategory.split("|")[1],
            titleproduct:
              lang.value === "en"
                ? item.Titleproduct.split("|")[0]
                : item.Titleproduct.split("|")[1],
            valueprice: item.Valueprice,
            id: item.Id,
            image: headersPath + item.Name,
          });
        });
      }
    }

    if (imagesPromo != undefined && imagesPromo.length > 0) {
      // imagesPromo.map((image) => {
      //   imagesPromotion.push({
      //     imageUrl: base64Flag + image.image,
      //     redirectUrl: "http://www.tellaneedles.com",
      //   });
      // });
    }

    if (finalListItems.length > 0 && itemBasicInformation.length > 0) {
      if (loading) {
        this.setState({ loading: false });
      }
    }

    return (
      <MyComponent
        lang={lang}
        imagesMainBar={imagesMainBar}
        imagesMultiBar={imagesMultiBar}
        imagesPromotion={imagesPromotion}
        notifications={notifications}
        logoWhite={logoWhite}
        loading={loading}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.navar.lang,
    currency: state.currency.currency,
    imagesPromo: state.dashboard.imagesPromo,
    imagesHeader: state.dashboard.imagesHeader,
    itemsByPlan: state.queryResult.itemsByPlan,
  };
};

export default connect(mapStateToProps, {
  getPromoDashboard,
  getPremiumHeaderImage,
  getProductsByPlan,
  cleanItems,
  setStep,
})(Dashboard);
