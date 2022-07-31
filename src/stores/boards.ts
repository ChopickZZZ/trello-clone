import { defineStore } from "pinia";
import { BoardInfo } from '../types'

export const useBoardStore = defineStore('boards', {
   state: () => ({
      boards: [] as BoardInfo[]
   }),
   getters: {
      boardsAmount: state => state.boards.length
   },
   actions: {
      addBoard({ status }: BoardInfo) {
         const cardsAmount = 0
         const id = 'b' + Math.random()
         const board = {
            id,
            status,
            cardsAmount
         }

         this.boards.push(board)
         console.log(this.boards)
      }
   }
})