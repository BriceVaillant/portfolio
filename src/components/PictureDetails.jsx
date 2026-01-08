// src/components/PictureDetails.jsx

import "./PictureDetails.css";

export default function PictureDetails({ image, onClose }) {
  const cloudinary_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  return (
    <div className="picture-details-modal" onClick={() => onClose()}>
      <img
        src={`https://res.cloudinary.com/${cloudinary_name}/image/upload/v${image.version}/${image.public_id}.${image.format}`}
        alt={image.public_id}
        width={image.width}
        height={image.height}
      />
    </div>
  );
}
