import { defineStore } from "pinia";
import { CardInfo } from "../types";
import { dateFormatter } from "../use/date";

export const useCardStore = defineStore('cards', {
   state: () => ({
      cards: [] as CardInfo[]
   }),
   actions: {
      addCard(card: CardInfo) {
         const cardObj = { ...card }
         if (cardObj.date) {
            cardObj.date = dateFormatter(card.date)
         }
         this.cards.push(cardObj)
      },
      removeCard(cardId: string) {
         this.cards = this.cards.filter(card => card.id !== cardId)
      },
      removeCardsFromBoard(boardId: string) {
         this.cards = this.cards.filter(card => card.boardId !== boardId)
      }
   }
})