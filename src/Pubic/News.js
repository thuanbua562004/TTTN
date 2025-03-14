import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../AxiosConfig/config";
import "bootstrap/dist/css/bootstrap.min.css";

const NewsPage = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get("/news/news");
            setNews(response.data)
        } catch (error) {
            console.error("Lỗi khi lấy danh sách tin tức:", error);
        }
    };

    return (
<div class="col-lg-6 bg-white p-4 rounded-3 shadow-sm">
    <h2 class="h5 font-weight-bold mb-3">Tin tức liên quan</h2>
    {news.map((item)=>(
           <ul class="list-unstyled">
           <li class="d-flex align-items-center mb-3">
               <div class="col-3">
                   <img src={item.img1} alt="News" class="w-100 rounded object-fit-cover" />
               </div>
               <div class="col-9 ps-3">
                   <a href={`/news/${item._id}`} class="text-decoration-none text-dark fw-semibold">
                       {item.title}
                   </a>
               </div>
           </li>
       </ul>
    ))}
</div>
    );
};

export default NewsPage;
