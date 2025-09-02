// src/pages/Home.jsx
import { useRef, useEffect } from "react";
import './Home.css';

import gsap from 'gsap';

import { useGSAP } from '@gsap/react';
import { ScrollToPlugin, SplitText, ScrollTrigger, ScrollSmoother } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, SplitText, ScrollSmoother);

export default function Home() {

  //const container = useRef();
  //const followerRef = useRef();
  const containerRef = useRef(null);

  useEffect(() => {
  const container = containerRef.current;

  function handleMouseMove(e) {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(container, {
      duration: 0.9,
      ease: "back.out",
      "--x": `${x}px`,
      "--y": `${y}px`
    });
  }

  container.addEventListener("mousemove", handleMouseMove);
  return () => container.removeEventListener("mousemove", handleMouseMove);
}, []);
  
  return (
    <div className="home">
      <div className="content">
        <h1>Brice Vaillant</h1>
        <h2>Développeur Web</h2>
      </div>
      <div className="overwrap active" ref={containerRef}>
      </div>


    </div>
  );
}
