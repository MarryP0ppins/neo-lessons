import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const AccessibleScroll = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!prefersReduced && textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 40%",
            end: "top 10%",
            scrub: 1,
            markers: true,
          },
        }
      );
    } else if (textRef.current) {
      gsap.set(textRef.current, { opacity: 1, y: 0 });
    }
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div style={{ height: "150vh", padding: 20 }}>
      <div style={{ height: "50vh" }}></div>
      <div
        ref={textRef}
        style={{
          padding: 20,
          background: "#3498db",
          color: "white",
          opacity: 1,
        }}
        aria-live="polite"
      >
        Появляющийся текст
      </div>
    </div>
  );
};
