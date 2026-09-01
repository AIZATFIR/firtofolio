import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

/**
 * ContainerScroll Component
 * Adapted for Superr Style Reference:
 * Starts with a gentle 3D paper tilt perspective and settles cleanly into a full-width presentation.
 */
export const ContainerScroll = ({ titleComponent, children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.85, 0.95] : [1.02, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 0.5], [16, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

  return (
    <div
      className="flex items-center justify-center relative p-2 md:p-8"
      ref={containerRef}
    >
      <div
        className="w-full relative"
        style={{
          perspective: '1000px',
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-left mb-6"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({ rotate, scale, children }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          'rgba(0, 0, 0, 0.06) 0px 2px 20px 0px, rgba(0, 0, 0, 0.25) 0px 1px 2px 0px',
      }}
      className="max-w-5xl mx-auto w-full border-[1.5px] border-[var(--color-charcoal)] p-2 md:p-4 bg-[var(--color-cream-paper)] rounded-[20px]"
    >
      <div className="h-full w-full overflow-hidden rounded-[14px] bg-[var(--color-dew-drop)] border border-[var(--color-border)]">
        {children}
      </div>
    </motion.div>
  );
};
