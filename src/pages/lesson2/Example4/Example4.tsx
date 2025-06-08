import { useMemo } from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ItemsType = {
  id: number;
  name: string;
  category: string;
};

const items: ItemsType[] = [
  { id: 1, name: "Blue Ocean", category: "nature" },
  { id: 2, name: "City Lights", category: "urban" },
  { id: 3, name: "Forest Path", category: "nature" },
  { id: 4, name: "Downtown Skyline", category: "urban" },
  { id: 5, name: "Mountain Peak", category: "nature" },
  { id: 6, name: "Urban Park", category: "urban" },
];

export const ListItems = () => {
  const { filter, setFilter, searchTerm, setSearchTerm, filteredItems } =
    useFilter(items);
  const { containerVariants, itemVariants, titleVariants, buttonVariants } =
    useListAnimation();

  return (
    <div className="container">
      <motion.h1
        initial={titleVariants.initial}
        animate={titleVariants.animate}
        className="title"
      >
        Animated List Filter
      </motion.h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="filter-buttons">
          {["all", "nature", "urban"].map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`filter-button ${filter === category ? "active" : ""}`}
              {...buttonVariants}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.ul
        className="item-list"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <motion.li
              key={item.id}
              variants={itemVariants}
              custom={index}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="item"
              layout
            >
              {item.name} ({item.category})
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
};

const useListAnimation = () => {
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.1,
          duration: 0.5,
          ease: "easeOut",
        },
      }),
      exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
    }),
    []
  );

  const titleVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }),
    []
  );

  const buttonVariants = useMemo(
    () => ({
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
    }),
    []
  );

  return { containerVariants, itemVariants, titleVariants, buttonVariants };
};

const useFilter = (initialItems: ItemsType[]) => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = initialItems.filter((item) => {
    const matchesCategory = filter === "all" || item.category === filter;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return { filter, setFilter, searchTerm, setSearchTerm, filteredItems };
};
