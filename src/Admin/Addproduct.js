import React, { useState, useEffect } from "react";
import axios from "../AxiosConfig/config";
import { ToastContainer, toast } from 'react-toastify';
import UploadImg from "./UploadImg"
function AddProduct() {
  const [listImg, setListImg] = useState(null)
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [category, setCategory] = useState([]);
  const [Sim, setSim] = useState("");
  const [Design, setDesign] = useState("");
  const [Screen, setScreen] = useState("");
  const [Pixel, setPixel] = useState("");
  const [Cpu, setCpu] = useState("");
  const [Ram, setRam] = useState("");
  const [Rom, setRom] = useState("");
  const [Camera1, setCamera1] = useState("");
  const [Camera2, setCamera2] = useState("");
  const [Jack, setJack] = useState("");
  const [Battery, setBattery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [file, setFile] = useState("");
  const [variant, setVariant] = useState([
    {
      id: Math.random(),
      color: "",
      img: "",
      memory: [
        {
          quantity: 0,
          price: "",
          infoMemory: "",
        },
      ],
    },
  ]);

  // Thêm một biến thể mới
  const addVariant = () => {
    setVariant([
      ...variant,
      {
        id: Math.random(),
        color: "",
        img: "",
        memory: [
          {
            quantity: 0,
            price: "",
            infoMemory: "",
          },
        ],
      },
    ]);
  };

  // Thêm một bộ nhớ mới vào một biến thể
  const addMemory = (id) => {
    setVariant(
      variant.map((item) =>
        item.id === id
          ? {
            ...item,
            memory: [
              ...item.memory,
              { quantity: 0, price: "", infoMemory: "" },
            ],
          }
          : item
      )
    );
  };
  const removeMemory = (id, index) => {
    setVariant((prevVariants) =>
      prevVariants.map((item) =>
        item.id === id
          ? { ...item, memory: item.memory.filter((_, i) => i != index) }
          : item
      )
    );
  };

  const removeVariant = (id) => {
    setVariant(variant.filter((item) => item.id === id))
  }
  // Cập nhật giá trị của biến thể (màu sắc, ảnh)
  const updateVariant = (id, field, value) => {
    setVariant(
      variant.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Cập nhật giá trị của bộ nhớ
  const updateMemory = (variantId, memoryIndex, field, value) => {
    setVariant(
      variant.map((item) =>
        item.id === variantId
          ? {
            ...item,
            memory: item.memory.map((mem, index) =>
              index === memoryIndex ? { ...mem, [field]: value } : mem
            ),
          }
          : item
      )
    );
  };
  useEffect(() => {
    fetchingCategory()
  }, [])
  console.log(variant);
  const resphonImg = async (data) => {
    console.log(data);
    setListImg(data)
  }
  const handleImg = async (src, id) => {
    try {
      const formData = new FormData();
      formData.append("myFiles", src[0]);
      console.log(formData)
      const upload = await axios.post("/upload/uploadmultiple", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const img = upload.data.files[0].url
      console.log(img)
      setFile(img)
      updateVariant(id, "img", img)
    } catch (error) {
      console.log(error)
    }
  }

  const addProduct = async () => {
    try {
      const data = {
        name,
        info,
        category: selectedCategory,
        Sim,
        Design,
        Screen,
        Pixel,
        Cpu,
        Ram,
        Rom,
        Camera1,
        Camera2,
        Jack,
        Battery,
        image: variant.map((item) => {
          return {
            color: item.color,
            imageUrl: item.img,
            memory: item.memory.map((mem) => {
              return {
                quantity: mem.quantity,
                price: mem.price,
                infoMemory: mem.infoMemory
              };
            })
          };
        }),
        listImages: listImg
      };

      const result = await axios.post("/phone/phone", { data });
      if (result.status === 200) {
        toast.success("Thêm sản phẩm thành công");
        window.location.href('https://tttnserver.onrender.com/admin/product');
      } else {
        toast.success("Loi");
      }
    } catch (error) {
      console.log(error);
    }
  }
  const checkStageMemory = () => {
    if (!Array.isArray(variant) || variant.length === 0) {
      return false;
    }

    for (let i = 0; i < variant.length; i++) {
      if (variant[i].color.trim() === "" || variant[i].img.trim() === "") {
        return false;
      }

      if (!Array.isArray(variant[i].memory) || variant[i].memory.length === 0) {
        return false;
      }

      for (let j = 0; j < variant[i].memory.length; j++) {
        if (
          variant[i].memory[j].quantity.toString().trim() === "" ||
          variant[i].memory[j].price.toString().trim() === "" ||
          variant[i].memory[j].infoMemory.trim() === ""
        ) {
          return false;
        }
      }
    }

    return true;
  };
  const fetchingCategory = async () => {
    try {
      const responsive = await axios.get('/category/category');
      setCategory(responsive.data);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  }
  console.log(selectedCategory);

  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center text-danger">Thêm Thông Tin Sản Phẩm</h2>
        <div className="row">
          {/* Cột trái */}
          <div className="col-md-12">
            <div className="form-group mb-4">
              <label htmlFor="name" className="form-label">
                Tên Sản Phẩm
              </label>
              <input
                id="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Nhập tên sản phẩm"
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="description" className="form-label">
                Mô tả
              </label>
              <textarea
                id="description"
                onChange={(e) => setInfo(e.target.value)}
                className="form-control"
                rows="4"
                placeholder="Nhập mô tả sản phẩm"
              ></textarea>
            </div>
            <UploadImg resphoneImg={resphonImg} />
          </div>
          <div className="container mt-5">
            <div className="card shadow-lg p-4">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Thẻ SIM:</label>
                  <input
                    onChange={(e) => setSim(e.target.value)}

                    type="text"
                    className="form-control"
                    placeholder="2 SIM, 5G"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Kiểu thiết kế:</label>
                  <input
                    onChange={(e) => setDesign(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Thanh cảm ứng"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Màn hình:</label>
                  <input
                    onChange={(e) => setScreen(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="6.78 inch, LTPO AMOLED, 144Hz"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Độ phân giải:</label>
                  <input
                    onChange={(e) => setPixel(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="1260 x 2800 pixels, 20:9"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">CPU:</label>
                  <input
                    onChange={(e) => setCpu(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Snapdragon 8 Gen 3"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">RAM:</label>
                  <input
                    onChange={(e) => setRam(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="12GB/16GB"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Bộ nhớ:</label>
                  <input
                    onChange={(e) => setRom(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="256GB/512GB/1TB"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Camera sau:</label>
                  <input
                    onChange={(e) => setCamera1(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="50 MP + 8 MP"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Camera trước:</label>
                  <input
                    onChange={(e) => setCamera2(e.target.value)} type="text" className="form-control" placeholder="16 MP" />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Jack 3.5mm / Loa:</label>
                  <input
                    onChange={(e) => setJack(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Không / Loa kép"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Pin:</label>
                <input
                  onChange={(e) => setBattery(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="6100 mAh, 120W"
                />
              </div>
            </div>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="categorySelect" className="form-label fw-bold">
              Chọn danh mục
            </label>
            <select
              id="categorySelect"
              name="Category"
              className="form-select"
              onChange={(e) => setSelectedCategory(e.target.value)} // Đặt onChange trên <select>
              value={selectedCategory} // Ràng buộc giá trị được chọn
            >
              {category.map((items) => (
                <option key={items.id} value={items.name}>
                  {items.name}
                </option>
              ))}
            </select>
          </div>

          {/* Cột phải */}
          <div className="col-md-12">
            <h3 className="mb-4">Biến thể</h3>
            {variant.map((item) => (
              <div key={item.id} className="border p-4 mb-4 rounded shadow-sm position-relative">
                <button
                  type="button"
                  className="btn-close position-absolute"
                  style={{
                    top: "10px",
                    right: "10px",
                    zIndex: 10,
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    borderRadius: "50%",
                    padding: "8px",
                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                  }}
                  onClick={() => removeVariant(item.id)}
                ></button>


                <div className="mb-4">
                  <label className="form-label">Màu sắc</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập màu sắc"
                    value={item.color}
                    onChange={(e) => updateVariant(item.id, "color", e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Chọn ảnh</label>
                  <input type="file" onChange={(e) => handleImg(e.target.files, item.id)} />
                </div>
                <div className="mb-4">
                  <h5>Bộ nhớ điện thoại:</h5>
                  {item.memory.map((memory, memoryIndex) => (
                    <div key={memoryIndex} className="d-flex align-items-center mb-2" style={{ gap: "10px" }}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Rom/Ram"
                        value={memory.infoMemory}
                        onChange={(e) =>
                          updateMemory(item.id, memoryIndex, "infoMemory", e.target.value)
                        }
                      />
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Price"
                        value={memory.price}
                        onChange={(e) =>
                          updateMemory(item.id, memoryIndex, "price", e.target.value)
                        }
                      />
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Quantity"
                        value={memory.quantity}
                        onChange={(e) =>
                          updateMemory(item.id, memoryIndex, "quantity", e.target.value)
                        }
                      />
                      <button
                        onClick={() => removeMemory(item.id, memoryIndex)}
                        type="button"
                        className="btn "
                        style={{
                          backgroundColor: "rgba(142, 138, 138, 0.7)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                        }}
                      >
                        <i style={{ color: "red" }} className="bi bi-trash"></i>
                      </button>
                    </div>

                  ))}
                  <button
                    type="button"
                    onClick={() => addMemory(item.id)}
                    className="btn btn-secondary mt-2"
                  >
                    Thêm kích cỡ
                  </button>
                </div>
              </div>
            ))}
            <button type="button" onClick={addVariant} className="btn btn-success mb-4">
              Thêm màu sắc
            </button>
          </div>
        </div>

        <div className="text-center">
          <button disabled={name === "" || file == null || info === "" || !checkStageMemory()} onClick={addProduct} className="btn btn-primary mt-3">
            Thêm sản phẩm
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddProduct;
