'use client';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { appointmentSchema } from '@/app/(private)/(home)/components/create-form/schema';
import { Form } from '@/components/form/form';
import { Button } from '@/components/ui/button';
import { useAppointmentController } from '@/controllers/appointment/appointment.hook';

import { format } from 'date-fns';
import { z } from 'zod';

const getToday = (): string => format(new Date(), 'yyyy-MM-dd');

export type CreateAppointment = z.infer<typeof appointmentSchema>;

export const AppointmentCreateForm: FC = () => {
  const { loading, create } = useAppointmentController();

  const form = useForm<CreateAppointment>({
    resolver: zodResolver(appointmentSchema),
  });

  const clearHandler = (): void => form.reset();

  const submitHandler: SubmitHandler<CreateAppointment> = async (formData) => {
    await create(formData);
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
