import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../AxiosConfig/config";

const Product = ({ category, sortOrder }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch API sản phẩm
  const fetchProducts = async () => {
    try {
      const result = await axios.get('phone/phone');
       if (result.status === 200 && Array.isArray(result.data)) {
        return result.data;
      } else {
        setError("Dữ liệu sản phẩm không hợp lệ.");
        return [];
      }
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
      setError("Không thể tải dữ liệu sản phẩm.");
      return [];
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();

      let filteredData = data;

      // Lọc theo category
      if (category) {
        filteredData = data.filter((item) => item.category === category);
      }

      // Sắp xếp theo giá
      if (sortOrder === "lowToHigh") {
        filteredData = [...filteredData].sort((a, b) => {
          const priceA = a?.image?.[0]?.memory?.[0]?.price || 0;
          const priceB = b?.image?.[0]?.memory?.[0]?.price || 0;
          return priceA - priceB;
        });
      } else if (sortOrder === "highToLow") {
        filteredData = [...filteredData].sort((a, b) => {
          const priceA = a?.image?.[0]?.memory?.[0]?.price || 0;
          const priceB = b?.image?.[0]?.memory?.[0]?.price || 0;
          return priceB - priceA;
        });
      }

      // Giới hạn số sản phẩm hiển thị
      setProducts(filteredData.slice(0, 10));
    };

    loadProducts();
  }, [category, sortOrder]);

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex align-items-center mb-4">
        <h3 className="fw-bold text-uppercase text-danger">{category} NỔI BẬT</h3>
      </div>

      {/* Hiển thị lỗi */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Danh sách sản phẩm */}
      <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
        {products.length > 0 ? (
          products.map((product, index) => (
            <Link key={product._id || index} to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
              <div className="col">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="bg-danger text-white py-1 px-2 rounded-3 fs-6">Hàng mới</span>
                    </div>
                    <img
                      alt={product.name || "Hình ảnh sản phẩm"}
                      className="card-img-top mb-2"
                      src={product.image?.[0]?.imageUrl || "/placeholder.jpg"}
                    />
                    <div className="bg-warning text-danger py-1 px-2 rounded-3 fs-6 mb-2">
                      Giảm {product.image?.[0]?.memory?.[0]?.price ? (product.image[0].memory[0].price * 0.1).toLocaleString('vi', { style: 'currency', currency: 'VND' }) : "0đ"}
                    </div>
                    <h5 className="card-title-ellipsis mb-1 fs-6 text-truncate" style={{ maxWidth: "100%" }}>
                      {product.name || "Sản phẩm không có tên"}
                    </h5>
                    <div className="text-danger fs-5 fw-bold mb-1">
                      {product.image?.[0]?.memory?.[0]?.price ? product.image[0].memory[0].price.toLocaleString('vi', { style: 'currency', currency: 'VND' }) : "0đ"}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : !error ? (
          <div className="col">
            <p className="text-center">Không có sản phẩm nào.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Product;
