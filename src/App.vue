<template>
  <Header />
  <div class="game-container">
    <Figure :wrong-letters-count="wrongLetters.length" />
    <WrongLetters :wrong-letters="wrongLetters" />
    <Word :word="word" :correct-letters="correctLetters" />
  </div>
  <PopUp ref="popup" :word="word" @restart="restart" />
  <Notification ref="notification" />
</template>


<script setup lang="ts">
import Header from './components/Header.vue'
import Figure from './components/Figure.vue'
import WrongLetters from './components/WrongLetters.vue'
import Word from './components/Word.vue'
import PopUp from './components/PopUp.vue'
import Notification from './components/Notification.vue'
import { ref, watch } from 'vue'
import { useRandomWord } from './composables/useRandomWord'
import { useLetters } from './composables/useLetters'
import { useNotification } from './composables/useNotification'

const { word, getRandomWord } = useRandomWord()
const { letters, correctLetters, wrongLetters, isWin, isLose, addLetter, resetLetters } = useLetters(word)
const { notification, showNotification } = useNotification()

const popup = ref<InstanceType<typeof PopUp> | null>(null)

const restart = async () => {
  await getRandomWord()
  resetLetters()
  popup.value?.close()
}

watch(wrongLetters, () => {
  if (isLose.value) {
    popup.value?.open('lose')
  }
})

watch(correctLetters, () => {
  if (isWin.value) {
    popup.value?.open('win')
  }
})

window.addEventListener('keydown', ({ key }) => {
  if (isWin.value || isLose.value) {
    return
  }
  if (letters.value.includes(key)) {
    showNotification()
    return
  }
  addLetter(key)
})
</script>
