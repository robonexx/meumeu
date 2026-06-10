import { Cormorant_Garamond, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Nav from './components/Nav';
import ClientAuthWrapper from './client-auth-wrapper';

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${cormorant.variable} ${spaceGrotesk.variable} antialiased`}>
        <Nav />
        <ClientAuthWrapper>{children}</ClientAuthWrapper>
      </body>
    </html>
  );
}
