import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, deleteItemCart, updateQuantityCart } from '../Redux/counterSlice';
import { ToastContainer, toast } from 'react-toastify';
import SkeletonCart from './SekeletonCart';
import Loading from './Loading';
function Cart() {
  const dispatch = useDispatch();
  const data = useSelector((stage) => stage.data)
  const [id_Product, setIdProduct] = useState(null)
  const id = localStorage.getItem('id');

  useEffect(() => {
    console.log("useEffect chạy lại");

    if (id) {
      dispatch(fetchCart(id)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
        }
      });
    }
  }, [dispatch, id]);
  console.log(data);

  if (data.stageLoad == "loading") {
    return (<SkeletonCart />)
  }
  if (data.cart?.details == 0) {
    return (
      <div style={{ height: "500px" }} className="text-center text-danger mt-5">
        <h2>Giỏ hàng trống!</h2>
      </div>
    )
  }

  return (
    <>
      <div className="container mt-4">
        {data.stageLoadDelQuantity === "loading" && <Loading />}

        {/* Tiêu đề */}
        <h2 className="text-danger fw-bold text-center mb-3">🛒 Giỏ Hàng Của Bạn</h2>

        {/* Bảng sản phẩm - Thiết kế lại cho Mobile */}
        <div className="row">
          {data.cart?.details?.map((item) => (
            <div key={item._id} className="col-12 mb-3">
              <div className="card shadow-sm p-2">
                <div className="row align-items-center">
                  {/* Hình ảnh sản phẩm */}
                  <div className="col-4">
                    <img
                      src={item.imgProduct}
                      alt="Product"
                      className="w-50 w-md-25 img-fluid rounded"
                    />
                  </div>

                  {/* Thông tin sản phẩm */}
                  <div className="col-8">
                    <h6 className="fw-bold">{item.nameProduct}</h6>
                    <p className="text-muted small">{item.color} - {item.memory}</p>
                    <p className="text-danger fw-bold mb-1">
                      {item?.price?.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
                    </p>

                    {/* Nút tăng/giảm số lượng */}
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary btn-sm rounded-circle px-2"
                        disabled={item.number === 1}
                        onClick={() => dispatch(updateQuantityCart({ number: item.number - 1, id, id_Product: item._id }))}
                      >
                        −
                      </button>
                      <span className="mx-2 fw-bold">{item.number}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm rounded-circle px-2"
                        onClick={() => dispatch(updateQuantityCart({ number: item.number + 1, id, id_Product: item._id }))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tổng tiền & Nút xóa */}
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <span className="fw-bold text-danger">
                    Tổng: {(item.price * item.number).toLocaleString("it-IT", { style: "currency", currency: "VND" })}
                  </span>
                  <button className="btn btn-link text-danger p-0" onClick={() => setIdProduct(item._id)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tổng tiền & Nút thanh toán */}
        <div className="d-flex flex-column align-items-end p-3">
          <h5 className="fw-bold text-danger">
            Tổng Tiền: {data.cart?.details?.reduce((total, item) => total + item.price * item.number, 0).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </h5>
          <Link to={'/pay'}>
            <button className="btn btn-danger w-100 mt-2">Thanh Toán</button>
          </Link>
        </div>

        {/* Modal Xóa Sản Phẩm */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Thông Báo!</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">Bạn có muốn xóa sản phẩm này không?</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button onClick={() => dispatch(deleteItemCart({ id_Product: id_Product, id_Cart: id }))} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Xem thêm sản phẩm */}
        <h4 className="mt-4 text-center">Xem thêm sản phẩm</h4>
      </div>

    </>
  );
}

export default Cart;
