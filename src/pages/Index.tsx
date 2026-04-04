import { useState, useEffect, useRef, useCallback } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import EnvelopeSection from "@/components/EnvelopeSection";
import HaldiSection from "@/components/HaldiSection";
import NikahSection from "@/components/NikahSection";
import ReceptionSection from "@/components/ReceptionSection";
import ScrollIndicator from "@/components/ScrollIndicator";

const SECTION_COUNT = 4;

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleEnvelopeComplete = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const sectionHeight = container.clientHeight;
    container.scrollTo({ top: sectionHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const sectionHeight = container.clientHeight;
      const index = Math.round(container.scrollTop / sectionHeight);
      setActiveSection(index);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <LoadingScreen isVisible={isLoading} />
      <ScrollIndicator sectionCount={SECTION_COUNT} activeIndex={activeSection} />

      <div ref={containerRef} className="snap-container">
        <EnvelopeSection onComplete={handleEnvelopeComplete} />
        <HaldiSection />
        <NikahSection />
        <ReceptionSection />
      </div>
    </>
  );
};

export default Index;
