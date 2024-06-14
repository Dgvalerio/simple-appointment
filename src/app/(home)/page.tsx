import { FC } from 'react';

import { NextPage } from 'next';

import { AppointmentCreateForm } from '@/app/(home)/components/create-form/create-form';
import { awaiter } from '@/utils/functions/awaiter';

const AppointmentList: FC = () => <h2>Appointment List</h2>;

const HomePage: NextPage = async () => {
  await awaiter();

  return (
    <main>
      <AppointmentCreateForm />
      <AppointmentList />
    </main>
  );
};

export default HomePage;
