import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../AxiosConfig/config";

const RelatedNews = ({ currentNewsId }) => {
    const [relatedNews, setRelatedNews] = useState([]);

    useEffect(() => {
        fetchRelatedNews();
    }, [currentNewsId]);
    console.log(relatedNews)
    const fetchRelatedNews = async () => {
        try {
            const response = await axios.get("/news/news");
            const filteredNews = response.data.filter(news => news._id !== currentNewsId);
            setRelatedNews(filteredNews.slice(0, 4));
        } catch (error) {
            console.error("Lỗi khi lấy tin tức liên quan:", error);
        }
    };

    return (
        <div className="mt-4">
            <h4 className="fw-bold">Tin tức liên quan</h4>
            <div className="row">
                {relatedNews.map((news) => (
                    <div key={news._id} className="col-md-3 mb-3">
                        <div className="card h-100 shadow-sm">
                            {news.img.length > 0 && (
                                <img
                                    src={news.img[0].forEach(element => {
                                        return element
                                    })}
                                    className="card-img-top img-fluid object-fit-cover"
                                    alt={news.title}
                                    style={{ height: "150px" }}
                                />
                            )}
                            <div className="card-body d-flex flex-column">
                                <h6 className="card-title text-truncate" style={{ minHeight: "40px" }}>
                                    <Link
                                        to={`/news/${news._id}`}
                                        className="text-decoration-none text-dark"
                                    >
                                        {news.title}
                                    </Link>
                                </h6>
                                <p className="small text-muted mb-0 mt-auto">
                                    {new Date(news.date).toLocaleDateString("vi-VN", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedNews;
