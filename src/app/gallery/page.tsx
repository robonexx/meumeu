'use client';

import './gallery.scss';
import ImageGallery from '../components/ImageGallery';

const Gallery = () => (
  <main className='galleryPage'>
    <div className='galleryAura' aria-hidden='true' />
    <ImageGallery />
  </main>
);

export default Gallery;
