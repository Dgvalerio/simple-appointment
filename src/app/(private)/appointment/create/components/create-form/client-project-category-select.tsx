import { FC, useCallback, useEffect, useState } from 'react';

import { CreateAppointment } from '@/app/(private)/appointment/create/components/create-form/create-form';
import { Form } from '@/components/form/form';
import { useClientController } from '@/controllers/client/client.hook';
import { Timesheet } from '@/controllers/client/types';

interface Item {
  value: string;
  label: string;
}

type CategoriesObject = Record<
  Timesheet.Category['id'],
  Pick<Timesheet.Category, 'id' | 'name'>
>;

type ProjectsObject = Record<
  Timesheet.Project['id'],
  Pick<Timesheet.Project, 'id' | 'name'> & { categories: CategoriesObject }
>;

type ClientsObject = Record<
  Timesheet.Client['id'],
  Pick<Timesheet.Client, 'id' | 'title'> & { projects: ProjectsObject }
>;

export const ClientProjectCategorySelect: FC<{ loading: boolean }> = ({
  loading: formLoading,
}) => {
  const { list, loading } = useClientController();

  const [clientsObject, setClientsObject] = useState<ClientsObject>({});

  const load = useCallback(async (): Promise<void> => {
    const data = await list();

    const clients: ClientsObject = {};

    data.forEach((client) => {
      clients[client.id] = {
        id: client.id,
        title: client.title,
        projects: client.projects,
      };
    });

    setClientsObject(clients);
  }, [list]);

  useEffect(() => {
    void load();
  }, [load]);

  const clients = Object.entries(clientsObject).map(
    ([id, client]): Item => ({ label: client.title, value: id })
  );
  const projects = clients;
  const categories = projects;

  return (
    <div className="grid grid-cols-3 gap-2">
      <Form.Combobox<CreateAppointment>
        loading={loading || formLoading}
        label="Cliente"
        name="client"
        containerClassName="flex-1"
        items={clients}
      />
      <Form.Combobox<CreateAppointment>
        loading={loading || formLoading}
        label="Projeto"
        name="project"
        containerClassName="flex-1"
        items={projects}
      />
      <Form.Combobox<CreateAppointment>
        loading={loading || formLoading}
        label="Categoria"
        name="category"
        containerClassName="flex-1"
        items={categories}
      />
    </div>
  );
};
