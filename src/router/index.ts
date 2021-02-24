import { createWebHistory, createRouter } from 'vue-router'
import Home from '/@/pages/Home.vue'
import About from '/@/pages/About.vue'
import ImageJS from '/@/pages/ImageJS.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
	path: '/image-js',
	name: 'image-js',
	component: ImageJS
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
