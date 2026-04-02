import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";

interface CongratulationsEffectProps {
  show: boolean;
  onComplete: () => void;
}

export function CongratulationsEffect({
  show,
  onComplete,
}: CongratulationsEffectProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onComplete, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  const sparkles = Array.from({ length: 20 });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
        >
          {/* Background sparkles */}
          {sparkles.map((_, index) => {
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const endX = startX + (Math.random() - 0.5) * 30;
            const endY = startY + (Math.random() - 0.5) * 30;
            const delay = Math.random() * 0.5;

            return (
              <motion.div
                key={index}
                initial={{
                  x: `${startX}vw`,
                  y: `${startY}vh`,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  x: `${endX}vw`,
                  y: `${endY}vh`,
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.5, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  delay,
                  ease: "easeOut",
                }}
                className="absolute text-3xl"
              >
                ✨
              </motion.div>
            );
          })}

          {/* Main congratulations text */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{
              scale: [0, 1.3, 1],
              rotate: [0, 10, -10, 0],
              opacity: 1,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="relative"
          >
            <motion.div
              animate={{
                textShadow: [
                  "0 0 20px rgba(255, 215, 0, 0.8)",
                  "0 0 40px rgba(255, 215, 0, 1)",
                  "0 0 20px rgba(255, 215, 0, 0.8)",
                ],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-7xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent"
            >
              おめでとう！
            </motion.div>

            {/* Surrounding sparkles */}
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const radius = 120;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={i}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1.5, 1],
                    x: [0, x, x],
                    y: [0, y, y],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + i * 0.05,
                    ease: "easeOut",
                  }}
                  className="absolute text-4xl"
                  style={{ left: "50%", top: "50%" }}
                >
                  ⭐
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
