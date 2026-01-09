// src/components/PictureDetails.jsx
import { useState, useEffect } from "react";
import "./PictureDetails.css";

export default function PictureDetails({ image, onClose }) {
  const cloudinary_name = "dxrlfbw2k";
  const [images, setImages] = useState([]);
  const tag = `${image}`;
  const mainImageUrl = `https://res.cloudinary.com/${cloudinary_name}/image/upload/v1767710557/IMG_${tag}_00.jpg`;
  const mainImageKey = `IMG_${tag}_00`;

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setSelectedImage(null);
  }, [tag]);

  // need to fetch images with the given tag
  //removed main image from the list to avoid duplication

  useEffect(() => {
    fetch(
      `https://res.cloudinary.com/${cloudinary_name}/image/list/${tag}.json`
    )
      .then((res) => res.json())
      .then((data) => {
        data.resources.forEach((img, index) => {
          if (img.public_id === mainImageKey) {
            data.resources.splice(index, 1);
          }
        });
        // console.log("Fetched images for PictureDetails:", data);
        setImages(data.resources);
      })
      .catch((error) => {
        console.error("Error fetching images from Cloudinary:", error);
      });
  }, [cloudinary_name, tag, mainImageKey]);

  // console.log("Images to display in PictureDetails:", images);
  const isSingle = images.length <= 1;

  //display main image on top and sub images below
  // have sub images clickable to show in main view
  return (
    <div className="pictures-modal" onClick={() => onClose()}>
      <div className="goleft"></div>
      <div className="goright"></div>
      <div
        className={`${isSingle ? "single-view" : "multi-view"}`}
        key={`IMG_fig${tag}_00`}
      >
        <div className="main-picture-container">
          <img
            className="main-picture"
            src={selectedImage ? selectedImage.url : mainImageUrl}
            alt={selectedImage ? selectedImage.alt : mainImageKey}
          />
        </div>
        <div className={`${isSingle ? "d-none" : "sub-pictures-container"}`}>
          {images.map((img) => (
            <img
              key={img.public_id}
              className="sub-picture"
              src={`https://res.cloudinary.com/${cloudinary_name}/image/upload/v${img.version}/${img.public_id}.${img.format}`}
              alt={img.public_id}
              width={img.width}
              height={img.height}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage({
                  url: `https://res.cloudinary.com/${cloudinary_name}/image/upload/v${img.version}/${img.public_id}.${img.format}`,
                  alt: img.public_id,
                });
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
