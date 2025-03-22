import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../AxiosConfig/config";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, fetchUserById } from "../Redux/counterSlice";

function OrderSuccess() {
  const dispatch = useDispatch();
  const data = useSelector((stage) => stage.data);
  const [searchParams] = useSearchParams();

  // ✅ Lấy thông tin từ MoMo query params
  const resultCode = searchParams.get("resultCode"); // 0: thành công, khác 0: thất bại
  const message = searchParams.get("message"); // Thông báo kết quả
  const amount = searchParams.get("amount"); // Số tiền thanh toán
  const orderId = searchParams.get("orderId"); // Mã đơn hàng
  const payType = searchParams.get("payType"); // Loại thanh toán (QR, ATM,...)
  const responseTime = searchParams.get("responseTime");
  const formattedTime = responseTime ? new Date(Number(responseTime)).toLocaleString("vi-VN") : "Không có thông tin";

  const id = localStorage.getItem("id");

  // Trạng thái kiểm soát API chỉ chạy 1 lần
  const [statusPay, setStatusPay] = useState(false);

  // Fetch user & cart nếu chưa có dữ liệu
  useEffect(() => {
    if (id && !data.stageProfile) {
      dispatch(fetchUserById(id));
    }
    if (id && (!data.cart.details || data.cart.details.length === 0)) {
      dispatch(fetchCart(id));
    }
  }, [dispatch, id, data.stageProfile, data.cart.details]);

  const quickBuy = JSON.parse(localStorage.getItem("quickBuy") || "[]");

  // ✅ Xử lý lưu lịch sử giao dịch nếu thành công
  useEffect(() => {
    const isHistorySaved = localStorage.getItem("statusPay");

    if (resultCode === "0" && !statusPay && !isHistorySaved) {
      // Kiểm tra xem có dữ liệu "mua nhanh" không
      const hasQuickBuy = quickBuy && (Array.isArray(quickBuy) ? quickBuy.length > 0 : true);

      // Nếu có ID thì phải đợi giỏ hàng cập nhật
      if (id && (!data?.cart?.details || data.cart.details.length === 0) && !hasQuickBuy) {
        return;
      }

      const productList = id ? data?.cart?.details : (Array.isArray(quickBuy) ? quickBuy : [quickBuy]);

      if (productList.length > 0) {
        setStatusPay(true);
        handlerSaveHistory(productList);
      }
    }
  }, [resultCode, data.cart.details, quickBuy]);

  // ✅ Lưu lịch sử giao dịch vào DB
  const handlerSaveHistory = async (productList) => {
    const address = localStorage.getItem("address");
    const note = localStorage.getItem("note");
    const name = localStorage.getItem("name");
    const phone = localStorage.getItem("phone");

    try {
      const result = await axios.post("history/history", {
        id,
        address: address || data.stageProfile?.address,
        methodPayload: "MoMo",
        totalPrice: amount,
        note: note,
        phone: phone || data.stageProfile?.phone || "",
        nameCustomer: name || data.stageProfile?.name,
        listProduct: productList
      });

      if (result.status === 200) {
        if (id) {
          await axios.delete(`/cart/cart/${id}`);
          console.log("Xóa giỏ hàng thành công");
          localStorage.removeItem("address");
          localStorage.removeItem("note");
          sendMailCash();
        } else {
          localStorage.removeItem("quickBuy");
        }
      }
    } catch (error) {
      console.error("Lỗi khi lưu lịch sử:", error);
    }
  };

  // ✅ Gửi email xác nhận giao dịch thành công
  const sendMailCash = async () => {
    try {
      await axios.post("/reset/cash-success", {
        email: data.stageProfile?.email,
        id,
        total: amount,
      });
    } catch (error) {
      console.log("Lỗi gửi email:", error);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="mb-3">
        <i
          className={`fas ${resultCode === "0" ? "fa-check-circle text-success" : "fa-times-circle text-danger"}`}
          style={{ fontSize: 90 }}
        />
      </div>
      <h2 className={`mb-2 fw-bold ${resultCode === "0" ? "text-success" : "text-danger"}`}>
        {resultCode === "0" ? "Giao dịch thành công!" : "Giao dịch thất bại!"}
      </h2>
      <p className="lead text-muted text-center">{message || "Không có thông tin"}</p>

      <div className="card mt-3 shadow-lg" style={{ maxWidth: "450px", width: "100%" }}>
        <div className={`card-header text-white text-center ${resultCode === "0" ? "bg-primary" : "bg-danger"}`}>
          <h5 className="mb-0">Thông tin đơn hàng</h5>
        </div>
        <div className="card-body">
          <p><strong>Mã đơn hàng:</strong> {orderId || "Không có thông tin"}</p>
          <p><strong>Thời gian thanh toán:</strong> {formattedTime}</p>
          <p><strong>Phương thức thanh toán:</strong> {payType?.toUpperCase() || "Không có thông tin"}</p>
          <p><strong>Số tiền:</strong>
            <span className="text-danger fw-bold">
              {amount ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount) : "Không có thông tin"}
            </span>
          </p>
        </div>
      </div>

      <div className="d-flex gap-3 mt-4">
        <a href="/" className="btn btn-primary btn-lg px-4">Quay lại trang chủ</a>
        <a href="/history" className="btn btn-outline-secondary btn-lg px-4">Xem chi tiết đơn hàng</a>
      </div>
    </div>
  );
}

export default OrderSuccess;
