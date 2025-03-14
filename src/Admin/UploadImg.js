import React, { useState } from "react";
import axios from "../AxiosConfig/config";

const ImgUpload = ({ resphoneImg }) => {
  const [previewImages, setPreviewImages] = useState([]); // Ảnh xem trước
  const [uploadedImages, setUploadedImages] = useState([]); // Ảnh đã tải lên

  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files);
    
    if (files.length === 0) return; // Không có ảnh nào được chọn thì không làm gì cả.

    // Tạo URL xem trước ảnh trước khi upload
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prevImages) => [...prevImages, ...newPreviews]);

    // Upload ảnh ngay lập tức
    const formData = new FormData();
    files.forEach((file) => formData.append("myFiles", file));

    try {
      console.log("Đang tải ảnh lên...");
      const upload = await axios.post("/upload/uploadmultiple", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedUrls = upload.data.files.map((file) => file.url);

      // Cập nhật state một cách đúng đắn
      setUploadedImages((prev) => {
        const updatedImages = [...prev, ...uploadedUrls];
        resphoneImg(updatedImages); // Gửi dữ liệu mới nhất lên component cha
        return updatedImages;
      });

      console.log("Ảnh đã tải lên:", uploadedUrls);
    } catch (error) {
      console.error("Lỗi tải ảnh lên:", error);
    }
  };

  const handleRemoveImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    
    setUploadedImages((prev) => {
      const updatedImages = prev.filter((_, i) => i !== index);
      resphoneImg(updatedImages); // Cập nhật lên component cha
      return updatedImages;
    });
  };

  return (
    <div className="container mt-3">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="form-control mb-3"
      />
      <div className="row d-flex">
        {previewImages.map((image, index) => (
          <div key={index} className="col-4 col-md-3 col-lg-2 position-relative">
            <img src={image} className="img-thumbnail w-100" alt="upload" />
            <button
              className="btn btn-danger btn-sm position-absolute top-0 end-0"
              onClick={() => handleRemoveImage(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImgUpload;
