<template>
    <span class="zoom">
        <button @click="zoomDecrease">Zoom -</button>
        {{ roundedZoom }}
        <button @click="zoomIncrease">Zoom +</button>
    </span>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import { roundNumbetTo2Digits } from '../../utils/MyMath';

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

            roundedZoom() {
                return roundNumbetTo2Digits(this.zoom);
            },

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
    .zoom {
        margin: 0 5px;
    }
</style>