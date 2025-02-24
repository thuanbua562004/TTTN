import React from "react";

function OrderSuccess() {
  return (
    <div className="container mt-5 text-center">
      {/* Status Icon */}
      <div className="mb-4">
        <i className="fas fa-check-circle text-success" style={{ fontSize: 80 }} />
      </div>

      {/* Payment Status Heading */}
      <h2 className="mb-3 text-success">Giao dịch thành công!</h2>

      {/* Payment Status Message */}
      <p className="lead mt-3">
        Cảm ơn bạn đã mua hàng! Đơn hàng của bạn đang được xử lý.
      </p>

      {/* Order Information Card */}
      <div className="card mt-4 mb-4 shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5>Thông tin đơn hàng</h5>
        </div>
        <div className="card-body">
          <p>
            <strong>Mã đơn hàng:</strong> 123456789
          </p>
          <p>
            <strong>Ngày thanh toán:</strong> 20/02/2025 14:30:00
          </p>
          <p>
            <strong>Tổng thanh toán:</strong> 1.500.000 VND
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-center mt-4">
        <a href="/" className="btn btn-primary btn-lg mr-2">
          Quay lại trang chủ
        </a>
        <a href="/history" className="btn btn-outline-secondary btn-lg">
          Xem chi tiết đơn hàng
        </a>
      </div>
    </div>
  );
}

export default OrderSuccess;
