import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { defineStore } from 'pinia'
import AddTodo from '@/components/AddTodo.vue'
import { useTaskStore } from '@/store/tasks'

const wrapper = mount(AddTodo, {
    global: {
        plugins: [
            createTestingPinia({
                stubActions: false
            })
        ]
    }
})

describe('AddTodo', () => {
    it('Component is exists', () => {
        expect(AddTodo).toBeTruthy()
    })
    it('Add task', async () => {
        const taskStore = useTaskStore()
        const newTask: string = 'New Task'
        await wrapper.get('input').setValue(newTask)
        await wrapper.find('form').trigger('submit')

        expect(taskStore.addTask).toHaveBeenCalledTimes(1)
    })
})
