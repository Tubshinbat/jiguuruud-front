import Side from "components/Announcement/Side";
import ServiceList from "components/Services/List";
import { getNews } from "lib/news";
import { getServices } from "lib/services";
import { use } from "react";

export default async function Page() {
  const { services, pagination } = await getServices();


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
              <ServiceList services={services} pagination={pagination} />
            </div>
            <div className="col-xl-3">
              <Side fireNews={fireNews} newNews={newNews}  />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
