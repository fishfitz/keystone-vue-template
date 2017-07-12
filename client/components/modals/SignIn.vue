<template>
    <modal :show="value" @close="$emit('input', false)">
        <h1 slot="header" class="modal-card-title">
            Connexion à Chiboard
        </h1>

        <form @submit.prevent="doSignIn" id="signInForm">
            <div class="field">
                <label class="label"> Identifiant </label>
                <p class="control">
                    <input class="input" type="text" placeholder="Identifiant"
                        v-model="name" required>
                </p>
            </div>
            <div class="field">
                <label class="label"> Mot de passe </label>
                <p class="control">
                    <input class="input" type="password" placeholder="Mot de passe"
                        v-model="password" required>
                </p>
            </div>
            <input type="submit" id="signInSubmit" class="is-hidden" :disabled="!valid">
            <div class="notification is-danger" :invisible="!error">
                {{ error }}
            </div>
        </form>

        <label slot="footer" form="signInForm" for="signInSubmit"
            class="button is-success" :disabled="!valid" :class="{'is-loading': loading}">
            Connexion
        </label>
    </modal>
</template>

<script>
    import Modal from './Modal.vue';

    export default {
        components: {
            Modal
        },
        props: ['value'],
        data() {
            return {
                name: '',
                password: '',
                loading: false,
                error: null
            };
        },
        computed: {
            valid() {
                return this.name && this.password;
            }
        },
        methods: {
            doSignIn() {
                if (!this.valid) return;
                this.loading = true;
                this.$store.dispatch('auth/SIGN_IN', {
                    name: this.name,
                    password: this.password
                }).catch(() => {
                    this.error = 'Mauvaise combinaison identifiant / mot de passe.';
                }).then(() => {
                    this.loading = false;
                });
            }
        }
    };
</script>
