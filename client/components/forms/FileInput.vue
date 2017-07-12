<template>
    <label class="level">
        <div class="level-item">
            <template v-if="!preview">
                Cliquer ou déposer une image ici
            </template>
            <img v-else class="image" :src="preview">
            <input type="file" accept="image/*"
                @change="$emit('input', $event.target.files[0])">
        </div>
    </label>
</template>

<script>
    export default {
        props: ['value'],
        data() {
            return {
                preview: null
            };
        },
        watch: {
            value(file) {
                if (file) {
                    const reader = new window.FileReader();
                    reader.onload = e => (this.preview = e.target.result);
                    reader.readAsDataURL(file);
                }
                else {
                    this.preview = null;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../styles/variables.scss";

    label {
        display: block;
        position: relative;
        overflow: hidden;
        height: 400px;
        max-height: 50vh;
        color: $grey-light;
        text-align: center;
        border: 1px dashed $grey-light;
        border-radius: $radius;
        padding-top: 5px;
        padding-bottom: 5px;
        cursor: pointer;
        transition: border-color $speed $easing, color $speed $easing;

        &:hover {
            color: $grey-dark;
            border-color: $grey-dark;
        }

        div {
            height: 100%;
        }
    }

    input {
        position: absolute;
        width: 0;
        visibility: hidden;
    }

    img {
        object-fit: contain;
        height: 100%;
        width: auto;
    }
</style>
