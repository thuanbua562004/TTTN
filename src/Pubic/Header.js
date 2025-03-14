import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import { fetchUserById, fetchCart } from '../Redux/counterSlice';
import NavSearch from "./NavSearch"
const Header = () => {
  const dispatch = useDispatch();
  const totalItems = useSelector((state) => state.data?.cart?.details?.length || 0);
  const stageProfile = useSelector((state) => state.data?.stageProfile);

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const decoded = jwtDecode(storedToken);
          setUserId(decoded.email); 
          await dispatch(fetchUserById(decoded.email));
        } catch (error) {
          console.error("Token không hợp lệ:", error);
          localStorage.removeItem('token'); // Xóa token không hợp lệ
          setToken(null);
        }
      }
    };

    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    if (stageProfile?._id) {
      localStorage.setItem("id", stageProfile._id);
      dispatch(fetchCart(stageProfile._id));
    }
  }, [dispatch, stageProfile?._id]);
  return (
    <>

      <header>
        <nav
          className="navbar navbar-expand-lg navbar-light"
          style={{ backgroundColor: "#ff0000" }}
        >
          <div className="container-fluid">
            {/* Logo */}
            <Link className="navbar-brand" to={'/'}>
              <img
                src="https://dienthoaihay.vn/images/config/logo-dth_1630379348.png"
                alt="Logo"
                className="img-fluid"
                style={{ maxHeight: 50 }}
              />
            </Link>
            {/* Nút thu gọn menu (cho mobile) */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            {/* Nội dung menu */}
            <div
              className="collapse navbar-collapse justify-content-center"
              id="navbarContent"
            >
              {/* Thanh tìm kiếm */}
              <div className="d-flex flex-wrap align-items-center mb-2 mb-lg-0">
                <NavSearch />
              </div>
              {/* Icon hỗ trợ bán hàng */}
              <div className=" d-flex flex-wrap align-items-center justify-content-around mb-2 mb-lg-0">
                <div className="d-flex flex-wrap align-items-center justify-content-around mb-2 mb-lg-0 px-3">
                  <Link to={'tel:"032555"'}>
                    <div
                      className="d-flex justify-content-center align-items-center bg-white me-2"
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: "50%",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                      }}
                    >
                      <FontAwesomeIcon style={{ color: "red" }} icon={faPhone} />
                    </div>
                  </Link>
                  <div className="text-center">
                    <span style={{ fontSize: 12 }}>Bán hàng</span>
                    <br />
                    <span>Online</span>
                  </div>
                </div>
                <div className="d-flex flex-wrap align-items-center justify-content-around mb-2 mb-lg-0 px-5">
                  <Link to={'/cart'} style={{ position: 'relative' }}>
                    <div
                      className="d-flex justify-content-center align-items-center bg-white me-2"
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: "50%",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        position: "relative"
                      }}
                    >
                      <FontAwesomeIcon style={{ color: "red" }} icon={faShoppingCart} />

                      {/* Hiển thị số sản phẩm nếu > 0 */}
                      {totalItems > 0 && (
                        <span
                          style={{
                            position: "absolute",
                            top: "-5px",
                            right: "-5px",
                            background: "red",
                            color: "white",
                            fontSize: "12px",
                            fontWeight: "bold",
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          {totalItems}
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="text-center">
                    <span>Giỏ hàng</span>
                  </div>
                </div>

                {token ? (<Link to={"/profile"}
                  className="d-flex d-lg-none  flex-wrap align-items-center justify-content-around mb-2 mb-lg-0 px-5"
                
                >
                  <div
                    className="d-flex justify-content-center align-items-center bg-white me-2"
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: "50%",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <FontAwesomeIcon style={{ color: "red" }} icon={faUser} />

                  </div>
                  <div className="text-center">
                    <span style={{ textDecoration: "none" }} className='text-danger'>{stageProfile?.email}</span>
                  </div>
                </Link>) : (<div
                  className="d-flex d-lg-none  flex-wrap align-items-center justify-content-around mb-2 mb-lg-0 px-5"
                  data-bs-toggle="modal"
                  data-bs-target="#authModal"
                  to={"#"}
                >
                  <div
                    className="d-flex justify-content-center align-items-center bg-white me-2"
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: "50%",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <FontAwesomeIcon style={{ color: "red" }} icon={faUser} />

                  </div>
                  <div className="text-center">
                    <span>Đăng nhập</span>
                  </div>
                </div>)}
              </div>
              {/* Nút đăng nhập */}
            </div>
            {token ? <div
              className="d-none  d-lg-flex flex-wrap align-items-center justify-content-around mb-2 mb-lg-0 px-5"
            >
              <Link to={'/profile'}
                className="d-flex justify-content-center align-items-center bg-white me-2"
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: "50%",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                }}
              >
                <FontAwesomeIcon style={{ color: "red" }} icon={faUser} />
              </Link>
              <div className="text-center">
                <span>{stageProfile?.email}</span>
              </div>
            </div> :
              <div
                className="d-none  d-lg-flex flex-wrap align-items-center justify-content-around mb-2 mb-lg-0 px-5"
                data-bs-toggle="modal"
                data-bs-target="#authModal"
              >
                <Link
                  className="d-flex justify-content-center align-items-center bg-white me-2"
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <FontAwesomeIcon style={{ color: "red" }} icon={faUser} />
                </Link>
                <div className="text-center">
                  <span>Đăng nhập</span>
                </div>
              </div>}
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header;