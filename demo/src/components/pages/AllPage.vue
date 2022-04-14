<script lang="ts" setup>
import TasksList from '@/components/TasksList.vue'
import { useTaskStore } from '@/store/tasks'

const taskStore = useTaskStore()
</script>

<template>
    <TasksList title="All tasks" :tasks="taskStore.tasks" />
</template>
