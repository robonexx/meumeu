'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef, useMemo } from 'react';
import styles from './style.module.scss'; // We’ll update this too

export default function ParagraphWord({ children }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 0.9', 'start 0.25'],
  });

  let globalWordIndex = 0;

  const countWords = (node) => {
    if (typeof node === 'string') {
      return (node.match(/\S+/g) || []).length;
    }
    if (React.isValidElement(node)) {
      return React.Children.toArray(node.props.children).reduce(
        (sum, child) => sum + countWords(child),
        0
      );
    }
    return 0;
  };

  const totalWords = useMemo(
    () =>
      React.Children.toArray(children).reduce(
        (sum, child) => sum + countWords(child),
        0
      ),
    [children]
  );

  const wrapWords = (node, inheritedIsSpecial = false) => {
    if (typeof node === 'string') {
      const tokens = node.split(/(\s+)/); // keep spaces intact

      return tokens.map((token, i) => {
        if (token.trim() === '') return token; // preserve exact spacing

        const start = globalWordIndex / totalWords;
        const end = start + 1 / totalWords;

        const word = (
          <Word
            key={token + globalWordIndex}
            progress={scrollYProgress}
            range={[start, end]}
            isSpecial={inheritedIsSpecial}
          >
            {token}
          </Word>
        );
        globalWordIndex++;
        return word;
      });
    }

    if (React.isValidElement(node)) {
      const isSpecial =
        node.props.className?.includes('special') ||
        node.props.className?.includes('highlight');

      return React.cloneElement(node, {
        ...node.props,
        children: React.Children.map(node.props.children, (child) =>
          wrapWords(child, isSpecial)
        ),
      });
    }

    return node;
  };

  return (
    <div ref={container} className={styles.paragraph}>
      {React.Children.map(children, wrapWords)}
    </div>
  );
}

const Word = ({ children, progress, range, isSpecial }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={isSpecial ? styles.specialWord : undefined}
    >
      {children}
    </motion.span>
  );
};
