'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import gsap from 'gsap';
import PoemModal from '../PoemModal';
import styles from './CelestialPoemExperience.module.scss';

export interface Poem {
  id: string;
  title?: string;
  content: string;
  date: string;
}

type CelestialPoemExperienceProps = {
  category: 'moon' | 'sun';
  author: string;
  canEdit: boolean;
  introLabel: string;
  emptyTitle: string;
  emptyText: string;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalizePoems(data: Poem[]) {
  if (!data.length) return [];
  const sorted = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const [latest, ...rest] = sorted;
  return [latest, ...shuffle(rest)];
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

function AnimatedPoemText({ text, activeKey }: { text: string; activeKey: string }) {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const chars = useMemo(() => Array.from(text), [text]);

  useEffect(() => {
    const root = textRef.current;
    if (!root) return;
    const letters = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-char="true"]'));
    if (!letters.length) return;

    gsap.set(letters, {
      opacity: 0,
      x: () => gsap.utils.random(-420, 420),
      y: () => gsap.utils.random(-240, 240),
      z: () => gsap.utils.random(-180, -60),
      rotate: () => gsap.utils.random(-50, 50),
      scale: () => gsap.utils.random(0.66, 1.4),
      filter: 'blur(14px)',
    });

    const tween = gsap.to(letters, {
      opacity: 1,
      x: 0,
      y: 0,
      z: 0,
      rotate: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1.35,
      ease: 'power3.out',
      stagger: {
        each: 0.006,
        from: 'random',
      },
    });

    return () => {
      tween.kill();
    };
  }, [activeKey]);

  return (
    <p ref={textRef} className={styles.poemText} aria-label={text}>
      {chars.map((char, index) => {
        if (char === '\n') return <br key={`${activeKey}-br-${index}`} />;
        if (char === ' ') return <span key={`${activeKey}-sp-${index}`} className={styles.space} aria-hidden='true' />;
        return (
          <span key={`${activeKey}-${index}`} className={styles.char} data-char='true' aria-hidden='true'>
            {char}
          </span>
        );
      })}
    </p>
  );
}

export default function CelestialPoemExperience({
  category,
  author,
  canEdit,
  introLabel,
  emptyTitle,
  emptyText,
}: CelestialPoemExperienceProps) {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [open, setOpen] = useState(false);
  const [editPoem, setEditPoem] = useState<Poem | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const refetchPoems = async () => {
    try {
      const res = await fetch(`/api/posts?category=${category}`, { cache: 'no-store' });

      if (!res.ok) {
        const message = await res.text();
        console.error(`[poems] Could not fetch ${category} poems`, res.status, message.slice(0, 160));
        setPoems([]);
        return;
      }

      const data: Poem[] = await res.json();
      setPoems(normalizePoems(Array.isArray(data) ? data : []));
      setActiveIdx(0);
    } catch (error) {
      console.error(`[poems] Fetch failed for ${category}`, error);
      setPoems([]);
    }
  };

  useEffect(() => {
    refetchPoems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / el.clientWidth);
      setActiveIdx(Math.min(Math.max(idx, 0), Math.max(poems.length - 1, 0)));
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [poems.length]);

  const scrollToIndex = (idx: number) => {
    const el = containerRef.current;
    if (!el || !poems.length) return;
    const nextIndex = (idx + poems.length) % poems.length;
    el.scrollTo({ left: nextIndex * el.clientWidth, behavior: 'smooth' });
    setActiveIdx(nextIndex);
  };

  const handleAdd = async (title: string, content: string) => {
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, category, author }),
    });
    setOpen(false);
    refetchPoems();
  };

  const handleUpdate = async (id: string, title: string, content: string) => {
    await fetch('/api/posts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title, content }),
    });
    setEditPoem(null);
    refetchPoems();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this poem?')) return;
    await fetch('/api/posts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    refetchPoems();
  };

  return (
    <main className={styles.stage}>
      <div className={styles.videoBg} aria-hidden='true'>
        <video autoPlay muted loop playsInline>
          <source src='/sky.webm' type='video/webm' />
        </video>
      </div>
      <div className={styles.aurora} aria-hidden='true' />
      <div className={styles.orbit} aria-hidden='true'>
        <span className={styles.sun} />
        <span className={styles.moon} />
      </div>

      {canEdit && (
        <button onClick={() => setOpen(true)} className={styles.addButton} title='Add new poem' aria-label='Add new poem'>
          <Plus size={24} />
        </button>
      )}

      <section className={styles.hero}>
        <div className={styles.kicker}>{introLabel}</div>

        {poems.length ? (
          <div ref={containerRef} className={styles.slider}>
            {poems.map((poem, idx) => (
              <article key={poem.id || idx} className={styles.slide}>
                <AnimatePresence mode='wait'>
                  {idx === activeIdx && (
                    <motion.div
                      key={poem.id}
                      className={styles.card}
                      initial={{ opacity: 0, rotateY: -18, scale: 0.94, filter: 'blur(16px)' }}
                      animate={{ opacity: 1, rotateY: 0, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, rotateY: 18, scale: 0.96, filter: 'blur(18px)' }}
                      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <AnimatedPoemText text={poem.content} activeKey={poem.id || String(idx)} />

                      {canEdit && (
                        <div className={styles.adminActions}>
                          <button className={styles.ghostButton} onClick={() => setEditPoem(poem)}>Edit</button>
                          <button className={styles.dangerButton} onClick={() => handleDelete(poem.id)}>Delete</button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <h1>{emptyTitle}</h1>
            <p>{emptyText}</p>
          </div>
        )}

        {poems.length > 1 && (
          <div className={styles.controls}>
            <button className={styles.navButton} onClick={() => scrollToIndex(activeIdx - 1)} aria-label='Previous poem'>
              <ChevronLeft size={22} />
            </button>
            <div className={styles.dots}>
              {poems.map((poem, idx) => (
                <button
                  key={poem.id || idx}
                  className={`${styles.dot} ${idx === activeIdx ? styles.dotActive : ''}`}
                  onClick={() => scrollToIndex(idx)}
                  aria-label={`Go to poem ${idx + 1}`}
                />
              ))}
            </div>
            <button className={styles.navButton} onClick={() => scrollToIndex(activeIdx + 1)} aria-label='Next poem'>
              <ChevronRight size={22} />
            </button>
          </div>
        )}
      </section>

      {canEdit && (
        <>
          <PoemModal open={open} onClose={() => setOpen(false)} onSubmit={handleAdd} />
          <PoemModal
            open={!!editPoem}
            onClose={() => setEditPoem(null)}
            onSubmit={(title, content) => {
              if (editPoem) handleUpdate(editPoem.id, title, content);
            }}
            initialTitle={editPoem?.title}
            initialContent={editPoem?.content}
          />
        </>
      )}
    </main>
  );
}
