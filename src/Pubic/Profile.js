import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserById } from '../Redux/counterSlice';
import { Link, useNavigate } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Ensure correct Redux state access
    const stageProfile = useSelector((state) => state.data?.stageProfile);
    const stageLoad = useSelector((state) => state.data?.stageLoad);
    // Get user token from localStorage
    const isLogin = localStorage.getItem('token');

    // Redirect if not logged in
    useEffect(() => {
        if (!isLogin) {
            navigate("/");
        }
    }, [isLogin, navigate]);

    // Fetch user data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (isLogin) {
                    const decoded = jwtDecode(isLogin);
                    await dispatch(fetchUserById(decoded.email));
                }
            } catch (error) {
                localStorage.removeItem("id");
                localStorage.removeItem("token");
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [dispatch, isLogin]);
    console.log(stageProfile)
    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        navigate(0);
    };
    if (!stageProfile) {
        return (
            <>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10">
                            <div className="card shadow-lg border-0 rounded-lg">
                                <div className="card-body text-center p-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h3 className="fw-bold text-primary">
                                            <Skeleton width={120} />
                                        </h3>
                                        <Skeleton width={80} height={30} />
                                    </div>

                                    {/* Ảnh đại diện */}
                                    <Skeleton circle={true} height={120} width={120} className="mt-3" />

                                    <h4 className="mt-3 fw-semibold">
                                        <Skeleton width={150} />
                                    </h4>

                                    {/* Thông tin cá nhân */}
                                    <ul className="list-group list-group-flush mt-3">
                                        <li className="list-group-item">
                                            <Skeleton width={200} />
                                        </li>
                                        <li className="list-group-item">
                                            <Skeleton width={250} />
                                        </li>
                                        <li className="list-group-item">
                                            <Skeleton width={180} />
                                        </li>
                                        <li className="list-group-item">
                                            <Skeleton width={220} />
                                        </li>
                                    </ul>

                                    {/* Nút giả lập */}
                                    <Skeleton height={40} width={"100%"} className="mt-3" />
                                    <Skeleton height={40} width={"100%"} className="mt-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10">
                    <div className="card shadow-lg border-0 rounded-lg">
                        <div className="card-body text-center p-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <h3 className="fw-bold text-primary">Hồ Sơ</h3>
                                <Link to={"/profileupdate"} className="btn btn-outline-primary btn-sm">
                                    <i className="bi bi-pencil-square"></i> Chỉnh sửa
                                </Link>
                            </div>

                            {/* Profile Picture */}
                            <img
                                className="rounded-circle shadow mt-3"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTUE7jXHro7BdwC8kOvXnqQ7m1SwUP6MH6iK_ZLmKKjiG8tkhq7q_tytzMTXBtGsSRp0Y&usqp=CAU"
                                alt="User Profile"
                                width={120}
                                height={120}
                            />
                            <h4 className="mt-3 fw-semibold">{stageProfile?.name || "Người dùng"}</h4>

                            {/* User Info */}
                            <ul className="list-group list-group-flush mt-3">
                                <li className="list-group-item">
                                    <i className="bi bi-calendar-event me-2 text-danger"></i>
                                    Ngày sinh : {stageProfile?.date || "Ngày sinh"}
                                </li>
                                <li className="list-group-item">
                                    <i className="bi bi-geo-alt me-2 text-success"></i>
                                   Địa chỉ:  {stageProfile?.address || "Địa chỉ"}
                                </li>
                                <li className="list-group-item">
                                    <i className="bi bi-envelope-at me-2 text-primary"></i>
                                    <a href={`mailto:${stageProfile?.email || 'example@mail.com'}`} className="text-decoration-none">
                                      Gmail:   {stageProfile?.email || "Email"}
                                    </a>
                                </li>
                                <li className="list-group-item">
                                    <i className="bi bi-telephone me-2 text-info"></i>
                                    Phone: {stageProfile?.phone || "Số điện thoại"}
                                </li>
                            </ul>

                            {/* Order History Button */}
                            <a href="/history" className="btn btn-danger mt-3 w-100">
                                <i className="bi bi-cart3 me-2"></i> Xem Đơn Hàng
                            </a>

                            {/* Logout Button */}
                            <button onClick={handleLogout} className="btn btn-warning mt-2 w-100">
                                <i className="bi bi-box-arrow-right me-2"></i> Đăng Xuất
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
