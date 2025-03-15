import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, deleteItemCart, updateQuantityCart } from '../Redux/counterSlice';
import SkeletonCart from './SekeletonCart';
import Loading from './Loading';

function Cart() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const [id_Product, setIdProduct] = useState(null);
  const id = localStorage.getItem('id');

  useEffect(() => {
    if (id) {
      dispatch(fetchCart(id));
    }
  }, [dispatch, id]);

  if (data.stageLoad === 'loading') {
    return <SkeletonCart />;
  }
  
  if (!data.cart?.details?.length) {
    return (
      <div className="text-center text-danger mt-5" style={{ height: '500px' }}>
        <h2>Giỏ hàng trống!</h2>
      </div>
    );
  }

  return (
    <div className="container mt-4" style={{ overflowX: 'hidden' }}>
      {data.stageLoadDelQuantity === 'loading' && <Loading />}
      <h2 className="text-danger fw-bold text-center mb-3">🛒 Giỏ Hàng Của Bạn</h2>
      
      <div className="row">
        {data.cart.details.map((item) => (
          <div key={item._id} className="col-12 mb-3">
            <div className="card shadow-sm p-2">
              <div className="row align-items-center">
                <div className="col-3 col-sm-2 text-center">
                  <img
                    src={item.imgProduct}
                    alt="Product"
                    className="img-fluid rounded"
                    style={{ maxWidth: '80px', height: 'auto' }}
                  />
                </div>
                <div className="col-9 col-sm-10">
                  <h6 className="fw-bold">{item.nameProduct}</h6>
                  <p className="text-muted small">{item.color} - {item.memory}</p>
                  <p className="text-danger fw-bold mb-1">
                    {item.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                  </p>
                  <div className="d-flex align-items-center justify-content-center">
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
              <div className="d-flex justify-content-between align-items-center mt-2">
                <span className="fw-bold text-danger">
                  Tổng: {(item.price * item.number).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                </span>
                <button className="btn btn-link text-danger p-0" onClick={() => setIdProduct(item._id)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex flex-column align-items-center p-3 text-center">
        <h5 className="fw-bold text-danger">
          Tổng Tiền: {data.cart.details.reduce((total, item) => total + item.price * item.number, 0).toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
          })}
        </h5>
        <Link to={'/pay'}>
          <button className="btn btn-danger w-100 mt-2">Thanh Toán</button>
        </Link>
      </div>

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
              <button onClick={() => dispatch(deleteItemCart({ id_Product, id_Cart: id }))} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>

      <h4 className="mt-4 text-center">Xem thêm sản phẩm</h4>
    </div>
  );
}

export default Cart;
