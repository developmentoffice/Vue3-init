<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'

const toggleMobileNav: Ref<boolean> = ref(false)
</script>


<template>
    <nav class="navbar is-fixed-top is-dark">
        <div class="navbar-brand">
            <router-link class="navbar-item" exact-active-class="" to="/">
                <img src="~@/images/todo.svg" alt="">
            </router-link>
            <a
                class="navbar-burger"
                :class="{ 'is-active': toggleMobileNav }"
                @click.prevent="toggleMobileNav = !toggleMobileNav"
                href="#"
            >
                <span></span>
                <span></span>
                <span></span>
            </a>
        </div>
        <div
            class="navbar-menu"
            :class="{ 'is-active': toggleMobileNav }"
        >
            <div class="navbar-start">
                <router-link class="navbar-item" to="/">
                    All
                </router-link>
                <router-link class="navbar-item" to="/active">
                    Active
                </router-link>
                <router-link class="navbar-item" to="/completed">
                    Completed
                </router-link>
            </div>
        </div>
    </nav>
</template>
