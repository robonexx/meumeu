// components/Nav.tsx
import Link from 'next/link';
export default function Nav() {
  return (
    <nav className='flex flex-col sm:flex-row gap-6 align-center justify-between p-6 bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg'>
      <Link
        href='/'
        className='px-8 py-4 bg-gray-800 dark:bg-gray-700 text-white rounded-lg shadow-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition'
      >
        Meu Meu
      </Link>
      <div className='flex flex-col sm:flex-row gap-6 align-center justify-center'>
        <Link
          href='/sun'
          className='px-8 py-4 bg-yellow-300 dark:bg-yellow-500 text-yellow-900 dark:text-yellow-900 rounded-lg shadow-lg hover:bg-yellow-400 dark:hover:bg-yellow-600 transition'
        >
          Sun
        </Link>
        <Link
          href='/moon'
          className='px-8 py-4 bg-gray-800 dark:bg-gray-700 text-white rounded-lg shadow-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition'
        >
          Moon
        </Link>
        <Link
          href='/gallery'
          className='px-8 py-4 bg-blue-300 dark:bg-blue-500 text-blue-900 dark:text-blue-900 rounded-lg shadow-lg hover:bg-blue-400 dark:hover:bg-blue-600 transition'
        >
          Gallery
        </Link>
      </div>
    </nav>
  );
}
