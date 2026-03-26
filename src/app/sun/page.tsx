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
  const [open, setOpen] = useState(false);
  const [editPoem, setEditPoem] = useState<Poem | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isErika, setIsErika] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsErika(
        localStorage.getItem('user') === process.env.NEXT_PUBLIC_ERIKA_USER
      );
    }
  }, []);

  useEffect(() => {
    const fetchPoems = async () => {
      const res = await fetch('/api/posts?category=sun');
      const data: Poem[] = await res.json();

      if (data.length) {
        const sorted = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        const [latest, ...rest] = sorted;
        const shuffled = shuffle(rest);
        setPoems([latest, ...shuffled]);
      }
    };
    fetchPoems();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const { scrollLeft, clientWidth } = container;
      const idx = Math.round(scrollLeft / clientWidth);
      setActiveIdx(idx);
    };

    const el = containerRef.current;
    if (el) el.addEventListener('scroll', onScroll);
    return () => el?.removeEventListener('scroll', onScroll);
  }, []);

  const refetchPoems = async () => {
    const res = await fetch('/api/posts?category=sun');
    const data: Poem[] = await res.json();
    if (data.length) {
      const sorted = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      const [latest, ...rest] = sorted;
      const shuffled = shuffle(rest);
      setPoems([latest, ...shuffled]);
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

  const activePoem = poems[activeIdx];
  const typewriterText = useTypewriter(activePoem?.content || '', true, 32);

  return (
    <main className='min-h-screen'>
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
        className='flex overflow-x-auto snap-x snap-mandatory w-screen h-screen scrollbar-hidden'
        style={{ scrollBehavior: 'smooth' }}
      >
        {poems.map((p, idx) => (
          <div
            key={p.id || idx}
            className='snap-start max-w-full w-screen h-screen overflow-y-auto px-4 py-20 flex-shrink-0 scrollbar-hidden'
          >
            <div className='max-w-2xl sm:max-w-sm text-center mx-auto'>
              {/* {p.title && (
                <h2 className='font-semibold text-3xl mb-6 text-gray-200'>
                  {p.title}
                </h2>
              )} */}
              <p className='md:text-xl text-lg text-gray-300 leading-relaxed whitespace-pre-line mb-6 mx-auto'>
                {idx === activeIdx ? typewriterText : p.content}
              </p>
              <small className='text-gray-600 block mb-6'>
                {new Date(p.date).toLocaleString()}
              </small>
              {isErika && (
                <div className='flex justify-center gap-4'>
                  <button
                    className='text-blue-600 underline text-lg'
                    onClick={() => setEditPoem(p)}
                  >
                    Edit
                  </button>
                  <button
                    className='text-red-600 underline text-lg'
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {isErika && (
        <>
          <PoemModal
            open={open}
            onClose={() => setOpen(false)}
            onSubmit={handleAdd}
          />
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
