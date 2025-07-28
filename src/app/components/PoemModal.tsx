'use client'
import React, { useState, useEffect } from 'react'

interface PoemModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (title: string, content: string) => void
  initialTitle?: string
  initialContent?: string
}

export default function PoemModal({
  open,
  onClose,
  onSubmit,
  initialTitle = '',
  initialContent = ''
}: PoemModalProps) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)

  // When modal opens or the initial values change, reset the form
  useEffect(() => {
    if (open) {
      setTitle(initialTitle || '')
      setContent(initialContent || '')
    }
  }, [open, initialTitle, initialContent])

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          {initialTitle || initialContent ? 'Edit Poem' : 'New Poem'}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit(title, content)
          }}
          className="flex flex-col gap-4"
        >
          <input
            name="title"
            placeholder="Title (optional)"
            className="p-2 border rounded bg-gray-50 dark:bg-gray-700"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            name="content"
            placeholder="Your poem..."
            rows={4}
            className="p-2 border rounded bg-gray-50 dark:bg-gray-700"
            required
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
