import { useBoardStore } from './boards';
import { db } from '../firebase';
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
         const boardStore = useBoardStore()

         this.cards.push({ ...card, id: cardRef.id })
         batch.set(cardRef, { ...card })
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
         const boardStore = useBoardStore()

         this.cards = this.cards.filter(card => card.id !== cardId)
         boardStore.removeCards(card.boardId, cardRef.id)

         batch.delete(cardRef)
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
      async moveCard({ fromCardId, toCardId, toBoardId }: { fromCardId: string, toCardId: string | null, toBoardId: string }) {
         const card = this.cards.find(card => card.id === fromCardId)
         if (card === undefined) {
            throw TypeError('No card found in store')
         }
         if (card.boardId !== toBoardId) {
            this.moveCardtoAnotherBoard({ card, fromCardId, toCardId, toBoardId })
         }
         else {
            this.switchCards({ fromCardId, toCardId, toBoardId })
         }
      },
      async switchCards({ fromCardId, toCardId, toBoardId }: { fromCardId: string, toCardId: string | null, toBoardId: string }) {
         const board = useBoardStore().boards.find(board => board.id === toBoardId)
         if (board === undefined) {
            throw TypeError('no board found in store')
         }
         const fromCardIdx = board.cards.findIndex(id => id === fromCardId)
         const toCardIdx = board.cards.findIndex(id => id === toCardId)
         const cardToMove = board.cards.splice(fromCardIdx, 1)[0]
         board.cards.splice(toCardIdx, 0, cardToMove!)

         const batch = db.batch()
         const boardRef = db.collection('boards').doc(toBoardId)
         batch.update(boardRef, {
            cards: board.cards
         })
         await batch.commit()
      },
      async moveCardtoAnotherBoard({ card, fromCardId, toCardId, toBoardId }: { card: CardInfo, fromCardId: string, toCardId: string | null, toBoardId: string }) {
         useBoardStore().removeCards(card.boardId, fromCardId)
         useBoardStore().addCards(toBoardId, fromCardId, toCardId)
         card.boardId = toBoardId
         const batch = db.batch()
         const cardRef = db.collection('cards').doc(fromCardId)
         batch.update(cardRef, {
            boardId: toBoardId
         })
         await batch.commit()
      },
      removeAllCards(): void {
         this.cards.length = 0
      },
   }
})