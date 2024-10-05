import { NextPage } from 'next';

import { LoadClientsForm } from '@/app/(private)/load-data/components/create-form/load-form';

const LoadData: NextPage = () => (
  <main className="flex flex-col gap-4">
    <h1 className="text-center text-lg font-semibold">Carregar dados</h1>
    <p className="text-md text-center">
      Caso seja necessário, ter clientes, projetos e categorias de outra
      plataforma aqui, você pode carrega-los.
    </p>
    <LoadClientsForm />
  </main>
);

export default LoadData;
