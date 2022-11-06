import { createRouter,createWebHistory,createWebHashHistory } from 'vue-router'

import Home from '@/pages/Form.vue'
import About from '@/pages/About.vue'
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
        path: '/',
        // component: () => import('./views/Home.vue')
        name:"home",
        component: Home,
        },
        {
            path: '/about',
            name:"about",
            component: About,
        },
    ]
})

export default router
