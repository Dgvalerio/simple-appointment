'use client';
import { useCallback, useState } from 'react';

import { useSession } from 'next-auth/react';

import { Client, ClientController } from '@/controllers/client/client';
import { Timesheet } from '@/controllers/client/types';
import { toast } from '@/lib/sonner/sonner';

export namespace IUseClientController {
  export type ErrorHandler = (
    props: Partial<Record<keyof Timesheet.Client, string>>
  ) => void;

  export interface Return {
    loading: boolean;
    create(data: Timesheet.Client): Promise<void>;
    list(): Promise<Client[]>;
  }
}

export const useClientController = (
  errorHandler?: IUseClientController.ErrorHandler
): IUseClientController.Return => {
  const { data: sessionData } = useSession();

  const [loading, setLoading] = useState(false);

  const create: IUseClientController.Return['create'] = useCallback(
    async (data: Timesheet.Client) => {
      setLoading(true);

      if (!sessionData?.id) {
        setLoading(false);

        return void toast.warning('Nenhum usuário foi informado!');
      }

      const members = await ClientController.find(
        { id: data.id },
        sessionData.id
      );

      if (members.length > 0) {
        setLoading(false);

        const msg = `Cliente "${data.title}" já cadastrado!`;

        errorHandler && errorHandler({ id: msg });

        return void toast.error(msg);
      }

      await ClientController.create({ ...data, userId: sessionData.id });

      toast.success(`Cliente "${data.title}" adicionado com sucesso!`);

      setLoading(false);
    },
    [errorHandler, sessionData?.id]
  );

  const list: IUseClientController.Return['list'] = useCallback(async () => {
    setLoading(true);

    if (!sessionData?.id) {
      setLoading(false);

      void toast.warning('Nenhum usuário foi informado!');

      return [];
    }

    const response = await ClientController.list(sessionData.id);

    setLoading(false);

    return response;
  }, [sessionData]);

  return { loading, create, list };
};
