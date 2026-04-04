import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/wedding";

interface LoadingScreenProps {
  isVisible: boolean;
}

export default function LoadingScreen({ isVisible }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, hsl(40,33%,96%), hsl(35,40%,88%))" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Ambient glow */}
          <motion.div
            className="absolute w-64 h-64 rounded-full"
            style={{
              background: "radial-gradient(circle, hsla(43,72%,55%,0.3) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="text-center">
            {/* Monogram */}
            <motion.div
              className="font-script text-6xl md:text-7xl text-gold-shimmer mb-4"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {weddingConfig.coupleShort}
            </motion.div>

            {/* Ornamental line */}
            <motion.div
              className="mx-auto h-px w-0"
              style={{ background: "linear-gradient(90deg, transparent, hsl(43,72%,55%), transparent)" }}
              animate={{ width: 120 }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            {/* Loading dots */}
            <motion.div className="flex gap-2 justify-center mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "hsl(43,72%,55%)" }}
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
