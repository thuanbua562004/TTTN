import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Address from './GetAdress';
import axios from '../AxiosConfig/config';
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function Pay() {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy dữ liệu từ `navigate()` hoặc `localStorage`
  const quickBuyProduct = location.state || JSON.parse(localStorage.getItem("quickBuy")) || null;

  const [address, setAddress] = useState('');
  const [method, setMethod] = useState('');
  const [note, setNote] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Danh sách sản phẩm cần thanh toán
  const productList = quickBuyProduct ? [quickBuyProduct] : [];
  let total = productList.reduce((acc, item) => acc + item.price * item.number, 0);

  const handleReceiveAddress = (data) => {
    setAddress(data);
  };

  const handlerPay = async () => {
    if (!method) return;

    localStorage.setItem('address', address);
    localStorage.setItem('note', note);
    localStorage.setItem('name', name);
    localStorage.setItem('phone', phone);

    try {
      let result;
      if (method == 2) {
        result = await axios.post('/payvn/create_payment_url', { amount: total, note: "" });
      } else if (method == 3) {
        result = await axios.post('/pay/create_payment_momo', { amount: total, note: "" });
      }
      window.location.href = result?.data?.payUrl || result?.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container mt-5">
        <div className="row">
          {/* Thông tin nhận hàng */}
          <div className="col-12 col-md-4">
            <span className="fs-4 text-danger">Thông Tin Nhận Hàng</span>
            <div className="mb-3">
              <label className="form-label">Tên người nhận:</label>
              <input
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Nhập tên người nhận"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Số điện thoại:</label>
              <input
                type="number"
                className="form-control"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                placeholder="Nhập số điện thoại"
              />
            </div>
            <Address sendDataToParent={handleReceiveAddress} />
          </div>

          {/* Phương thức thanh toán */}
          <div className="col-12 col-md-4">
            <span className="fs-4 text-danger">Phương Thức Thanh Toán</span>
            <div className="mt-3">
              <label className="form-label">Chọn phương thức thanh toán</label>
              <select onChange={(e) => setMethod(e.target.value)} className="form-select">
                <option value="" disabled selected>Vui lòng chọn phương thức thanh toán!</option>
                <option value="2">Thanh Toán VNPay</option>
                <option value="3">Thanh Toán MoMo</option>
              </select>
            </div>
          </div>

          {/* Đơn hàng */}
          <div className="col-12 col-md-4 bg-light">
            <span className="fs-4 text-danger">Đơn Hàng</span>
            <hr />
            <div className="order-container" style={{ maxHeight: '300px', overflowX: 'auto' }}>
              {productList.map((item, index) => (
                <div className="row mb-3" key={index}>
                  <div className="col-3">
                    <img className="img-fluid" src={item.imgProduct} alt="Sản phẩm" />
                  </div>
                  <div className="col-6">
                    <span className="d-block">{item.nameProduct}</span>
                    <span className="d-block text-danger">{item.memory} / {item.color}</span>
                  </div>
                  <div className="col-3 text-primary">
                    <span>{item.price?.toLocaleString()} VNĐ</span>
                  </div>
                </div>
              ))}
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <span>Tạm tính:</span>
              <span>{total.toLocaleString()} VNĐ</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Phí vận chuyển:</span>
              <span>25.000 VNĐ</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Tổng:</span>
              <span>{(total + 25000).toLocaleString()} VNĐ</span>
            </div>
            <div className="row mt-3">
              <div className="col">
                <Link to={"/cart"} className="text-decoration-none">
                  <i className="fa-solid fa-less-than"></i> Quay Về Giỏ
                </Link>
              </div>
              <div className="col text-end">
                <button type="button" disabled={!address || !method} onClick={() => handlerPay()} className="btn btn-danger">Thanh Toán</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pay;
