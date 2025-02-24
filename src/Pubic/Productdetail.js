import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "../AxiosConfig/config"
import Gallery from "./Gallery"
import { useSelector, useDispatch } from 'react-redux';
import { addProductToCart } from '../Redux/counterSlice';
import { ToastContainer, toast } from 'react-toastify';

import Loading from "./Loading"
const Productdetail = () => {
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [product, setProduct] = useState(null)
  const [memoryForColor, setMemoryForColor] = useState(null)
  const { id_product } = useParams()
  const id_user= localStorage.getItem('id')
  const color = memoryForColor?.color
  const imgProduct = memoryForColor?.imageUrl
  const nameProduct = product?.name
  const number =1
  const [price, setPrice] = useState(null)
  const [memory, setMemory] = useState(null)
  const stageAdd = useSelector((stage)=>stage.data.stageLoad)

  const dispatch = useDispatch();
  const handlerAddProductToCart = ()=>{
    try {
      const id_color_memory =id_product+color+memory
            if(memory ==null || color ==null){
        alert('Vui lòng chọn màu và RAM')
        return
      }
      dispatch(addProductToCart({
        id_user,
        id_color_memory,
        id_product,
        color,
        imgProduct,
        nameProduct,
        number,
        price,
        memory
      }))
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            toast.success("Thêm vào giỏ thành công!")
          } else {
            toast.error("Sản phẩm đã có trong giỏ");
          }
        });
      
    } catch (error) {
      console.log(error)
    }
  }

  const fetchProduct = async () => {
    const product = await axios.get(`/phone/phone/${id_product}`)
    setProduct(product.data)
  }

  useEffect(() => {
    if (stageAdd !== "loading") {
      fetchProduct();
    }
  }, [stageAdd]);

  return (<>
  <ToastContainer />
<div style={{ position: "relative", minHeight: "500px" }}>
  {stageAdd =='loading' && <Loading />}
  <div class="container mt-4">
      <div class="bg-white p-4 rounded shadow-lg">
        <h1 class="h4 font-weight-bold mb-2">
          {product?.name}
        </h1>
        <div class="row">
          <div  className="col-lg-6 w-5">
          <Gallery product={product} selectedColor={memoryForColor} />

          </div>

          <div class="col-lg-6 pl-lg-4">
            <div class="d-flex align-items-center mb-2">
              <span class="text-danger h5 font-weight-bold">{product?.image[0]?.memory[0].price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
            </div>
            <div class="mb-2">
              <span class="text-success">
                <i class="fas fa-check-circle"></i> Còn hàng
              </span>
            </div>
            <div className="mb-2">
        <label className="font-weight-bold">Bộ nhớ:</label>
        <div className="d-flex">
          {memoryForColor?.memory.map((item) => (
            <div
              key={item.infoMemory}
              onClick={() => {
                setMemory(item.infoMemory);
                setPrice(item.price);
                setSelectedMemory(item.infoMemory);
              }}
              className="border p-3 rounded text-center mx-1"
              style={{
                cursor: "pointer",
                transition: "0.3s",
                boxShadow: selectedMemory === item.infoMemory ? "0px 0px 10px 3px rgba(0, 123, 255, 0.5)" : "none",
                borderColor: selectedMemory === item.infoMemory ? "#007bff" : "",
              }}
            >
              <div>{item.infoMemory}</div>
              <div className="text-danger fw-bold">
                {item.price.toLocaleString("vi", { style: "currency", currency: "VND" })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chọn màu */}
      <div className="mb-2">
        <label className="font-weight-bold">Chọn màu:</label>
        <div className="d-flex">
          {product?.image.map((items) => (
            <div
              key={items.color}
              onClick={() => {
                setMemoryForColor(items);
                setSelectedColor(items.color);
              }}
              className="border p-3 rounded d-flex align-items-center justify-content-between mx-1"
              style={{
                cursor: "pointer",
                transition: "0.3s",
                boxShadow: selectedColor === items.color ? "0px 0px 10px 3px rgba(0, 123, 255, 0.5)" : "none",
                borderColor: selectedColor === items.color ? "#007bff" : "",
              }}
            >
              <img
                style={{ marginRight: "15px" }}
                src={items?.imageUrl}
                width={50}
                height={50}
                alt={items.color}
              />
              <div className="fw-bold text-center">{items?.color}</div>
            </div>
          ))}
        </div>
      </div>
            <div class="mb-2">
              <label class="font-weight-bold">Hạng:</label>
              <select class="form-control">
                <option>VIP</option>
              </select>
            </div>
            <div class="mb-2">
              <label class="font-weight-bold">Phiên bản:</label>
              <select class="form-control">
                <option>Nguyên seal</option>
              </select>
            </div>
            <div class="d-flex mb-2">
              <button class="btn btn-danger flex-fill">MUA NGAY</button>
              <button onClick={handlerAddProductToCart} class="btn btn-warning flex-fill mx-2">THÊM VÀO GIỎ HÀNG</button>
            </div>
            <div class="bg-danger p-2 rounded mb-2">
              <h2 class="text-white font-weight-bold">Khuyến mãi</h2>
              <ul class="list-unstyled text-white">
                <li>Tham gia cộng đồng Redmi Note 14 Series tại đây!</li>
                <li>Tặng Combo ĐCL+Tặng AKG 3.5mm trị giá 300k khi nâng cấp gói VIP</li>
                <li>Cài ROM quốc tế miễn phí trọn đời</li>
                <li>Trả góp nhanh, trả góp lãi suất 0% tại Laz/Online cực dễ</li>
                <li>Mua Online: Giao hàng tận nhà - Nhận hàng thanh toán</li>
              </ul>
            </div>

            <div class="mt-2 text-center">
              <p>
                Gọi <span class="text-danger">0818.215.215 hoặc 0815.208.208</span>
              </p>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          {/* Mô tả sản phẩm */}
          <div className="col-lg-6">
            <h2 className="h5 font-weight-bold mb-2">Mô tả sản phẩm</h2>
            <p className="text-muted">
              Máy mới 100% chưa qua sử dụng, chưa kích hoạt bảo hành, đã bóc SEAL sẵn để cài ROM gốc, tiếng Việt. ChPlay đầy đủ, dùng ổn định. Bộ phụ kiện chuẩn bao gồm thân máy, sạc, cáp, ốp lưng, que chọc sim và sách hướng dẫn sử dụng. Quý khách hãy tại dienthoaihay.vn sản phẩm được bảo hành VIP toàn diện cả nguồn, màn hình, vân tay.
            </p>
            <img
              alt="Tặng bảo hành VIP"
              className="img-fluid"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT4iEjSOb72yEQxzntyqw4sT4WK0PRSyDP2Q&s"
            />
          </div>

          {/* Thông số kỹ thuật */}
          <div className="col-lg-6">
            <div className="card shadow-lg">
              <div className="card-header bg-danger text-white text-center fw-bold fs-5">
                THÔNG SỐ KĨ THUẬT
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Thẻ SIM:</strong> <span>{product?.Sim}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Kiểu thiết kế:</strong> <span>{product?.Design}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Màn hình:</strong>
                    <span>
                      {product?.Screen}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Độ phân giải:</strong> <span>{product?.Pixel}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>CPU:</strong>
                    <span>{product?.Cpu}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>RAM:</strong> <span>{product?.Ram}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Bộ nhớ/ Thẻ nhớ:</strong> <span>{product?.Rom}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Camera sau:</strong> <span>{product?.Camera1}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Camera trước:</strong> <span>{product?.Camera2}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Jack 3.5mm/ Loa:</strong> <span>{product?.Jack}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Pin:</strong> <span>{product?.Batery}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>


      </div>
      <div className="mt-4 d-flex flex-column flex-lg-row gap-3">
        {/* Có thể bạn quan tâm */}
        <div className="col-lg-6 bg-white p-4 rounded-3 shadow-sm">
          <h2 className="h5 font-weight-bold mb-3">Có thể bạn quan tâm</h2>
          <ul className="list-unstyled">
            {[
              {
                name: "Xiaomi Redmi Note 13",
                price: "3.350.000đ",
                img: "https://storage.googleapis.com/a1aa/image/QTDLHPvCdeWRUioNG0Y4FHCWNZx8qMrY923wQ094TQdkJ3AKA.jpg",
              },
              {
                name: "Realme 11 5G",
                price: "3.350.000đ",
                img: "https://storage.googleapis.com/a1aa/image/fMxWEBQBu7XuWCfiVh4t8xuLf19RnFV8yeoDT5yB7WM3M5GQB.jpg",
              },
              {
                name: "Realme V50/V50S 5G",
                price: "2.790.000đ",
                img: "https://storage.googleapis.com/a1aa/image/atjnDXMD7gqaCtlh3Rioci1ft1szikejE19ADnWZxWmRTuBUA.jpg",
              },
              {
                name: "Xiaomi Redmi Note 12R 5G",
                price: "2.490.000đ",
                img: "https://storage.googleapis.com/a1aa/image/z8ESrZkEdXoMDl99KhWRBnF83fA71pVmPX1xIoUfvIyMTuBUA.jpg",
              },
            ].map((item, index) => (
              <li key={index} className="d-flex align-items-center mb-3">
                <div className="col-3">
                  <img src={item.img} alt={item.name} className="w-100 rounded object-fit-cover" />
                </div>
                <div className="col-9 ps-3">
                  <p className="text-muted mb-1 fw-semibold">{item.name}</p>
                  <p className="text-danger fw-bold">{item.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Tin tức liên quan */}
        <div className="col-lg-6 bg-white p-4 rounded-3 shadow-sm">
          <h2 className="h5 font-weight-bold mb-3">Tin tức liên quan</h2>
          <ul className="list-unstyled">
            {[
              {
                title: "Đánh giá chi tiết Redmi Note 12 5G: Nâng cấp đáng giá với mức giá 3 triệu",
                img: "https://storage.googleapis.com/a1aa/image/EMlaWuNwKmYfOqI5jfZdSeLfunJBUioqBQFvssoXiffkykbAF.jpg",
              },
              {
                title: "Trên tay chi tiết Redmi Note 12 5G: Nâng cấp đáng giá với mức giá 3 triệu",
                img: "https://storage.googleapis.com/a1aa/image/RUPXm5bjTeXeQERCfkizeMJR8fbVAf81exIzOemQEh9UGTuBUA.jpg",
              },
              {
                title: "Hướng dẫn mua hàng trả góp tại Dienthoaihay.vn",
                img: "https://storage.googleapis.com/a1aa/image/jX4jaMa40m4sNhrGyZfhPKbhleRYsenB4HatwONwfjFON5GQB.jpg",
              },
            ].map((news, index) => (
              <li key={index} className="d-flex align-items-center mb-3">
                <div className="col-3">
                  <img src={news.img} alt="News" className="w-100 rounded object-fit-cover" />
                </div>
                <div className="col-9 ps-3">
                  <p className="text-muted mb-1 fw-semibold">{news.title}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
</div>


  </>)
}

export default Productdetail