"use client";
import base from "lib/base";
import { useCookies } from "react-cookie";

import { Swiper, SwiperSlide } from "swiper/react";
import AOS from "aos";

import {
  Pagination,
  EffectFade,
  Navigation,
  Scrollbar,
  Autoplay,
  Lazy,
  Virtual,
} from "swiper";

import css from "styles/banner.module.css";
import "styles/banner.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/virtual";

import MobileMenu from "./mobileMenu";

export default ({ menus, webInfo, banners, socialLinks }) => {
  const [cookies, setCookie] = useCookies(["language"]);

  const renderMenu = (categories, child = false, parentSlug = "") => {
    let myCategories = [];
    categories &&
      categories.map((el) => {
        if (el[cookies.language] && el[cookies.language].name) {
          el.name = el[cookies.language].name;
        } else if (el["mn"] && el["mn"].name) {
          el.name = el["mn"].name;
        } else if (el["eng"] && el["eng"].name) {
          el.name = el["eng"].name;
        }

        myCategories.push(
          <li key={el._id} className={el.children.length > 0 && "dropMenu"}>
            {el.isDirect === true && (
              <a href={el.direct} target="_blank">
                {el.name}
              </a>
            )}
            {el.isModel === true && <a href={`/${el.model}`}>{el.name}</a>}
            {el.isDirect === false && el.isModel === false && (
              <a href={`/page/${el.slug}`}> {el.name}</a>
            )}
            {el.children.length > 0 && !child ? (
              <ul className={`dropdownMenu`}>
                {renderMenu(el.children, true, el.slug)}
              </ul>
            ) : null}
          </li>
        );
      });

    return myCategories;
  };

  const changeLanguage = () => {
    if (cookies.language === "mn") {
      setCookie("language", "eng", { path: "/" });
    } else {
      setCookie("language", "mn", { path: "/" });
    }
  };

  const titleRender = (banner) => {
    let title = "";
    if (banner[cookies.language] && banner[cookies.language].name) {
      title = banner[cookies.language].name;
    } else if (cookies.language === "mn" && banner["eng"]) {
      title = banner["eng"].name;
    } else if (cookies.language === "eng" && banner["mn"]) {
      title = banner["mn"].name;
    }

    return title;
  };

  const parRender = (banner) => {
    let details = "";
    if (banner[cookies.language] && banner[cookies.language].details) {
      details = banner[cookies.language].details;
    } else if (cookies.language === "mn" && banner["eng"]) {
      details = banner["eng"].details;
    } else if (cookies.language === "eng" && banner["mn"]) {
      details = banner["mn"].details;
    }

    return details;
  };

  return (
    <>
      <header className="top-header">
        <div className="container">
          <div className="topheader">
            <div className="top-header-left">
              <div className="header-logo">
                <a href="/">
                  <img
                    src={`${base.cdnUrl}/${webInfo.whiteLogo}`}
                    className="headerWhiteLogo"
                  />
                </a>
              </div>

              <ul className="header-menus">{renderMenu(menus)}</ul>
            </div>
            <MobileMenu
              info={webInfo}
              socialLinks={socialLinks}
              menus={menus}
            />
            <button className="changeLanguage" onClick={() => changeLanguage()}>
              <i className="fa-solid fa-earth-americas"></i> {cookies.language}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
