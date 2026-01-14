import { initializeApp, getApp, getApps, FirebaseOptions } from 'firebase/app';

export const firebaseConfig: FirebaseOptions = {
  "projectId": "studio-4478480845-31432",
  "appId": "1:103789929072:web:9ce7ac86e03272459f8ab5",
  "apiKey": "AIzaSyCMinGQ7Q_JBuA3AX6T8TSOATITmrfdEEI",
  "authDomain": "studio-4478480845-31432.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "103789929072"
};

export function initializeFirebase() {
  if (getApps().length) {
    return getApp();
  }
  return initializeApp(firebaseConfig);
}
