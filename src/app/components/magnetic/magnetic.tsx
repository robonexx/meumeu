import React, { useState, useRef, ReactNode, MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface MagneticProps {
  children: ReactNode;
}

const Magnetic: React.FC<MagneticProps> = ({ children }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement | null>(null);

  const mouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const cRef = ref.current;
    const { clientX, clientY } = e;
    const rect = cRef.getBoundingClientRect();
    const x = clientX - (rect.left + rect.width / 2);
    const y = clientY - (rect.top + rect.height / 2);
    setMousePos({ x, y });
  };

  const mouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const { x, y } = mousePos;

  return (
    <motion.div
      ref={ref}
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
