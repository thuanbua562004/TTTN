import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search } from "lucide-react"; // Icon tìm kiếm

const products = [
  { name: "iPhone 15", image: "https://via.placeholder.com/100" },
  { name: "Samsung Galaxy S23", image: "https://via.placeholder.com/100" },
  { name: "MacBook Air M2", image: "https://via.placeholder.com/100" },
  { name: "Dell XPS 13", image: "https://via.placeholder.com/100" },
  { name: "Apple Watch Series 9", image: "https://via.placeholder.com/100" },
  { name: "Sony WH-1000XM5", image: "https://via.placeholder.com/100" },
  { name: "iPad Pro M2", image: "https://via.placeholder.com/100" },
];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setFilteredProducts(
      value === ""
        ? products
        : products.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
          )
    );
  };

  return (
    <div className="col-12 col-md-8 col-lg-6 position-relative">
      <div className="input-group shadow-sm rounded">
        {isMobile && !showSearch ? (
          // 🌟 Chế độ Mobile: Hiển thị nút tìm kiếm
          <button
            className="btn btn-outline-secondary"
            onClick={() => setShowSearch(true)}
          >
            <Search size={20} />
          </button>
        ) : (
          // 🌟 Chế độ Desktop + Khi nhấn vào nút trên Mobile
          <input
            style={{ height: "31px", width: isMobile ? "100%" : "400px" }}
            className="form-control me-2 flex-grow-1"
            type="search"
            placeholder="Tìm kiếm sản phẩm ?"
            value={query}
            onChange={handleSearch}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            autoFocus={isMobile} // Khi mở input trên mobile, tự động focus
          />
        )}
      </div>

      {showDropdown && (
        <ul
          className="list-group mt-2 shadow-sm rounded position-absolute w-100 bg-white"
          style={{ zIndex: 1000 }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <li
                key={index}
                className="list-group-item d-flex align-items-center border-0"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="me-3 rounded"
                  style={{ width: "60px", height: "60px" }}
                />
                <span className="fw-bold">{product.name}</span>
              </li>
            ))
          ) : (
            <li className="list-group-item text-muted">
              Không có sản phẩm nào
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
