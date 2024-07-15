'use client';
import { useCallback, useState } from 'react';

import { useSession } from 'next-auth/react';

import { CreateAppointment } from '@/app/(private)/(home)/components/create-form/create-form';
import {
  Appointment,
  AppointmentController,
} from '@/controllers/appointment/appointment';

import { toast } from 'sonner';

interface IUseAppointmentController {
  loading: boolean;
  create(data: CreateAppointment): Promise<void>;
  list(): Promise<Appointment[]>;
}

export const useAppointmentController = (): IUseAppointmentController => {
  const { data: sessionData } = useSession();
  const [loading, setLoading] = useState(false);

  const create: IUseAppointmentController['create'] = useCallback(
    async (data: CreateAppointment) => {
      setLoading(true);

      if (!sessionData?.id) {
        setLoading(false);

        return void toast.warning('Nenhum usuário foi informado!');
      }

      const response = await AppointmentController.create({
        ...data,
        userId: sessionData.id,
      });

      setLoading(false);

      return response;
    },
    [sessionData]
  );

  const list: IUseAppointmentController['list'] = useCallback(async () => {
    setLoading(true);

    if (!sessionData?.id) {
      setLoading(false);

      void toast.warning('Nenhum usuário foi informado!');

      return [];
    }

    const response = await AppointmentController.list(sessionData.id);

    setLoading(false);

    return response;
  }, [sessionData]);

  return { loading, create, list };
};
