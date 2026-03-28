import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Dots — Parches Anti-espinillas · República Dominicana',
  description: 'El parche hidrocoloide que aplanas tu espinilla en una noche. Sin explotar. Sin marcas. Sin drama.',
  openGraph: {
    title: 'Dots — Parches Anti-espinillas',
    description: 'Aplana tu espinilla en una noche. Sin explotar. Sin marcas.',
    images: [{ url: '/herodots.png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${jakarta.variable} font-sans antialiased bg-[#FAFAF8]`}>
        <Navbar />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
