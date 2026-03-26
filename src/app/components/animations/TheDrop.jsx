'use client';
import React, { useState, useEffect } from 'react';
import styles from './TheDrop.module.scss';
import { motion, AnimatePresence } from 'framer-motion';

const TheDrop = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 3400);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles['logo-drop']}
          initial={{ opacity: 1 }}
          animate={{
            opacity: [, 1, 1, 0],
            scale: [1, 1, 1, 1],
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 2,
            delay: 0,
            ease: 'easeInOut',
          }}
        >
          <motion.svg
            /* className={styles['svg-desktop']} */
            width='53'
            height='51'
            viewBox='0 0 52 51'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: [0, 1], y: 0, scale: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 40,
              bounce: 0.3,
              duration: 0.5,
              delay: 0,
            }}
          >
            <motion.path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M0 25.5011C0 21.913 0.648359 18.5813 1.94508 15.5058C3.2418 12.3875 5.04047 9.67507 7.3411 7.36843C9.64173 5.06179 12.3816 3.26774 15.5606 1.98627C18.7815 0.662089 22.3162 0 26.1645 0C29.971 0 33.4846 0.662089 36.7056 1.98627C39.9264 3.26774 42.6871 5.06179 44.9878 7.36843C47.3302 9.67507 49.1499 12.3875 50.4465 15.5058C51.7433 18.5813 52.3916 21.913 52.3916 25.5011C52.3916 29.0893 51.7433 32.4425 50.4465 35.5606C49.1499 38.6363 47.3302 41.3273 44.9878 43.6339C42.6871 45.9406 39.9264 47.756 36.7056 49.0801C33.4846 50.3616 29.971 51.0024 26.1645 51.0024C22.3162 51.0024 18.7815 50.3616 15.5606 49.0801C12.3816 47.756 9.64173 45.9406 7.3411 43.6339C5.04047 41.3273 3.2418 38.6363 1.94508 35.5606C0.648359 32.4425 0 29.0893 0 25.5011Z'
              fill='url(#paint0_linear_437_10)'
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ease: 'easeInOut',
                type: 'spring',
                damping: 14,
                stiffness: 50,
                restDelta: 0.002,
                bounce: 0.15,
                duration: 0.6,
                delay: 0,
              }}
            />
            <motion.path
              d='M27.7577 14.841C27.2198 14.174 26.7076 13.5603 26.2465 13C25.7855 13.587 25.2732 14.2006 24.7353 14.841C21.4824 18.7364 17 24.1526 17 28.3682C17 31.0363 18.0245 33.4376 19.715 35.1718C21.3799 36.9061 23.6852 38 26.2465 38C28.8079 38 31.1131 36.9328 32.778 35.1718C34.4429 33.4376 35.493 31.0096 35.493 28.3682C35.493 24.1526 31.0107 18.7631 27.7577 14.841Z'
              fill='#e9ebeb'
              initial={{ y: -100, opacity: 0, height: 51 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                ease: 'easeInOut',
                type: 'spring',
                damping: 10,
                stiffness: 35,
                restDelta: 0.005,
                duration: 1,
                delay: 0.2,
              }}
            />
            <defs>
              <linearGradient
                id='paint0_linear_437_10'
                x1='0.339844'
                y1='24.5011'
                x2='51.743'
                y2='24.5011'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#d884f1' />
                <stop offset='1' stopColor='#af4cf2' />
              </linearGradient>
            </defs>
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TheDrop;
