import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import ParticleCanvas from "./ParticleCanvas";

interface EnvelopeSectionProps {
  onComplete: () => void;
}

export default function EnvelopeSection({ onComplete }: EnvelopeSectionProps) {
  const [stage, setStage] = useState<"closed" | "opening" | "card" | "revealed">("closed");

  const handleOpen = () => {
    if (stage !== "closed") return;
    setStage("opening");
    setTimeout(() => setStage("card"), 800);
    setTimeout(() => setStage("revealed"), 2200);
    setTimeout(() => onComplete(), 4500);
  };

  return (
    <section
      className="snap-section flex items-center justify-center"
      style={{
        background: "linear-gradient(180deg, hsl(40,33%,96%) 0%, hsl(35,40%,90%) 50%, hsl(40,33%,94%) 100%)",
      }}
    >
      <ParticleCanvas type="petals" count={20} />
      <ParticleCanvas type="sparkle" count={15} />

      <div
        className="relative cursor-pointer select-none"
        style={{ perspective: "1200px" }}
        onClick={handleOpen}
      >
        {/* Envelope body */}
        <motion.div
          className="relative w-72 h-48 md:w-96 md:h-64 rounded-lg"
          style={{
            background: "linear-gradient(145deg, hsl(35,40%,92%), hsl(40,33%,88%))",
            boxShadow: "0 20px 60px hsla(30,20%,30%,0.25), inset 0 1px 0 hsla(43,72%,75%,0.5)",
            border: "2px solid hsla(43,72%,55%,0.5)",
          }}
          animate={
            stage === "closed"
              ? { y: [0, -8, 0] }
              : {}
          }
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Gold border details */}
          <div
            className="absolute inset-2 rounded border"
            style={{ borderColor: "hsla(43,72%,55%,0.3)" }}
          />

          {/* Center seal */}
          <AnimatePresence>
            {stage === "closed" && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                exit={{ opacity: 0 }}
              >
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, hsl(43,60%,40%), hsl(43,72%,55%), hsl(43,80%,70%))",
                    boxShadow: "0 4px 15px hsla(43,72%,55%,0.4)",
                  }}
                >
                  <span className="font-script text-xl md:text-2xl text-white">{weddingConfig.coupleShort}</span>
                </div>
                <motion.p
                  className="absolute -bottom-10 font-body text-sm tracking-[0.3em] uppercase"
                  style={{ color: "hsl(43,60%,40%)" }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Tap to Open
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Envelope flap (3D) */}
          <motion.div
            className="absolute -top-px left-0 right-0 origin-top"
            style={{
              height: "50%",
              transformStyle: "preserve-3d",
            }}
            animate={
              stage === "closed"
                ? { rotateX: 0 }
                : { rotateX: -180 }
            }
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div
              className="absolute inset-0 rounded-t-lg"
              style={{
                background: "linear-gradient(180deg, hsl(35,40%,90%), hsl(40,33%,86%))",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                border: "2px solid hsla(43,72%,55%,0.4)",
                backfaceVisibility: "hidden",
              }}
            />
            <div
              className="absolute inset-0 rounded-t-lg"
              style={{
                background: "linear-gradient(180deg, hsl(40,33%,94%), hsl(35,40%,92%))",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                transform: "rotateX(180deg)",
                backfaceVisibility: "hidden",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Invitation Card sliding out */}
        <AnimatePresence>
          {(stage === "card" || stage === "revealed") && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -180, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                className="w-72 h-80 md:w-96 md:h-[420px] rounded-xl flex flex-col items-center justify-center p-6 md:p-10 text-center"
                style={{
                  background: "linear-gradient(145deg, hsl(40,33%,98%), hsl(35,40%,94%))",
                  boxShadow: "0 25px 80px hsla(30,20%,20%,0.3)",
                  border: "2px solid hsla(43,72%,55%,0.4)",
                }}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Ornamental top */}
                <motion.div
                  className="font-script text-base md:text-lg mb-2"
                  style={{ color: "hsl(43,60%,40%)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  Together with their families
                </motion.div>

                {/* Ornamental divider */}
                <motion.div
                  className="h-px w-0 my-3"
                  style={{ background: "linear-gradient(90deg, transparent, hsl(43,72%,55%), transparent)" }}
                  animate={{ width: "70%" }}
                  transition={{ duration: 0.8, delay: 1 }}
                />

                {/* Groom name */}
                <motion.h1
                  className="font-script text-3xl md:text-5xl leading-tight"
                  style={{ color: "hsl(43,60%,35%)" }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  {weddingConfig.groom}
                </motion.h1>

                {/* & symbol */}
                <motion.span
                  className="font-script text-2xl md:text-4xl my-1"
                  style={{ color: "hsl(350,40%,70%)" }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, type: "spring" }}
                >
                  &
                </motion.span>

                {/* Bride name */}
                <motion.h1
                  className="font-script text-3xl md:text-5xl leading-tight"
                  style={{ color: "hsl(43,60%,35%)" }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7, duration: 0.8 }}
                >
                  {weddingConfig.bride}
                </motion.h1>

                {/* Bottom ornament */}
                <motion.div
                  className="h-px w-0 my-3"
                  style={{ background: "linear-gradient(90deg, transparent, hsl(43,72%,55%), transparent)" }}
                  animate={{ width: "70%" }}
                  transition={{ duration: 0.8, delay: 2 }}
                />

                <motion.p
                  className="font-body text-sm md:text-base tracking-[0.25em] uppercase mt-2"
                  style={{ color: "hsl(30,8%,45%)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                >
                  Request the honour of your presence
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
