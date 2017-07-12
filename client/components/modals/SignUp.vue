<template>
    <modal :show="value" @close="$emit('input', false)">
        <h1 slot="header" class="modal-card-title">
            S'inscrire sur Chiboard
        </h1>

        <form @submit.prevent="doSignUp" id="signUpForm">
            <div class="field">
                <label class="label"> Identifiant </label>
                <p class="control">
                    <input class="input" type="text" placeholder="Identifiant"
                        :class="{'is-success': nameOK, 'is-danger': name && !nameOK}"
                        @input="checkNameValidity"
                        v-model="name" required>
                    <p :invisible="!(name && !nameOK)" class="help is-danger">
                        Cet identifiant est déjà utilisé.
                    </p>
                </p>
            </div>
            <div class="field">
                <label class="label"> Courriel </label>
                <p class="control">
                    <input class="input" type="email" placeholder="Courriel"
                        :class="{'is-success': emailOK, 'is-danger': email && !emailOK}"
                        @input="checkEmailValidity"
                        v-model="email" required>
                    <p :invisible="!(emailCorrect && !emailOK)" class="help is-danger">
                        Ce courriel est déjà utilisé.
                    </p>
                </p>
            </div>
            <div class="field">
                <label class="label"> Mot de passe </label>
                <p class="control">
                    <input class="input" type="password" placeholder="Mot de passe"
                        v-model="password" required>
                </p>
            </div>
            <div class="field">
                <label class="label"> Répétez le mot de passe </label>
                <p class="control">
                    <input class="input" type="password" placeholder="Mot de passe"
                        :class="{'is-success': passwordsMatch, 'is-danger': password && passwordConfirm && !passwordsMatch}"
                        v-model="passwordConfirm" required>
                    <p :invisible="!(password && passwordConfirm && !passwordsMatch)" class="help is-danger">
                        Les mots de passe ne correspondent pas.
                    </p>
                </p>
            </div>
            <input type="submit" id="signUpSubmit" class="is-hidden" :disabled="!valid">
        </form>

        <label slot="footer" form="signUpForm" for="signUpSubmit"
            class="button is-success" :disabled="!valid"
            :class="{'is-loading': loading}">
            S'inscrire
        </label>
    </modal>
</template>

<script>
    import debounce from 'debounce';
    import testEmail from '../../plugins/test-email.js';
    import api from '../../api/';
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
                passwordConfirm: '',
                email: '',
                nameAvailible: true,
                emailAvailible: true,
                loading: false
            };
        },
        computed: {
            emailCorrect() {
                return testEmail(this.email);
            },
            emailOK() {
                return this.emailCorrect && this.emailAvailible;
            },
            nameOK() {
                return this.name && this.nameAvailible;
            },
            passwordsMatch() {
                return this.password && this.passwordConfirm && this.password === this.passwordConfirm;
            },
            valid() {
                return this.nameOK && this.emailOK && this.passwordsMatch;
            }
        },
        methods: {
            checkEmailValidity: debounce(function() {
                if (!this.emailCorrect) return;
                api({
                    path: 'GET_user-check-email-$email',
                    params: { email: this.email }
                }).then(({valid}) => {
                    this.emailAvailible = valid;
                });
            }, 300),
            checkNameValidity: debounce(function() {
                if (!this.name) return;
                api({
                    path: 'GET_user-check-name-$name',
                    params: { name: this.name }
                }).then(({valid}) => {
                    this.nameAvailible = valid;
                });
            }, 300),
            doSignUp() {
                if (!this.valid) return;
                this.loading = true;
                this.$store.dispatch('auth/SIGN_UP', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    passwordConfirm: this.passwordConfirm
                }).then((this.loading = false));
            }
        }
    };
</script>
