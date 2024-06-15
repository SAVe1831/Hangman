<template>
    <div v-show="isVisible" class="popup-container">
        <div v-if="gameStatus === 'win'" class="popup-win">
            <h2 >Поздравляем, Вы победили! 😃</h2>
            <button @click="emit('restart')">Сыграть еще раз</button>
        </div>
        <div v-else-if="gameStatus === 'lose'" class="popup-lose">
            <h2>К сожалению, Вы проиграли. 😕</h2>
            <h3>Загаданное имя: {{ word }}</h3>
            <button @click="emit('restart')">Сыграть еще раз</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { GameStatus } from '../types/GameStatus'

interface Props {
    word: string
}

defineProps<Props>()

const gameStatus = ref<GameStatus | null>(null)

const isVisible = ref(false)

const open = (status: GameStatus) => {
    gameStatus.value = status
    isVisible.value = true
}
const close = () => {
    isVisible.value = false
}

defineExpose({
    open,
    close
})

const emit = defineEmits<{
    (e: 'restart'): void
}>()
</script>