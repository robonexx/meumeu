'use client';
import React, { useState, useEffect, Suspense } from 'react';
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

  const fetchImages = async () => {
    const res = await fetch('/api/gallery');
    const data = await res.json();
    setImages(data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Upload handler
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    await fetch('/api/upload', { method: 'POST', body: formData });
    setUploading(false);
    fetchImages();
  };

  // Delete handler
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

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev! - 1));
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev! + 1));
  };

  return (
    <div className={styles.galleryWrapper}>
      {/*  <h2 className={styles.title}>Gallery</h2> */}
      <p className='text-black text-center'>
        I keep our memories close, like folded letters in my chest... quiet,
        warm, close to my heart.
      </p>

      {/* Upload Button */}
      <label className='inline-flex items-center gap-2 mb-4 cursor-pointer'>
        <RiUploadCloud2Line size={26} />
        <span>Upload Image</span>
        <input
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleUpload}
          disabled={uploading}
        />
        {uploading && <span className='ml-2 text-sm'>Uploading...</span>}
      </label>

      {/* Masonry List */}
      <div className={styles.masonryList}>
        {images.map((img, index) => (
          <div
            key={img.public_id}
            className={styles.masonryItem}
            onClick={() => openLightbox(index)}
          >
            {/* Next Image for layout, fallback to <img> if you want */}
            <Image
              src={img.secure_url}
              alt={`Gallery ${index}`}
              width={400}
              height={600}
              className={styles.image}
              unoptimized // important for external URLs
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className={styles.lightbox}
            onClick={closeLightbox}
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
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              {/* Close */}
              <button
                className={styles.closeButton}
                onClick={closeLightbox}
                type='button'
                aria-label='Close lightbox'
                title='Close'
              >
                <RiCloseFill />
              </button>
              {/* Prev */}
              <button
                className={styles.prevButton}
                onClick={showPrev}
                type='button'
                aria-label='Previous image'
                title='Previous image'
              >
                <RiArrowLeftCircleLine />
              </button>
              {/* Next */}
              <button
                className={styles.nextButton}
                onClick={showNext}
                type='button'
                aria-label='Next image'
                title='Next image'
              >
                <RiArrowRightCircleLine />
              </button>
              {/* Delete */}
              <button
                className={`${styles.closeButton} !right-16 !top-3`}
                title='Delete'
                onClick={() => handleDelete(images[selectedIndex].public_id)}
                type='button'
              >
                <RiDeleteBin6Line />
              </button>
              {/* Image */}
              <Suspense fallback={<div>Loading...</div>}>
                <Image
                  src={images[selectedIndex].secure_url}
                  alt={`Gallery ${selectedIndex}`}
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
