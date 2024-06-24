'use client';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useSession } from 'next-auth/react';

import { addDoc, collection } from '@firebase/firestore';
import { zodResolver } from '@hookform/resolvers/zod';

import { appointmentSchema } from '@/app/(private)/(home)/components/create-form/schema';
import { Form } from '@/components/form/form';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase/config';

import { format } from 'date-fns';
import { toast } from 'sonner';
import { z } from 'zod';

const getToday = (): string => format(new Date(), 'yyyy-MM-dd');

type CreateAppointment = z.infer<typeof appointmentSchema>;

const AppointmentController = {
  async create(data: CreateAppointment & { userId?: string }): Promise<void> {
    if (!data.userId) {
      return void toast.warning('Nenhum usuário foi informado!');
    }

    await addDoc(collection(db, 'appointment'), {
      day: data.day,
      startTime: data.startTime,
      endTime: data.endTime,
      description: data.description,
      userId: data.userId,
    });

    toast.success(
      `Apontamento criado para o dia "${data.day} as ${data.startTime}:${data.endTime}"`
    );
  },
};

export const AppointmentCreateForm: FC = () => {
  const { data: sessionData } = useSession();
  const form = useForm<CreateAppointment>({
    resolver: zodResolver(appointmentSchema),
  });

  const [loading, setLoading] = useState(false);

  const clearHandler = (): void => form.reset();

  const submitHandler: SubmitHandler<CreateAppointment> = async (formData) => {
    setLoading(true);

    await AppointmentController.create({
      ...formData,
      userId: sessionData?.id,
    });

    setLoading(false);
  };

  return (
    <Form.Root<CreateAppointment>
      {...form}
      onSubmit={submitHandler}
      className="flex flex-col gap-2"
    >
      <div className="flex gap-2">
        <Form.Input<CreateAppointment>
          loading={loading}
          label="Dia"
          name="day"
          containerClassName="flex-1"
          type="date"
          defaultValue={getToday()}
        />
        <Form.Input<CreateAppointment>
          loading={loading}
          label="Hora inicial"
          name="startTime"
          containerClassName="flex-1"
          type="time"
        />
        <Form.Input<CreateAppointment>
          loading={loading}
          label="Hora final"
          name="endTime"
          containerClassName="flex-1"
          type="time"
        />
      </div>
      <Form.Textarea<CreateAppointment>
        loading={loading}
        label="Descrição"
        name="description"
      />
      <div className="mt-2 flex justify-between gap-2">
        <Button
          loading={loading}
          className="w-[25%]"
          variant="outline"
          onClick={clearHandler}
        >
          Limpar
        </Button>
        <Button loading={loading} className="w-[25%]" type="submit">
          Criar
        </Button>
      </div>
    </Form.Root>
  );
};
