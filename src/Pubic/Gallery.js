import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Gallery = ({ product, selectedColor }) => {
  if (!product || !Array.isArray(product.image)) {
    return <p>Không có ảnh để hiển thị</p>;
  }

  // Danh sách ảnh đầy đủ
  let images = product.image.map((img) => ({
    original: img.imageUrl,
    thumbnail: img.imageUrl,
    color: img.color || "default",
  }));

  // Nếu có màu được chọn, đặt ảnh của màu đó lên đầu danh sách
  if (selectedColor) {
    images = [
      ...images.filter((img) => img.color === selectedColor.color),
      ...images.filter((img) => img.color !== selectedColor.color),
    ];
  }

  return <ImageGallery items={images} showPlayButton={false} autoPlay={false} />;
};

export default Gallery;
