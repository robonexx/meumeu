'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      user === process.env.NEXT_PUBLIC_ERIKA_USER &&
      pass === process.env.NEXT_PUBLIC_ERIKA_PASS
    ) {
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('userRole', 'sun');
      router.replace('/sun');
    } else if (
      user === process.env.NEXT_PUBLIC_ROB_USER &&
      pass === process.env.NEXT_PUBLIC_ROB_PASS
    ) {
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('userRole', 'moon');
      router.replace('/moon');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900'>
      <h1 className='text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100'>
        Log In
      </h1>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-sm flex flex-col gap-4'
      >
        <input
          type='text'
          placeholder='Username'
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className='p-2 border rounded'
        />
        <input
          type='password'
          placeholder='Password'
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className='p-2 border rounded'
        />
        {error && <p className='text-red-500'>{error}</p>}
        <button type='submit' className='p-2 bg-blue-500 text-white rounded'>
          Sign In
        </button>
      </form>
    </div>
  );
}
