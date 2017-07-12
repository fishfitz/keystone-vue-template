<template>
    <section class="section">
        <div class="container">
            <div class="has-text-centered">
                <h1 class="title is-2">
                    <aw-icon name="user-circle" scale="1.8"></aw-icon>
                    {{ user.name }}
                </h1>
                <figure class="image is-128x128">
                    <template v-if="isSelf">
                        <edit-avatar v-model="changeAvatar"></edit-avatar>
                        <button class="button is-white hover-avatar" @click="changeAvatar = true">
                            <aw-icon name="pencil" scale="2"></aw-icon>
                        </button>
                    </template>
                    <img :src="user.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTctfQYPcfoA_S5ZxyOYRD0kUCqkva4U5jHB791wtr9qPTe2WS44A'">
                </figure>
            </div>

            <hr>

            <div class="level">
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading"> Inscrit le </p>
                        <p class="title"> {{ registered_at }} </p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading"> Images postées </p>
                        <p class="title"> {{ user.posts }} </p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading"> Favoris </p>
                        <p class="title"> {{ user.favorites }} </p>
                    </div>
                </div>
            </div>

            <hr>

            <h1 class="title is-3">
                Qui suis-je ?
                <button class="button is-white" v-if="isSelf"
                    @click="modifyDescription" :class="{'is-loading': loading}">
                    <span class="icon">
                        <aw-icon :name="editDescription ? 'check' : 'pencil'" scale="2">
                        </aw-icon>
                    </span>
                </button>
            </h1>
            <div v-if="editDescription" :class="{'is-danger': error}">
                <textarea :value="user.description.md" @input="commitDescription($event.target.value)"></textarea>
            </div>
            <div class="content" v-else>
                <blockquote v-html="user.description.html || defaultDescription">
                </blockquote>
            </div>
        </div>
    </section>
</template>

<script>
    import EditAvatar from '../components/modals/EditAvatar.vue';
    import 'vue-awesome/icons/user-circle';
    import 'vue-awesome/icons/check';
    import 'vue-awesome/icons/pencil';

    export default {
        components: {
            EditAvatar
        },
        data() {
            return {
                defaultDescription: '<span>Cet utilisateur n\'a pas rédigé de description.</span>',
                changeAvatar: false,
                editDescription: false,
                loading: false,
                error: null
            };
        },
        computed: {
            isSelf() {
                return this.$store.state.auth.isAuth &&
                    this.$store.state.auth.activeUser.slug === this.$route.params.userID;
            },
            user() {
                return this.$store.state.users.users[this.$route.params.userID];
            },
            registered_at() {
                return (new Date(this.user.registered_at)).toLocaleDateString('en-GB');
            }
        },
        methods: {
            commitDescription(value) {
                this.$store.commit('users/SET_DESCRIPTION', {
                    slug: this.user.slug,
                    description: value
                });
            },
            modifyDescription() {
                if (!this.editDescription) {
                    this.editDescription = true;
                }
                else {
                    this.loading = true;
                    this.$store.dispatch('users/MODIFY_USER', {
                        data: {
                            description: this.user.description.md
                        },
                        slug: this.user.slug
                    }).then(() => {
                        this.editDescription = false;
                        this.error = null;
                    })
                    .catch(err => (this.error = err))
                    .then(() => (this.loading = false));
                }
            }
        },
        asyncData({store, route: { params: { userID } }}) {
            return store.dispatch('users/FETCH_USER', {slug: userID});
        }
    };
</script>

<style lang="scss" scoped>
    @import "../styles/variables.scss";

    figure {
        display: inline-block;
        border-radius: 5px;
        overflow: hidden;
    }

    .title.is-2 {
        margin-bottom: 25px;
    }

    .hover-avatar {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-shadow: none;
        border: none;
        opacity: 0;
        transition: opacity $speed $easing;

        &:hover {
            opacity: 0.75;
        }
    }

    textarea {
        box-sizing: border-box;
        padding: 1.25em 1.5em;
        width: 100%;
        height: 200px;
    }
</style>
