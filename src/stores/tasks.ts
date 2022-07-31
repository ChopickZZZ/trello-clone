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
         cardObj.date = dateFormatter(card.date)
         this.cards.push(cardObj)
      }
   }
})