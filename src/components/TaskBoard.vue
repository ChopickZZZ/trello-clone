<script setup lang="ts">
import TaskCard from "./TaskCard.vue";
import AppButton from "./AppButton.vue";
import AppModal from "./modal/AppModal.vue";
import AppDropDown from "./AppDropDown.vue";
import CardCreator from "./modal/CardCreator.vue";
import CardEditor from "./modal/CardEditor.vue";
import { BoardInfo, CardInfo } from '../types'
import { useCardStore } from "../stores/cards";
import { useBoardStore } from "../stores/boards";
import { ref, computed } from "vue";
import { pickUpBoard, moveCardOrBoard } from '../use/dragAndDrop'
import { setSkeletonStructure } from "../helpers";

interface Props {
  board: BoardInfo
}
const props = defineProps<Props>()
const boardStore = useBoardStore()
const cardStore = useCardStore()

const isModalOpen = ref(false)
const isDropDownOpen = ref(false)
const isEditing = ref(false)
const cardId = ref('')

const cards = computed((): CardInfo[] | Array<any> => {
  return props.board.cards.map(cardId => {
    return cardStore.cards.find(card => card.id === cardId)
  })
})

const modalToggle = (): void => {
  isEditing.value = false
  isModalOpen.value = !isModalOpen.value
}

const boardRemove = (): void => {
  boardStore.removeBoard(props.board.id!)
  setSkeletonStructure()
}
const cardEdit = (id: string): void => {
  isEditing.value = true
  cardId.value = id
  isModalOpen.value = true
}
</script>

<template>
  <div class="board" draggable="true" @dragstart.self="pickUpBoard($event, props.board.id!)"
    @drop="moveCardOrBoard($event, props.board.id!)" @dragover.prevent @dragenter.prevent
    v-page-scroll="() => (isDropDownOpen = false)">
    <div class="board__top top-board">
      <div class="top-board__status">
        {{ props.board.status }}
        <span>{{ props.board.cards.length }}</span>
      </div>
      <button class="top-board__dropdown" @click="isDropDownOpen = !isDropDownOpen"
        v-click-outside="() => (isDropDownOpen = false)">
        <fa-icon icon="ellipsis" />
      </button>
      <Transition name="fade-down">
        <AppDropDown v-if="isDropDownOpen" @handler="boardRemove">Delete Board</AppDropDown>
      </Transition>
    </div>
    <div class="board__inner inner-board">
      <TransitionGroup tag="div" name="list">
        <TaskCard v-for="card in cards" :key="card.id" :card="card" @click="cardEdit(card.id!)"
          @drop.stop="moveCardOrBoard($event, props.board.id!, card.id)" />
      </TransitionGroup>
      <AppButton @click="isModalOpen = true">Add Card</AppButton>
      <teleport to="body">
        <Transition name="fade">
          <AppModal v-if="isModalOpen" v-lock @modal-close="modalToggle">
            <component :is="isEditing ? CardEditor : CardCreator" :card-id="cardId" :board-id="props.board.id!"
              @modal-close="modalToggle" />
          </AppModal>
        </Transition>
      </teleport>
    </div>
  </div>
</template>

<style scoped>
.board {
  position: relative;
  width: 35rem;
  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(5px);
  padding: 1.8rem;
  border-radius: 0.3rem;
}

.board__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
}

.top-board__status {
  font-size: 1.8rem;
  font-weight: 700;
  color: #000;
}

.top-board__dropdown {
  font-size: 1.8rem;
  cursor: pointer;
}

.top-board__status span {
  color: rgb(94, 94, 94);
}

.board__inner {
  padding: 1.3rem;
  background-color: #fff;
  border-radius: 0.5rem;
  max-height: 60rem;
  overflow: auto;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-leave-active {
  position: absolute;
}
</style>