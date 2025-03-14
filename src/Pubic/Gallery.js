import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Gallery = ({ product, selectedColor }) => {
  if (!product) {
    return <p>Không có ảnh để hiển thị</p>;
  }

  // Lấy danh sách ảnh từ `product.image` và `product.listImages`
  const imagesFromProduct = product.image?.map((img) => ({
    original: img.imageUrl,
    thumbnail: img.imageUrl,
    color: img.color || "default",
  })) || [];

  const imagesFromList = product.listImages?.map((img) => ({
    original: img,
    thumbnail: img,
    color: "default",
  })) || [];

  // Gộp hai mảng ảnh lại
  let images = [...imagesFromProduct, ...imagesFromList];
  console.log(images);
  // Nếu có màu được chọn, ưu tiên hiển thị ảnh có màu đó trước
  if (selectedColor) {
    images = [
      ...images.filter((img) => img.color === selectedColor.color),
      ...images.filter((img) => img.color !== selectedColor.color),
    ];
  }

  return <ImageGallery items={images} showPlayButton={false} autoPlay={false} />;
};

export default Gallery;
