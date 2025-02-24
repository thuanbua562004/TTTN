import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../AxiosConfig/config';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const result = await axios.get('phone/phone');
      if (result.status === 200 && Array.isArray(result.data)) {
        setProducts(result.data);
      } else {
        setError("Dữ liệu sản phẩm không hợp lệ.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
      setError("Không thể tải dữ liệu sản phẩm.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log("Danh sách sản phẩm:", products);

  return (
    <div className="container py-4">
      {/* Header Section */}
      <div className="d-flex align-items-center space-x-4 mb-4">
        <div className="position-relative">
          <div className="bg-danger text-white fw-bold py-2 px-5 rounded-3">
            XIAOMI NỔI BẬT
          </div>
        </div>
        <div className="d-flex gap-2 px-2">
          <button className="btn btn-outline-danger fw-semibold py-2 px-4 rounded-3 border border-secondary">
            Mi
          </button>
          <button className="btn btn-outline-danger fw-semibold py-2 px-4 rounded-3 border border-secondary">
            Redmi
          </button>
          <button className="btn btn-outline-danger fw-semibold py-2 px-4 rounded-3 border border-secondary">
            Redmi Note
          </button>
        </div>
      </div>

      {/* Hiển thị lỗi nếu có */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Product Grid */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
        {products.length > 0 ? (
          products.map((product, index) => (
            <Link to={`/product/${product._id}`} style={{textDecoration:"none"}}>
               <div className="col" key={product.id || index}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="bg-danger text-white py-1 px-2 rounded-3 fs-6">
                      Sẵn tiếng Việt
                    </span>
                  </div>
                  <img
                    alt={product.name || "Hình ảnh sản phẩm"}
                    className="card-img-top mb-2"
                    src={product.image?.length > 0 ? product.image[0].imageUrl : "/placeholder.jpg"}
                  />
                  <div className="bg-warning text-danger py-1 px-2 rounded-3 fs-6 mb-2">
                    Giảm 2.840.000đ
                  </div>
                  <h5 className="card-title-ellipsis mb-1">
                    {product.name || "Sản phẩm không có tên"}
                  </h5>
                  <div className="text-danger fs-4 fw-bold mb-1">{product? product.image[0].memory[0].price.toLocaleString('vi', {style : 'currency', currency : 'VND'}):""}</div>
                  <div className="text-muted text-decoration-line-through mb-2">
                    {product.memory?.length > 0 ? product.memory[0].price : "Liên hệ"}
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="text-warning me-2">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                    </div>
                    <span className="text-muted">53 đánh giá</span>
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
