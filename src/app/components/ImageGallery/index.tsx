'use client';
import React, { useRef, useState, useEffect, Suspense } from 'react';
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

  // Fetch images from the API
  const fetchImages = async () => {
    const res = await fetch('/api/gallery');
    const data = await res.json();
    setImages([...data].reverse());
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Open file dialog
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file upload
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    await fetch('/api/upload', { method: 'POST', body: formData });
    setUploading(false);
    fetchImages();
    // Reset the input so you can re-upload the same file if you want
    if (fileInputRef.current) fileInputRef.current.value = '';
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
      <h2 className={styles.title}>Gallery</h2>
      <p>
        I keep our memories close, like folded letters in my chest... quiet,
        warm, close to my heart.
      </p>

      {/* Upload Button */}
      <div className="mb-4">
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
          onClick={handleButtonClick}
          disabled={uploading}
          aria-label="Upload image"
          title="Upload image"
        >
          <RiUploadCloud2Line size={24} />
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
          disabled={uploading}
          title="Upload image"
          placeholder="Choose an image to upload"
        />
      </div>

      {/* Masonry List */}
      <div className={styles.masonryList}>
        {images.map((img, index) => (
          <div
            key={img.public_id}
            className={styles.masonryItem}
            onClick={() => openLightbox(index)}
          >
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
                type="button"
                aria-label="Close lightbox"
                title="Close"
              >
                <RiCloseFill />
              </button>
              {/* Prev */}
              <button
                className={styles.prevButton}
                onClick={showPrev}
                type="button"
                aria-label="Previous image"
                title="Previous image"
              >
                <RiArrowLeftCircleLine />
              </button>
              {/* Next */}
              <button
                className={styles.nextButton}
                onClick={showNext}
                type="button"
                aria-label="Next image"
                title="Next image"
              >
                <RiArrowRightCircleLine />
              </button>
              {/* Delete */}
              <button
                className={`${styles.closeButton} !right-16 !top-3`}
                title="Delete"
                aria-label="Delete image"
                onClick={() => handleDelete(images[selectedIndex].public_id)}
                type="button"
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
