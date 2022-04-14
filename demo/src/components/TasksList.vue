<script lang="ts" setup>
import { useTaskStore } from '@/store/tasks'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { Task } from '@/store/tasks'

const taskStore = useTaskStore()

interface Props {
    title: string,
    tasks: Task[]
}
const props = defineProps<Props>()

const editTask: Ref<Task | null> = ref(null)
const taskToDel: Ref<number> = ref(0)

async function startEdit(task: Task) {
    editTask.value = task
}
function save() {
    if (!editTask.value) return
    taskStore.updateTask(editTask.value)
    editTask.value = null
}
function delTask(id: number) {
    taskStore.deleteTask(id)
    taskToDel.value = 0
}
</script>

<template>
    <div class="panel">
        <p class="panel-heading">{{ title }}</p>
        <p class="panel-block" v-if="tasks.length === 0">No tasks</p>
        <div
            class="panel-block"
            :class="{
                'has-background-success-light': (task.status === 'completed' && $route.name === 'all'),
                'is-block': editTask,
                'is-flex is-justify-content-space-between': (!editTask || (editTask && editTask.id !== task.id))
            }"
            v-for="task in tasks"
            :key="task.id"
        >
            <form class="field has-addons" v-if="editTask && editTask.id === task.id" @submit.prevent="save">
                <div class="control is-expanded has-icons-right">
                    <input class="input" type="text" v-model="editTask!.name">
                    <span class="icon is-small is-right is-clickable" @click="editTask = null">
                        <img src="~@/images/close.svg" alt="">
                    </span>
                </div>
                <div class="control">
                    <button class="button is-info">Save</button>
                </div>
            </form>
            <template v-else>
                {{ task.name }}
            </template>
            <div v-if="!editTask || (editTask && editTask.id !== task.id)">
                <template v-if="task.status === 'active'">
                    <button class="button" @click="startEdit(task)">Edit</button>
                    <button
                        class="button is-success"
                        @click="taskStore.completeTask(task.id)"
                    >Complete</button>
                </template>
                <button
                    class="button is-danger"
                    type="button"
                    @click="taskToDel = task.id"
                    v-if="task.status === 'completed'"
                >Delete</button>
            </div>
        </div>
        <div class="modal is-active" v-if="taskToDel > 0">
            <div class="modal-background" @click="taskToDel = 0"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Delete task?</p>
                    <button class="delete" @click="taskToDel = 0"></button>
                </header>
                <footer class="modal-card-foot">
                    <button class="button is-danger" @click="delTask(taskToDel)">yes</button>
                    <button class="button" @click="taskToDel = 0">no</button>
                </footer>
            </div>
        </div>
    </div>
</template>
