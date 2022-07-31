import { defineStore } from "pinia";
import { CardInfo } from "../types";

export const useCardStore = defineStore('cards', {
   state: () => ({
      cards: [] as CardInfo[]
   })
})