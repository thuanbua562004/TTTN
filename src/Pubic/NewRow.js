import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../AxiosConfig/config";
import "bootstrap/dist/css/bootstrap.min.css";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const NewsPage = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get("/news/news");
            setNews(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách tin tức:", error);
        }
    };

    return (
        <div className="container bg-white p-4 rounded-3 shadow-sm">
            <h2 className="h5 font-weight-bold mb-3">Tin tức liên quan</h2>
            
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={3} // Hiển thị 3 tin tức cùng lúc
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }}
            >
                {news.map((item) => (
                    <SwiperSlide key={item._id}>
                        <div className="card h-100">
                            <img
                                src={item.img1}
                                alt="News"
                                className="card-img-top"
                                style={{ height: "180px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link
                                        to={`/news/${item._id}`}
                                        className="text-decoration-none text-dark fw-semibold"
                                    >
                                        {item.title}
                                    </Link>
                                </h5>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default NewsPage;
