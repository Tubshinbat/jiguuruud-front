import NewsList from "components/News/NewsList";
import NewsSide from "components/News/NewsSide";

import { getCategories, getNews, getSlugCategory } from "lib/news";

export default async function Page({ searchParams }) {
  const { categories } = await getCategories(`status=true`);
  const { news: fireNews } = await getNews(
    `status=true&sort=views:descend&limit=9`
  );
  const { news: newNews } = await getNews(`status=true&limit=9`);
  const { news, pagination } = await getNews(`status=true`);

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-xl-9">
              <NewsList
                news={news}
                pagination={pagination}
                searchParams={searchParams}
                params={searchParams}
              />
            </div>
            <div className="col-xl-3">
              <NewsSide
                categories={categories}
                newNews={newNews}
                fireNews={fireNews}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
