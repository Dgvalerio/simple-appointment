'use client';
import { FC, useCallback, useEffect, useState } from 'react';

import { Separator } from '@/components/ui/separator';
import { Appointment } from '@/controllers/appointment/appointment';
import { useAppointmentController } from '@/controllers/appointment/appointment.hook';

const mountDate = ({ day, endTime, startTime }: Appointment): string => {
  const completeDay = new Date(`${day}T${startTime}`).toLocaleDateString(
    'pt-BR',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return `${completeDay[0].toUpperCase()}${completeDay.slice(1)}, das ${startTime} até ${endTime}`;
};

type AppointmentsGroupByDay = Record<string, Appointment[]>;

const groupAppointmentsByDay = (
  appointments: Appointment[]
): AppointmentsGroupByDay => {
  const group: AppointmentsGroupByDay = {};

  appointments.forEach((appointment) => {
    if (group.hasOwnProperty(appointment.id)) {
      group[appointment.day].push(appointment);
    } else {
      group[appointment.day] = [appointment];
    }
  });

  return group;
};

export const AppointmentList: FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { loading, list } = useAppointmentController();

  const loadAppointments = useCallback(async (): Promise<void> => {
    const data = await list();

    setAppointments(data);
  }, [list]);

  useEffect(() => {
    void loadAppointments();
  }, [loadAppointments]);

  return (
    <div className="flex flex-col gap-4">
      <h2>Appointment List</h2>
      {loading && <p>Loading...</p>}
      {!loading && appointments.length === 0 && <p>Sem apontamentos</p>}
      {!loading &&
        appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex flex-col gap-2 rounded border border-zinc-800 p-2 shadow"
          >
            <p className="font-semibold opacity-80">{mountDate(appointment)}</p>
            <Separator />
            <p className="whitespace-pre">{appointment.description}</p>
          </div>
        ))}
    </div>
  );
};
