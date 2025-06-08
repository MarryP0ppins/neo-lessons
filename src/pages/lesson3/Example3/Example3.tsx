import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CATS: string[] = [
  "neo",
  "millie",
  "millie_neo",
  "neo_banana",
  "neo_2",
  "bella",
];

export const Gallery = () => {
  const refs = useRef<HTMLDivElement[]>([]);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !refs.current.includes(el)) {
      refs.current[index] = el;
    }
  };

  useEffect(() => {
    const elements = refs.current;

    elements.forEach((el, index) => {
      if (!el) return;

      gsap.fromTo(
        el,
        { opacity: 0, x: index % 2 === 0 ? -300 : 300 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 60%",
            end: "top 20%",
            scrub: true,
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(elements);
    };
  }, []);

  return (
    <div style={{ minHeight: "200vh" }}>
      <div style={{ height: "60vh" }}></div>
      {CATS.map((src, index) => (
        <div
          key={index}
          ref={(el) => addToRefs(el, index)}
          style={{
            height: 400,
            width: 600,
            background: `url(https://placecats.com/${src}/300/200)`,
            margin: "20px auto",
            backgroundSize: "contain",
            flexShrink: 0,
            opacity: 0,
          }}
        />
      ))}
      <div style={{ height: "60vh" }}></div>
    </div>
  );
};

export default Gallery;
