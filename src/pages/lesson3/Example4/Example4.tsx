import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export const Landing = () => {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        const title = section.querySelector(".title");
        const content = section.querySelector(".content");

        if (!title || !content) {
          console.warn(`Section ${index} missing title or content`, {
            title,
            content,
          });
          return;
        }
        gsap.set([title, content], { opacity: 1, x: 0, y: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 25%",
            end: "top 10%",
            scrub: 1,
          },
        });

        tl.fromTo(
          title,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1 }
        ).fromTo(
          content,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 1 },
          "-=0.5"
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      {["Секция 1", "Секция 2", "Секция 3"].map((title, index) => (
        <div
          key={index}
          ref={(el) => {
            sectionsRef.current[index] = el;
          }}
          style={{
            minHeight: "100vh",
            padding: "20px",
            background: index % 2 === 0 ? "#f0f0f0" : "#e0e0e0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#000",
          }}
        >
          <h2
            className="title"
            style={{
              fontSize: "2.5rem",
              marginBottom: "20px",
              color: "#000",
            }}
          >
            {title}
          </h2>
          <p
            className="content"
            style={{
              fontSize: "1.2rem",
              maxWidth: "600px",
              color: "#000",
            }}
          >
            Контент {title}. Это пример текста, который появляется с анимацией
            при прокрутке.
          </p>
        </div>
      ))}
    </div>
  );
};
