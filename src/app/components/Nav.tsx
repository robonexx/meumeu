// components/Nav.tsx
import Link from 'next/link';
export default function Nav() {
  return (
    <nav className='flex sm:flex-row gap-6 align-center justify-between p-6 bg-black dark:bg-gray-800 shadow-md rounded-lg'>
      <Link
        href='/'
        className='px-8 py-4 bg-gray-800 dark:bg-gray-700 text-white rounded-lg shadow-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition'
      >
        Meu Meu
      </Link>
      <div className='flex flex-col sm:flex-row gap-6 align-center justify-center'>
        <Link
          href='/moon'
          className='px-8 py-4 bg-gray-800 dark:bg-gray-700 text-white rounded-lg shadow-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition'
        >
          Moon
        </Link>
        <Link
          href='/sun'
          className='px-8 py-4 bg-[goldenrod] dark:bg-[gold] text-yellow-900 dark:text-yellow-900 rounded-lg shadow-lg hover:bg-[gold] dark:hover:bg-yellow-600 transition'
        >
          Sun
        </Link>
        <Link
          href='/gallery'
          className='px-8 py-4 bg-[#282828] dark:bg-[#181818] text-[goldenrod] dark:text-blue-900 rounded-lg shadow-lg hover:bg-[#181818] dark:hover:text-[gold] transition'
        >
          Gallery
        </Link>
      </div>
    </nav>
  );
}
