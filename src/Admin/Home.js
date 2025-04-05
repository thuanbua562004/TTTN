import React, { useState, useEffect } from "react";
import axios from "../AxiosConfig/config";
import ReactECharts from "echarts-for-react";

function Home() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get("/history/history");
        if (response.data && Array.isArray(response.data)) {
          setOrders(response.data);
          console.log("📦 Orders received:", response.data);
        } else {
          console.warn("⚠️ Invalid API response:", response.data);
        }
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
      }
    };

    getOrders();
  }, []);

  // ✅ Pie Chart: Trạng thái đơn hàng (stage)
  const orderStatusMap = {};
  orders.forEach((order) => {
    if (order.stage) {
      orderStatusMap[order.stage] = (orderStatusMap[order.stage] || 0) + 1;
    }
  });

  const orderStatusData = Object.entries(orderStatusMap).map(([name, value]) => ({
    name,
    value,
  }));

  // ✅ Bar Chart: Doanh thu theo ngày (date, totalPrice)
  const revenueMap = {};
  orders.forEach((order) => {
    if (order.date && !isNaN(new Date(order.date)) && order.totalPrice) {
      const date = new Date(order.date).toISOString().split("T")[0];
      const price = parseFloat(order.totalPrice);
      if (!isNaN(price)) {
        revenueMap[date] = (revenueMap[date] || 0) + price;
      }
    }
  });

  const revenueData = Object.entries(revenueMap)
    .map(([date, revenue]) => ({ date, revenue }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // ✅ Cấu hình PieChart
  const pieChartOptions = {
    title: { text: "Tỷ lệ trạng thái đơn hàng", left: "center" },
    tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
    legend: { bottom: 10, left: "center" },
    series: [
      {
        name: "Trạng thái",
        type: "pie",
        radius: ["40%", "70%"],
        label: { show: true, formatter: "{b}: {c}" },
        data: orderStatusData.length > 0 ? orderStatusData : [{ name: "Không có dữ liệu", value: 1 }],
      },
    ],
  };

  // ✅ Cấu hình BarChart
  const barChartOptions = {
    title: { text: "Doanh thu theo ngày", left: "center" },
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    xAxis: {
      type: "category",
      data: revenueData.map((item) => item.date),
      axisLabel: { rotate: 45 },
    },
    yAxis: {
      type: "value",
      axisLabel: { formatter: "{value} VND" },
    },
    series: [
      {
        name: "Doanh thu",
        type: "bar",
        data: revenueData.map((item) => item.revenue),
        itemStyle: { color: "#4CAF50" },
      },
    ],
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <p className="text-danger mt-5 mb-5">Welcome back, <b>Admin</b></p>
        </div>
      </div>

      <div className="row tm-content-row">
        {/* Pie Chart */}
        <div className="col-lg-6 tm-block-col">
          <div className="tm-bg-primary-dark tm-block">
            <h4 className="text-white text-center mt-3">Biểu đồ trạng thái đơn hàng</h4>
            <ReactECharts
              option={pieChartOptions}
              notMerge={true}
              lazyUpdate={true}
              style={{ width: "100%", height: 400 }}
            />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="col-lg-6 tm-block-col">
          <div className="tm-bg-primary-dark tm-block">
            <h4 className="text-white text-center mt-3">Biểu đồ doanh thu theo ngày</h4>
            <ReactECharts
              option={barChartOptions}
              notMerge={true}
              lazyUpdate={true}
              style={{ width: "100%", height: 400 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
