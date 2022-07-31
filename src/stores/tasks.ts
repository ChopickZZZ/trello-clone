import { defineStore } from "pinia";
import { CardInfo } from "../types";

export const useCardStore = defineStore('cards', {
   state: () => ({
      cards: [] as CardInfo[]
   }),
   actions: {
      addCard(card: CardInfo) {
         const cardObj = { ...card }
         this.cards.push(cardObj)
      }
   }
})