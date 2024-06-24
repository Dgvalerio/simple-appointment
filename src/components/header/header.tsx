import { FC } from 'react';

import Link from 'next/link';

import { PerfilImage } from '@/components/perfil-image/perfil-image';
import { ThemeToggleButton } from '@/components/theme-provider/theme-toggle-button';
import { routes } from '@/utils/constants/routes';

export const Header: FC = () => (
  <header className="flex items-center justify-between gap-4 px-4 py-2 shadow-lg">
    <div className="flex items-center gap-2">
      <Link
        href={routes.home}
        className="font-black uppercase italic text-zinc-100 text-opacity-80 transition hover:text-opacity-100"
      >
        Apontamento Simples
      </Link>
    </div>
    <div className="flex items-center gap-2">
      <PerfilImage />
      <ThemeToggleButton />
    </div>
  </header>
);
