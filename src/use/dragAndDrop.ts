import { useCardStore } from "../stores/cards";
import { useBoardStore } from "../stores/boards";

export function pickUpBoard(event: Event & { dataTransfer: any; }, boardId: string) {
   event.dataTransfer.effectAllowed = 'move'
   event.dataTransfer.dropEffect = 'move'

   event.dataTransfer.setData('from-board-id', boardId)
   event.dataTransfer.setData('type', 'board')
}

export function pickUpCard(event: { dataTransfer: any; }, cardId: string) {
   event.dataTransfer.effectAllowed = 'move'
   event.dataTransfer.dropEffect = 'move'

   event.dataTransfer.setData('from-card-id', cardId)
   event.dataTransfer.setData('type', 'card')
}

export function moveCardOrBoard(event: Event & { dataTransfer: any; }, toBoardId: string, cardId: string | null = null) {
   const type = event.dataTransfer.getData('type')
   if (type === 'card') {
      moveCard(event, toBoardId, cardId)
   }
   else { moveBoard(event, toBoardId) }
}

function moveBoard(event: Event & { dataTransfer: any; }, toBoardId: string) {
   const fromBoardId = event.dataTransfer.getData('from-board-id')
   useBoardStore().moveBoard({ fromBoardId, toBoardId })
}

function moveCard(event: Event & { dataTransfer: any; }, toBoardId: string, toCardId: string | null = null) {
   const fromCardId: string = event.dataTransfer.getData('from-card-id')
   useCardStore().moveCard({ fromCardId, toCardId, toBoardId })
}