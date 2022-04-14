<script lang="ts" setup>
import { ref } from 'vue'
import { useTaskStore } from '@/store/tasks'
import type { Ref } from 'vue'
import type { Task } from '@/store/tasks'

const task: Ref<string> = ref('')
const taskStore = useTaskStore()

function addTask() {
    if (task.value.length === 0) return
    const id: number = taskStore.maxId + 1
    const newTask: Task = {
        id,
        name: task.value,
        status: 'active'
    }
    taskStore.addTask(newTask)
    task.value = ''
}
</script>

<template>
    <div class="panel">
        <p class="panel-heading">
            Add task
        </p>
        <div class="panel-block">
            <form class="control" @submit.prevent="addTask">
                <input class="input" type="text" placeholder="Task name" v-model="task">
            </form>
        </div>
    </div>
</template>
