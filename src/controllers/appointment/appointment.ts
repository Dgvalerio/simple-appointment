import { addDoc, collection, getDocs, query, where } from '@firebase/firestore';

import { db } from '@/lib/firebase/config';

import { toast } from 'sonner';

export interface Appointment {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  description: string;
  userId: string;
}

interface IAppointmentController {
  collectionPath: string;
  create(data: Omit<Appointment, 'id'>): Promise<void>;
  list(userId: string): Promise<Appointment[]>;
}

export const AppointmentController: IAppointmentController = {
  collectionPath: 'appointment',
  async create(data: Omit<Appointment, 'id'>): Promise<void> {
    await addDoc(collection(db, this.collectionPath), {
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
  async list(userId: string): Promise<Appointment[]> {
    const q = query(
      collection(db, this.collectionPath),
      where('userId', '==', userId)
    );

    const appointments: Appointment[] = [];

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      appointments.push({
        id: doc.id,
        ...(doc.data() as Omit<Appointment, 'id'>),
      });
    });

    return appointments;
  },
};
