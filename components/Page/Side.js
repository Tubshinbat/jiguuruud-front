"use client";
import { faBolt, faClock, faFireAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import base from "lib/base";
import Link from "next/link";
import { useState } from "react";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import { useCookies } from "react-cookie";

import en from "javascript-time-ago/locale/en.json";
import mn from "javascript-time-ago/locale/mn.json";
TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);

export default ({ newNews, fireNews, menus, parentSameMenus }) => {
  const [selectTab, setSelectTab] = useState("new");
  const [cookies, setCookie] = useCookies(["language"]);
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

  return (
    <>
      <div className="sides ">
        {parentSameMenus && parentSameMenus.length > 0 && (
          <div className="side__item">
            <h4 className="side__item_title">Цэс </h4>
            <div className="side__main">
              <div className="categories__list">
                {parentSameMenus.map((el) => (
                  <>
                    {el.isDirect == true ? (
                      <a href={el.direct}> {renderTitle(el)} </a>
                    ) : el.isModel == true ? (
                      <Link href={el.model}> {renderTitle(el)}</Link>
                    ) : (
                      <Link href={`/page/${el.slug}`}>{renderTitle(el)} </Link>
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        )}

        {menus && menus.length > 0 && (
          <div className="side__item">
            <h4 className="side__item_title">Цэс </h4>
            <div className="side__main">
              <div className="categories__list">
                {menus.map((el) => (
                  <>
                    {el.isDirect == true ? (
                      <a href={el.direct}> {renderTitle(el)} </a>
                    ) : el.isModel == true ? (
                      <Link href={el.model}> {renderTitle(el)}</Link>
                    ) : (
                      <Link href={`/page/${el.slug}`}>{renderTitle(el)} </Link>
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="side__item home__side_tab">
          <div className="tab__side_option">
            <div
              className={`tab__option ${selectTab == "new" && "active"}`}
              onClick={() => setSelectTab("new")}
            >
              <FontAwesomeIcon icon={faClock} />
              Сүүлд орсон
            </div>
            <div
              className={`tab__option ${selectTab == "top" && "active"}`}
              onClick={() => setSelectTab("top")}
            >
              <FontAwesomeIcon icon={faFireAlt} />
              Топ мэдээ
            </div>
          </div>
          <div
            className="tab__side_lists"
            style={{ display: selectTab == "new" ? "block" : "none" }}
          >
            {newNews.map((news) => (
              <div className="tab__side_item">
                <Link href={`/news/${news._id}`}>
                  {news.pictures && news.pictures[0] ? (
                    <img src={`${base.cdnUrl}/150x150/${news.pictures[0]}`} />
                  ) : (
                    <img src="/images/img_notfound.jpg" />
                  )}
                </Link>
                <div className="tab__side_content">
                  <Link href={`/news/${news._id}`}>
                    <h6>
                      {renderTitle(news).length > 55
                        ? renderTitle(news).substr(0, 55) + "..."
                        : renderTitle(news)}
                    </h6>
                  </Link>
                  <div className="tab__side_dt">
                    <li>
                      <FontAwesomeIcon icon={faBolt} /> {news.views}
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faClock} />
                      <ReactTimeAgo date={news.createAt} locale="mn" />
                    </li>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="tab__side_lists"
            style={{ display: selectTab == "top" ? "block" : "none" }}
          >
            {fireNews.map((news) => (
              <div className="tab__side_item">
                <Link href={`/news/${news._id}`}>
                  {news.pictures && news.pictures[0] ? (
                    <img src={`${base.cdnUrl}/150x150/${news.pictures[0]}`} />
                  ) : (
                    <img src="/images/img_notfound.jpg" />
                  )}
                </Link>
                <div className="tab__side_content">
                  {/* {news.categories && news.categories[0] && (
                          <Link
                            href={`/news?categories=${news.categories[0].name}`}
                            className="tab__side_category"
                          >
                            {news.categories[0].name}
                          </Link>
                        )} */}
                  <Link href={`/news/${news._id}`}>
                    <h6>
                      {renderTitle(news).length > 55
                        ? renderTitle(news).substr(0, 55) + "..."
                        : renderTitle(news)}
                    </h6>
                  </Link>
                  <div className="tab__side_dt">
                    <li>
                      <FontAwesomeIcon icon={faBolt} /> {news.views}
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faClock} />
                      <ReactTimeAgo date={news.createAt} locale="mn" />
                    </li>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
