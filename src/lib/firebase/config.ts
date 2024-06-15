'use client';
// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAmuXIX8I67h9n7NsT3PSdLu0oPVz9M10w',
  authDomain: 'simple-appointment-dgv.firebaseapp.com',
  projectId: 'simple-appointment-dgv',
  storageBucket: 'simple-appointment-dgv.appspot.com',
  messagingSenderId: '104454651405',
  appId: '1:104454651405:web:a24496c2849ef8bb901f44',
  measurementId: 'G-FMF8B7SQ9T',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
