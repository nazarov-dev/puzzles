<template>
    <span class="">
        <button @click="zoomDecrease">Zoom -</button>
        {{ zoom }}
        <button @click="zoomIncrease">Zoom +</button>
    </span>
</template>

<script>
    export default {
        name: "ZoomControls",

        props: {
            zoom: {
                type: Number,
                default: 1,
                required: true,
            },
            step: {
                type: Number,
                default: 1,
            },
        },

        emits: [
            'setZoom',
        ],

        methods: {
            setZoom(value) {
                this.$emit('setZoom', value);
            },

            zoomDecrease() {
                let value = this.zoom - this.step;
                                
                this.setZoom(value);
            },

            zoomIncrease() {
                let value = this.zoom + this.step;

                this.setZoom(value);
            },

        },

    }
</script>

<style scoped>

</style>