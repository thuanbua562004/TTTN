import React, { useEffect, useState } from 'react';
import axios from "../AxiosConfig/config";

const SuggesProduct = () => {
    const [listProduct, setListProduct] = useState([]);

    const fetchProduct = async () => {
        try {
            const result = await axios.get('phone/phone');
            setListProduct(result.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <div className="col-lg-6 bg-white p-4 rounded-3 shadow-sm">
            <h2 className="h5 font-weight-bold mb-3">Có thể bạn quan tâm</h2>
            <ul className="list-unstyled">
                {listProduct.slice(0, 3).map((item, index) => (
                    <li key={index} className="d-flex align-items-center mb-3">
                        <div className="col-3">
                            <img src={item.image[0].imageUrl} alt={item.name} className="w-100 rounded object-fit-cover" />
                        </div>
                        <div className="col-9 ps-3">
                            <p className="text-muted mb-1 fw-semibold">{item.name}</p>
                            <p className="text-danger fw-bold">{item.price}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SuggesProduct;
