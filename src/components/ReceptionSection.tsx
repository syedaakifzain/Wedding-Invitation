import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { weddingConfig } from "@/config/wedding";
import ParticleCanvas from "./ParticleCanvas";

export default function ReceptionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { reception } = weddingConfig;

  return (
    <section
      ref={ref}
      className="snap-section flex flex-col items-center justify-center px-6 py-12"
      style={{
        background: "linear-gradient(180deg, hsl(340,50%,12%) 0%, hsl(340,45%,16%) 40%, hsl(350,40%,18%) 100%)",
      }}
    >
      <ParticleCanvas type="confetti" count={20} />
      <ParticleCanvas type="sparkle" count={25} />

      {/* Chandelier effect at top */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <div
          className="w-40 h-40 md:w-60 md:h-60"
          style={{
            background: "radial-gradient(ellipse at top, hsla(43,72%,55%,0.2) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Title */}
      <motion.div
        className="text-center mb-8 z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.div className="font-script text-5xl md:text-7xl mb-2 text-gold-shimmer">
          {reception.title}
        </motion.div>
        <motion.p
          className="font-body text-lg md:text-xl italic"
          style={{ color: "hsl(35,40%,80%)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {reception.subtitle}
        </motion.p>
      </motion.div>

      {/* Ornamental divider */}
      <motion.div
        className="h-px w-0 mb-8 z-10"
        style={{ background: "linear-gradient(90deg, transparent, hsl(43,72%,55%), transparent)" }}
        animate={isInView ? { width: 120 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      />

      {/* Detail cards */}
      <div className="flex flex-col gap-5 w-full max-w-sm z-10">
        {[
          { icon: "📅", label: "Date", value: reception.date },
          { icon: "🕖", label: "Time", value: reception.time },
          { icon: "🏛️", label: "Venue", value: reception.venue, sub: reception.address },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            className="rounded-xl p-6 text-center"
            style={{
              background: "hsla(0,0%,100%,0.06)",
              backdropFilter: "blur(15px)",
              border: "1px solid hsla(43,72%,55%,0.2)",
              boxShadow: "0 10px 40px hsla(0,0%,0%,0.3)",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 + i * 0.2, duration: 0.7 }}
          >
            <div
              className="font-display text-xs tracking-[0.3em] uppercase mb-2"
              style={{ color: "hsl(43,72%,55%)" }}
            >
              {item.icon} {item.label}
            </div>
            <div className="font-display text-lg font-semibold" style={{ color: "hsl(35,40%,90%)" }}>
              {item.value}
            </div>
            {item.sub && (
              <div className="font-body text-sm mt-1" style={{ color: "hsla(35,30%,75%,0.8)" }}>
                {item.sub}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Awaiting message */}
      <motion.div
        className="mt-10 text-center z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.3, duration: 1 }}
      >
        <motion.p
          className="font-script text-2xl md:text-4xl text-gold-shimmer"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {reception.message}
        </motion.p>
      </motion.div>

      {/* Thank you note */}
      <motion.div
        className="mt-8 z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.6 }}
      >
        <div className="font-script text-lg" style={{ color: "hsl(35,40%,70%)" }}>
          With love,
        </div>
        <div className="font-script text-2xl mt-1" style={{ color: "hsl(43,72%,55%)" }}>
          {weddingConfig.groom} & {weddingConfig.bride}
        </div>
      </motion.div>

      {/* Bottom ornament */}
      <motion.div
        className="absolute bottom-6 left-0 right-0 text-center z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.4 } : {}}
        transition={{ delay: 1.8 }}
      >
        <span className="font-script text-sm tracking-widest" style={{ color: "hsl(43,72%,55%)" }}>
          ❦
        </span>
      </motion.div>
    </section>
  );
}
