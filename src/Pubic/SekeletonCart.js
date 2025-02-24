import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCart = ({ loading }) => {
  return (
    <div className="container mt-4">
      {/* Tiêu đề */}
      <div className="text-danger fs-4 fw-bold text-center mb-3">Giỏ Hàng Của Bạn</div>

      {/* Bảng sản phẩm */}
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <tbody>
            {Array.from({ length: 3 }).map((_, index) => (
              <tr key={index} className="bg-white">
                {/* Cột: Thông tin sản phẩm */}
                <td className="text-start p-3 d-flex align-items-center">
                  <Skeleton width={60} height={60} className="me-2" />
                  <div>
                    <Skeleton width={120} />
                    <Skeleton width={80} className="mt-1" />
                  </div>
                </td>
                
                {/* Cột: Đơn Giá */}
                <td><Skeleton width={80} /></td>
                
                {/* Cột: Số Lượng */}
                <td>
                  <div className="d-flex justify-content-center">
                    <Skeleton width={30} height={30} className="me-2" />
                    <Skeleton width={20} />
                    <Skeleton width={30} height={30} className="ms-2" />
                  </div>
                </td>

                {/* Cột: Thành Tiền */}
                <td><Skeleton width={100} /></td>

                {/* Cột: Xóa */}
                <td><Skeleton circle width={25} height={25} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tổng tiền & Thanh toán */}
      <div className="d-flex justify-content-end p-4">
        <div className="text-end">
          <h5 className="fw-bold">
            Tổng Tiền: {loading ? <Skeleton width={100} /> : "VNĐ"}
          </h5>
          <Link to="/pay">
            <button className="btn btn-danger w-100 mt-3" disabled={loading}>
              Thanh Toán
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCart;
