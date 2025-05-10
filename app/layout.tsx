import './globals.css';
import { ReactNode } from 'react';
import ThemeToggle from '../components/ThemeToggle';

export const metadata = {
  title: 'Anchor',
  description: 'The last productivity app you will ever need',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-funnel bg-background text-text min-h-screen transition-colors">
        <header className="w-full flex items-center justify-between h-16 px-6">
  <a href="/" className="block mr-4 mt-6">
    <img
      src="/dark.png"
      alt="Logo"
      className="h-16 w-16 rounded-full object-cover block dark:hidden"
    />
    <img
      src="/light.png"
      alt="Logo"
      className="h-16 w-16 rounded-full object-cover hidden dark:block"
    />
  </a>
  <ThemeToggle />
</header>
        {children}
      </body>
    </html>
  );
}
