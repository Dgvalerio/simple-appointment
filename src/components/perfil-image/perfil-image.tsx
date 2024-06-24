'use client';
import { FC } from 'react';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

import { Skeleton } from '@/components/ui/skeleton';

export const PerfilImage: FC = () => {
  const { data } = useSession();

  if (!data) return <Skeleton className="h-[20px] w-[20px] rounded-full" />;

  return (
    <Image
      className="rounded-full"
      width={20}
      height={20}
      src={data.photo}
      alt={data.name}
      title={`Você fez login como ${data.name}`}
    />
  );
};
