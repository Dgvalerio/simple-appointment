import { FC } from 'react';

import { cva } from 'class-variance-authority';

const pointerVariants = cva(
  'w-[0.2rem] absolute box-border animate-spin border-black dark:border-white',
  {
    variants: {
      pointer: {
        hour: 'border-t-[2rem] h-[3.4rem] [animation-duration:8s]',
        minute: 'border-t-[3rem] h-[5.4rem] [animation-duration:2s]',
      },
    },
  }
);

export const ClockLoading: FC = () => (
  <div className="scale-125 flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 bg-white dark:bg-zinc-900">
    <div
      aria-label="Loading"
      className="rounded-full w-32 h-32 flex items-center justify-center border-black dark:border-white border-2"
    >
      <div className={pointerVariants({ pointer: 'hour' })} />
      <div className={pointerVariants({ pointer: 'minute' })} />
    </div>
  </div>
);
