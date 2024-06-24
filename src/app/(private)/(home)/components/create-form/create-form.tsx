'use client';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { appointmentSchema } from '@/app/(private)/(home)/components/create-form/schema';
import { Form } from '@/components/form/form';
import { Button } from '@/components/ui/button';

import { format } from 'date-fns';
import { z } from 'zod';

const getToday = (): string => format(new Date(), 'yyyy-MM-dd');

type Appointment = z.infer<typeof appointmentSchema>;

export const AppointmentCreateForm: FC = () => {
  const form = useForm<Appointment>({
    resolver: zodResolver(appointmentSchema),
  });

  const clearHandler = (): void => form.reset();

  const submitHandler: SubmitHandler<Appointment> = async (data) => {
    console.log('AppointmentCreateForm > submitHandler:', data);
  };

  return (
    <Form.Root<Appointment>
      {...form}
      onSubmit={submitHandler}
      className="flex flex-col gap-2"
    >
      <div className="flex gap-2">
        <Form.Input<Appointment>
          label="Dia"
          name="day"
          containerClassName="flex-1"
          type="date"
          defaultValue={getToday()}
        />
        <Form.Input<Appointment>
          label="Hora inicial"
          name="startTime"
          containerClassName="flex-1"
          type="time"
        />
        <Form.Input<Appointment>
          label="Hora final"
          name="endTime"
          containerClassName="flex-1"
          type="time"
        />
      </div>
      <Form.Textarea<Appointment> label="Descrição" name="description" />
      <div className="mt-2 flex justify-between gap-2">
        <Button className="w-[25%]" variant="outline" onClick={clearHandler}>
          Limpar
        </Button>
        <Button className="w-[25%]" type="submit">
          Criar
        </Button>
      </div>
    </Form.Root>
  );
};
