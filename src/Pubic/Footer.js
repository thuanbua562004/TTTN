import { Link } from "react-router-dom"

const Footer = ()=>{
    return(
        <>
        <footer className="footer text-white pt-4 pb-2">
  <div className="container">
    <div className="row">
      {/* VỀ CHÚNG TÔI */}
      <div className="col-md-3">
        <h5>VỀ CHÚNG TÔI</h5>
        <ul className="list-unstyled">
          <li>
            <Link to={"#"} className="text-white text-decoration-none">
              Tin tức
            </Link>
          </li>
          <li>
            <Link to={"#"} className="text-white text-decoration-none">
              Giới thiệu
            </Link>
          </li>
          <li>
            <Link to={"#"} className="text-white text-decoration-none">
              Tuyển dụng
            </Link>
          </li>
          <li>
            <Link to={"#"} className="text-white text-decoration-none">
              Hệ thống đại lý
            </Link>
          </li>
        </ul>
      </div>
      {/* HỖ TRỢ KHÁCH HÀNG */}
      <div className="col-md-3">
        <h5>HỖ TRỢ KHÁCH HÀNG</h5>
        <ul className="list-unstyled">
          <li>
            <Link to={"#"} className="text-white text-decoration-none">
              Phương thức thanh toán
            </Link>
          </li>
          <li>
            <Link to={"#"} className="text-white text-decoration-none">
              Chính sách bảo hành - đổi trả
            </Link>
          </li>
          <li>
            <Link to={"#"} className="text-white text-decoration-none">
              Giải đáp mua hàng Online
            </Link>
          </li>
        </ul>
      </div>
      {/* HỆ THỐNG CỬA HÀNG */}
      <div className="col-md-3">
        <h5>HỆ THỐNG CỬA HÀNG</h5>
        <ul className="list-unstyled">
          <li>
            - Cơ sở 1: Số 215 Giáp Nhất, Nhân Chính, Thanh Xuân, Hà Nội
            <br />
            <strong>Hotline:</strong>
            0818.215.215
          </li>
        </ul>
      </div>
      {/* Payment and Shipping */}
      <div className="col-md-3">
        <h5>PHƯƠNG THỨC THANH TOÁN</h5>
        <div className="d-flex gap-2">
          <img
            style={{ width: 35, borderRadius: 15 }}
            src="https://dienthoaihay.vn/images/partners/2024/09/12/resized/momo_1726113661.jpg"
            alt="Momo"
            className="img-fluid"
          />
          <img
            style={{ width: 35, borderRadius: 15 }}
            src="https://dienthoaihay.vn/images/partners/2024/09/12/resized/zalo-pay_1726113839.jpg"
            alt="Momo"
            className="img-fluid"
          />
          <img
            style={{ width: 35, borderRadius: 15 }}
            src="https://dienthoaihay.vn/images/partners/2024/09/12/resized/viettel-pay_1726113969.jpg"
            alt="Momo"
            className="img-fluid"
          />
        </div>
        <h5 className="mt-3">HÌNH THỨC VẬN CHUYỂN</h5>
        <div className="d-flex gap-2">
          <img
            style={{ width: 35, borderRadius: 15 }}
            src="https://dienthoaihay.vn/images/partners/2021/08/24/resized/giaohang_1629813393.jpg"
            alt="Ship"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
    <div className="text-center mt-4">
      © Thực tập tốt nghiệp nhóm 11 - Web bán điện thoại tích hợp chatbot hỗ trợ
      bán hàng.
    </div>
  </div>
</footer>

        </>
    )
}

export default Footer