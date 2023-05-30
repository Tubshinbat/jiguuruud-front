import { getPage } from "lib/page";
import { use } from "react";

import PageDetails from "components/Page/Details";
import Side from "components/Page/Side";

import { getNews } from "lib/news";
import NotFound from "components/NotFound";
import { getMenus } from "lib/menus";

export default async function Page({ params: { slug } }) {
  const data = await getPage(slug);

  const { news: fireNews } = await getNews(
    `status=true&sort=views:descend&limit=9`
  );
  const { news: newNews } = await getNews(`status=true&limit=9`);

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-xl-9">
              {data && data.page ? <PageDetails data={data} /> : <NotFound />}
            </div>
            <div className="col-xl-3">
              <Side
                newNews={newNews}
                fireNews={fireNews}
                menus={data.menus || []}
                parentSameMenus={data.parentSameMenus || []}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
