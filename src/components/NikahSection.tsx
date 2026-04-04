import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { weddingConfig } from "@/config/wedding";
import ParticleCanvas from "./ParticleCanvas";

export default function NikahSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { nikah } = weddingConfig;

  return (
    <section
      ref={ref}
      className="snap-section flex flex-col items-center justify-center px-6 py-12"
      style={{
        background: "linear-gradient(180deg, hsl(220,50%,12%) 0%, hsl(180,40%,15%) 50%, hsl(220,45%,18%) 100%)",
      }}
    >
      <ParticleCanvas type="stars" count={40} />

      {/* Crescent moon */}
      <motion.div
        className="absolute top-12 right-12 md:top-16 md:right-24"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.3, type: "spring" }}
      >
        <div
          className="text-5xl md:text-7xl"
          style={{
            filter: "drop-shadow(0 0 20px hsla(50,60%,85%,0.6))",
          }}
        >
          🌙
        </div>
      </motion.div>

      {/* Geometric pattern border (top) */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-3"
        style={{
          background:
            "repeating-linear-gradient(90deg, hsl(43,72%,55%) 0px, transparent 2px, transparent 18px, hsl(43,72%,55%) 20px)",
          opacity: 0.4,
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
          className="font-script text-5xl md:text-7xl mb-2 text-gold-shimmer"
        >
          {nikah.title}
        </motion.div>
        <motion.p
          className="font-body text-lg md:text-xl italic"
          style={{ color: "hsl(50,60%,85%)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {nikah.subtitle}
        </motion.p>
      </motion.div>

      {/* Dua / Quran verse */}
      <motion.div
        className="glass-card-dark rounded-xl p-6 md:p-8 max-w-md text-center mb-8 z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <p
          className="text-2xl md:text-3xl mb-3 leading-relaxed"
          style={{ color: "hsl(43,80%,70%)", fontFamily: "serif" }}
          dir="rtl"
        >
          {nikah.dua}
        </p>
        <p className="font-body text-sm md:text-base italic" style={{ color: "hsla(50,30%,80%,0.8)" }}>
          {nikah.duaTranslation}
        </p>
      </motion.div>

      {/* Details grid */}
      <div className="grid grid-cols-1 gap-4 w-full max-w-sm z-10">
        {[
          { icon: "📅", label: "Date", value: nikah.date },
          { icon: "🕌", label: "Time", value: nikah.time },
          { icon: "📍", label: "Venue", value: nikah.venue, sub: nikah.address },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            className="glass-card-dark rounded-xl p-5 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 + i * 0.15, duration: 0.6 }}
          >
            <div
              className="font-display text-xs tracking-[0.3em] uppercase mb-2"
              style={{ color: "hsl(43,72%,55%)" }}
            >
              {item.icon} {item.label}
            </div>
            <div className="font-display text-lg font-semibold" style={{ color: "hsl(50,60%,90%)" }}>
              {item.value}
            </div>
            {item.sub && (
              <div className="font-body text-sm mt-1" style={{ color: "hsla(50,30%,80%,0.7)" }}>
                {item.sub}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Initials */}
      <motion.div
        className="mt-8 z-10 w-16 h-16 rounded-full flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, hsla(43,72%,55%,0.2), hsla(43,72%,55%,0.05))",
          border: "1px solid hsla(43,72%,55%,0.3)",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.2, type: "spring" }}
      >
        <span className="font-script text-xl" style={{ color: "hsl(43,72%,55%)" }}>
          {weddingConfig.coupleShort}
        </span>
      </motion.div>

      {/* Geometric pattern border (bottom) */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-3"
        style={{
          background:
            "repeating-linear-gradient(90deg, hsl(43,72%,55%) 0px, transparent 2px, transparent 18px, hsl(43,72%,55%) 20px)",
          opacity: 0.4,
        }}
      />
    </section>
  );
}
