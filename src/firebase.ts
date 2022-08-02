import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebaseConfig from './config/firebaseCfg';

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore
export const db = firebase.firestore();
export const auth = firebase.auth()
export const authInstance = firebase.auth