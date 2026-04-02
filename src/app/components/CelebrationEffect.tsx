import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface CelebrationEffectProps {
  show: boolean;
  onComplete: () => void;
}

export function CelebrationEffect({ show, onComplete }: CelebrationEffectProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onComplete, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  const items = Array.from({ length: 30 });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-50"
        >
          {items.map((_, index) => {
            const emoji = ["⭐", "✨", "🌈", "💖", "💫", "🎉"][index % 6];
            const startX = Math.random() * 100;
            const endX = startX + (Math.random() - 0.5) * 40;
            const rotation = Math.random() * 720 - 360;
            const delay = Math.random() * 0.5;

            return (
              <motion.div
                key={index}
                initial={{
                  x: `${startX}vw`,
                  y: "100vh",
                  opacity: 0,
                  scale: 0,
                  rotate: 0,
                }}
                animate={{
                  x: `${endX}vw`,
                  y: "-20vh",
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.5, 1.2, 0],
                  rotate: rotation,
                }}
                transition={{
                  duration: 2.5,
                  delay,
                  ease: "easeOut",
                }}
                className="absolute text-4xl"
              >
                {emoji}
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
