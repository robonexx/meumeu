// components/Nav.tsx
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className='w-full bg-black/90 dark:bg-gray-900 shadow-md px-2 py-2 flex flex-row items-center justify-between font-[family-name:var(--font-fira-sans)]'>
      {/* Brand */}
      <Link
        href='/'
        className='font-bold tracking-tight text-base xs:text-lg sm:text-xl md:text-2xl px-2 md:px-4 py-2 text-white'
      >
        Meu Meu
      </Link>
      <div className='flex flex-row items-center gap-2 xs:gap-3 sm:gap-5'>
        <Link
          href='/moon'
          className='px-2 md:px-4 py-1.5 md:py-2 text-white bg-gray-800 dark:bg-gray-700 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition text-sm xs:text-base md:text-lg'
        >
          Moon
        </Link>
        <Link
          href='/sun'
          className='px-2 md:px-4 py-1.5 md:py-2 text-yellow-900 bg-yellow-300 dark:bg-yellow-500 rounded-lg hover:bg-yellow-400 dark:hover:bg-yellow-400 transition text-sm xs:text-base md:text-lg'
        >
          Sun
        </Link>
        <Link
          href='/gallery'
          className='px-2 md:px-4 py-1.5 md:py-2 text-yellow-400 bg-gray-900 dark:bg-gray-800 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition text-sm xs:text-base md:text-lg'
        >
          Gallery
        </Link>
      </div>
    </nav>
  );
}
