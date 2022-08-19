import { defineStore } from "pinia";
import { useBoardStore } from "./boards";
import { useCardStore } from "./cards";
import { docToResource } from "../helpers";
import { Guest, UserToFirestore } from "../types";
import { db, auth, authInstance, User, Unsubscribe } from '../firebase';
import { collection, getDocs } from "firebase/firestore";

export const useUserStore = defineStore('users', {
   state: () => ({
      authId: null as string | null,
      user: null as Guest | null,
      authObserverUnsubscribe: null as Unsubscribe | null
   }),
   actions: {
      initAuthentication() {
         if (this.authObserverUnsubscribe) {
            this.authObserverUnsubscribe()
         }
         return new Promise<User | null>(resolve => {
            const unsubscribe = auth.onAuthStateChanged(user => {
               if (user) {
                  this.fetchAuthUser()
                  resolve(user)
               }
               else resolve(null)
            })
            this.authObserverUnsubscribe = unsubscribe
         })
      },
      async registerWithEmailAndPassword({ name, username, email, password, avatar }: Guest) {
         const result = await auth.createUserWithEmailAndPassword(email, password!)
         if (result.user?.uid) {
            await this.createUser({ id: result.user?.uid, name, username, email, avatar })
         }
      },
      async signInWithEmailAndPassword({ email, password }: { email: string, password: string }) {
         return auth.signInWithEmailAndPassword(email, password)
      },
      async signInWithGoogle() {
         const provider = new authInstance.GoogleAuthProvider()
         const response = await auth.signInWithPopup(provider)
         const user = response.user
         if (!user) {
            throw TypeError('Google authentication failed')
         }
         const userRef = db.collection('users').doc(user.uid)
         const userDoc = await userRef.get()
         if (!userDoc.exists) {
            await this.createUser({ id: user.uid, name: user.displayName!, email: user.email!, username: user.email!, avatar: user.photoURL })
         }
      },
      async signOut() {
         await auth.signOut()
         this.authId = this.user = null
         useBoardStore().removeAllBoards()
         useCardStore().removeAllCards()
      },
      async createUser({ id, name, username, email, avatar = '' }: Partial<Guest>) {
         const usernameLower = username?.toLowerCase()
         email = email?.toLowerCase()
         const user = { name, username, email, usernameLower, avatar, boards: [] } as UserToFirestore

         const userRef = db.collection('users').doc(id)
         userRef.set(user)
         const newUser = await userRef.get()
         this.user = docToResource(newUser) as Guest
      },
      fetchAuthUser() {
         const userId = auth.currentUser?.uid
         if (!userId) return
         this.authId = userId
      },
      async fetchUser() {
         if (!this.authId) return
         const querySnapshot = await getDocs(collection(db, "users"));
         querySnapshot.forEach((doc) => {
            const user = { ...doc.data() as Guest, id: doc.id }
            if (this.authId === user.id) {
               this.user = user
            }
         });
      },
      async setBoards(boards: string[]) {
         if (this.user) {
            this.user.boards = boards
            const batch = db.batch()
            const userRef = db.collection('users').doc(this.authId!)
            batch.update(userRef, { boards })
            await batch.commit()
         }
      },
      removeBoards(boardId: string) {
         if (this.user) {
            this.user.boards = this.user.boards?.filter(id => id !== boardId)
         }
      }
   }
})