import { defineStore } from "pinia";
import { BoardInfo } from '../types'
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const useBoardStore = defineStore('boards', {
   state: () => ({
      boards: [] as BoardInfo[]
   }),
   getters: {
      boardsAmount: state => state.boards.length,
      getBoards: state => state.boards
   },
   actions: {
      async addBoard(status: string) {
         const board = {
            status,
            cards: []
         } as BoardInfo

         const batch = db.batch()
         const boardRef = db.collection('boards').doc()
         this.boards.push({ ...board, id: boardRef.id })

         batch.set(boardRef, board)
         await batch.commit()
      },
      async removeBoard(boardId: string) {
         const batch = db.batch()
         const boardRef = db.collection('boards').doc(boardId)

         this.boards = this.boards.filter(board => board.id !== boardId)

         batch.delete(boardRef)
         await batch.commit()
      },
      async fetchBoards() {
         const querySnapshot = await getDocs(collection(db, "boards"));
         querySnapshot.forEach((doc) => {
            const board = { ...doc.data() as BoardInfo, id: doc.id }
            this.boards.push(board)
         });
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