<template>
    <nav class="nav">
        <div class="container">
            <div class="nav-left">
                <router-link class="nav-item" :to="{name: 'home'}" exact>
                    <aw-icon name="home"></aw-icon>
                </router-link>
            </div>

            <div class="nav-center nav-menu">
                <router-link class="nav-item"
                    v-for="tag in frontPageTags" :key="tag"
                    :to="{name: 'tag', params: {tagID: tag}}">
                    <aw-icon class="xs-hide" name="hashtag" scale="0.8"></aw-icon>
                    <b class="sm-hide md-hide lg-hide"> # </b>
                    &nbsp; {{ tag }}
                </router-link>
            </div>

            <div class="nav-right">
                <router-link class="nav-item" to="/search">
                    <aw-icon name="search"></aw-icon>
                </router-link>
                <router-link v-if="isAuth" class="nav-item" to="/post">
                    <aw-icon name="plus"></aw-icon>
                </router-link>
                <user-auth class="nav-item"></user-auth>
            </div>
        </div>
    </nav>
</template>

<script>
    import UserAuth from './UserAuth.vue';
    import 'vue-awesome/icons/hashtag';
    import 'vue-awesome/icons/search';
    import 'vue-awesome/icons/plus';
    import 'vue-awesome/icons/home';

    export default {
        components: {
            UserAuth
        },
        data() {
            return {
                activeIndex: '1'
            };
        },
        computed: {
            isAuth() {
                return this.$store.state.auth.isAuth;
            },
            frontPageTags() {
                return this.$store.state.config.config.frontPageTags;
            }
        },
        asyncData(store) {
            return store.dispatch('config/FETCH_CONFIG');
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../styles/variables.scss";

    nav {
        border-bottom: 1px dashed $grey-light;
        position: fixed;
        width: 100%;
    }

    .nav-menu a {
        font-size: 0.9em;
    }

    @media (max-width: 768px) {
        .nav-menu a {
            font-size: 0.75em;
        }
    }
</style>
