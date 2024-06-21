import { PropsWithChildren } from 'react';

import { NextPage } from 'next';

import { ThemeToggleButton } from '@/components/theme-provider/theme-toggle-button';
import { cn } from '@/lib/tailwind/utils';
interface PublicLayoutProps extends PropsWithChildren {}

const PublicLayout: NextPage<PublicLayoutProps> = ({ children }) => (
  <main
    className={cn(
      'm-auto flex max-h-[80vh] w-full max-w-[80%] flex-1',
      'rounded border border-zinc-700'
    )}
  >
    <aside className="flex flex-[2] flex-col rounded-l bg-zinc-100 bg-[url('/16W7.webp')] bg-cover p-4 dark:bg-zinc-900">
      <header className="flex justify-end">
        <ThemeToggleButton />
      </header>
    </aside>
    <section className="flex flex-[3] flex-col items-center gap-4 rounded-r p-4">
      <span className="font-black uppercase italic text-zinc-900/60 transition hover:text-opacity-100 dark:text-zinc-100/60">
        Apontamento Simples
      </span>
      <div className="m-auto flex w-full max-w-[60%] flex-col">{children}</div>
    </section>
  </main>
);

export default PublicLayout;
