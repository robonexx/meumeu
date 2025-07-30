'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import imageCompression from 'browser-image-compression';
import {
  RiCloseFill,
  RiArrowRightCircleLine,
  RiArrowLeftCircleLine,
  RiDeleteBin6Line,
  RiUploadCloud2Line,
} from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './ImageGallery.module.scss';

interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
}

const ImageGallery = () => {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchImages = async () => {
    const res = await fetch('/api/gallery');
    const data = await res.json();
    setImages([...data].reverse());
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleButtonClick = () => fileInputRef.current?.click();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return alert('No file selected.');
    if (!file.type.startsWith('image/')) return alert('Invalid file type.');

    try {
      setUploading(true);
      const compressed = await imageCompression(file, {
        maxSizeMB: 2.2,
        maxWidthOrHeight: 1080,
        useWebWorker: true,
      });

      const formData = new FormData();
      formData.append('file', compressed);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result?.error || 'Upload failed');

      await fetchImages();
      alert('Upload successful!');
    } catch (err) {
      console.error('Upload error:', err);
      alert('Image upload failed.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (public_id: string) => {
    if (!window.confirm('Delete this image?')) return;
    await fetch('/api/gallery', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_id }),
    });
    setSelectedIndex(null);
    fetchImages();
  };

  const showPrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev! - 1));
  };

  const showNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev! + 1));
  };

  return (
    <div className={styles.galleryWrapper}>
      <h2 className={styles.title}>Gallery</h2>

      <div className='mb-4'>
        <button
          onClick={handleButtonClick}
          disabled={uploading}
          className='inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition'
        >
          <RiUploadCloud2Line size={24} />
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleUpload}
          disabled={uploading}
          accept='image/*'
          className='hidden'
          title='Upload image'
        />
      </div>

      <div className={styles.masonryList}>
        {images.map((img, index) => (
          <div
            key={img.public_id}
            className={styles.masonryItem}
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              src={img.secure_url}
              alt={`Gallery ${index}`}
              width={400}
              height={600}
              className={styles.image}
              unoptimized
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className={styles.lightbox}
            onClick={() => setSelectedIndex(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.lightboxBackground}
              style={{
                backgroundImage: `url(${images[selectedIndex].secure_url})`,
              }}
            />
            <motion.div
              className={styles.lightboxContent}
              onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                e.stopPropagation()
              }
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <button
                className={styles.closeButton}
                onClick={() => setSelectedIndex(null)}
                title='Close'
                aria-label='Close'
              >
                <RiCloseFill />
              </button>
              <button
                className={styles.prevButton}
                onClick={showPrev}
                title='Previous image'
                aria-label='Previous image'
              >
                <RiArrowLeftCircleLine />
              </button>
              <button
                className={styles.nextButton}
                onClick={showNext}
                title='Next image'
                aria-label='Next image'
              >
                <RiArrowRightCircleLine />
              </button>
              <button
                className={`${styles.closeButton} !right-16 !top-3`}
                onClick={() => handleDelete(images[selectedIndex].public_id)}
                title='Delete image'
                aria-label='Delete image'
              >
                <RiDeleteBin6Line />
              </button>
              <Suspense fallback={<div>Loading...</div>}>
                <Image
                  src={images[selectedIndex].secure_url}
                  alt={`Image ${selectedIndex}`}
                  width={1000}
                  height={800}
                  className={styles.lightboxImage}
                  unoptimized
                />
              </Suspense>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery;
