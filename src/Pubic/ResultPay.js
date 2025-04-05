import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "../AxiosConfig/config";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, fetchUserById } from "../Redux/counterSlice";

function OrderSuccess() {
  const dispatch = useDispatch();
  const data = useSelector((stage) => stage.data);
  const [searchParams] = useSearchParams();

  // Lấy thông tin từ URL query params
  const datePay = searchParams.get("vnp_PayDate");
  const toTal = searchParams.get("vnp_Amount");
  const idCheckOut = searchParams.get("vnp_OrderInfo");
  const [status, setStatus] = useState(searchParams.get("vnp_ResponseCode") || "404");
  const id = localStorage.getItem("id");

  // Trạng thái để kiểm soát API chỉ chạy 1 lần
  const [isUserFetched, setIsUserFetched] = useState(false);
  const [isCartFetched, setIsCartFetched] = useState(false);
  const [statusPay, setStatusPay] = useState(false);

  // Fetch user data chỉ chạy 1 lần
  useEffect(() => {
    if (!isUserFetched && !data.stageProfile) {
      dispatch(fetchUserById(id));
      setIsUserFetched(true);
    }
  }, [dispatch, id, data.stageProfile, isUserFetched]);

  // Fetch cart data chỉ chạy 1 lần
  useEffect(() => {
    if (!isCartFetched && (!data.cart.details || data.cart.details.length === 0)) {
      dispatch(fetchCart(id));
      setIsCartFetched(true);
    }
  }, [dispatch, id, data.cart.details, isCartFetched]);

  const [quickBuy, setQuickBuy] = useState(JSON.parse(localStorage.getItem("quickBuy") || "[]"));

  useEffect(() => {
    const isHistorySaved = localStorage.getItem("statusPay");
  
    if (status === "00" && !statusPay && !isHistorySaved) {
  
      // Kiểm tra xem có dữ liệu "mua nhanh" không
      const hasQuickBuy = quickBuy && (Array.isArray(quickBuy) ? quickBuy.length > 0 : true);
  
      // Đợi Redux cập nhật giỏ hàng nếu có đăng nhập
      if (id && (!data?.cart?.details || data.cart.details.length === 0) && !hasQuickBuy) {
        return; // Chưa có dữ liệu, không gọi API vội
      }
        const productList = id ? data?.cart?.details : (Array.isArray(quickBuy) ? quickBuy : [quickBuy]);
  
      console.log("Danh sách sản phẩm:", productList);
  
      if (productList.length > 0) {
        setStatusPay(true);
        handlerSaveHistory(productList);
      }
    }
  }, [status, data.cart.details, quickBuy]); 
  
  
  
  // Lưu lịch sử giao dịch
  const handlerSaveHistory = async (productList) => {
    

    const address = localStorage.getItem("address");
    const note = localStorage.getItem("note");
    const name = localStorage.getItem("name");
    const phone = localStorage.getItem("phone");

    try {
      const result = await axios.post("history/history", {
        id,
        address: address || data.stageProfile?.address,
        methodPayload: "vnPay",
        totalPrice: toTal,
        note: note,
        phone: phone || data.stageProfile?.phone || "",
        nameCustomer: name || data.stageProfile?.name,
        listProduct: productList,
      });
      console.log(result)
      if(id){
        if (result.status === 200) {
          try {
            await axios.delete(`/cart/cart/${id}`);
            console.log("Xóa giỏ hàng thành công");
            localStorage.removeItem("address");
            localStorage.removeItem("note");
            await sendMailCash()
          } catch (error) {
            console.error("Lỗi khi xóa giỏ hàng:", error);
          }
        }
      }else{
        localStorage.removeItem('quickBuy')
      }
    } catch (error) {
      console.error("Lỗi khi lưu lịch sử:", error);
      setStatus("404");
    }
  };

  const sendMailCash = async () => {
    try {
      const result = await axios.post("/reset/cash-success", {
        email: data.stageProfile?.email,
        id,
        total : toTal
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="mb-3">
        <i
          className={`fas ${status === "00" ? "fa-check-circle text-success" : "fa-times-circle text-danger"}`}
          style={{ fontSize: 90 }}
        />
      </div>
      <h2 className={`mb-2 fw-bold ${status === "00" ? "text-success" : "text-danger"}`}>
        {status === "00" ? "Giao dịch thành công!" : "Giao dịch thất bại!"}
      </h2>
      <p className="lead text-muted text-center">
        {status === "00"
          ? "Cảm ơn bạn đã mua hàng! Đơn hàng của bạn đang được xử lý."
          : "Thanh toán không thành công, vui lòng thử lại."}
      </p>
      <div className="card mt-3 shadow-lg" style={{ maxWidth: "450px", width: "100%" }}>
        <div className={`card-header text-white text-center ${status === "00" ? "bg-primary" : "bg-danger"}`}>
          <h5 className="mb-0">Thông tin đơn hàng</h5>
        </div>
        <div className="card-body">
          <p><strong>Mã thanh toán:</strong> {idCheckOut || "Không có thông tin"}</p>
          <p><strong>Ngày thanh toán:</strong> {datePay && datePay.length === 14
            ? new Date(
              datePay.slice(0, 4),
              datePay.slice(4, 6) - 1,
              datePay.slice(6, 8),
              datePay.slice(8, 10),
              datePay.slice(10, 12),
              datePay.slice(12, 14)
            ).toLocaleString("vi-VN", { hour12: false })
            : "Không có thông tin"}
          </p>
          <p><strong>Tổng thanh toán:</strong>
            <span className="text-danger fw-bold">
              {toTal ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(toTal) : "Không có thông tin"}
            </span>
          </p>

        </div>
      </div>
      <div className="d-flex gap-3 mt-4">
        <Link to={"/"} className="btn btn-primary btn-lg px-4">Quay lại trang chủ</Link>
        <Link to={"/history"} className="btn btn-outline-secondary btn-lg px-4">Xem chi tiết đơn hàng</Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
