'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/moon', label: 'Moon' },
  { href: '/sun', label: 'Sun' },
  { href: '/gallery', label: 'Gallery' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className='fixed left-1/2 top-4 z-[60] w-[calc(100vw-1.5rem)] max-w-5xl -translate-x-1/2 rounded-full border border-white/15 bg-[#07030f]/65 px-2 py-2 text-white shadow-[0_18px_70px_rgba(0,0,0,.35)] backdrop-blur-2xl'>
      <div className='flex items-center justify-between gap-2'>
        <Link
          href='/'
          className='group flex items-center gap-2 rounded-full px-3 py-2 font-[family-name:var(--font-cormorant)] text-base font-bold tracking-tight text-[#fff3d7] transition-colors hover:bg-white/10 sm:text-xl'
        >
          <span className='grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#ffd99a] via-[#ff8a70] to-[#b8a8ff] text-sm text-[#100716] shadow-[0_0_30px_rgba(255,190,132,.35)]'>
            ☀︎
          </span>
          <span>Meu Meu</span>
        </Link>

        <div className='flex items-center gap-1 sm:gap-2'>
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 font-[family-name:var(--font-space)] text-[0.64rem] font-semibold uppercase tracking-[0.18em] transition-colors sm:px-4 sm:text-xs ${
                  active
                    ? 'bg-gradient-to-r from-[#fff0c4] via-[#ffaf6d] to-[#c9bdff] text-[#120716] shadow-[0_0_30px_rgba(255,177,109,.32)]'
                    : 'border border-white/10 bg-white/[0.04] text-white/74 hover:border-white/25 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
