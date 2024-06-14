import { PropsWithChildren } from 'react';

import type { Metadata, NextPage } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

import { Analytics } from '@vercel/analytics/react';

import { ThemeProvider } from '@/components/theme-provider/theme-provider';
import { ThemeToggleButton } from '@/components/theme-provider/theme-toggle-button';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/tailwind/utils';
import { routes } from '@/utils/constants/routes';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Apontamento Simples',
  description: 'Apontamento Simples',
};

const RootLayout: NextPage<PropsWithChildren> = ({ children }) => (
  <html lang="pt-br">
    <body
      className={cn(
        inter.variable,
        'antialiased font-sans flex flex-col gap-4 min-h-screen bg-white dark:bg-zinc-950'
      )}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <header className="flex gap-4 px-4 py-2 items-center justify-between shadow-lg">
          <div className="flex gap-2 items-center">
            <Link
              href={routes.home}
              className="font-black text-zinc-100 text-opacity-80 uppercase italic hover:text-opacity-100 transition"
            >
              Apontamento Simples
            </Link>
          </div>
          <ThemeToggleButton />
        </header>
        <main className="flex flex-col gap-4 p-4 flex-1 max-w-3xl w-full mx-auto">
          {children}
        </main>
        <Toaster />
      </ThemeProvider>
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
