import { DocumentData } from 'firebase/firestore';
import { useCardStore } from '../stores/cards';
import { useBoardStore } from '../stores/boards';
import { BoardInfo, CardInfo, Guest } from '../types';
import { db } from '../firebase';

export const docToResource = (doc: DocumentData): DocumentData | Item => {
   if (typeof doc?.data !== 'function') return doc
   return { ...doc.data(), id: doc.id }
}

export function fetchItems({ ids, resource }: { ids: string[], resource: string }) {
   return Promise.all(ids.map(id => fetchItem({ id, resource })))
}

type Item = BoardInfo | CardInfo | Guest

function fetchItem({ id, resource }: { id: string, resource: string }): Promise<Item> {
   return new Promise(resolve => {
      const unsubscribe = db.collection(resource).doc(id).onSnapshot(doc => {
         unsubscribe()
         const item = { ...doc.data(), id: doc.id } as Item
         setItem({ resource, item })
         resolve(item)
      })
   })
}

function setItem({ resource, item }: { resource: string, item: any }) {
   switch (resource) {
      case 'boards': {
         useBoardStore().boards.push(item)
         break
      }
      case 'cards': {
         useCardStore().cards.push(item)
         break
      }
   }
}

export const setSkeletonStructure = () => {
   const boardStore = useBoardStore()
   const boardsArr = JSON.stringify(boardStore.boards.map(board => board.cards.length))
   localStorage.setItem('skeleton', boardsArr)
}

export const removeSkeletonStructure = () => {
   localStorage.removeItem('skeleton')
}

