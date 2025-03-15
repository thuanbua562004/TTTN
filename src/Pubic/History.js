import React, { useEffect, useState } from "react";
import axios from "../AxiosConfig/config";
import "bootstrap/dist/css/bootstrap.min.css";

function HistoryBuy() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const iduser = localStorage.getItem("id");
  const [phone, setPhone] = useState();
  // Lấy lịch sử đơn hàng
  const fetchHistory = async (customPhone = null) => {
    setLoading(true);
    try {
      const id = iduser || customPhone || phone; // Nếu không có iduser thì dùng số điện thoại nhập vào
      if (!id) return;

      console.log("Gửi request đến API:", `/history/history/${id}`);
      const response = await axios.get(`/history/history/${id}`);
      console.log("Lịch sử đơn hàng:", response);
      const orders = Array.isArray(response.data) ? response.data : [response.data];
      setHistory(orders);
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử đơn hàng:", error);
    }
    setLoading(false);
  };
  console.log(history)
  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSearch = () => {
    if (!phone.trim()) {
      return alert("Vui lòng nhập số điện thoại!");
    }
    fetchHistory(phone);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Lịch Sử Đơn Hàng</h2>

      {!iduser && (
        <div className="mb-4 d-flex justify-content-center">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Nhập số điện thoại..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button className="btn btn-danger ms-2" onClick={handleSearch}>
            Tìm kiếm
          </button>
        </div>
      )}

      {loading? (
        <p className="text-center text-muted">Đang tải...</p>
      ) : history[0] !=="" ? (
        history?.map((order, index) => (
          <div className="card mb-4 shadow-sm" key={order?.id || index}>
            <div className="card-header bg-danger text-white">
              <h5 className="mb-0">
                Đơn Hàng #{order.id} - Ngày: {new Date(order?.date).toLocaleDateString()}
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Ngày đặt:</strong> {new Date(order?.date).toLocaleDateString()}</p>
                  <p><strong>Số điện thoại:</strong> {order?.phone || "N/A"}</p>
                  <p><strong>Địa chỉ nhận:</strong> {order?.adress || "N/A"}</p>
                  <p><strong>Ghi chú:</strong> {order?.note || "N/A"}</p>

                </div>
                <div className="col-md-6 text-right">
                  <h4 className="text-danger">
                    <strong>Tổng cộng: </strong>{order?.totalPrice?.toLocaleString()}₫
                  </h4>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-striped">
                  <thead className="bg-light">
                    <tr>
                      <th>Hình ảnh</th>
                      <th>Sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.listProduct?.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <img
                            src={item.imgProduct}
                            alt={item.nameProduct}
                            style={{ width: 50, height: 50, objectFit: "cover" }}
                          />
                        </td>
                        <td>{item.nameProduct}</td>
                        <td>{item.number}</td>
                        <td className="text-danger">
                          {(item.price * item.number).toLocaleString()}₫
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="fs-2 text-center text-muted">Không có lịch sử đơn hàng</p>
      )}
    </div>
  );
}

export default HistoryBuy;
