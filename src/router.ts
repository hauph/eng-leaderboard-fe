import { createRouter, createWebHashHistory } from 'vue-router';
import AdminPage from './pages/Admin/Admin.vue';
import HomePage from './pages/Home/Home.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: HomePage,
        },
        {
            path: '/admin',
            component: AdminPage,
            // meta: { requiresAuth: true }, // Add a meta field for authentication
        },
    ],
});

export default router;