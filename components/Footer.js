"use client";
import base from "lib/base";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default ({ info, menus, socialLinks }) => {
  const [phoneNumber, setPhoneNumber] = useState([]);

  const [cookies] = useCookies(["language"]);

  const renderTitle = (news) => {
    let title = "";
    if (news[cookies.language] && news[cookies.language].name) {
      title = news[cookies.language].name;
    } else if (cookies.language === "mn" && news["eng"]) {
      title = news["eng"].name;
    } else if (cookies.language === "eng" && news["mn"]) {
      title = news["mn"].name;
    }
    return title;
  };

  const renderSiteInfo = (el) => {
    let siteInfo = "";
    if (el[cookies.language] && el[cookies.language].siteInfo) {
      siteInfo = el[cookies.language].siteInfo;
    } else if (cookies.language === "mn" && el["eng"]) {
      siteInfo = el["eng"].siteInfo;
    } else if (cookies.language === "eng" && el["mn"]) {
      siteInfo = el["mn"].siteInfo;
    }
    return siteInfo;
  };

  const renderPolicy = (el) => {
    let policy = "";
    if (el[cookies.language] && el[cookies.language].policy) {
      policy = el[cookies.language].policy;
    } else if (cookies.language === "mn" && el["eng"]) {
      policy = el["eng"].policy;
    } else if (cookies.language === "eng" && el["mn"]) {
      policy = el["mn"].policy;
    }
    return policy;
  };

  const renderAddress = (el) => {
    let address = "";
    if (el[cookies.language] && el[cookies.language].address) {
      address = el[cookies.language].address;
    } else if (cookies.language === "mn" && el["eng"]) {
      address = el["eng"].address;
    } else if (cookies.language === "eng" && el["mn"]) {
      address = el["mn"].address;
    }
    return address;
  };

  //   useEffect(() => {
  //     if (info.phone) {
  //       const phones = info.phone.split(",");
  //       setPhoneNumber(phones);
  //     }
  //   }, [info]);

  const renderCategories = (categories, child = false, parentSlug = "") => {
    let myCategories = [];
    categories &&
      categories.map((el, index) => {
        let dly = 0.2 * index;
        myCategories.push(
          <div
            key={el._id}
            className={`${
              !child && "col-lg-3"
            } wow animate__animated animate__fadeInDown`}
            data-wow-delay={`${dly}s`}
          >
            {!child && <div className="footerTitle">{el.name}</div>}

            {!el.isDirect && !el.model && child && (
              <Link href={`/page/${el.slug}`}>{el.name}</Link>
            )}

            {el.isDirect && child && (
              <a href={el.direct} target="_blank">
                {el.name}
              </a>
            )}

            {el.model && child && <Link href={`/${el.model}`}>{el.name}</Link>}
            {el.children.length > 0 && !child ? (
              <ul>{renderCategories(el.children, true, el.slug)}</ul>
            ) : null}
          </div>
        );
      });

    return myCategories;
  };

  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 wow animate__animated animate__fadeInDown"
              data-wow-delay="0.8s"
            >
              <div className="footer-about">
                {info.whiteLogo && (
                  <Link href="/">
                    <img src={`${base.cdnUrl}/${info.whiteLogo}`} />
                  </Link>
                )}
                <p className="footerDescription">{renderSiteInfo(info)}</p>
              </div>
            </div>

            <div
              className="col-lg-3 wow animate__animated animate__fadeInDown"
              data-wow-delay="1.2s"
            >
              <div className="footerTitle">
                {cookies.language === "mn" ? "Холбоо барих" : "Contact us"}
              </div>
              <div className="footerContacts">
                <li>
                  <a href={`tel:${info.phone && info.phone}`}>
                    {cookies.language === "mn" ? "Утас" : "Phone number"}:{" "}
                    {info.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${info.email}`}> Имэйл: {info.email} </a>
                </li>
                <li>
                  {cookies.language === "mn" ? "Хаяг" : "Address"}:{" "}
                  {renderAddress(info)}
                </li>
              </div>
            </div>

            <div
              className="col-lg-3 wow animate__animated animate__fadeInDown"
              data-wow-delay="1.4s"
            >
              <div className="socialsLinks">
                {socialLinks &&
                  socialLinks.map((el) => (
                    <a href={el.link} target="_blank" key={`${el._id}-social`}>
                      <i
                        className={`fa-brands fa-${el.name.toLowerCase()}`}
                      ></i>
                      {el.name.toLowerCase()}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="footerBottom">
        © {new Date().getFullYear()} он бүх эрх хуулиар хамгаалагдсан
      </div>
    </>
  );
};
