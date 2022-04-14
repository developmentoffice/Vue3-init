import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import router from '@/config/router'
import TasksList from '@/components/TasksList.vue'
import type { Task } from '@/store/tasks'

interface Props {
    title?: string,
    tasks?: Task[]
}

const factory = ({ title = '', tasks = [] }: Props) => {
    return mount(TasksList, {
        global: {
            plugins: [
                createTestingPinia(),
                router
            ]
        },
        props: {
            title,
            tasks
        }
    })
}

const tasks: Task[] = [
    { id: 1, name: 'Task #1', status: 'active' },
    { id: 2, name: 'Task #2', status: 'completed' }
]

describe('TasksList', () => {
    it('Component is exists', () => {
        expect(TasksList).toBeTruthy()
    })
    it('Render title', async () => {
        const wrapper = factory({ title: 'Tasks list' })
        const title = wrapper.find('.panel-heading')
        expect(title.text()).toBe('Tasks list')
    })
    it('No tasks', () => {
        const wrapper = factory({})
        const tasks = wrapper.find('.panel-block')
        expect(tasks.text()).toBe('No tasks')
    })
    it('Render tasks', () => {
        const wrapper = factory({ tasks })
        for (let i = 0; i < tasks.length; i++) {
            expect(wrapper.findAll('.panel-block')[i].text()).toContain(tasks[i].name)
        }
    })
    it('Can edit and complete active task', () => {
        const wrapper = factory({ tasks })
        const buttons = wrapper.findAll('.panel-block')[0].findAll('button')
        expect(buttons[0].text()).toBe('Edit')
        expect(buttons[1].text()).toBe('Complete')
    })
    it('Can delete completed task', () => {
        const wrapper = factory({ tasks })
        const buttons = wrapper.findAll('.panel-block')[1].findAll('button')
        expect(buttons[0].text()).toBe('Delete')
    })
    it('Edit active task', async () => {
        const wrapper = factory({ tasks })
        let button = wrapper.findAll('.panel-block')[0].findAll('button')[0]
        expect(wrapper.find('form').exists()).not.toBe(true)
        await button.trigger('click')
        expect(wrapper.find('form').exists()).toBe(true)
        const form = wrapper.find('form')
        button = form.find('button')
        const input = form.find('input')
        const newTask: string = 'New Task #1'
        await input.setValue(newTask)
        await form.trigger('submit')
        const container = wrapper.findAll('.panel-block')
        expect(container[0].text()).toContain(newTask)
    })
})
