<template>
    <div class="field has-addons">
        <template v-if="isAuth">
            <router-link :to="{name: 'user', params: {userID: activeUser.slug}}" class="control">
                <span class="button is-white">
                    <img :src="activeUser.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTctfQYPcfoA_S5ZxyOYRD0kUCqkva4U5jHB791wtr9qPTe2WS44A'" class="image is-24x24">
                    <span class="xs-hide"> {{ activeUser.name }} </span>
                </span>
            </router-link>

            <label class="control">
                <button class="button is-white" @click="doSignOut">
                    <aw-icon name="power-off"></aw-icon>
                </button>
            </label>
        </template>

        <template v-else>
            <label class="control">
                <button class="button is-white" @click="signUp = true">
                    S'inscrire
                </button>
            </label>

            <sign-up v-model="signUp"></sign-up>
            <sign-in v-model="signIn"></sign-in>

            <label class="control">
                <button class="button is-white" @click="signIn = true">
                    <aw-icon name="power-off"></aw-icon>
                </button>
            </label>
        </template>
    </div>
</template>

<script>
    import SignUp from '../modals/SignUp.vue';
    import SignIn from '../modals/SignIn.vue';
    import 'vue-awesome/icons/power-off';

    export default {
        components: {
            SignUp,
            SignIn
        },
        data() {
            return {
                signUp: false,
                signIn: false
            };
        },
        computed: {
            isAuth() {
                return this.$store.state.auth.isAuth;
            },
            activeUser() {
                return this.$store.state.auth.activeUser;
            }
        },
        methods: {
            doSignOut() {
                this.$store.dispatch('auth/SIGN_OUT');
            }
        },
        watch: {
            isAuth(value) {
                if (value === false) {
                    this.signUp = false;
                    this.signIn = false;
                    document.activeElement.blur();
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../styles/variables.scss";

    img {
        border-radius: $radius;
        display: inline-block;
        vertical-align: top;
        margin-right: 6px;
    }
</style>
