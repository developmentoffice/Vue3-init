import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw, Router } from 'vue-router'

export const routes: RouteRecordRaw[] = [
]

const router: Router = createRouter({
    history: createWebHashHistory(),
    linkExactActiveClass: 'is-active',
    routes
})

router.beforeEach((to, from) => {
    if (to.meta.title && typeof to.meta.title === 'string') {
        document.title = to.meta.title
    } else  {
        document.title = 'Vue3'
    }
})

export default router
