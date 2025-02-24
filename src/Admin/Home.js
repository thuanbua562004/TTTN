import React from "react";

function Home() {
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
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-block-col">
            <div className="tm-bg-primary-dark tm-block">
              <h2 className="tm-block-title">Biểu đồ đơn hàng</h2>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-block-col">
            <div className="tm-bg-primary-dark tm-block">
              <h2 className="tm-block-title">Biểu đồ doanh thu </h2>
            </div>
          </div>
          <div className="col-12 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
              <h2 className="tm-block-title">Orders List</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Mã đơn.</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Phương thức thanh toán</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Tổng tiền</th>
                    <th scope="col">Thời gian đặt</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
      <footer className="tm-footer row tm-mt-small">
        <div className="col-12 font-weight-light">
          <p className="text-center text-white mb-0 px-4 small">
            Copyright © <b>2018</b> All rights reserved. Design:{" "}
            <a rel="nofollow noopener" className="tm-footer-link">
              Nhóm2
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default Home;
