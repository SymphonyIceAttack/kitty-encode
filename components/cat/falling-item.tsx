"use client";

import { motion } from "framer-motion";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import type { CatItemType } from "@/context/cat-context";
import { useLanguage } from "@/context/language-context";
import { t } from "@/lib/translations";

const GhibliIcons: Record<CatItemType, React.ReactNode> = {
  fish: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <ellipse cx="16" cy="16" rx="10" ry="6" fill="hsl(180, 45%, 55%)" />
      <path d="M26 16 L32 10 L32 22 Z" fill="hsl(180, 45%, 55%)" />
      <circle cx="10" cy="14" r="2" fill="hsl(180, 50%, 25%)" />
      <circle cx="11" cy="13" r="0.8" fill="white" />
      <path
        d="M14 18 Q16 20 18 18"
        stroke="hsl(180, 50%, 35%)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  ),
  yarn: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="12" fill="hsl(155, 40%, 50%)" />
      <path
        d="M8 12 Q16 8 24 12"
        stroke="hsl(155, 45%, 35%)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M8 20 Q16 24 24 20"
        stroke="hsl(155, 45%, 35%)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M10 16 Q16 12 22 16"
        stroke="hsl(155, 45%, 35%)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M12 18 Q16 22 20 18"
        stroke="hsl(155, 45%, 35%)"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  ),
  book: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <rect
        x="8"
        y="6"
        width="16"
        height="20"
        rx="2"
        fill="hsl(25, 45%, 60%)"
      />
      <rect
        x="10"
        y="8"
        width="12"
        height="16"
        rx="1"
        fill="hsl(25, 50%, 80%)"
      />
      <line
        x1="16"
        y1="8"
        x2="16"
        y2="24"
        stroke="hsl(25, 45%, 40%)"
        strokeWidth="1"
      />
    </svg>
  ),
  keyboard: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <rect
        x="6"
        y="10"
        width="20"
        height="12"
        rx="2"
        fill="hsl(220, 20%, 25%)"
      />
      <rect x="8" y="12" width="2" height="2" fill="hsl(220, 20%, 60%)" />
      <rect x="11" y="12" width="2" height="2" fill="hsl(220, 20%, 60%)" />
      <rect x="14" y="12" width="2" height="2" fill="hsl(220, 20%, 60%)" />
      <rect x="17" y="12" width="2" height="2" fill="hsl(220, 20%, 60%)" />
      <rect x="20" y="12" width="2" height="2" fill="hsl(220, 20%, 60%)" />
      <rect x="8" y="15" width="2" height="2" fill="hsl(220, 20%, 60%)" />
      <rect x="11" y="15" width="2" height="2" fill="hsl(220, 20%, 60%)" />
      <rect x="14" y="15" width="4" height="2" fill="hsl(220, 20%, 60%)" />
      <rect x="19" y="15" width="3" height="2" fill="hsl(220, 20%, 60%)" />
    </svg>
  ),
  coffee: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <rect
        x="8"
        y="12"
        width="16"
        height="12"
        rx="2"
        fill="hsl(30, 40%, 70%)"
      />
      <rect
        x="10"
        y="8"
        width="12"
        height="6"
        rx="1"
        fill="hsl(30, 40%, 90%)"
      />
      <path
        d="M24 14 Q28 16 24 18"
        stroke="hsl(30, 40%, 50%)"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="14" cy="18" r="1" fill="hsl(30, 30%, 30%)" />
      <circle cx="18" cy="16" r="1" fill="hsl(30, 30%, 30%)" />
    </svg>
  ),
  sparkles: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="8" fill="hsl(280, 70%, 80%)" />
      <path
        d="M16 8 L17 12 L21 13 L17 14 L16 18 L15 14 L11 13 L15 12 Z"
        fill="hsl(280, 80%, 90%)"
      />
      <path
        d="M12 20 L12.5 22 L14.5 22.5 L12.5 23 L12 25 L11.5 23 L9.5 22.5 L11.5 22 Z"
        fill="hsl(280, 80%, 85%)"
      />
      <path
        d="M20 20 L20.5 22 L22.5 22.5 L20.5 23 L20 25 L19.5 23 L17.5 22.5 L19.5 22 Z"
        fill="hsl(280, 80%, 85%)"
      />
    </svg>
  ),
};

interface FallingItemProps {
  type: CatItemType;
  onCollect: (type: CatItemType) => void;
}

export function FallingItem({ type, onCollect }: FallingItemProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const itemRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();

  useEffect(() => {
    // Random starting position
    const startX =
      Math.random() * (typeof window !== "undefined" ? window.innerWidth : 800);
    setPosition({ x: startX, y: -50 });

    // Animate falling
    const fallDuration = 3000 + Math.random() * 2000; // 3-5 seconds
    const startTime = Date.now();

    const fall = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / fallDuration, 1);

      setPosition((prev) => ({
        x: prev.x + Math.sin(progress * Math.PI * 2) * 2, // Slight horizontal sway
        y:
          -50 +
          progress *
            (typeof window !== "undefined" ? window.innerHeight + 100 : 600),
      }));

      if (progress < 1) {
        requestAnimationFrame(fall);
      } else {
        setIsVisible(false);
      }
    };

    const fallInterval = setTimeout(() => {
      requestAnimationFrame(fall);
    }, 100);

    return () => clearTimeout(fallInterval);
  }, []);

  const handleClick = () => {
    if (isVisible) {
      setIsVisible(false);
      onCollect(type);
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      ref={itemRef}
      className="absolute cursor-pointer z-50"
      style={{
        left: position.x,
        top: position.y,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-white/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
        <motion.div
          className="relative bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-white/50 hover:bg-white hover:shadow-xl transition-all duration-300"
          animate={{
            y: [0, -5, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {GhibliIcons[type]}
        </motion.div>

        {/* Item name tooltip */}
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          initial={{ y: 5, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
        >
          {t(`cat.items.${type}`, lang)}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black/80" />
        </motion.div>
      </div>
    </motion.div>
  );
}

interface FallingItemsProps {
  items: CatItemType[];
  onCollect: (type: CatItemType) => void;
}

export function FallingItems({ items, onCollect }: FallingItemsProps) {
  const [fallingItems, setFallingItems] = useState<
    { id: string; type: CatItemType }[]
  >([]);

  useEffect(() => {
    if (items.length === 0) return;

    // Spawn items with some randomness
    const spawnInterval = setInterval(
      () => {
        if (fallingItems.length < 3) {
          // Max 3 items at a time
          const randomType = items[Math.floor(Math.random() * items.length)];
          const newItem = {
            id: `${randomType}-${Date.now()}-${Math.random()}`,
            type: randomType,
          };
          setFallingItems((prev) => [...prev, newItem]);
        }
      },
      2000 + Math.random() * 3000,
    ); // Spawn every 2-5 seconds

    return () => clearInterval(spawnInterval);
  }, [items, fallingItems.length]);

  const handleCollect = (type: CatItemType) => {
    setFallingItems((prev) => prev.filter((item) => item.type !== type));
    onCollect(type);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {fallingItems.map((item) => (
        <div key={item.id} className="pointer-events-auto">
          <FallingItem
            type={item.type}
            onCollect={() => handleCollect(item.type)}
          />
        </div>
      ))}
    </div>
  );
}
