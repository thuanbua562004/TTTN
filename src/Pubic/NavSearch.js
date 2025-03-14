import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search } from "lucide-react";
import axios from "../AxiosConfig/config";
import { Link } from "react-router-dom";
import Fuse from "fuse.js";
import removeAccents from "remove-accents";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [fuse, setFuse] = useState(null);

  // Gọi API lấy danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get("/phone/phone");
        if (result.status === 200 && Array.isArray(result.data)) {
          setProducts(result.data);
          setFilteredProducts(result.data);

          // Cấu hình Fuse.js để tìm kiếm hiệu quả
          const fuseInstance = new Fuse(result.data, {
            keys: ["name"],
            threshold: 0.3, // Độ chính xác (càng thấp càng khớp chặt)
            includeScore: true,
            ignoreLocation: true,
            findAllMatches: true,
          });
          setFuse(fuseInstance);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      }
    };

    fetchProducts();

    // Lắng nghe sự thay đổi kích thước màn hình
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Xử lý tìm kiếm với debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!query.trim()) {
        setFilteredProducts(products);
      } else if (fuse) {
        const searchResults = fuse.search(removeAccents(query)).map((res) => res.item);
        setFilteredProducts(searchResults);
      }
    }, 300); // Debounce 300ms

    return () => clearTimeout(timeout);
  }, [query, fuse, products]);

  return (
    <div className="col-12 col-md-8 col-lg-6 position-relative">
      <div className="input-group shadow-sm rounded">
        {isMobile && !showDropdown ? (
          <button className="btn btn-outline-secondary" onClick={() => setShowDropdown(true)}>
            <Search size={20} />
          </button>
        ) : (
          <input
            className="form-control me-2 flex-grow-1"
            type="search"
            placeholder="Tìm kiếm sản phẩm..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            autoFocus={isMobile}
            style={{ height: "38px", width: isMobile ? "100%" : "400px" }}
          />
        )}
      </div>

      {showDropdown && (
        <ul className="list-group mt-2 shadow-sm rounded position-absolute w-100 bg-white" style={{ zIndex: 1000 }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.slice(0, 5).map((product, index) => (
              <Link key={index} to={`/product/${product._id}`} className="text-decoration-none">
                <li className="list-group-item d-flex align-items-center border-0">
                  <img
                    src={product.image?.[0]?.imageUrl || "https://via.placeholder.com/100"}
                    alt={product.name}
                    className="me-3 rounded"
                    style={{ width: "60px", height: "60px" }}
                  />
                  <span className="fw-bold text-dark">{product.name}</span>
                </li>
              </Link>
            ))
          ) : (
            <li className="list-group-item text-muted">Không có sản phẩm nào</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
