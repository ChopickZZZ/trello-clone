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
      addBoard(status: string) {
         const id = 'b' + Math.random()
         const boardObj = {
            id,
            status,
            cards: []
         } as BoardInfo
         this.boards.push(boardObj)
      },
      removeBoard(boardId: string) {
         this.boards = this.boards.filter(board => board.id !== boardId)
      },
      addCardsCount(boardId: string, cardId: string) {
         const board = this.boards.find(board => board.id === boardId)
         if (board) {
            board.cards.push(cardId)
         }
      },
      decreaseCardsCount(boardId: string, cardId: string) {
         const board = this.boards.find(board => board.id === boardId)
         if (board) {
            board.cards = board.cards.filter(id => id !== cardId)
         }
      }
   }
})