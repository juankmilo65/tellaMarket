import React from 'react'
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import logoWhite from "../commons/carousel/img/logo-white.png";

function UseFooter() {
    const lang = useSelector(state => state.navar.lang);

    const { t, i18n } = useTranslation();
    if (i18n.language !== lang.value) {
        i18n.changeLanguage(lang.value);
    }

    return (
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
    )
}

export default UseFooter