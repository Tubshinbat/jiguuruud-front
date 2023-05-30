"use client";
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

import { useEffect, useState, useRef } from "react";
import base from "lib/base";

export default ({ banners }) => {
  return (
    <>
      <Swiper
        modules={[EffectFade, Pagination, Navigation, Scrollbar, Autoplay]}
        effect="fade"
        autoplay={{
          delay: 7000,
        }}
        className={css.HomeSlide}
        onSlideChange={(slide) =>
          setColor(banners[slide.activeIndex].color || "#fff")
        }
      >
        {banners &&
          banners.map((banner, index) => {
            return (
              <SwiperSlide key={`banner-${index}`}>
                <div
                  key={banner._id}
                  className={css.HomeSlideItem}
                  style={{
                    backgroundImage: `url("${base.cdnUrl}/${banner.picture}")`,
                  }}
                  data-color={banner.color}
                >
                  {banner.type == "video" && banner.video && (
                    <video
                      ref={videoEl}
                      className="background__video"
                      autoplay
                      loop
                      muted
                      src={`${base.cdnUrl}/${banner.video}`}
                    ></video>
                  )}{" "}
                  <div className={css.Captaion}>
                    <div className="container">
                      <h4>{titleRender(banner)}</h4>
                      <p>{parRender(banner)}</p>
                      {banner.link && (
                        <a href={banner.link} className={css.BannerBtn}>
                          {" "}
                          {cookies.language === "mn"
                            ? "Дэлгэрэнгүй"
                            : "More"}{" "}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className={css.HomeBannerBg}></div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
};
