"use client";
import { Swiper, SwiperSlide } from "swiper/react";
const { htmlToText } = require("html-to-text");
import base from "lib/base";
import {
  Pagination,
  EffectFade,
  Navigation,
  Scrollbar,
  Autoplay,
} from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default ({ services }) => {
  const [cookies] = useCookies(["language"]);

  const renderTitle = (service) => {
    let title = "";
    if (service[cookies.language] && service[cookies.language].name) {
      title = service[cookies.language].name;
    } else if (cookies.language === "mn" && service["eng"]) {
      title = service["eng"].name;
    } else if (cookies.language === "eng" && service["mn"]) {
      title = service["mn"].name;
    }
    return title;
  };

  const renderDetials = (service) => {
    let details = "";
    if (service[cookies.language] && service[cookies.language].details) {
      details = service[cookies.language].details;
    } else if (cookies.language === "mn" && service["eng"]) {
      details = service["eng"].details;
    } else if (cookies.language === "eng" && service["mn"]) {
      details = service["mn"].details;
    }
    return details;
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-header">
            {cookies.language === "eng" ? (
              <h3>
                Our <span>Services</span>
              </h3>
            ) : (
              <h3>
                Манай <span>үйлчилгээнүүд</span>
              </h3>
            )}
          </div>

          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            autoplay={{
              delay: 3000,
            }}
            loop="true"
            simulateTouch="false"
            slidesPerView={3}
            spaceBetween={40}
            className="platforms_slide"
            breakpoints={{
              1000: {
                slidesPerView: 3,
              },
              800: {
                slidesPerView: 2,
              },

              100: {
                slidesPerView: 1,
              },
            }}
          >
            {services &&
              services.map((el) => (
                <SwiperSlide key={el._id} className="platform_slide">
                  <div className="service-item">
                    <a
                      href={`${
                        el.direct === true ? el.link : "/services/" + el._id
                      }`}
                    >
                      <div className="service-img-box">
                        {el.pictures && el.pictures[0] && (
                          <img src={`${base.cdnUrl}/450/${el.pictures[0]}`} />
                        )}
                      </div>
                    </a>

                    <div className="service-item-dtl">
                      <a
                        href={`${
                          el.direct === true ? el.link : "/services/" + el._id
                        }`}
                      >
                        <h4>{renderTitle(el)}</h4>
                      </a>
                      <p>
                        {htmlToText(renderDetials(el), {
                          limits: 25,
                        }).substring(0, 100)}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          <a href="/services" className="section-btn">
            Бүх үйлчилгээг харах
          </a>
        </div>
      </section>
    </>
  );
};
