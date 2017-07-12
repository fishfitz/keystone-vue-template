<template>
    <div>
        <div v-if="isAuth" class="add-button container has-text-centered">
            <router-link to="/post" class="button is-primary is-large">
                Ajouter une image
            </router-link>
        </div>

        <section class="hero is-medium is-bold is-light">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Chiboard
                    </h1>
                    <h2 class="subtitle">
                        Ici du contenu sympa
                    </h2>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

    export default {
        computed: {
            isAuth() {
                return this.$store.state.auth.isAuth;
            },
            activeUser() {
                return this.$store.state.auth.activeUser;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .add-button {
        margin-top: 8px;
        margin-bottom: 8px;
    }
</style>
