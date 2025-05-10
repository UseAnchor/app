import './globals.css';
import { ReactNode } from 'react';
import { Fugaz_One } from 'next/font/google';

const fugazOne = Fugaz_One({ subsets: ['latin'], weight: ['400'] });

export const metadata = {
  title: 'Anchor',
  description: 'The last productivity app you will ever need',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-text min-h-screen transition-colors ${fugazOne.className}">
        {children}
      </body>
    </html>
  );
}
