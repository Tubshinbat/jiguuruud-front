"use client";
import { faBolt, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import base from "lib/base";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCookies } from "react-cookie";

import htmlToFormattedText from "html-to-formatted-text";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en.json";
import mn from "javascript-time-ago/locale/mn.json";
import { getNews } from "lib/news";

import NotFound from "components/NotFound";
TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);

const { htmlToText } = require("html-to-text");

const NewsList = ({ news, pagination: initPagination, params }) => {
  // Params
  const router = useRouter();
  const pathname = usePathname();
  const [cookies] = useCookies(["language"]);

  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams(`${searchParams.toString()}`);
  const [category, setCategory] = useState("Мэдээ мэдээлэл");
  const [data, setData] = useState(news);
  const [pagination, setPagination] = useState(initPagination);
  const [loading, setLoading] = useState(false);
  const [listType, setListType] = useState("column");

  const queryBuild = (key, event) => {
    urlParams.set(key, event);
    router.push(`${pathname}?${urlParams}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { news, pagination } = await getNews(searchParams.toString());
      setPagination(pagination);
      setData(news);
    };

    const cat = searchParams.get("category");
    setCategory(cat);

    fetchData();
  }, []);

  //-- PAGINATION

  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();

  const handlePageChange = (pageNumber) => {
    queryBuild("page", pageNumber);
    window.scrollTo(0, 0);
    setActivePage(pageNumber);
  };

  useEffect(() => {
    if (pagination) {
      setTotal(pagination.total);
      setLimit(pagination.limit);
    }
  }, [pagination]);

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
      <div className="section_news_title">
        <h4>{category || "Мэдээ мэдээлэл"} </h4>
      </div>

      <div className="row news_grid">
        {data && data.length > 0 ? (
          data.map((el) => (
            <div className="col-md-6">
              <div className="news__grid_item">
                <div className="news__gird_image">
                  {el.type !== "default" && (
                    <div className="news__type">
                      {el.type == "audio" && (
                        <i className="fa-solid fa-volume-high"></i>
                      )}
                      {el.type == "video" && (
                        <i className="fa-solid fa-video"></i>
                      )}
                    </div>
                  )}
                  <a href={`/news/${el._id}`} scroll={false}>
                    {el.pictures && el.pictures[0] ? (
                      <img src={`${base.cdnUrl}/450/${el.pictures[0]}`} />
                    ) : (
                      <img src={`/images/img_notfound.jpg`} />
                    )}
                  </a>
                </div>
                <div className="news_grid_content">
                  <a href={`/news/${el._id}`} scroll={false}>
                    <h4>
                      {renderTitle(el).length > 90
                        ? renderTitle(el).substr(0, 90) + "..."
                        : renderTitle(el)}
                    </h4>
                  </a>
                  <div className="news_grid_dt">
                    <li>
                      <FontAwesomeIcon icon={faBolt} /> {el.views}
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faClock} />
                      <ReactTimeAgo date={el.createAt} locale="mn" />
                    </li>
                  </div>
                  <p>
                    {htmlToFormattedText(el.details).length > 170
                      ? htmlToFormattedText(el.details).substr(0, 170) + "..."
                      : htmlToFormattedText(el.details)}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <NotFound />
        )}
      </div>

      {total && data && data.length > 0 && (
        <div className={`pagination__list`}>
          <Pagination
            activePage={parseInt(searchParams.get("page")) || 1}
            itemClass={`page-item`}
            linkClass={"page-link"}
            itemsCountPerPage={limit}
            totalItemsCount={total}
            pageRangeDisplayed={5}
            onChange={handlePageChange.bind()}
          />
        </div>
      )}
    </>
  );
};

export default NewsList;
