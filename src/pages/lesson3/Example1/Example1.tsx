import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const HeroTimeline = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero-title", {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".hero-subtitle",
          {
            opacity: 0,
            x: 50,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(".hero-button", {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
        });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} style={{ textAlign: "center", padding: 50 }}>
      <h1 className="hero-title">Добро пожаловать</h1>
      <h2 className="hero-subtitle">Создавайте анимации</h2>
      <button className="hero-button">Начать</button>
    </div>
  );
};
