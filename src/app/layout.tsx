'use client';
import { Fira_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import Nav from './components/Nav';
import ClientAuthWrapper from './client-auth-wrapper';

const fira = Fira_Sans({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-fira-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});
// RootLayout is a server component; it should not include client-side auth logic
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={` ${fira.variable} ${playfair.variable} antialiased`}>
        <Nav />
        <ClientAuthWrapper>{children}</ClientAuthWrapper>
      </body>
    </html>
  );
}
