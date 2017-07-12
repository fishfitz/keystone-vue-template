<template>
    <modal :show="value" @close="$emit('input', false)">
        <h1 slot="header" class="modal-card-title">
            Changer son avatar
        </h1>

        <file-input :value="avatar" @input="changeAvatar"></file-input>

        <div slot="footer">
            <progress v-if="loading" class="progress" :value="progress" max="100">
                {{ progress }}%
            </progress>
            <div v-else-if="error" class="notification is-danger">
                Quelque-chose s'est mal passé. Réessayez.
            </div>
        </div>
    </modal>
</template>

<script>
    import Modal from './Modal.vue';
    import FileInput from '../forms/FileInput.vue';

    export default {
        components: {
            Modal,
            FileInput
        },
        props: ['value'],
        data() {
            return {
                avatar: null,
                loading: false,
                error: null,
                progress: 0
            };
        },
        methods: {
            changeAvatar(file) {
                if (Array.isArray(file)) file = file[0];
                if (!file) return;
                this.avatar = file;
                const data = new window.FormData();
                data.append('avatar', file);
                this.loading = true;
                this.$store.dispatch('users/MODIFY_USER', {
                    data,
                    slug: this.$route.params.userID,
                    config: {
                        onUploadProgress: progressEvent => {
                            console.log(progressEvent);
                            this.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        }
                    }
                }).then(() => this.$emit('input', false))
                .catch(err => (this.error = err))
                .then(() => (this.loading = false));
            }
        }
    };
</script>
