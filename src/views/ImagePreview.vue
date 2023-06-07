<template>
    <div v-show="show" class="image-container">
        <img :src="imgSrc" alt="">
    </div>
</template>

<script>
    export default {
        name: "ImagePreview",

        props: [
            'imgSrc',
            'show',
        ]
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