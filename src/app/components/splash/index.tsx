'use client';

import React, { useState } from 'react';

const users = [
  {
    label: 'Erika',
    user: process.env.NEXT_PUBLIC_ERIKA_USER,
    pass: process.env.NEXT_PUBLIC_ERIKA_PASS,
  },
  {
    label: 'Rob',
    user: process.env.NEXT_PUBLIC_ROB_USER,
    pass: process.env.NEXT_PUBLIC_ROB_PASS,
  },
];

export default function Splash() {
  const [selectedUser, setSelectedUser] = useState(users[0].user);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const match = users.find((u) => u.user === selectedUser);
    if (match && password === match.pass) {
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('user', match.user || '');
      window.location.reload();
    } else {
      setError('Incorrect password, try again.');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-zinc-900'>
      <div className='bg-white px-8 py-8 rounded-2xl shadow-2xl flex flex-col items-center w-full max-w-xs'>
        <h2 className='text-3xl font-bold mb-6 text-zinc-800'>Login</h2>
        <label htmlFor="user-select" className="sr-only">
          Select user
        </label>
        <select
          id="user-select"
          aria-label="Select user"
          className='mb-4 px-3 py-2 rounded-md border border-zinc-300 bg-zinc-100 text-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-400'
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          {users.map((u) => (
            <option value={u.user} key={u.user}>
              {u.label}
            </option>
          ))}
        </select>
        <input
          type='password'
          value={password}
          placeholder='Password'
          className='mb-4 px-3 py-2 rounded-md border border-zinc-300 text-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-400'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className='w-full py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-lg transition-all duration-150 shadow'
          onClick={handleLogin}
          type='button'
        >
          Login
        </button>
        {error && (
          <div className='text-red-500 mt-4 text-base text-center'>{error}</div>
        )}
      </div>
    </div>
  );
}
