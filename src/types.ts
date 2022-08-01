export interface BoardInfo {
   id: string,
   status: string,
   cards: string[]
}

export interface CardInfo {
   id: string,
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
