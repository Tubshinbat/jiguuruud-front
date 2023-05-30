import Footer from "components/Footer";
import Header from "components/Header";
import HomeNews from "components/HomeNews";
import Partner from "components/Partner";
import Service from "components/Service";
import Topbar from "components/Topbar";
import { getBanners } from "lib/banners";
import { getMenus } from "lib/menus";
import { getNews } from "lib/news";
import { getPartners } from "lib/partners";
import { getServices } from "lib/services";
import { getSocials } from "lib/socialLinks";
import { getWebInfo } from "lib/webinfo";

export default async function Page() {
  const { services } = await getServices(`status=true&limit=4`);
    const { news: topNews } = await getNews(`star=true&limit=4&status=true`);
  const { news: newNews } = await getNews(`limit=15&status=true`);
  const { news: newNews2 } = await getNews(`limit=7&status=true`);
    const { partners } = await getPartners(`status=true&limit=10`);

      const { socialLinks } = await getSocials();
  const { menus } = await getMenus();
  const { webInfo } = await getWebInfo();
   const { banners, error } = await getBanners();

  return (
    <>
     <Topbar socialLinks={socialLinks} />
     <Header menus={menus} webInfo={webInfo} banners={banners} socialLinks={socialLinks}/>
      <Service services={services} />
      <HomeNews topNews={topNews} newNews={newNews} newNews2={newNews2} /> 
      <Partner partners={partners} />
      <Footer info={webInfo} menus={menus} socialLinks={socialLinks} />
    </>
  );
}
