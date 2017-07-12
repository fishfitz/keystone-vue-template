import routes from './routes';
import createStore from './store/';
import createVue from './createVue';
import './plugins/';

export default function createApp(context = {}) {
    const router = routes();
    const store = createStore();
    const app = createVue({router, store});

    return new Promise((resolve, reject) => {
        store.dispatch('config/FETCH_CONFIG').then(() => {
            if (context.url) router.push(context.url);
            if (context.activeUser) store.commit('auth/SET_ACTIVE_USER', context.activeUser);
            router.onReady(() => {
                const matchedComponents = router.getMatchedComponents();
                Promise.all(matchedComponents.map(({asyncData}) => {
                    if (asyncData) {
                        return asyncData({
                            store,
                            route: router.currentRoute
                        });
                    }
                })).then(() => {
                    context.state = store.state;
                    resolve(app);
                });
            });
        });
    });
}
