// src/components/PictureDetails.jsx
import { useState, useEffect } from "react";
import "./PictureDetails.css";

export default function PictureDetails({ image, onClose }) {
  const cloudinary_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const [images, setImages] = useState([]);
  const tag = `${image}`;
  const mainImageUrl = `https://res.cloudinary.com/${cloudinary_name}/image/upload/v1767710557/IMG_${tag}_00.jpg`;
  const mainImageKey = `IMG_${tag}_00`;

  // need to fetch images with the given tag
  //removed main image from the list to avoid duplication

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

  const isSingle = images.length === 1;
  //display main image on top and sub images below
  // have sub images clickable to show in main view
  return (
    <div className="pictures-modal" onClick={() => onClose()}>
      <div className={`${isSingle ? "single-view" : "multi-view"}`} key={tag}>
        <img src={mainImageUrl} alt={mainImageKey} />
        {images.map((img) => {
          const isMain = img.public_id.endsWith("_00");
          return (
            <div>
              <div className={`${isMain ? "single-view" : "d-none"}`}>
                <img
                  className={isMain ? "main-picture" : "d-none"}
                  src={`https://res.cloudinary.com/${cloudinary_name}/image/upload/v${img.version}/${img.public_id}.${img.format}`}
                  alt={img.public_id}
                  width={img.width}
                  height={img.height}
                />
              </div>
              <div>
                <img
                  className={isMain ? "d-none" : "sub-picture"}
                  src={`https://res.cloudinary.com/${cloudinary_name}/image/upload/v${img.version}/${img.public_id}.${img.format}`}
                  alt={img.public_id}
                  width={img.width}
                  height={img.height}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
