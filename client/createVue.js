import Vue from 'vue';
import AppRoot from './App.vue';

export default function({router, store}) {
    return new Vue({
        components: { AppRoot },
        router,
        store,
        render(create) {
            return create('div', {domProps: {id: 'app'}}, [
                create('app-root', [
                    create('router-view')
                ])
            ]);
        }
    });
}
