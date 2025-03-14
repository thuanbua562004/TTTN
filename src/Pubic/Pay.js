import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Address from './GetAdress';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, fetchUserById } from '../Redux/counterSlice';
import Loading from './Loading';
import axios from '../AxiosConfig/config';
import {Link, useLocation, useNavigate } from "react-router-dom";

function Pay() {

  const dispatch = useDispatch();
  const data = useSelector((stage) => stage.data)
  const [address, setAddress] = useState('')
  const [method, setMethod] = useState('')
  const [note, setNote] = useState('')
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  console.log(data.cart.details)

  let total = 0
  data.cart?.details?.forEach((item) => {
    total += item.price * item.number
  })
  const id = localStorage.getItem('id');
  useEffect(() => {
    if (data.stageProfile =="null" || !data.cart.details) {
      dispatch(fetchUserById(id));
      dispatch(fetchCart(id));
    }
  }, [id]); 
  console.log(data.stageProfile)
  const handleReceiveAddress = (data) => {
    setAddress(data)
  };
  const handlerPay = async () => {
    localStorage.setItem('address', address)
    localStorage.setItem('note', note)
    localStorage.setItem('name', name)
    localStorage.setItem('phone', phone)
    if (method == 2) {
      try {
        const reslut = await axios.post('/payvn/create_payment_url', {
          amount: total,
          note: ""
        })
        window.location.href = reslut.data
      } catch (error) {
      }
    } else if (method == 3) {
      try {
        const reslut = await axios.post('/pay/create_payment_momo', {
          amount: total,
          note: ""
        })
        window.location.href = reslut.data.payUrl
      } catch (error) {
        console.log(error)
      }
    } else {
      return
    }
  }
  return (
    <>
      {data.stageLoad === "loading" && <Loading />}

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
                value={name !== "" ? name : data.stageProfile?.name || ""}
                placeholder="Nhập tên người nhận"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Số điện thoại:</label>
              <input
                type="number"
                className="form-control"
                onChange={(e) => setPhone(e.target.value)}
                value={phone !== "" ? phone : data.stageProfile?.phone || ""}
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ghi chú:</label>
              <textarea onChange={(e) => setNote(e.target.value)} value={note} className="form-control" rows="3" placeholder="Thêm ghi chú (nếu có)" />
            </div>
            <Address sendDataToParent={handleReceiveAddress} address={data.stageProfile?.address || ""} />
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
            <div className="form-check mt-3">
              <input className="form-check-input" type="radio" checked disabled />
              <label className="form-check-label text-primary">Phí Vận Chuyển: 25.000 VNĐ</label>
            </div>
            {/* <div className="form-group mt-2">
              <label>Nhập mã giảm giá</label>
              <div className="input-group mt-2">
                <input type="text" className="form-control" placeholder="Mã giảm giá" />
                <button className="btn btn-primary">Add</button>
              </div>
            </div> */}
          </div>

          {/* Đơn hàng */}
          <div className="col-12 col-md-4 bg-light">
            <span className="fs-4 text-danger">Đơn Hàng</span>
            <hr />
            <div className="order-container" style={{ maxHeight: '300px', overflowX: 'auto' }}>
              {data?.cart?.details.map((item, index) => (
                <div className="row mb-3" key={index}>
                  <div className="col-3">
                    <img className="img-fluid" src={item.imgProduct} alt="Sản phẩm" />
                  </div>
                  <div className="col-6">
                    <span className="d-block">{item.nameProduct || "Tên Sản Phẩm"}</span>
                    <span className="d-block text-danger">{item.memory || "Màu"} / {item.quantity || 1}</span>
                  </div>
                  <div className="col-3 text-primary">
                    <span>{item.price?.toLocaleString()} VNĐ</span>
                  </div>
                </div>
              ))}

              <hr />
            </div>
            <div className="d-flex justify-content-between">
              <span>Tạm tính:</span>
              <span>{total.toLocaleString()} VNĐ</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Phí vận chuyển:</span>
              <span>25.000 VNĐ</span>
            </div>
            <hr />
            <div className="label-total">
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
                  <button type="button" disabled={address == "" || method == ""} onClick={() => handlerPay()} className="btn btn-danger">Thanh Toán</button>
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
