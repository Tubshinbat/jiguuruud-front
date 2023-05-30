"use client";
import base from "lib/base";
import { faBolt, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import moment from "moment";
import HighlightNews from "./News/HighlightNews";
import { useCookies } from "react-cookie";

const HomeNews = ({ topNews, newNews, newNews2 }) => {
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

  return (
    <>
      <section className="section section-news">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <HighlightNews news={topNews[0]} />

              <div className="row">
                {topNews &&
                  topNews.length > 0 &&
                  topNews.map((news, index) => {
                    if (index != 0)
                      return (
                        <div className="col-lg-4 col-md-4">
                          <div className="column-news-box">
                            <div className="column-news-image">
                              <a href={"/n/" + news.slug}>
                                <img
                                  src={base.cdnUrl + "/450/" + news.pictures[0]}
                                />
                              </a>
                            </div>
                            <div className="column-news-content">
                              <a
                                href={"/n/" + news.slug}
                                className="column-news-title"
                              >
                                {renderTitle(news)}
                              </a>
                            </div>
                            <div className="newsbox-categories">
                              <a href={"/news/" + news.categories[0].slug}>
                                {renderTitle(news.categories[0])}
                              </a>
                            </div>
                            <div className="news_highlight_dt">
                              <li>
                                <FontAwesomeIcon icon={faBolt} /> {news.views}
                              </li>
                              <li>
                                <FontAwesomeIcon icon={faClock} />
                                {moment(news.createAt)
                                  .utcOffset("+0800")
                                  .format("YYYY-MM-DD HH:mm:ss")}
                              </li>
                            </div>
                          </div>
                        </div>
                      );
                  })}
              </div>
            </div>
            <div className="col-lg-3">
              <div className="side-news-home-mobile">
                <div class="section-header">
                  <h3> Шинэ мэдээ </h3>
                </div>
                {newNews2 &&
                  newNews2.length > 0 &&
                  newNews2.map((el) => (
                    <div className="side-news" key={el._id}>
                      <div className="side-news-content">
                        <a className="side-news-link" href={"/n/" + el.slug}>
                          {renderTitle(el)}
                        </a>
                        <div className="newsbox-categories">
                          {el.categories && el.categories[0] && (
                            <a href={"/news/" + el.categories[0].slug}>
                              {el.categories[0].name}
                            </a>
                          )}
                        </div>
                        <div className="news_highlight_dt">
                          <li>
                            <FontAwesomeIcon icon={faBolt} /> {el.views}
                          </li>
                          <li>
                            <FontAwesomeIcon icon={faClock} />
                            {moment(el.createAt)
                              .utcOffset("+0800")
                              .format("YYYY-MM-DD HH:mm:ss")}
                          </li>
                        </div>
                      </div>
                      <div className="side-news-img">
                        {el.pictures && el.pictures[0] && (
                          <a href={"/n/" + el.slug}>
                            <img
                              src={base.cdnUrl + "/150x150/" + el.pictures[0]}
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="side-news-box">
                {newNews &&
                  newNews.map((el) => (
                    <div className="side-news" key={`n-${el._id}`}>
                      <div className="side-news-content">
                        <a className="side-news-link" href={"/n/" + el.slug}>
                          {renderTitle(el)}
                        </a>
                        <div className="newsbox-categories">
                          {el.categories && el.categories[0] && (
                            <a href={"/news/" + el.categories[0].slug}>
                              {el.categories[0].name}
                            </a>
                          )}
                        </div>
                        <div className="news_highlight_dt">
                          <li>
                            <FontAwesomeIcon icon={faBolt} /> {el.views}
                          </li>
                          <li>
                            <FontAwesomeIcon icon={faClock} />
                            {moment(el.createAt)
                              .utcOffset("+0800")
                              .format("YYYY-MM-DD HH:mm:ss")}
                          </li>
                        </div>
                      </div>
                      <div className="side-news-img">
                        {el.pictures && el.pictures[0] && (
                          <a href={"/n/" + el.slug}>
                            <img
                              src={base.cdnUrl + "/150x150/" + el.pictures[0]}
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeNews;
