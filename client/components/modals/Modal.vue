<template>
    <div class="modal" :class="{'is-active': show}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <slot name="header"></slot>
                <button class="delete" @click="$emit('close')"></button>
            </header>

            <section class="modal-card-body">
                <slot></slot>
            </section>

            <footer class="modal-card-foot">
                <slot name="footer"></slot>
            </footer>
          </div>
    </div>
</template>

<script>
    export default {
        props: ['show']
    };
</script>

<style scoped>
    footer {
        justify-content: flex-end;
    }
</style>
