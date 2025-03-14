import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from '../AxiosConfig/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';

function Product() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [listcate, setlistcate] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [imgShow, setImgShow] = useState('')
  function handleChange(e) {
    console.log(e.target.files);
    setSelectedFiles(e.target.files);
    setImgShow(URL.createObjectURL(e.target.files[0]));
  }

  const ListProduct = async () => {
    try {
      const response = await axios.get('/phone/phone');
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getCategory = async () => {
    try {
      const responsive = await axios.get('/category/category');
      setlistcate(responsive.data);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  useEffect(() => {
    ListProduct();
    getCategory();
  }, []);
  console.log(selectedFiles)

  const addCategory = async () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("myFiles", selectedFiles[i]);
    }
    try {
      const upload = await axios.post("/upload/uploadmultiple", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const img = upload.data.files[0].url
      const response = await axios.post('/category/category', { name: category, img });
      console.log(response);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      toast.error('Duplicate category');
      console.error("Error uploading files", error);
    }
  }





  const deleteCategory = async (id) => {
    try {
      await axios.delete(`/category/category/${id}`);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const results = await axios.delete(`/phone/phone/${id}`)
      if (results.status === 200) {
        window.location.reload();
        toast.success('Deleted successfully');
      }
    } catch (error) {
      toast.error('Error deleting product');
    }

  };

  return (
    <>
      <ToastContainer />
      <meta charSet="UTF-8" />
      <div className="container mt-5">
        <div className="row tm-content-row">
          {/* Bảng sản phẩm */}
          <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-products">
              <h2 className="tm-block-title">Danh Sách Sản Phẩm</h2>
              <div className="tm-product-table-container">
                <table className="table table-hover tm-table-small tm-product-table">
                  <thead>
                    <tr>
                      <th scope="col">&nbsp;</th>
                      <th scope="col">Tên Sản Phẩm</th>
                      <th scope="col">Bộ nhớ</th>
                      <th scope="col">Giá bán</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">&nbsp;</th>
                      <th scope="col">&nbsp;</th>

                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr className="bg-white" key={`${product._id}-${index}`}>
                        {/* Hình ảnh sản phẩm */}
                        <th scope="row">
                          <img
                            style={{ width: "50px", borderRadius: "50%" }}
                            src={product.image.length > 0 ? product.image[0].imageUrl : ""}
                            alt={product.name}
                          />
                        </th>

                        {/* Tên sản phẩm */}
                        <td>
                          <a href={`/admin/update/${product._id}`} className="tm-product-name">
                            {product.name}
                          </a>
                        </td>

                        {/* Màu sắc & Bộ nhớ */}
                        <td colSpan="3">
                          {product.image.map((variant, i) => (
                            <div key={i} style={{ marginBottom: "10px", borderBottom: "1px solid #ddd", paddingBottom: "5px" }}>
                              <strong >{variant.color}</strong>
                              {variant.memory && variant.memory.length > 0 ? (
                                <ul style={{ paddingLeft: "15px", marginTop: "5px" }}>
                                  {variant.memory.map((mem, j) => (
                                    <li key={`${i}-${j}`}>
                                      {mem.infoMemory} - <strong>{mem.price.toLocaleString()}₫</strong> ({mem.quantity} cái)
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <div>No memory available</div>
                              )}
                            </div>
                          ))}
                        </td>

                        {/* Xóa sản phẩm */}
                        <td>
                          <a onClick={() => deleteProduct(product._id)} className="tm-product-delete-link">
                            <FontAwesomeIcon icon={faTrash} className="far fa-trash-alt tm-product-delete-icon" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
              <Link to="/admin/addproduct" className="btn btn-primary btn-block text-uppercase mb-3">
                Add new product
              </Link>
            </div>
          </div>

          {/* Bảng danh mục */}
          <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-product-categories">
              <h2 className="tm-block-title">Product Categories</h2>
              <div className="tm-product-table-container">
                <table className="table tm-table-small tm-product-table">
                  <tbody>
                    {listcate.map((items) => (
                      <tr key={items._id}>
                        <td className="tm-product-name">
                          <img style={{ width: "25px" }} src={items.img} alt={items.name} /> {items.name}
                        </td>
                        <td className="text-center">
                          <a onClick={() => deleteCategory(items._id)} className="tm-product-delete-link">
                            <FontAwesomeIcon icon={faTrash} className="far fa-trash-alt tm-product-delete-icon" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary btn-block text-uppercase mb-3">
                Add new category
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="tm-footer row tm-mt-small">
        <div className="col-12 font-weight-light">
          <p className="text-center text-white mb-0 px-4 small">
            Copyright © <b>2018</b> All rights reserved. Design:{" "}
            <a rel="nofollow noopener" href="https://templatemo.com" className="tm-footer-link">
              Template Mo
            </a>
          </p>
        </div>
      </footer>

      {/* Modal thêm danh mục */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Thêm Category</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-control"
                placeholder="Nhập tên danh mục"
              />
              <input type="file" onChange={handleChange} />
              {imgShow && <img style={{ width: '100px' }} src={imgShow} alt="Category" />}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button
                disabled={selectedFiles === "" || selectedFiles == null || category === ""}
                type="button"
                onClick={addCategory}
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );


}

export default Product;
