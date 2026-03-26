'use client';
import { motion } from 'framer-motion';

export default function Newpage() {
  return (
    <main>
      <h1>Welcome to the Homepage</h1>
      <p>This is your Next.js home page.</p>
      <div className='flex flex-col gap-10 overflow-x-hidden'>
        <motion.section
          className='grid grid-cols-3 p-10 gap-10'
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.3 },
            },
          }}
          initial='hidden'
          animate='show'
        >
          <motion.div
            className='bg-slate-800 aspect-square rounded-lg justify-center items-center flex gap-10'
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
              },
            }}
          ></motion.div>
          <motion.div
            className='bg-slate-800 aspect-square rounded-lg justify-center items-center flex gap-10'
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
              },
            }}
          ></motion.div>
          <motion.div
            className='bg-slate-800 aspect-square rounded-lg justify-center items-center flex gap-10'
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
              },
            }}
          ></motion.div>
          <motion.div
            className='bg-slate-800 aspect-square rounded-lg justify-center items-center flex gap-10'
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
              },
            }}
          ></motion.div>
          <motion.div
            className='bg-slate-800 aspect-square rounded-lg justify-center items-center flex gap-10'
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
              },
            }}
          ></motion.div>
          <motion.div
            className='bg-slate-800 aspect-square rounded-lg justify-center items-center flex gap-10'
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
              },
            }}
          ></motion.div>
        </motion.section>
      </div>
    </main>
  );
}
