<template>
    <span class="loader"></span>
</template>

<script>
    export default {
        name: "LoadSpinner"
    }
</script>

<style scoped>
    .loader {
        position: absolute;
        z-index: 1;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 48px;
        height: 48px;
        border: 5px solid #4155ff;
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>