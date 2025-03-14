import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import Product from "./Product";
import axios from "../AxiosConfig/config";
const AllProduct = () => {
    const [sortOrder, setSortOrder] = useState("");
    const [category, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);
    let { categorypr } = useParams()
    useEffect(() => {
        if (categorypr) {
            setSelectedCategory(categorypr);
        }
        fetchingCategory()
    }, [categorypr]);
    const fetchingCategory = async () => {
        try {
            const responsive = await axios.get('/category/category');
            setCategories(responsive.data);
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    }


    return (
        <div className="container">
<div className="my-3">
    <h2 className="text-center fw-bold fs-5">Danh Sách Sản Phẩm</h2>

    <div className="card p-2 mb-3 border-0 shadow-sm">
        <div className="row g-2 align-items-center">
            {/* Lọc theo giá */}
            <div className="col-6 col-md-4">
                <div className="input-group input-group-sm">
                    <label className="input-group-text bg-light text-dark">Giá</label>
                    <select
                        className="form-select"
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="">Sắp xếp</option>
                        <option value="lowToHigh">Thấp → Cao</option>
                        <option value="highToLow">Cao → Thấp</option>
                    </select>
                </div>
            </div>

            {/* Lọc theo dòng sản phẩm */}
            <div className="col-6 col-md-4">
                <div className="input-group input-group-sm">
                    <label className="input-group-text bg-light text-dark">Dòng SP</label>
                    <select
                        className="form-select"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    </div>
</div>


            <Product category={category} sortOrder={sortOrder} />
        </div>
    );
};

export default AllProduct;
