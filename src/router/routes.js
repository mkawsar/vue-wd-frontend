import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Login from "@/components/auth/Login";

import HomeRoute from '@/router/Product'

const baseRoutes = [
    {
        path: '/',
        component: DefaultLayout,
        redirect: '/product/list',
        meta: {requireAuth: true}
    },
    {path: '/login', name: 'login', component: Login},
];

const routes = baseRoutes.concat(
    HomeRoute,
);

export default routes;
