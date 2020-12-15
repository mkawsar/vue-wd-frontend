import Vue from 'vue';
import routes from './routes';
import Router from 'vue-router';

Vue.use(Router);

const router = createRouter();

router.beforeEach((to, from, next) => {
    NProgress.start();
    NProgress.set(0.1);
    if (to.meta.requireAuth) {
        const token = window.localStorage.getItem('token');
        let user = JSON.parse(window.localStorage.getItem('user'));
        if (!token) {
            next({path: '/login'});
            return false;
        } else {
            next();
        }
    }
    next();
});

router.afterEach((to, from) => {
    setTimeout(() => NProgress.done(), 500);
});

export default router

function createRouter() {
    const router = new Router({
        mode: 'history',
        routes,
        linkActiveClass: 'active'
    });

    return router
}
