import { motion } from "framer-motion";

interface ScrollIndicatorProps {
  sectionCount: number;
  activeIndex: number;
}

export default function ScrollIndicator({ sectionCount, activeIndex }: ScrollIndicatorProps) {
  return (
    <motion.div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3 }}
    >
      {Array.from({ length: sectionCount }).map((_, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor:
              i === activeIndex
                ? "hsl(43,72%,55%)"
                : "hsla(43,72%,55%,0.3)",
            boxShadow:
              i === activeIndex ? "0 0 8px hsla(43,72%,55%,0.6)" : "none",
          }}
          animate={{ scale: i === activeIndex ? 1.3 : 1 }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </motion.div>
  );
}
