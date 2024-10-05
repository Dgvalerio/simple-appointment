'use client';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { loadClientsSchema } from '@/app/(private)/load-data/components/create-form/schema';
import { Form } from '@/components/form/form';
import { Button } from '@/components/ui/button';
import { getClientsFromAzure } from '@/controllers/client/action';
import { useClientController } from '@/controllers/client/client.hook';

import { z } from 'zod';

export type LoadClients = z.infer<typeof loadClientsSchema>;

export const LoadClientsForm: FC = () => {
  const form = useForm<LoadClients>({
    resolver: zodResolver(loadClientsSchema),
  });

  const { create } = useClientController();

  const [loading, setLoading] = useState(false);

  const clearHandler = (): void => form.reset();

  const submitHandler: SubmitHandler<LoadClients> = async (formData) => {
    setLoading(true);

    const data = await getClientsFromAzure(formData.email, formData.password);

    const promise = data.map(
      async (client) =>
        await create({
          id: client.id,
          title: client.title,
          projects: client.projects,
        })
    );

    await Promise.all(promise);

    setLoading(false);
  };

  return (
    <Form.Root<LoadClients>
      {...form}
      onSubmit={submitHandler}
      className="flex flex-col gap-4"
    >
      <Form.Input<LoadClients>
        loading={loading}
        label="E-mail do timesheet azure"
        placeholder="account@mail.com"
        name="email"
        containerClassName="flex-1"
        type="email"
      />
      <Form.Input<LoadClients>
        loading={loading}
        label="Senha do timesheet azure"
        placeholder=""
        name="password"
        containerClassName="flex-1"
        type="password"
      />
      <div className="mt-4 flex justify-between gap-2">
        <Button
          loading={loading}
          className="w-[25%]"
          variant="outline"
          onClick={clearHandler}
        >
          Limpar
        </Button>
        <Button
          loading={loading}
          className="w-[25%]"
          type="submit"
          data-test="submit-button"
        >
          Carregar clientes
        </Button>
      </div>
    </Form.Root>
  );
};
