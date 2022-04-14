<script lang="ts" setup>
import TasksList from '@/components/TasksList.vue'
import { useTaskStore } from '@/store/tasks'

const taskStore = useTaskStore()
</script>

<template>
    <TasksList title="Completed tasks" :tasks="taskStore.completedTasks" />
</template>
