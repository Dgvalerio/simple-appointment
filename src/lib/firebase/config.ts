'use client';
import { env } from '@/utils/constants/env';

import { getAnalytics, isSupported } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'simple-appointment-dgv.firebaseapp.com',
  projectId: 'simple-appointment-dgv',
  storageBucket: 'simple-appointment-dgv.appspot.com',
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = isSupported().then(
  (supported) => supported && getAnalytics(app)
);
export const db = getFirestore(app);
