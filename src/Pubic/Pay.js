import React from 'react';
import { ToastContainer } from 'react-toastify';
import Address from './GetAdress';

function Pay() {
  return (
    <>
      <ToastContainer />
      <div className="container mt-5">
        <div className="row">
          {/* Thông tin nhận hàng */}
          <div className="col-12 col-md-4">
            <span className="fs-4 text-danger">Thông Tin Nhận Hàng</span>
            <Address />
            <div className="mb-3">
              <label className="form-label">Tên người nhận:</label>
              <input className="form-control" placeholder="Nhập tên người nhận" />
            </div>
            <div className="mb-3">
              <label className="form-label">Số điện thoại:</label>
              <input type="number" className="form-control" placeholder="Nhập số điện thoại" />
            </div>
            <div className="mb-3">
              <label className="form-label">Ghi chú:</label>
              <textarea className="form-control" rows="3" placeholder="Thêm ghi chú (nếu có)" />
            </div>
          </div>

          {/* Phương thức thanh toán */}
          <div className="col-12 col-md-4">
            <span className="fs-4 text-danger">Phương Thức Thanh Toán</span>
            <div className="mt-3">
              <label className="form-label">Chọn phương thức thanh toán</label>
              <select className="form-select">
                <option value="" disabled selected>Vui lòng chọn phương thức thanh toán!</option>
                <option value="2">Thanh Toán VNPay</option>
                <option value="3">Thanh Toán MoMo</option>
              </select>
            </div>
            <div className="form-check mt-3">
              <input className="form-check-input" type="radio" checked disabled />
              <label className="form-check-label text-primary">Phí Vận Chuyển: 25.000 VNĐ</label>
            </div>
            <div className="form-group mt-2">
              <label>Nhập mã giảm giá</label>
              <div className="input-group mt-2">
                <input type="text" className="form-control" placeholder="Mã giảm giá" />
                <button className="btn btn-primary">Add</button>
              </div>
            </div>
          </div>

          {/* Đơn hàng */}
          <div className="col-12 col-md-4 bg-light">
            <span className="fs-4 text-danger">Đơn Hàng</span>
            <hr />
            <div className="order-container" style={{ maxHeight: '300px', overflowX: 'auto' }}>
              <div className="row mb-3">
                <div className="col-3">
                  <img className="img-fluid" src="https://via.placeholder.com/100" alt="Sản phẩm" />
                </div>
                <div className="col-6">
                  <span className="d-block">Tên Sản Phẩm</span>
                  <span className="d-block text-danger">Màu/Số lượng</span>
                </div>
                <div className="col-3 text-primary">
                  <span>100.000 VNĐ</span>
                </div>
              </div>
              <hr />
            </div>
            <div className="d-flex justify-content-between">
              <span>Tạm tính:</span>
              <span>100.000 VNĐ</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Phí vận chuyển:</span>
              <span>25.000 VNĐ</span>
            </div>
            <hr />
            <div className="label-total">
              <div className="d-flex justify-content-between fw-bold">
                <span>Tổng:</span>
                <span>125.000 VNĐ</span>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <a href="/cart" className="text-decoration-none">
                    <i className="fa-solid fa-less-than"></i> Quay Về Giỏ
                  </a>
                </div>
                <div className="col text-end">
                  <button type="button" className="btn btn-danger">Thanh Toán</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pay;
