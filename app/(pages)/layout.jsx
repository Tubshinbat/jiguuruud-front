import "bootstrap/dist/css/bootstrap.css";
import Script from "next/script";
import "styles/global.css";
import "styles/responsive.css";
import "styles/laptop.css";
import "styles/mobile.css";
import "animate.css";
import "antd/dist/reset.css";

import "aos/dist/aos.css";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import mn from "javascript-time-ago/locale/mn.json";
import Topbar from "components/Topbar";
import { getSocials } from "lib/socialLinks";
import Header from "components/Header";
import { getMenus } from "lib/menus";
import { getWebInfo } from "lib/webinfo";
import { getBanners } from "lib/banners";
import Footer from "components/Footer";
import HeaderMain from "components/HeaderMain";


TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);

export default async function RootLayout({ children }) {
  const { socialLinks } = await getSocials();
  const { menus } = await getMenus();
  const { webInfo } = await getWebInfo();
   const { banners, error } = await getBanners();
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <link
        href={`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css`}
      />
      <head />
      <body>
        <Topbar socialLinks={socialLinks} />
       <HeaderMain menus={menus} webInfo={webInfo} banners={banners} socialLinks={socialLinks} />
        {children}
<Footer info={webInfo} menus={menus} socialLinks={socialLinks} />

      </body>
   
    </html>
  );
}
