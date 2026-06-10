'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface PoemModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string, content: string) => void;
  initialTitle?: string;
  initialContent?: string;
}

export default function PoemModal({
  open,
  onClose,
  onSubmit,
  initialTitle = '',
  initialContent = '',
}: PoemModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    if (open) {
      setTitle(initialTitle || '');
      setContent(initialContent || '');
    }
  }, [open, initialTitle, initialContent]);

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-[90] grid place-items-center bg-[#03020a]/75 px-4 backdrop-blur-xl'>
      <div className='relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/15 bg-[#10091f]/85 p-5 text-white shadow-[0_30px_120px_rgba(0,0,0,.6)] sm:p-7'>
        <div className='pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#ffb15f]/25 blur-3xl' />
        <div className='pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#9f8cff]/24 blur-3xl' />

        <button
          type='button'
          onClick={onClose}
          className='absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 text-white/75 transition hover:bg-white/15 hover:text-white'
          aria-label='Close modal'
          title='Close'
        >
          <X size={18} />
        </button>

        <div className='relative'>
          <p className='mb-2 text-xs uppercase tracking-[0.24em] text-white/45'>Moon archive</p>
          <h2 className='mb-6 font-[family-name:var(--font-cormorant)] text-4xl font-bold italic tracking-[-0.04em] text-[#fff0c8] sm:text-5xl'>
            {initialTitle || initialContent ? 'Edit poem' : 'New poem'}
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(title, content);
            }}
            className='flex flex-col gap-4'
          >
            <label className='grid gap-2 text-sm text-white/70'>
              Title
              <input
                name='title'
                placeholder='Title (optional)'
                className='rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3 text-white outline-none transition placeholder:text-white/28 focus:border-[#ffbe7a]/60 focus:bg-white/[0.09]'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label className='grid gap-2 text-sm text-white/70'>
              Poem
              <textarea
                name='content'
                placeholder='Write something from the Sun to the Moon...'
                rows={10}
                className='min-h-64 resize-y rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3 font-[family-name:var(--font-cormorant)] text-lg leading-8 text-white outline-none transition placeholder:text-white/28 focus:border-[#b9a8ff]/60 focus:bg-white/[0.09]'
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </label>

            <div className='mt-2 flex justify-end gap-3'>
              <button
                type='button'
                onClick={onClose}
                className='rounded-full border border-white/12 bg-white/[0.06] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/72 transition hover:bg-white/12 hover:text-white'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='rounded-full bg-gradient-to-r from-[#fff0c4] via-[#ffb15f] to-[#c8b9ff] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#110716] shadow-[0_18px_50px_rgba(255,177,95,.25)] transition'
              >
                Save poem
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
