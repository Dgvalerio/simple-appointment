import { FC } from 'react';

import { NextPage } from 'next';
import Link from 'next/link';

import { Icon, IconProps } from '@/components/icon/icon';
import { Button } from '@/components/ui/button';
import { routes } from '@/utils/constants/routes';
import { awaiter } from '@/utils/functions/awaiter';

import type { UrlObject } from 'url';

const Item: FC<{
  icon: IconProps['icon'];
  link: string | UrlObject;
  title: string;
  testId: string;
}> = ({ icon, link, title, testId }) => (
  <Button
    className="flex h-32 w-32 flex-col items-center gap-1 text-wrap"
    variant="outline"
    data-test={testId}
    asChild
  >
    <Link href={link}>
      <Icon icon={icon} size={48} />
      <span className="text-center font-medium">{title}</span>
    </Link>
  </Button>
);

const HomePage: NextPage = async () => {
  await awaiter();

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold">Bem vindo ao sistema!</h1>
      <div className="flex flex-wrap gap-4">
        <Item
          icon="more_time"
          link={routes.addAppointment}
          title="Adicionar apontamento"
          testId="add-appointment"
        />
      </div>
    </main>
  );
};

export default HomePage;
