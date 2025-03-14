import React, { useState, useEffect } from "react";
import axios from "../AxiosConfig/config";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function Home() {
  const [history, setHistory] = useState([]);

  const getHistory = async () => {
    try {
      const response = await axios.get("/history/history");
      setHistory(response.data);
      console.log("History fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  // Xử lý dữ liệu cho PieChart (đơn hàng theo trạng thái)
  const orderStatusData = history.reduce((acc, order) => {
    const existing = acc.find((item) => item.status === order.status);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: order.status, value: 1 });
    }
    return acc;
  }, []);

  // Xử lý dữ liệu cho AreaChart (doanh thu theo thời gian)
  const revenueData = history.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString();
    const existing = acc.find((item) => item.date === date);
    if (existing) {
      existing.revenue += order.totalPrice;
    } else {
      acc.push({ date, revenue: order.totalPrice });
    }
    return acc;
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="text-danger mt-5 mb-5">
              Welcome back, <b>Admin</b>
            </p>
          </div>
        </div>
        <div className="row tm-content-row">
          {/* Biểu đồ PieChart - Đơn hàng theo trạng thái */}
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-block-col">
            <div className="tm-bg-primary-dark tm-block">
              <h2 className="tm-block-title">Tỷ lệ trạng thái đơn hàng</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={orderStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Biểu đồ AreaChart - Doanh thu theo thời gian */}
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-block-col">
            <div className="tm-bg-primary-dark tm-block">
              <h2 className="tm-block-title">Doanh thu theo ngày</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" stroke="#82ca9d" fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Danh sách đơn hàng */}
          <div className="col-12 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
              <h2 className="tm-block-title">Orders List</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Mã đơn</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Phương thức thanh toán</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Tổng tiền</th>
                    <th scope="col">Thời gian đặt</th>
                  </tr>
                </thead>
                <tbody>
                  {history.length > 0 ? (
                    history.map((order, index) => (
                      <tr key={index}>
                        <td>{order.id}</td>
                        <td>{order.stage}</td>
                        <td>{order.methodPayload}</td>
                        <td>{order.adress}</td>
                        <td>{order.phone}</td>
                        <td>{order.totalPrice.toLocaleString()} VND</td>
                        <td>{new Date(order.date).toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center text-white">
                        Không có đơn hàng nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <footer className="tm-footer row tm-mt-small">
        <div className="col-12 font-weight-light">
          <p className="text-center text-white mb-0 px-4 small">
            Copyright © <b>2018</b> All rights reserved. Design:{" "}
            <a rel="nofollow noopener" className="tm-footer-link">Nhóm2</a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default Home;
