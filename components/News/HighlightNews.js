"use client";
import htmlToFormattedText from "html-to-formatted-text";
import moment from "moment";
import { faBolt, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCookies } from "react-cookie";
import base from "lib/base";

const HighlightNews = ({ news }) => {
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

  const renderDetials = (news) => {
    let details = "";
    if (news[cookies.language] && news[cookies.language].details) {
      details = news[cookies.language].details;
    } else if (cookies.language === "mn" && news["eng"]) {
      details = news["eng"].details;
    } else if (cookies.language === "eng" && news["mn"]) {
      details = news["mn"].details;
    }
    return details;
  };

  if (!news) {
    return <></>;
  }
  return (
    <>
      <div className="highlight-big">
        <div className="highlight-img">
          <a href={"/n/" + news.slug}>
            <img src={base.cdnUrl + "/450/" + news.pictures[0]} />
          </a>
        </div>
        <div className="highlight-content">
          <div className="newsbox-categories">
            {news.categories && news.categories[0] && (
              <a href={"/news/" + news.categories[0].slug}>
                {renderTitle(news.categories[0])}
              </a>
            )}
          </div>
          <a href={"/n/" + news.slug} className="highlight-title-big">
            <h4> {renderTitle(news)}</h4>
          </a>
          <p className="highlight-desc">
            {htmlToFormattedText(renderDetials(news)).length > 200
              ? htmlToFormattedText(renderDetials(news)).substr(0, 200) + "..."
              : htmlToFormattedText(renderDetials(news))}
          </p>
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
    </>
  );
};
export default HighlightNews;
