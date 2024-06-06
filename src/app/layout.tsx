import { PropsWithChildren } from 'react';

import type { Metadata, NextPage } from 'next';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';
import Link from 'next/link';

import { ThemeProvider } from '@/components/theme-provider/theme-provider';
import { ThemeToggleButton } from '@/components/theme-provider/theme-toggle-button';
import { cn } from '@/lib/tailwind/utils';
import { routes } from '@/utils/constants/routes';

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
        'antialiased font-sans flex flex-col gap-4 min-h-screen dark:bg-zinc-900'
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
        <main className="flex flex-col gap-4 p-4 flex-1">{children}</main>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
