import React, { useState, useEffect } from "react"
import { Link, useParams ,useNavigate  } from "react-router-dom"
import axios from "../AxiosConfig/config"
import Gallery from "./Gallery"
import { useSelector, useDispatch } from 'react-redux';
import { addProductToCart } from '../Redux/counterSlice';
import { ToastContainer, toast } from 'react-toastify';
import Commnet from './Comment'
import Loading from "./Loading"
import Suggest from "./SuggestProduct"
import News from "./News"
const Productdetail = () => {
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [product, setProduct] = useState(null)
  const [memoryForColor, setMemoryForColor] = useState(null)
  const { id_product } = useParams()
  const id_user = localStorage.getItem('id')
  const color = memoryForColor?.color
  const imgProduct = memoryForColor?.imageUrl
  const nameProduct = product?.name
  const number = 1
  const [price, setPrice] = useState(null)
  const [memory, setMemory] = useState(null)
  const stageAdd = useSelector((stage) => stage.data.stageLoad)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerAddProductToCart = () => {
    try {
      const id_color_memory = id_product + color + memory
      if (memory == null || color == null) {
        toast.error('Vui lòng chọn màu và RAM');

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
          }
          if(res.error.message.includes('501')){
            toast.error("Sản phẩm đã có trong giỏ hàng");

          }
           else {
            console.log(res)
            toast.error("Lỗi! Vui lòng đăng nhập  ");

          }
        });

    } catch (error) {
      toast.error("Lỗi! Vui lòng đăng nhập  ");
    }
  }

  const fetchProduct = async () => {
    const product = await axios.get(`/phone/phone/${id_product}`)
    setProduct(product.data)
  }
  const handleBuyNow = () => {
    if (!memory || !color) {
      return alert('Vui lòng chọn màu và RAM');
    }
    if(id_user){
      toast.success('Bạn đã đăng nhập hãy thêm vào giỏ hàng!')
      return
    }
    
    const id_color_memory = id_product + color + memory;
  
    const quickBuyData = {
      id_product,
      color,
      imgProduct,
      nameProduct,
      number: 1,  // Mua nhanh luôn là 1 sản phẩm
      price,
      memory,
      _id:id_color_memory
    };
  
    // Lưu vào localStorage để giữ dữ liệu khi reload
    localStorage.setItem("quickBuy", JSON.stringify(quickBuyData));
  
    navigate("/payq", { state: quickBuyData });
  };
  
  useEffect(() => {
    if (stageAdd !== "loading") {
      fetchProduct();
    }
    window.scrollTo(0, 0);
  }, [stageAdd]);

  return (<>
    <ToastContainer />
    <div style={{ position: "relative", minHeight: "500px" }}>
      {stageAdd == 'loading' && <Loading />}
      <div class="container mt-4">
        <div class="bg-white p-4 rounded shadow-lg">
          <h1 class="h4 font-weight-bold mb-2">
            {product?.name}
          </h1>
          <div class="row">
            <div className="col-12 col-md-6"> {/* 100% trên mobile, 50% trên desktop */}
              <div
                className="position-relative border rounded p-2 mx-auto"
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  height: "auto",
                  minHeight: "300px", /* Để ảnh không quá nhỏ trên mobile */
                  overflow: "hidden"
                }}
              >
                <Gallery product={product} selectedColor={memoryForColor} />
              </div>
            </div>



            <div class="col-lg-6 pl-lg-4">
              <div class="d-flex align-items-center mb-2">
                <span class="text-danger h5 font-weight-bold">{price?.toLocaleString('vi', { style: 'currency', currency: 'VND' }) || product?.image[0]?.memory[0].price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
              </div>
              <div class="mb-2">
              </div>
              <div className="mb-2">
                <label className="font-weight-bold">Bộ nhớ:</label>
                <div className="row">
                  {memoryForColor?.memory.map((item) => (
                    <div key={item.infoMemory} className="col-6 col-md-4 col-lg-3 mb-2">
                      <div
                        onClick={() => {
                          if (!item.quantity==0) { // Chỉ cho chọn khi còn hàng
                            setMemory(item.infoMemory);
                            setPrice(item.price);
                            setSelectedMemory(item.infoMemory);
                          }
                        }}
                        className="border p-3 rounded text-center d-flex flex-column align-items-center justify-content-center"
                        style={{
                          cursor: item.quantity==0 ? "not-allowed" : "pointer", // Không cho click khi hết hàng
                          opacity: item.quantity==0 ? 0.5 : 1, // Làm mờ khi hết hàng
                          transition: "0.3s",
                          boxShadow: !item.quantity==0 && selectedMemory === item.infoMemory ? "0px 0px 10px 3px rgba(36, 39, 42, 0.5)" : "none",
                          borderColor: !item.quantity==0 && selectedMemory === item.infoMemory ? "#007bff" : "",
                          height: "80px",
                          backgroundColor: item.quantity==0 ? "#f8f9fa" : "", // Màu xám khi hết hàng
                        }}
                      >
                        <div className="fw-bold">{item.infoMemory}</div>
                        <div className="text-danger fw-bold mt-1" style={{ fontSize: "14px" }}>
                          {item.price.toLocaleString("vi", { style: "currency", currency: "VND" })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chọn màu */}
              <div className="mb-2">
                <label className="font-weight-bold">Chọn màu:</label>
                <div className="row">
                  {product?.image.map((items) => (
                    <div key={items.color} className="col-6 col-md-4 col-lg-3 mb-2">
                      <div
                        onClick={() => {
                          setMemoryForColor(items);
                          setSelectedColor(items.color);
                        }}
                        className="border p-2 rounded d-flex flex-column align-items-center justify-content-center"
                        style={{
                          cursor: "pointer",
                          transition: "0.3s",
                          boxShadow: selectedColor === items.color ? "0px 0px 10px 3px rgba(28, 29, 30, 0.5)" : "none",
                          borderColor: selectedColor === items.color ? "#007bff" : "",
                          height: "90px", // Đồng nhất chiều cao các ô
                        }}
                      >
                        <img
                          className="mb-1"
                          src={items?.imageUrl}
                          width={45}
                          height={45}
                          alt={items.color}
                        />
                        <div className="fw-bold text-center">{items?.color}</div>
                      </div>
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
                <button onClick={handleBuyNow} class="btn btn-danger flex-fill">MUA NGAY</button>
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
                      <strong>Pin:</strong> <span>{product?.Battery}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* ////Comments về sản phẩm */}
          <Commnet id={id_product} />
        </div>
        <div className="mt-4 d-flex flex-column flex-lg-row gap-3">
          {/* Có thể bạn quan tâm */}
          <Suggest />

          {/* Tin tức liên quan */}
          <News />
        </div>

      </div>
    </div>


  </>)
}

export default Productdetail