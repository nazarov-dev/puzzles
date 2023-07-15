<template>
    <v-path
            ref="puzzleTile"
            :config="{
                data: path,
                strokeWidth: 1,
                stroke: 'black',
                fillPatternImage: puzzleImage,
                fillPatternScaleX: imageScale,
                fillPatternScaleY: imageScale,
                fillPatternRepeat: 'no-repeat',
                hitStrokeWidth: 0,
                perfectDrawEnabled: false,
                shadowEnabled: false,
                shadowForStrokeEnabled: false,
            }"
    ></v-path>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: "PuzzleTile",

        props: [
            'path',
            'imageScale',
        ],

        computed: {
            ...mapState([
                'puzzleImage',
            ]),

            puzzleTile() {
                return this.$refs['puzzleTile'].getNode();
            },

        },

        mounted() {
            this.puzzleTile.cache({ pixelRatio: 3 });
        },

        beforeUnmount() {
            this.puzzleTile.clearCache();
        }

    }
</script>

<style scoped>

</style>