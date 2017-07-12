import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default () => {
    return new VueRouter({
        mode: 'history',
        linkActiveClass: 'is-active',
        routes: [
            {
                name: 'home',
                path: '/',
                component: resolve => require(['./pages/FrontPage.vue'], resolve)
            },
            {
                name: 'user',
                path: '/user/:userID',
                component: resolve => require(['./pages/User.vue'], resolve)
            }
        ]
    });
};
