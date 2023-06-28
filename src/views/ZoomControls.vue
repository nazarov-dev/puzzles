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
            min: {
                type: Number,
                default: 1,
            },
            max: {
                type: Number,
                default: 3,
            },
            step: {
                type: Number,
                default: 1,
            },
        },

        methods: {
            setZoom(value) {
                if (this.zoom === value) return;
                
                this.$emit('setZoom', value);
            },

            zoomDecrease() {
                let value = Math.max(this.min, this.zoom - this.step);
                                
                this.setZoom(value);
            },

            zoomIncrease() {
                let value = Math.min(this.max, this.zoom + this.step);

                this.setZoom(value);
            },

        },

    }
</script>

<style scoped>

</style>