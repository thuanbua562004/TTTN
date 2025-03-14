import { Link } from "react-router-dom";
const NoPage = () => {
  return (
    <>
      <div className="bg-white d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <img
            src="https://storage.googleapis.com/a1aa/image/XR6n7Jv2Xs4fcqeC9WoC1QWaSY8hLS7hYfA9AJttNUA1SoGoA.jpg"
            alt="404 error illustration with a sad face and the number 404"
            className="img-fluid mb-4"
            style={{ height: 150, width: 150 }}
          />
          <h1 className="h5 fw-bold mb-2">Bạn chắc đã nhập đúng đường dẫn chứ?</h1>
          <p className="text-muted mb-4">
            Đường dẫn bạn vừa nhập không còn tồn tại.
            <br />
            Vui lòng liên hệ bộ phận hỗ trợ hoặc tham khảo thêm
            <br />
            các chương trình khuyến mãi khác của CellphoneS nhé.
          </p>
          <Link to={"#"} className="btn btn-danger btn-lg mb-3">
            Tham khảo sản phẩm
          </Link>
          <p className="text-danger fs-5">Gọi 1800.2097 miễn phí</p>
        </div>
      </div>

    </>
  )
};

export default NoPage;