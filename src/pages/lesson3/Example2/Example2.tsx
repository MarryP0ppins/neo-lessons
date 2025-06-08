import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ParallaxDemo.css";

gsap.registerPlugin(ScrollTrigger);

export const ParallaxDemo = () => {
  const layersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(layersRef.current, {
      yPercent: 80,
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      <div className="header-section">
        <h1 className="header-title">Scroll Down for Parallax</h1>
      </div>
      <div className="parallax-section">
        <div className="parallax-bg" ref={layersRef}>
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            alt="Background"
            className="bg-image"
          />
        </div>
        <div className="content-container">
          <h1 className="title">Parallax Effect</h1>
          <div className="content-box">
            <p className="content-text">
              This is a parallax scrolling effect where the background moves
              slower than the content. Scroll down to see the effect in action.
            </p>
            <p className="content-text">
              The background image shifts upward by 20% of its height as you
              scroll, creating a subtle depth effect commonly used in modern
              portfolio websites.
            </p>
          </div>
        </div>
      </div>
      <div className="footer-section">
        <h1 className="footer-title">End of Parallax Section</h1>
      </div>
    </div>
  );
};
