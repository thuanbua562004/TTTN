import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../AxiosConfig/config";
import RelatedNews from "./RelatedNews";
import "bootstrap/dist/css/bootstrap.min.css";
import NewRow from "./NewRow"

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  console.log(news)
  useEffect(() => {
    fetchNewsDetail();
  }, [id]);

  const fetchNewsDetail = async () => {
    try {
      const response = await axios.get(`/news/news/${id}`);
      setNews(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết tin tức:", error);
    }
  };

  if (!news) {
    return <div className="text-center mt-5">Đang tải...</div>;
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 bg-white p-4 mt-5 rounded shadow-sm">
            <h1 className="h2 fw-bold mb-4">
              {news.title}
            </h1>

            <p className="text-muted mb-4">
              {news.info}
            </p>
            <img
              src={news.img1}
              alt="iPad Air M3 in various colors"
              className="img-fluid mb-4"
            />
            <p className="text-muted mb-4">
              {news.details}
            </p>
            <img
              src={news.img2}
              alt="iPad Air M3 side view"
              className="img-fluid mb-4"
            />
          </div>
        </div>
      </div>
      <NewRow />
    </>

  );
};

export default NewsDetail;
