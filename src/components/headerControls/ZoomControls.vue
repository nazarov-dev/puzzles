<template>
    <span class="">
        <button @click="zoomDecrease">Zoom -</button>
        {{ zoom }}
        <button @click="zoomIncrease">Zoom +</button>
    </span>
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        name: "ZoomControls",

        props: {
            step: {
                type: Number,
                default: 1,
            },
        },

        computed: {
            ...mapState([
                'zoom',
            ]),

        },

        methods: {
            ...mapActions([
                'setZoom',
            ]),

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