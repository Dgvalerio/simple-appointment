'use client';
import { FC, PropsWithChildren } from 'react';

import { SessionProvider as Provider } from 'next-auth/react';

interface SessionProviderProps extends PropsWithChildren {}

export const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
  console.log('SessionProvider');

  return <Provider>{children}</Provider>;
};
