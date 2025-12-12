"use client";

import {
  animate,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { type CatMood, useCat } from "@/context/cat-context";

function PixelCat({
  mood,
  isDragging,
}: {
  mood: CatMood;
  isDragging: boolean;
}) {
  const tailControls = useAnimation();
  const pawsControls = useAnimation();
  const earsControls = useAnimation();
  const whiskersControls = useAnimation();
  const bodyControls = useAnimation();

  useEffect(() => {
    if (isDragging) {
      tailControls.start({
        rotate: [0, 15, -15, 10, -10, 0],
        transition: { duration: 0.6, repeat: Number.POSITIVE_INFINITY },
      });
      pawsControls.start({
        y: [0, -3, 0],
        transition: {
          duration: 0.3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        },
      });
      earsControls.start({
        y: [0, -3, 0],
        rotate: [0, 3, -3, 0],
        transition: { duration: 0.4, repeat: Number.POSITIVE_INFINITY },
      });
      whiskersControls.start({
        x: [0, 2, -2, 1, -1, 0],
        transition: { duration: 0.3, repeat: Number.POSITIVE_INFINITY },
      });
      bodyControls.start({
        rotate: [0, -5, 5, -3, 3, 0],
        transition: { duration: 0.5, repeat: Number.POSITIVE_INFINITY },
      });
    } else {
      tailControls.start({
        rotate: 0,
        transition: { type: "spring", stiffness: 200, damping: 20 },
      });
      pawsControls.start({
        y: 0,
        transition: { type: "spring", stiffness: 200, damping: 20 },
      });
      earsControls.start({
        y: 0,
        rotate: 0,
        transition: { type: "spring", stiffness: 200, damping: 20 },
      });
      whiskersControls.start({
        x: 0,
        transition: { type: "spring", stiffness: 200, damping: 20 },
      });
      bodyControls.start({
        rotate: 0,
        transition: { type: "spring", stiffness: 200, damping: 20 },
      });
    }
  }, [
    isDragging,
    tailControls,
    pawsControls,
    earsControls,
    whiskersControls,
    bodyControls,
  ]);

  const bodyLight = "#A8D5BA";
  const bodyMid = "#7EBE98";
  const bodyDark = "#5A9A74";
  const bodyDarker = "#3D7A5A";
  const innerEar = "#FFB7B2";
  const blushColor = "#FFCEC9";
  const noseColor = "#E8958C";

  const expressions = {
    idle: (
      <>
        <path
          d="M32 42 Q38 36 44 42"
          stroke={bodyDarker}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M56 42 Q62 36 68 42"
          stroke={bodyDarker}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M50 50 L47 55 L53 55 Z" fill={noseColor} />
        <path
          d="M47 57 Q50 60 50 57 Q50 60 53 57"
          stroke={bodyDarker}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </>
    ),
    happy: (
      <>
        <path
          d="M30 40 Q38 32 46 40"
          stroke={bodyDarker}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M54 40 Q62 32 70 40"
          stroke={bodyDarker}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M50 50 L47 55 L53 55 Z" fill={noseColor} />
        <path
          d="M44 57 Q50 64 50 57 Q50 64 56 57"
          stroke={bodyDarker}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse
          cx="28"
          cy="52"
          rx="8"
          ry="5"
          fill={blushColor}
          opacity="0.6"
        />
        <ellipse
          cx="72"
          cy="52"
          rx="8"
          ry="5"
          fill={blushColor}
          opacity="0.6"
        />
      </>
    ),
    curious: (
      <>
        <ellipse cx="38" cy="42" rx="7" ry="8" fill="white" />
        <ellipse cx="62" cy="42" rx="7" ry="8" fill="white" />
        <ellipse cx="40" cy="43" rx="5" ry="6" fill={bodyDarker} />
        <ellipse cx="64" cy="43" rx="5" ry="6" fill={bodyDarker} />
        <circle cx="42" cy="41" r="2" fill="white" />
        <circle cx="66" cy="41" r="2" fill="white" />
        <path d="M50 50 L47 55 L53 55 Z" fill={noseColor} />
        <ellipse cx="50" cy="62" rx="3" ry="2.5" fill={bodyDarker} />
      </>
    ),
    sleepy: (
      <>
        <path
          d="M32 44 Q38 42 44 44"
          stroke={bodyDarker}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M56 44 Q62 42 68 44"
          stroke={bodyDarker}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M50 52 L47 57 L53 57 Z" fill={noseColor} />
        <path
          d="M48 60 Q50 61 52 60"
          stroke={bodyDarker}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <text
          x="78"
          y="30"
          fontSize="10"
          fill={bodyDarker}
          fontWeight="bold"
          opacity="0.7"
        >
          z
        </text>
        <text
          x="85"
          y="22"
          fontSize="12"
          fill={bodyDarker}
          fontWeight="bold"
          opacity="0.5"
        >
          z
        </text>
      </>
    ),
    excited: (
      <>
        <g fill={bodyDarker}>
          <polygon points="38,42 36,37 38,32 40,37" />
          <polygon points="38,42 43,40 38,52 33,40" />
        </g>
        <g fill={bodyDarker}>
          <polygon points="62,42 60,37 62,32 64,37" />
          <polygon points="62,42 67,40 62,52 57,40" />
        </g>
        <path d="M50 52 L47 57 L53 57 Z" fill={noseColor} />
        <ellipse cx="50" cy="63" rx="6" ry="5" fill={bodyDarker} />
        <ellipse cx="50" cy="64" rx="4" ry="3" fill="#FFB7B2" />
        <ellipse
          cx="26"
          cy="52"
          rx="8"
          ry="5"
          fill={blushColor}
          opacity="0.7"
        />
        <ellipse
          cx="74"
          cy="52"
          rx="8"
          ry="5"
          fill={blushColor}
          opacity="0.7"
        />
      </>
    ),
    dragging: (
      <>
        <ellipse cx="38" cy="40" rx="8" ry="9" fill="white" />
        <ellipse cx="62" cy="40" rx="8" ry="9" fill="white" />
        <ellipse cx="36" cy="41" rx="5" ry="6" fill={bodyDarker} />
        <ellipse cx="60" cy="41" rx="5" ry="6" fill={bodyDarker} />
        <circle cx="38" cy="39" r="2.5" fill="white" />
        <circle cx="62" cy="39" r="2.5" fill="white" />
        <path d="M50 52 L47 57 L53 57 Z" fill={noseColor} />
        <path
          d="M46 60 Q50 63 54 60"
          stroke={bodyDarker}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse
          cx="28"
          cy="52"
          rx="7"
          ry="4"
          fill={blushColor}
          opacity="0.5"
        />
        <ellipse
          cx="72"
          cy="52"
          rx="7"
          ry="4"
          fill={blushColor}
          opacity="0.5"
        />
      </>
    ),
  };

  const currentExpression = isDragging
    ? expressions.dragging
    : expressions[mood];

  return (
    <motion.svg
      width="120"
      height="100"
      viewBox="0 0 100 100"
      animate={bodyControls}
    >
      {/* Soft shadow */}
      <ellipse cx="50" cy="92" rx="35" ry="6" fill="rgba(0,0,0,0.1)" />

      {/* Fluffy curled tail */}
      <motion.g
        animate={tailControls}
        style={{ originX: "78px", originY: "70px" }}
      >
        <path
          d="M78 70 Q95 65 92 50 Q90 40 82 45"
          stroke={bodyMid}
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M78 70 Q93 66 90 52 Q88 44 82 48"
          stroke={bodyLight}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
      </motion.g>

      {/* Main body */}
      <ellipse cx="50" cy="75" rx="32" ry="20" fill={bodyMid} />
      <ellipse cx="50" cy="73" rx="28" ry="16" fill={bodyLight} />

      {/* Front paws */}
      <motion.g animate={pawsControls}>
        <ellipse cx="35" cy="88" rx="10" ry="7" fill={bodyMid} />
        <ellipse cx="35" cy="87" rx="8" ry="5" fill={bodyLight} />
        <ellipse cx="65" cy="88" rx="10" ry="7" fill={bodyMid} />
        <ellipse cx="65" cy="87" rx="8" ry="5" fill={bodyLight} />
        <ellipse cx="35" cy="90" rx="3" ry="2" fill={innerEar} opacity="0.5" />
        <ellipse cx="65" cy="90" rx="3" ry="2" fill={innerEar} opacity="0.5" />
      </motion.g>

      {/* Large round head */}
      <ellipse cx="50" cy="45" rx="35" ry="32" fill={bodyMid} />
      <ellipse cx="50" cy="43" rx="31" ry="28" fill={bodyLight} />

      {/* Pointed cat ears */}
      <motion.g animate={earsControls}>
        <path d="M18 35 L12 5 L35 25 Z" fill={bodyMid} />
        <path d="M20 32 L15 10 L32 26 Z" fill={bodyLight} />
        <path d="M22 30 L18 15 L30 27 Z" fill={innerEar} opacity="0.6" />
        <path d="M82 35 L88 5 L65 25 Z" fill={bodyMid} />
        <path d="M80 32 L85 10 L68 26 Z" fill={bodyLight} />
        <path d="M78 30 L82 15 L70 27 Z" fill={innerEar} opacity="0.6" />
        <path
          d="M18 35 L12 5 L35 25"
          stroke={bodyDark}
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
        />
        <path
          d="M82 35 L88 5 L65 25"
          stroke={bodyDark}
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
        />
      </motion.g>

      {/* Cheek fluff */}
      <ellipse cx="22" cy="50" rx="10" ry="8" fill={bodyLight} />
      <ellipse cx="78" cy="50" rx="10" ry="8" fill={bodyLight} />

      {/* Blush spots */}
      <ellipse cx="28" cy="52" rx="6" ry="4" fill={blushColor} opacity="0.5" />
      <ellipse cx="72" cy="52" rx="6" ry="4" fill={blushColor} opacity="0.5" />

      {/* Expression based on mood or dragging */}
      {currentExpression}

      {/* Whiskers */}
      <motion.g animate={whiskersControls}>
        <line
          x1="8"
          y1="48"
          x2="25"
          y2="50"
          stroke={bodyDark}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="8"
          y1="54"
          x2="25"
          y2="54"
          stroke={bodyDark}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="10"
          y1="60"
          x2="26"
          y2="58"
          stroke={bodyDark}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="75"
          y1="50"
          x2="92"
          y2="48"
          stroke={bodyDark}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="75"
          y1="54"
          x2="92"
          y2="54"
          stroke={bodyDark}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="74"
          y1="58"
          x2="90"
          y2="60"
          stroke={bodyDark}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </motion.g>

      {/* Forehead marking */}
      <path
        d="M38 28 L42 22 L50 28 L58 22 L62 28"
        stroke={bodyDark}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.4"
      />
    </motion.svg>
  );
}

export function CatMascot() {
  const {
    mood,
    setMood,
    openHome,
    getUnlockedCount,
    getTotalItems,
    setIsCatDragging,
  } = useCat();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-100, 100], [-5, 5]);

  // Idle animation
  useEffect(() => {
    if (!isDragging && mood === "idle") {
      const interval = setInterval(() => {
        animate(y, [0, -3, 0], { duration: 2.5, ease: "easeInOut" });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isDragging, mood, y]);

  const checkLogoCollision = () => {
    const logo = document.getElementById("site-logo");
    const cat = catRef.current;
    if (!logo || !cat) return false;

    const logoRect = logo.getBoundingClientRect();
    const catRect = cat.getBoundingClientRect();

    return !(
      catRect.right < logoRect.left ||
      catRect.left > logoRect.right ||
      catRect.bottom < logoRect.top ||
      catRect.top > logoRect.bottom
    );
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setIsCatDragging(true);
    setMood("curious");
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setIsCatDragging(false);
    if (checkLogoCollision()) {
      setMood("excited");
      openHome();
    } else {
      setMood("idle");
    }
  };

  return (
    <>
      <div
        ref={constraintsRef}
        className="fixed inset-0 pointer-events-none z-40"
      />

      <motion.div
        ref={catRef}
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
        style={{ x, y, rotate }}
        whileDrag={{
          scale: 1.1,
          filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.2))",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="fixed bottom-6 right-6 z-50 cursor-grab active:cursor-grabbing pointer-events-auto"
      >
        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: showTooltip && !isDragging ? 1 : 0,
            y: showTooltip && !isDragging ? 0 : 10,
          }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 bg-card border-2 border-primary/30 rounded-2xl px-4 py-2 text-sm whitespace-nowrap shadow-lg"
        >
          <span className="font-semibold text-primary">
            Drag me to the logo!
          </span>
          <span className="block text-xs text-muted-foreground mt-0.5">
            Collection: {getUnlockedCount()}/{getTotalItems()} items
          </span>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
            <div className="w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-card" />
          </div>
        </motion.div>

        {/* Cat with isDragging prop for animations */}
        <motion.div
          animate={{
            scale: mood === "happy" ? [1, 1.05, 1] : 1,
          }}
          transition={{ duration: 0.4, repeat: mood === "happy" ? 2 : 0 }}
          className="relative"
        >
          <PixelCat mood={mood} isDragging={isDragging} />

          {/* Sparkle effects */}
          {mood === "idle" && !isDragging && (
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -top-1 right-4 text-emerald-400 text-sm"
            >
              ✦
            </motion.div>
          )}

          {isDragging && (
            <>
              <motion.div
                animate={{ opacity: [0, 0.7, 0], x: [-5, -15] }}
                transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY }}
                className="absolute top-1/2 -left-2 w-4 h-0.5 bg-primary/40 rounded-full"
              />
              <motion.div
                animate={{ opacity: [0, 0.5, 0], x: [-5, -12] }}
                transition={{
                  duration: 0.3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.1,
                }}
                className="absolute top-1/2 mt-2 -left-1 w-3 h-0.5 bg-primary/30 rounded-full"
              />
              <motion.div
                animate={{ opacity: [0, 0.5, 0], x: [-5, -12] }}
                transition={{
                  duration: 0.3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.2,
                }}
                className="absolute top-1/2 -mt-2 -left-1 w-3 h-0.5 bg-primary/30 rounded-full"
              />
            </>
          )}

          {mood === "excited" && (
            <>
              <motion.div
                animate={{ scale: [0, 1, 0], y: [-5, -12] }}
                transition={{
                  duration: 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0,
                }}
                className="absolute top-0 left-4 text-emerald-400 text-xs"
              >
                ✦
              </motion.div>
              <motion.div
                animate={{ scale: [0, 1, 0], y: [-5, -12] }}
                transition={{
                  duration: 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.15,
                }}
                className="absolute top-0 right-8 text-pink-400 text-xs"
              >
                ✦
              </motion.div>
              <motion.div
                animate={{ scale: [0, 1, 0], y: [-5, -12] }}
                transition={{
                  duration: 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.3,
                }}
                className="absolute top-2 left-12 text-teal-300 text-xs"
              >
                ✦
              </motion.div>
            </>
          )}

          {mood === "happy" && (
            <>
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: 2 }}
                className="absolute -top-2 left-6 text-pink-300 text-xs"
              >
                ♥
              </motion.div>
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: 2, delay: 0.2 }}
                className="absolute -top-1 right-10 text-pink-300 text-xs"
              >
                ♥
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
