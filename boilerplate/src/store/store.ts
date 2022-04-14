import { defineStore } from 'pinia'

interface Store {
    counter: number
}

export const useStore = defineStore('store', {
    state: (): Store => ({
        counter: 0
    }),
    getters: {
    },
    actions: {
    }
})
