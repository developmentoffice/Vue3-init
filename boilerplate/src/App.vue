<script lang="ts" setup>
import { useStore } from '@/store/store'

const store = useStore()
</script>

<template>
    <router-view :key="$route.path" />
</template>
