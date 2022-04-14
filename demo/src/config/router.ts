import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw, Router } from 'vue-router'

import AllPage from '@/components/pages/AllPage.vue'
import ActivePage from '@/components/pages/ActivePage.vue'
import CompletedPage from '@/components/pages/CompletedPage.vue'
import NotFoundPage from '@/components/pages/NotFoundPage.vue'

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'all',
        component: AllPage,
        meta: {
            title: 'All'
        }
    },
    {
        path: '/active',
        name: 'active',
        component: ActivePage,
        meta: {
            title: 'Active'
        }
    },
    {
        path: '/completed',
        name: 'completed',
        component: CompletedPage,
        meta: {
            title: 'Completed'
        }
    },
    {
        path: '/:pathMatch(.*)',
        component: NotFoundPage
    }
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
        document.title = 'ToDo List'
    }
})

export default router
