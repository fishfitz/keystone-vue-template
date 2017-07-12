import routes from './routes';
import createStore from './store/';
import routerHooks from './plugins/router-hooks';
import createVue from './createVue';
import './plugins/';

export default function createApp() {
    const router = routes();
    const store = createStore();
    const app = createVue({router, store});

    return new Promise((resolve, reject) => {
        store.replaceState(window.__INITIAL_STATE__);
        router.onReady(() => {
            routerHooks(router, store);
            resolve(app);
        });
    });
}

createApp().then(app => app.$mount('#app'));
