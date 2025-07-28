'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import PoemModal from '../components/PoemModal';

interface Poem {
  id: string;
  title?: string;
  content: string;
  date: string;
}

function useTypewriter(text: string, active: boolean, speed = 32) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    if (!active) return setDisplayed('');
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, active, speed]);
  return displayed;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SunPage() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [order, setOrder] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const [editPoem, setEditPoem] = useState<Poem | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isErika, setIsErika] = useState(false);

  useEffect(() => {
    // Check user
    if (typeof window !== 'undefined') {
      setIsErika(
        localStorage.getItem('user') === process.env.NEXT_PUBLIC_ERIKA_USER
      );
    }
  }, []);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/posts?category=sun');
      const data: Poem[] = await res.json();
      setPoems(data);
      if (data.length) {
        const arr: number[] = data.map((_, i) => i);
        if (arr.length > 1) {
          setOrder([0, ...shuffle(arr.slice(1))]);
        } else {
          setOrder(arr);
        }
      }
    })();
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onScroll() {
      const container = containerRef.current;
      if (!container) return;
      const { scrollTop, clientHeight } = container;
      const idx = Math.round(scrollTop / clientHeight);
      setActiveIdx(idx);
    }
    const el = containerRef.current;
    if (el) el.addEventListener('scroll', onScroll);
    return () => {
      if (el) el.removeEventListener('scroll', onScroll);
    };
  }, []);

  const refetchPoems = async () => {
    const res = await fetch('/api/posts?category=sun');
    const data: Poem[] = await res.json();
    setPoems(data);
    if (data.length) {
      const arr: number[] = data.map((_, i) => i);
      if (arr.length > 1) {
        setOrder([0, ...shuffle(arr.slice(1))]);
      } else {
        setOrder(arr);
      }
    }
  };

  const handleAdd = async (title: string, content: string) => {
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        category: 'sun',
        author: 'Erika',
      }),
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

  const activePoem = poems[order[activeIdx] ?? 0];
  const typewriterText = useTypewriter(activePoem?.content || '', true, 32);

  return (
    <main className='min-h-screen'>
      {/* Only Erika can add */}
      {isErika && (
        <button
          onClick={() => setOpen(true)}
          className='fixed bottom-4 right-4 p-4 bg-yellow-400 rounded-full shadow-lg hover:bg-yellow-500 transition z-50'
          title='Add new poem'
          aria-label='Add new poem'
        >
          <Plus size={24} />
        </button>
      )}

      <div
        ref={containerRef}
        className='w-screen h-screen overflow-y-scroll'
        style={{
          scrollSnapType: 'y mandatory',
          height: '100vh',
        }}
      >
        {order.map((poemIdx, idx) => {
          const p = poems[poemIdx];
          return (
            <section
              key={p?.id || idx}
              className='w-full h-screen flex flex-col justify-center items-center snap-start'
              style={{
                minHeight: '100vh',
                scrollSnapAlign: 'start',
                padding: '2rem',
              }}
            >
              {p?.title && (
                <h2 className='font-semibold text-3xl mb-6 text-gray-200 dark:text-gray-100'>
                  {p.title}
                </h2>
              )}
              <p
                className='md:text-2xl text-lg max-w-2xl text-gray-300 dark:text-gray-200 leading-relaxed whitespace-pre-linemb-2 md:mb-6'
                style={{ minHeight: '8rem' }}
              >
                {idx === activeIdx ? typewriterText : p?.content}
              </p>
              <small className='text-gray-500 dark:text-gray-400 block mb-8'>
                {p && new Date(p.date).toLocaleString()}
              </small>
              {/* Only Erika can edit/delete */}
              {isErika && (
                <div className='flex gap-3'>
                  <button
                    className='text-blue-500 underline text-lg'
                    onClick={() => setEditPoem(p)}
                  >
                    Edit
                  </button>
                  <button
                    className='text-red-500 underline text-lg'
                    onClick={() => p && handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Add Modal */}
      {isErika && (
        <PoemModal
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={handleAdd}
        />
      )}
      {/* Edit Modal */}
      {isErika && (
        <PoemModal
          open={!!editPoem}
          onClose={() => setEditPoem(null)}
          onSubmit={(title, content) => {
            if (editPoem) handleUpdate(editPoem.id, title, content);
          }}
          initialTitle={editPoem?.title}
          initialContent={editPoem?.content}
        />
      )}
    </main>
  );
}
