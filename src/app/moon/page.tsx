'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import PoemModal from '../components/PoemModal';

interface Poem {
  id: string;
  title?: string;
  content: string;
  date: string;
}

export default function MoonPage() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [open, setOpen] = useState(false);
  const [editPoem, setEditPoem] = useState<Poem | null>(null);

  useEffect(() => {
    fetchPoems();
  }, []);

  const fetchPoems = async () => {
    const res = await fetch('/api/posts?category=moon');
    const data = await res.json();
    setPoems(data);
  };

  const handleAdd = async (title: string, content: string) => {
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        category: 'moon',
        author: 'Rob',
      }),
    });
    setOpen(false);
    fetchPoems();
  };

  const handleUpdate = async (id: string, title: string, content: string) => {
    await fetch('/api/posts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title, content }),
    });
    setEditPoem(null);
    fetchPoems();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this poem?')) return;
    await fetch('/api/posts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchPoems();
  };

  return (
    <main className='min-h-screen p-8 bg-gray-50 dark:bg-gray-900'>
      <h1 className='text-3xl text-center font-bold mb-6 text-gray-800 dark:text-gray-100'>
        Till min måne min meu meu
      </h1>
      <div className='lg:w-2/4 mx-auto sm:w-3/4'>
        {poems.length === 0 ? (
          <p className='text-gray-600 dark:text-gray-400'>No poems yet.</p>
        ) : (
          poems.map((p) => (
            <div
              key={p.id}
              className='mb-4 bg-white dark:bg-gray-800 p-4 rounded shadow'
            >
              {p.title && (
                <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-100'>
                  {p.title}
                </h2>
              )}
              <p className='mt-2 text-gray-700 dark:text-gray-200'>
                {p.content}
              </p>
              <small className='text-gray-500 dark:text-gray-400'>
                {new Date(p.date).toLocaleString()}
              </small>
              <div className='mt-2 flex gap-2'>
                <button
                  className='text-blue-500 hover:underline text-sm'
                  onClick={() => setEditPoem(p)}
                >
                  Edit
                </button>
                <button
                  className='text-red-500 hover:underline text-sm'
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Add New Poem Button */}
      <button
        onClick={() => setOpen(true)}
        className='fixed bottom-4 right-4 p-4 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-600 transition'
        title='Add new poem'
        aria-label='Add new poem'
      >
        <Plus size={24} />
      </button>

      {/* Add Modal */}
      <PoemModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleAdd}
      />

      {/* Edit Modal */}
      <PoemModal
        open={!!editPoem}
        onClose={() => setEditPoem(null)}
        onSubmit={(title, content) => {
          if (editPoem) handleUpdate(editPoem.id, title, content);
        }}
        initialTitle={editPoem?.title}
        initialContent={editPoem?.content}
      />
    </main>
  );
}
