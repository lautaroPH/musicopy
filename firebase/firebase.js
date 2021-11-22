import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCbg2AwFNu8LM217o2-aSBDTeOdKhyS36w',
  authDomain: 'musicopy-48f17.firebaseapp.com',
  projectId: 'musicopy-48f17',
  storageBucket: 'musicopy-48f17.appspot.com',
  messagingSenderId: '880959856260',
  appId: '1:880959856260:web:fb989defaeb2f060902cd1',
  measurementId: 'G-6C1G5QNLBL',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
