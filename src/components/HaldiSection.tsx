import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { weddingConfig } from "@/config/wedding";
import ParticleCanvas from "./ParticleCanvas";

export default function HaldiSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { haldi } = weddingConfig;

  return (
    <section
      ref={ref}
      className="snap-section flex flex-col items-center justify-center px-6 py-12"
      style={{
        background: "linear-gradient(180deg, hsl(45,90%,85%) 0%, hsl(40,85%,80%) 40%, hsl(35,80%,78%) 100%)",
      }}
    >
      <ParticleCanvas type="marigold" count={25} />

      {/* Decorative marigold garland top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-6"
        style={{
          background: "repeating-linear-gradient(90deg, hsl(45,95%,55%) 0px, hsl(30,90%,55%) 20px, hsl(45,95%,55%) 40px)",
          opacity: 0.4,
          borderRadius: "0 0 50% 50%",
        }}
      />

      {/* Title */}
      <motion.div
        className="text-center mb-8 z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="font-script text-5xl md:text-7xl mb-2"
          style={{ color: "hsl(30,90%,35%)" }}
        >
          {haldi.title}
        </motion.div>
        <motion.p
          className="font-body text-lg md:text-xl italic"
          style={{ color: "hsl(30,60%,30%)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {haldi.subtitle}
        </motion.p>
      </motion.div>

      {/* Decorative divider */}
      <motion.div
        className="w-24 h-px mb-8 z-10"
        style={{ background: "linear-gradient(90deg, transparent, hsl(30,90%,40%), transparent)" }}
        initial={{ width: 0 }}
        animate={isInView ? { width: 96 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      />

      {/* Event details cards */}
      <div className="flex flex-col gap-5 w-full max-w-sm z-10">
        {/* Date card with 3D rotation */}
        <motion.div
          className="rounded-xl p-6 text-center"
          style={{
            background: "hsla(0,0%,100%,0.5)",
            backdropFilter: "blur(10px)",
            border: "1px solid hsla(45,95%,55%,0.4)",
            boxShadow: "0 10px 40px hsla(30,50%,30%,0.15)",
          }}
          initial={{ opacity: 0, rotateY: -30 }}
          animate={isInView ? { opacity: 1, rotateY: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="font-display text-sm tracking-[0.3em] uppercase mb-2" style={{ color: "hsl(30,70%,40%)" }}>
            📅 Date
          </div>
          <div className="font-display text-xl font-semibold" style={{ color: "hsl(30,80%,25%)" }}>
            {haldi.date}
          </div>
        </motion.div>

        {/* Time card */}
        <motion.div
          className="rounded-xl p-6 text-center"
          style={{
            background: "hsla(0,0%,100%,0.5)",
            backdropFilter: "blur(10px)",
            border: "1px solid hsla(45,95%,55%,0.4)",
            boxShadow: "0 10px 40px hsla(30,50%,30%,0.15)",
          }}
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="font-display text-sm tracking-[0.3em] uppercase mb-2" style={{ color: "hsl(30,70%,40%)" }}>
            🕐 Time
          </div>
          <div className="font-display text-xl font-semibold" style={{ color: "hsl(30,80%,25%)" }}>
            {haldi.time}
          </div>
        </motion.div>

        {/* Venue card */}
        <motion.div
          className="rounded-xl p-6 text-center"
          style={{
            background: "hsla(0,0%,100%,0.5)",
            backdropFilter: "blur(10px)",
            border: "1px solid hsla(45,95%,55%,0.4)",
            boxShadow: "0 10px 40px hsla(30,50%,30%,0.15)",
          }}
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="font-display text-sm tracking-[0.3em] uppercase mb-2" style={{ color: "hsl(30,70%,40%)" }}>
            📍 Venue
          </div>
          <div className="font-display text-xl font-semibold" style={{ color: "hsl(30,80%,25%)" }}>
            {haldi.venue}
          </div>
          <div className="font-body text-base mt-1" style={{ color: "hsl(30,40%,40%)" }}>
            {haldi.address}
          </div>
        </motion.div>
      </div>

      {/* Bottom floral decorative element */}
      <motion.div
        className="mt-8 font-script text-2xl z-10"
        style={{ color: "hsl(30,80%,40%)" }}
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.6, scale: 1 } : {}}
        transition={{ delay: 1.2, type: "spring" }}
      >
        ✿ ❀ ✿
      </motion.div>
    </section>
  );
}
