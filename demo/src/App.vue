<script lang="ts" setup>
import NavBar from '@/components/NavBar.vue'
import AddTodo from '@/components/AddTodo.vue'
import { useTaskStore } from '@/store/tasks'
import type { Task } from '@/store/tasks'

const taskStore = useTaskStore()
const tasks: Task[] | null = taskStore.getTasks()
if (tasks) {
    taskStore.tasks = tasks
}
</script>

<template>
    <NavBar />
    <section class="section">
        <h1 class="title">Another one ToDo list application</h1>
        <h2 class="subtitle">
            Demo for <strong>vue3-init</strong> boilerplate
        </h2>
        <div class="container">
            <AddTodo />
            <router-view :key="$route.path" />
        </div>
    </section>
    <footer class="footer">
        <div class="content has-text-centered">
            <p>
                <strong>ToDo demo application</strong> by Alex Novikov.
            </p>
        </div>
    </footer>
</template>
