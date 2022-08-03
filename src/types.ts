export interface BoardInfo {
   id?: string
   status: string,
   cards: string[],
}

export interface CardInfo {
   id?: string,
   title: string,
   description?: string,
   date: string,
   labels?: Label[],
   tasks?: Task[]
   boardId: string
}

export interface Label {
   text: string,
   color: string
}

export interface Task {
   text: string,
   isDone: boolean
}

export interface User {
   name: string,
   username: string,
   email: string,
   password: string,
   avatar: string
}

export interface UserToFirestore {
   id: string
   name: string,
   username: string,
   email: string,
   avatar: string | null,
   usernameLower?: string
}

export interface AuthForm {
   email: '',
   password: ''
}