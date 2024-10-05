import { addDoc, collection, getDocs, query, where } from '@firebase/firestore';

import { Timesheet } from '@/controllers/client/types';
import { db } from '@/lib/firebase/config';

export interface Client extends Timesheet.Client {
  userId: string;
}

interface IClientController {
  collectionPath: string;
  create(data: Client): Promise<Client>;
  list(userId: string): Promise<Client[]>;
  find(props: Partial<Pick<Client, 'id'>>, userId: string): Promise<Client[]>;
}

export const ClientController: IClientController = {
  collectionPath: 'client',
  async create(data: Client): Promise<Client> {
    const document: Client = {
      id: data.id,
      title: data.title,
      projects: data.projects,

      userId: data.userId,
    };

    await addDoc(collection(db, this.collectionPath), document);

    return { ...data };
  },
  async list(userId: string): Promise<Client[]> {
    const q = query(
      collection(db, this.collectionPath),
      where('userId', '==', userId)
    );

    const clients: Client[] = [];

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      clients.push({ ...(doc.data() as Client) });
    });

    return clients;
  },
  async find(props, userId: string): Promise<Client[]> {
    const constraints = [where('userId', '==', userId)];

    if (props.id) constraints.push(where('id', '==', props.id));

    const q = query(collection(db, this.collectionPath), ...constraints);

    const clients: Client[] = [];

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      clients.push({ ...(doc.data() as Client) });
    });

    return clients;
  },
};
