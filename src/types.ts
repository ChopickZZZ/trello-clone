export interface BoardInfo {
   id?: string,
   status: string,
   cardsAmount?: number
}

export interface CardInfo {
   id: string,
   theme: string,
   title: string,
   description?: string,
   labels?: string[],
   tasks?: string[]
   boardId: string
}