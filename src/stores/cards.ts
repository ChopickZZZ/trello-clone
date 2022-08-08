import { useBoardStore } from './boards';
import { db, firestore } from '../firebase';
import { defineStore } from "pinia";
import { CardInfo } from "../types";
import { fetchItems } from '../helpers';

export const useCardStore = defineStore('cards', {
   state: () => ({
      cards: [] as CardInfo[]
   }),
   getters: {
      getCard(state) {
         return (id: string): CardInfo => {
            const neededCard = state.cards.find(card => card.id === id)
            if (neededCard === undefined) {
               throw new TypeError('No card found in state');
            }
            return neededCard
         }
      }
   },
   actions: {
      async addCard(card: CardInfo): Promise<void> {
         const batch = db.batch()
         const cardRef = db.collection('cards').doc()
         const boardRef = db.collection('boards').doc(card.boardId)
         const boardStore = useBoardStore()

         this.cards.push({ ...card, id: cardRef.id })
         batch.set(cardRef, { ...card })
         batch.update(boardRef, {
            cards: firestore.FieldValue.arrayUnion(cardRef.id)
         })
         boardStore.addCards(card.boardId, cardRef.id)
         await batch.commit()
      },
      async removeCard(cardId: string): Promise<void> {
         const card = this.cards.find(card => card.id === cardId)
         if (card === undefined) {
            throw TypeError('No card found in firestore')
         }
         const batch = db.batch()
         const cardRef = db.collection('cards').doc(cardId)
         const boardRef = db.collection('boards').doc(card.boardId)
         const boardStore = useBoardStore()

         this.cards = this.cards.filter(card => card.id !== cardId)
         boardStore.removeCards(card.boardId, cardRef.id)

         batch.delete(cardRef)
         batch.update(boardRef, {
            cards: firestore.FieldValue.arrayRemove(cardRef.id)
         })
         await batch.commit()
      },
      async editCard(card: CardInfo) {
         const cardObj = { ...card }
         const batch = db.batch()
         const cardRef = db.collection('cards').doc(card.id)

         const oldCardIndex = this.cards.findIndex(card => card.id === cardObj.id)
         this.cards[oldCardIndex] = cardObj

         batch.update(cardRef, { ...cardObj })
         await batch.commit()
      },
      async fetchCards({ ids, resource }: { ids: string[], resource: string }) {
         return fetchItems({ ids, resource })
      },
      removeAllCards(): void {
         this.cards.length = 0
      },
   }
})