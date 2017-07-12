import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import config from './config';
import users from './users';
import posts from './posts';

Vue.use(Vuex);

export default function() {
    return new Vuex.Store({
        modules: {
            auth: auth(),
            config: config(),
            users: users(),
            posts: posts()
        }
    });
}
