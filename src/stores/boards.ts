import { defineStore } from "pinia";
import { useCardStore } from "./cards";
import { useUserStore } from "./users";
import { BoardInfo } from '../types'
import { db, firestore } from "../firebase";
import { fetchItems } from "../helpers";

export const useBoardStore = defineStore('boards', {
   state: () => ({
      boards: [] as BoardInfo[]
   }),
   actions: {
      async addBoard(status: string): Promise<void> {
         const userStore = useUserStore()
         const board = {
            status,
            cards: [],
            userId: userStore.authId,
         } as BoardInfo

         const batch = db.batch()
         const boardRef = db.collection('boards').doc()
         const userRef = db.collection('users').doc(userStore.authId!)
         this.boards.push({ ...board, id: boardRef.id })
         userStore.user?.boards?.push(boardRef.id)

         batch.set(boardRef, board)
         batch.update(userRef, {
            boards: firestore.FieldValue.arrayUnion(boardRef.id)
         })
         await batch.commit()
      },
      async removeBoard(boardId: string): Promise<void> {
         const cardStore = useCardStore()
         const userStore = useUserStore()
         const batch = db.batch()
         const boardRef = db.collection('boards').doc(boardId)
         const userRef = db.collection('users').doc(useUserStore().authId!)

         const board = this.boards.find(board => board.id === boardId)
         if (board === undefined) {
            throw TypeError('No board find in firestore')
         }

         board.cards.forEach(card => cardStore.removeCard(card))
         this.boards = this.boards.filter(board => board.id !== boardId)
         userStore.removeBoards(boardRef.id)

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
      moveBoard({ fromBoardId, toBoardId }: { fromBoardId: string, toBoardId: string }) {
         const userStore = useUserStore()
         const fromBoardIdx = this.boards.findIndex(board => board.id === fromBoardId)
         const ToBoardIdx = this.boards.findIndex(board => board.id === toBoardId)
         if (fromBoardIdx === undefined || ToBoardIdx === undefined) {
            throw TypeError('Board is not found in store')
         }
         const boardToMove = this.boards.splice(fromBoardIdx, 1)[0]
         this.boards.splice(ToBoardIdx, 0, boardToMove)
         const boardIds = this.boards.map(board => board.id!)
         userStore.setBoards(boardIds)
      },
      async addCards(boardId: string, cardId: string, toCardId: string | null = null) {
         const board = this.boards.find(board => board.id === boardId)
         if (toCardId) {
            const toCardIdx = board?.cards.findIndex(id => id === toCardId)
            board?.cards.splice(toCardIdx! + 1, 0, cardId)
         }
         else board?.cards.push(cardId)

         const batch = db.batch()
         const boardRef = db.collection('boards').doc(boardId)
         batch.update(boardRef, {
            cards: board?.cards
         })
         await batch.commit()
      },
      async removeCards(boardId: string, cardId: string) {
         const board = this.boards.find(board => board.id === boardId)
         if (board === undefined) {
            throw TypeError('no board found in store')
         }
         board.cards = board.cards.filter(id => id !== cardId)

         const batch = db.batch()
         const boardRef = db.collection('boards').doc(boardId)
         batch.update(boardRef, {
            cards: firestore.FieldValue.arrayRemove(cardId)
         })
         await batch.commit()
      }
   }
})