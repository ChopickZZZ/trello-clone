import { defineStore } from "pinia";
import { CardInfo } from "../types";

export const useCardStore = defineStore('cards', {
   state: () => ({
      cards: [] as CardInfo[]
   }),
   getters: {
      getCard(state) {
         return (id: string) => {
            const neededCard = state.cards.find(card => card.id === id)
            if (neededCard === undefined) {
               throw new TypeError('No card found in state');
            }
            return neededCard
         }
      }
   },
   actions: {
      addCard(card: CardInfo) {
         const cardObj = { ...card }
         this.cards.push(cardObj)
      },
      removeCard(cardId: string) {
         this.cards = this.cards.filter(card => card.id !== cardId)
      },
      editCard(card: CardInfo) {
         const cardObj = { ...card }
         const oldCardIndex = this.cards.findIndex(card => card.id === cardObj.id)
         this.cards[oldCardIndex] = cardObj
      },
      removeCardsFromBoard(boardId: string) {
         this.cards = this.cards.filter(card => card.boardId !== boardId)
      }
   }
})