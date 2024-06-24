import { NextPage } from 'next';

import { AppointmentCreateForm } from '@/app/(private)/(home)/components/create-form/create-form';
import { AppointmentList } from '@/app/(private)/(home)/components/list/list';
import { Separator } from '@/components/ui/separator';
import { awaiter } from '@/utils/functions/awaiter';

const HomePage: NextPage = async () => {
  await awaiter();

  return (
    <main className="flex flex-col gap-4">
      <h1>Apontamentos</h1>
      <AppointmentCreateForm />
      <Separator />
      <AppointmentList />
    </main>
  );
};

export default HomePage;
