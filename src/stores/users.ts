import { defineStore } from "pinia";
import { useBoardStore } from "./boards";
import { useCardStore } from "./cards";
import { docToResource } from "../helpers";
import { AuthForm, User, UserToFirestore } from "../types";
import { db, auth, authInstance } from '../firebase';
import { collection, getDocs } from "firebase/firestore";

export const useUsersStore = defineStore('users', {
   state: () => ({
      authId: null as string | null,
      user: null as User | null
   }),
   actions: {
      async registerWithEmailAndPassword({ name, username, email, password, avatar }: User) {
         const result = await auth.createUserWithEmailAndPassword(email, password)
         if (result.user?.uid) {
            await this.createUser({ id: result.user?.uid, name, username, email, avatar })
         }
      },
      async signInWithEmailAndPassword({ email, password }: AuthForm) {
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
      async createUser({ id, name, username, email, avatar = null }: UserToFirestore) {
         const usernameLower = username.toLowerCase()
         email = email.toLowerCase()
         const user = { name, username, email, usernameLower, avatar }

         const userRef = db.collection('users').doc(id)
         userRef.set(user)
         const newUser = await userRef.get()
         this.user = docToResource(newUser)
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
            const user = { ...doc.data() as User, id: doc.id }
            if (this.authId === user.id) {
               this.user = user
            }
         });
      }
   }
})