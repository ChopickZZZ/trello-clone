import { useCardStore } from "../stores/cards";
import { useBoardStore } from "../stores/boards";
import { setSkeletonStructure } from "../helpers";

export function pickUpBoard(event: DragEvent, boardId: string) {
   pickUpItem(event, 'board', boardId)
}

export function pickUpCard(event: DragEvent, cardId: string) {
   pickUpItem(event, 'card', cardId)
}

function pickUpItem(event: DragEvent, type: string, itemId: string) {
   if (event.dataTransfer !== null) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData(`from-${type}-id`, itemId)
      event.dataTransfer.setData('type', type)
   }
}

export function moveCardOrBoard(event: DragEvent, toBoardId: string, cardId: string | null = null) {
   const type = event.dataTransfer?.getData('type')
   if (type === 'card') {
      moveCard(event, toBoardId, cardId)
   }
   else { moveBoard(event, toBoardId) }
   setSkeletonStructure()
}

function moveBoard(event: DragEvent, toBoardId: string) {
   if (event.dataTransfer !== null) {
      const fromBoardId = event.dataTransfer.getData('from-board-id')
      useBoardStore().moveBoard({ fromBoardId, toBoardId })
   }
}

function moveCard(event: DragEvent, toBoardId: string, toCardId: string | null = null) {
   if (event.dataTransfer !== null) {
      const fromCardId = event.dataTransfer.getData('from-card-id')
      useCardStore().moveCard({ fromCardId, toCardId, toBoardId })
   }
}