'use client';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { appointmentSchema } from '@/app/(home)/components/create-form/schema';
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

  const submitHandler: SubmitHandler<Appointment> = async (data) => {
    console.log('submitHandler:', data);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2>Create Form</h2>
      <Form.Root<Appointment> {...form} onSubmit={submitHandler}>
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
        <Button className="end">Criar</Button>
      </Form.Root>
    </div>
  );
};
