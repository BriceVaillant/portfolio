// src/components/PictureDetails.jsx
import { useState, useEffect } from "react";
import "./PictureDetails.css";

export default function PictureDetails({ image, onClose }) {
  const cloudinary_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const [images, setImages] = useState([]);
  const tag = `${image}`;

  useEffect(() => {
    fetch(
      `https://res.cloudinary.com/${cloudinary_name}/image/list/${tag}.json`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched images:", data);
        setImages(data.resources);
        console.log("data:", data);
      })
      .catch((error) => {
        console.error("Error fetching images from Cloudinary:", error);
      });
  }, [cloudinary_name, tag]);

  return (
      <div className="pictures-modal" onClick={() => onClose()}>
      {images.map((img) => {
        const isSingle = images.length === 1;
        const isMain = img.public_id.endsWith("_00");
        return (
          <div
            className={`${
              isSingle ? "single-view" : "multi-view"
            }`}
            key={img.public_id}
          >
            <img
              className={isMain ? "main-picture" : "sub-picture"}
              src={`https://res.cloudinary.com/${cloudinary_name}/image/upload/v${img.version}/${img.public_id}.${img.format}`}
              alt={img.public_id}
              width={img.width}
              height={img.height}
            />
          </div>
        );
      })}
    </div>
  );
}
