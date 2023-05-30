"use client";
import { useCookies } from "react-cookie";

export default ({ socialLinks }) => {
  const [cookies, setCookie] = useCookies(["language"]);

  const changeLanguage = () => {
    if (cookies.language === "mn") {
      setCookie("language", "eng", { path: "/" });
    } else {
      setCookie("language", "mn", { path: "/" });
    }
  };

  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="topbar-right">
            <button className="changeLanguage" onClick={() => changeLanguage()}>
              <i className="fa-solid fa-earth-americas"></i> {cookies.language}
            </button>
            <ul className="topbar-links">
              <li>
                <a href="contact">
                  {cookies.language === "eng" ? "Contact us" : "Холбоо барих"}
                </a>
              </li>
            </ul>
            <ul className="topbar-socials">
              {socialLinks &&
                socialLinks.map((el) => (
                  <li key={`${el._id}-som`}>
                    <a href={el.link} target="_blank">
                      <i
                        className={`fa-brands fa-${el.name.toLowerCase()}-square`}
                      ></i>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
