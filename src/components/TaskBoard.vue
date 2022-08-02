<script setup lang="ts">
import TaskCard from "./TaskCard.vue";
import AppButton from "./AppButton.vue";
import AppModal from "../ui/AppModal.vue";
import AppDropDown from "./AppDropDown.vue";
import CardCreator from "./CardCreator.vue";
import CardEditor from "./CardEditor.vue";
import { BoardInfo, CardInfo } from '../types'
import { useCardStore } from "../stores/cards";
import { useBoardStore } from "../stores/boards";
import { ref, computed } from "vue";

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

const boardRemove = (): Promise<void> => boardStore.removeBoard(props.board.id!)

const cards = computed((): CardInfo[] => {
  return cardStore.cards.filter(card => card.boardId === props.board.id)
})

const cardEdit = (id: string): void => {
  isEditing.value = true
  cardId.value = id
  isModalOpen.value = !isModalOpen.value
}

const modalToggle = (): void => {
  isEditing.value = false
  isModalOpen.value = !isModalOpen.value
}

</script>

<template>
  <div class="board">
    <div class="board__top top-board">
      <div class="top-board__status">
        {{ props.board.status }}
        <span>{{ props.board.cards.length }}</span>
      </div>
      <button class="top-board__dropdown" @click="isDropDownOpen = !isDropDownOpen">
        <fa-icon icon="ellipsis" />
      </button>
      <AppDropDown element="board" v-if="isDropDownOpen" @remove-element="boardRemove" />
    </div>
    <div class="board__inner inner-board">
      <TaskCard v-for="card in cards" :key="card.id" :card="card" @click="cardEdit(card.id!)" />
      <AppButton @click="isModalOpen = true">Add Card</AppButton>
      <teleport to="#app">
        <AppModal v-if="isModalOpen" v-lock @modal-close="modalToggle">
          <CardEditor v-if="isEditing" :card-id="cardId" @modal-close="modalToggle" />
          <CardCreator :board-id="props.board.id!" @modal-close="isModalOpen = false" v-else />
        </AppModal>
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
</style>