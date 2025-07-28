'use client';
import './gallery.scss'; // or keep using CSS modules
import ImageGallery from '../components/ImageGallery';
import Hero from '../components/Hero';

const Gallery = () => (
  <main className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen'>
    <div className='flex flex-col row-start-2 items-center sm:items-start'>
      <Hero />
      <div id='photos'>
        <ImageGallery />
      </div>
    </div>
  </main>
);

export default Gallery;
