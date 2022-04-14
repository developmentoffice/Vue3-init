import { defineStore } from 'pinia'

type Status = 'active' | 'completed'

export interface Task {
    id: number,
    name: string,
    status: Status
}

interface TaskStore {
    tasks: Task[]
}

export const useTaskStore = defineStore('taskStore', {
    state: (): TaskStore => ({
        tasks: []
    }),
    getters: {
        maxId(state): number {
            if (state.tasks.length === 0) return 0
            return Math.max(...state.tasks.map((el: Task): number => el.id))
        },
        activeTasks(state): Task[] {
            return state.tasks.filter((el: Task): boolean => el.status === 'active')
        },
        completedTasks(state): Task[] {
            return state.tasks.filter((el: Task): boolean => el.status === 'completed')
        }
    },
    actions: {
        save(tasks: Task[]): boolean {
            if (localStorage) {
                localStorage.setItem('vue3_init_tasks', JSON.stringify(tasks))
                return true
            }
            return false
        },
        getTasks(): Task[] | null {
            if (!localStorage) return null
            const tasks: string = localStorage.getItem('vue3_init_tasks') || ''
            try {
                const json: Task[] = JSON.parse(tasks)
                return json
            } catch(e) {
                return null
            }
        },
        addTask(task: Task): boolean {
            this.tasks.push(task)
            return this.save(this.tasks)
        },
        updateTask(task: Task): boolean {
            this.tasks = this.tasks.map((el: Task): Task => {
                if (el.id === task.id) el.name = task.name
                return el
            })
            return this.save(this.tasks)
        },
        deleteTask(id: number): boolean {
            this.tasks = this.tasks.filter((el: Task): boolean => el.id !== id)
            return this.save(this.tasks)
        },
        completeTask(id: number): boolean {
            this.tasks = this.tasks.map((el: Task): Task => {
                if (el.id === id) el.status = 'completed'
                return el
            })
            return this.save(this.tasks)
        }
    }
})
