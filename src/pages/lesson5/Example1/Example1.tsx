import { AnimatePresence, motion } from "motion/react";
import { useState, useMemo, useRef } from "react";

export const OptimizedList = () => {
  const [items, setItems] = useState([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
  ]);

  const cachedStylesCount = useRef(0);
  const nonCachedStylesCount = useRef(0);

  // Кэшированные стили с useMemo
  const cachedStyles = useMemo(() => {
    cachedStylesCount.current++;
    console.log(`Cached styles created: ${cachedStylesCount.current}`);
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
      exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    };
  }, []);

  // Некэшированные стили (пересчитываются на каждый рендер)
  const nonCachedStyles = () => {
    nonCachedStylesCount.current++;
    console.log(`Non-cached styles created: ${nonCachedStylesCount.current}`);
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
      exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    };
  };

  const addItem = () => {
    const newId = items.length + 1;
    setItems([...items, { id: newId, text: `Item ${newId}` }]);
  };

  return (
    <div className="container">
      <h1>Animated List with Cached vs Non-Cached Styles</h1>
      <button className="add-button" onClick={addItem}>
        Add Item
      </button>
      <div className="lists-container">
        <div>
          <h2>Cached Styles (useMemo)</h2>
          <ul className="list">
            <AnimatePresence>
              {items.map((item) => (
                <motion.li
                  key={item.id}
                  className="list-item"
                  initial={cachedStyles.initial}
                  animate={cachedStyles.animate}
                  exit={cachedStyles.exit}
                >
                  {item.text}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
        <div>
          <h2>Non-Cached Styles</h2>
          <ul className="list">
            <AnimatePresence>
              {items.map((item) => (
                <motion.li
                  key={item.id}
                  className="list-item"
                  initial={nonCachedStyles().initial}
                  animate={nonCachedStyles().animate}
                  exit={nonCachedStyles().exit}
                >
                  {item.text}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
      <p>Open the console to see the style creation logs.</p>
    </div>
  );
};
