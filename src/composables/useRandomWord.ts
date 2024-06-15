import { getRandomName } from "@/api/GetRandomName"
import { ref } from "vue"

export const useRandomWord = () => {
    const word = ref('')
    const getRandomWord = async () => {
        try {
            const name = await getRandomName()
            word.value = name.toLowerCase()
        } catch (error) {
            console.error('Ошибка при выполнении запроса', error)
            word.value = ''
        }
    }
    getRandomWord()

    return { word, getRandomWord }
}