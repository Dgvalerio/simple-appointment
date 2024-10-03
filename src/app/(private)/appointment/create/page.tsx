import { NextPage } from 'next';

import { AppointmentCreateForm } from '@/app/(private)/appointment/create/components/create-form/create-form';
import { Separator } from '@/components/ui/separator';
import { awaiter } from '@/utils/functions/awaiter';

const AddAppointment: NextPage = async () => {
  await awaiter();

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-center text-lg font-semibold">
        Adicionar apontamento
      </h1>
      <AppointmentCreateForm />
      <Separator />
      {/* <AppointmentList />*/}
    </main>
  );
};

export default AddAppointment;
