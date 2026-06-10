import { Space_Grotesk, Cinzel, Antic_Didone } from 'next/font/google';
import './globals.css';
import Nav from './components/Nav';
import ClientAuthWrapper from './client-auth-wrapper';

const cinzel = Cinzel({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const anticDidone = Antic_Didone({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-didone',
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
      <body className={`${cinzel.variable} ${anticDidone.variable} ${spaceGrotesk.variable} antialiased`}>
        <Nav />
        <ClientAuthWrapper>{children}</ClientAuthWrapper>
      </body>
    </html>
  );
}
