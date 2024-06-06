import { FC } from 'react';

import { cn } from '@/lib/tailwind/utils';

export const ClockLoading: FC = () => (
  <div className="flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 bg-zinc-900">
    <div
      id="clock"
      aria-label="Loading"
      className="rounded-full w-32 h-32 flex items-center justify-center border-white border-2"
    >
      <div
        id="hour-hand"
        className={cn(
          'w-[0.2rem] absolute box-border animate-spin [animation-duration:8s]',
          'border-t-[2rem] h-[3.4rem]'
        )}
      />
      <div
        id="minute-hand"
        className={cn(
          'w-[0.2rem] absolute box-border animate-spin [animation-duration:2s]',
          'border-t-[3rem] h-[5.4rem]'
        )}
      />
    </div>
  </div>
);
