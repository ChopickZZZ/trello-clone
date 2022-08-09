import { defineStore } from "pinia";
import { useCardStore } from "./cards";
import { useUsersStore } from "./users";
import { BoardInfo } from '../types'
import { db, firestore } from "../firebase";
import { fetchItems } from "../helpers";

export const useBoardStore = defineStore('boards', {
   state: () => ({
      boards: [] as BoardInfo[]
   }),
   actions: {
      async addBoard(status: string): Promise<void> {
         const usersStore = useUsersStore()
         const board = {
            status,
            cards: [],
            userId: usersStore.authId,
         } as BoardInfo

         const batch = db.batch()
         const boardRef = db.collection('boards').doc()
         const userRef = db.collection('users').doc(usersStore.authId!)
         this.boards.push({ ...board, id: boardRef.id })
         usersStore.user?.boards.push(boardRef.id)

         batch.set(boardRef, board)
         batch.update(userRef, {
            boards: firestore.FieldValue.arrayUnion(boardRef.id)
         })
         await batch.commit()
      },
      async removeBoard(boardId: string): Promise<void> {
         const cardStore = useCardStore()
         const usersStore = useUsersStore()
         const batch = db.batch()
         const boardRef = db.collection('boards').doc(boardId)
         const userRef = db.collection('users').doc(useUsersStore().authId!)

         const board = this.boards.find(board => board.id === boardId)
         if (board === undefined) {
            throw TypeError('No board find in firestore')
         }

         board.cards.forEach(card => cardStore.removeCard(card))
         this.boards = this.boards.filter(board => board.id !== boardId)
         usersStore.removeBoards(boardRef.id)

         batch.delete(boardRef)
         batch.update(userRef, {
            boards: firestore.FieldValue.arrayRemove(boardRef.id)
         })
         await batch.commit()
      },
      async fetchBoards({ ids, resource }: { ids: string[] | undefined, resource: string }) {
         if (ids) {
            return fetchItems({ ids, resource })
         }
      },
      removeAllBoards() {
         this.boards.length = 0
      },
      async addCards(boardId: string, cardId: string) {
         const board = this.boards.find(board => board.id === boardId)
         if (board) {
            board.cards.push(cardId)
            const batch = db.batch()
            const boardRef = db.collection('boards').doc(boardId)
            batch.update(boardRef, {
               cards: firestore.FieldValue.arrayUnion(cardId)
            })
            await batch.commit()
         }
      },
      async removeCards(boardId: string, cardId: string) {
         const board = this.boards.find(board => board.id === boardId)
         if (board) {
            board.cards = board.cards.filter(id => id !== cardId)
            const batch = db.batch()
            const boardRef = db.collection('boards').doc(boardId)
            batch.update(boardRef, {
               cards: firestore.FieldValue.arrayRemove(cardId)
            })
            await batch.commit()
         }
      }
   }
})