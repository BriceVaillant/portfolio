// src/pages/Projects.jsx
import "./Miniatures.css";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";

import PictureDetails from '../components/PictureDetails';
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

export default function Miniatures() {
  const container = useRef();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage ] = useState(null);
  const [showPictureDetails, setShowPictureDetails] = useState(false);
  const cloudinary_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const tag = "display";

  useEffect(() => {
    fetch(
      `https://res.cloudinary.com/${cloudinary_name}/image/list/${tag}.json`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched images:", data);
        setImages(data.resources);
      })
      .catch((error) => {
        console.error("Error fetching images from Cloudinary:", error);
      });
  }, [cloudinary_name]);

  const handleImgClick = (clickedImage) => {
    console.log("Image clicked:", clickedImage.public_id);
    setSelectedImage(clickedImage);
    setShowPictureDetails(true);
  };

  useGSAP(
    () => {
      ScrollTrigger.defaults({
        markers: false,
      });

      const cards = gsap.utils.toArray(".miniature-card");

      if (cards.length > 0) {
        ScrollTrigger.batch(cards, {
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
              overwrite: true
            });
          },
          start: "top 90%",
          once: true
        });
      }
    },
    { scope: container, dependencies: [images] }
  );

  return (
    <section id="minis-container" ref={container}>
      <div className="minis-pictures-grid">
          {images.map((img) => (
            <div className="miniature-card" key={img.public_id}>
              <img
                src={`https://res.cloudinary.com/${cloudinary_name}/image/upload/v${img.version}/${img.public_id}.${img.format}`}
                alt={img.public_id}
                width={img.width}
                height={img.height}
                onClick={() => handleImgClick(img)}
              />
            </div>
          ))}
      </div>
        {showPictureDetails && (
          <PictureDetails
            image={selectedImage}
            onClose={() => setShowPictureDetails(false)}
          />
        )}
    </section>
  );
}
