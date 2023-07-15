<template>
    <div v-show="show" class="image-container">
        <img :src="puzzleImageSrc" alt="">
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "ImagePreview",

        props: [
            'show',
        ],

        computed: {
            ...mapState([
                'puzzleImageSrc'
            ]),
        },
    }
</script>

<style scoped>
    .image-container {
        position: relative;
        z-index: 1;
    }

    img {
        position: absolute;
        top: 0;
        left: 0;
        max-width: 200px;
        padding: 5px;
        border: 1px solid;
        object-fit: contain;
        background: #ddd;
    }
</style>