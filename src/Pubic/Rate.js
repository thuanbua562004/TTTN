const Rate =()=>{
    return(<>
    <div className="container mt-4">
  {/* Title Section */}
  <div className="bg-danger text-white text-center py-2 rounded">
    Hỏi đáp và đánh giá về Samsung Galaxy A12 chính hãng
  </div>
  {/* Rating Section */}
  <div className="bg-white mt-4 p-4 rounded shadow">
    <div className="d-flex align-items-center">
      <div className="fs-1 text-warning fw-bold">5★</div>
      <div className="ms-4 flex-grow-1">
        {/* Rating Bar */}
        <div className="d-flex align-items-center">
          <div className="w-50">5 sao</div>
          <div className="w-50 d-flex align-items-center">
            <div
              className="w-100 bg-secondary rounded-3"
              style={{ height: 10 }}
            >
              <div
                className="bg-warning h-100 rounded-3"
                style={{ width: "100%" }}
              />
            </div>
            <div className="ms-2">1</div>
          </div>
        </div>
        {/* Other Ratings */}
        <div className="d-flex align-items-center mt-1">
          <div className="w-50">4 sao</div>
          <div className="w-50 d-flex align-items-center">
            <div
              className="w-100 bg-secondary rounded-3"
              style={{ height: 10 }}
            >
              <div
                className="bg-secondary h-100 rounded-3"
                style={{ width: "0%" }}
              />
            </div>
            <div className="ms-2">0</div>
          </div>
        </div>
        <div className="d-flex align-items-center mt-1">
          <div className="w-50">3 sao</div>
          <div className="w-50 d-flex align-items-center">
            <div
              className="w-100 bg-secondary rounded-3"
              style={{ height: 10 }}
            >
              <div
                className="bg-secondary h-100 rounded-3"
                style={{ width: "0%" }}
              />
            </div>
            <div className="ms-2">0</div>
          </div>
        </div>
        <div className="d-flex align-items-center mt-1">
          <div className="w-50">2 sao</div>
          <div className="w-50 d-flex align-items-center">
            <div
              className="w-100 bg-secondary rounded-3"
              style={{ height: 10 }}
            >
              <div
                className="bg-secondary h-100 rounded-3"
                style={{ width: "0%" }}
              />
            </div>
            <div className="ms-2">0</div>
          </div>
        </div>
        <div className="d-flex align-items-center mt-1">
          <div className="w-50">1 sao</div>
          <div className="w-50 d-flex align-items-center">
            <div
              className="w-100 bg-secondary rounded-3"
              style={{ height: 10 }}
            >
              <div
                className="bg-secondary h-100 rounded-3"
                style={{ width: "0%" }}
              />
            </div>
            <div className="ms-2">0</div>
          </div>
        </div>
      </div>
      <div className="ms-4">
        <button className="btn btn-danger text-white py-2 px-4 rounded-3">
          Viết đánh giá
        </button>
      </div>
    </div>
  </div>
  {/* Search Question Section */}
  <div className="mt-4">
    <input
      className="form-control border-danger"
      placeholder="Tìm câu hỏi..."
      type="text"
    />
  </div>
  {/* Review Section */}
  <div className="bg-white mt-4 p-4 rounded shadow">
    <div className="d-flex align-items-center">
      <div className="bg-secondary text-white font-weight-bold w-10 h-10 d-flex align-items-center justify-content-center rounded-circle">
        TD
      </div>
      <div className="ms-4">
        <div className="fw-bold">Trần Dũng</div>
        <div className="text-muted">0932778xxx</div>
      </div>
      <div className="ms-auto text-warning">
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
      </div>
    </div>
    <div className="mt-2">A12 còn hàng ở chi nhánh tp hcm ko ạ</div>
    <div className="mt-2 text-primary">Thảo luận . 1 year trước</div>
    {/* Admin Response Section */}
    <div className="bg-light mt-2 p-2 rounded">
      <div className="d-flex align-items-center">
        <img
          alt="Admin avatar"
          className="w-10 h-10 rounded-circle"
          src="https://storage.googleapis.com/a1aa/image/hoNnmcWbiW5PGtuSgeaesaiJGHz9eVEMzDPg1fbt8ma585GQB.jpg"
          width={40}
          height={40}
        />
        <div className="ms-4">
          <div className="fw-bold text-danger">Hongnhung</div>
          <div className="bg-danger text-white text-xs px-2 py-1 rounded">
            QUẢN TRỊ VIÊN
          </div>
        </div>
      </div>
      <div className="mt-2">
        Em chào anh ạ, cảm ơn anh đã quan tâm đến sản phẩm của bên em ạ. Dạ sản
        phẩm này bên em tạm thời đang hết hàng, anh vui lòng tham khảo sang các
        sản phẩm khác bên em ạ. Rất mong nhận được phản hồi từ bên anh ạ
      </div>
      <div className="mt-2 text-muted">1 year trước</div>
    </div>
  </div>
</div>

    </>)
}
export default Rate