import { DocumentData } from 'firebase/firestore';

export const docToResource = (doc: DocumentData) => {
   if (typeof doc?.data !== 'function') return doc
   return { ...doc.data(), id: doc.id }
}